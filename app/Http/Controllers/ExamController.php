<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Exam;
use App\Models\ExamAttempt;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function show(Course $course, Exam $exam)
    {
        if ($exam->course_id !== $course->id || !$exam->is_published) abort(404);

        $userId = Auth::id();
        $isOwner = $course->user_id === $userId;
        $purchase = \App\Models\Purchase::where("user_id", $userId)->where("course_id", $course->id)->first();

        if (!$purchase && !$course->is_free && !$isOwner) {
            return redirect()->route("courses.show", $course->id)->with("error", "Debes estar inscrito para ver los ex�menes.");
        }

        $course->load(["chapters" => function($q) use ($userId) {
            $q->where("is_published", true)->orderBy("position", "asc")->with(['userProgress' => function($qu) use ($userId) {
                $qu->where('user_id', $userId);
            }]);
        }, "exams" => function($q) {
            $q->where("is_published", true)->orderBy("position", "asc");
        }]);

        $attempts = $exam->attempts()->where("user_id", $userId)->orderBy("created_at", "desc")->get();
        // Since 'passed' is not a DB column, dynamically calculate if they passed any.
        $hasPassed = $attempts->contains(function ($attempt) use ($exam) {
            return $attempt->score >= $exam->min_score;
        });

        // Cálculo del Porcentaje de Progreso
        $publishedChapterIds = $course->chapters->pluck('id');
        $validCompletedChapters = \App\Models\UserProgress::where('user_id', $userId)
            ->whereIn('chapter_id', $publishedChapterIds)
            ->where('is_completed', true)
            ->count();
            
        $progressCount = count($publishedChapterIds) > 0 ? ($validCompletedChapters / count($publishedChapterIds)) * 100 : 0;

        return Inertia::render("Courses/Exams/Show", [
            "course" => $course,
            "exam" => $exam,
            "attempts" => $attempts,
            "hasPassed" => $hasPassed,
            "progressCount" => round($progressCount)
        ]);
    }

    public function take(Course $course, Exam $exam)
    {
        if ($exam->course_id !== $course->id || !$exam->is_published) abort(404);

        $userId = Auth::id();
        $isOwner = $course->user_id === $userId;
        $purchase = \App\Models\Purchase::where("user_id", $userId)->where("course_id", $course->id)->first();

        if (!$purchase && !$course->is_free && !$isOwner) {
            return redirect()->route("courses.show", $course->id)->with("error", "Debes estar inscrito para tomar el examen.");
        }

        $pastAttempts = $exam->attempts()->where("user_id", $userId)->count();
        if ($exam->attempts_allowed && $pastAttempts >= $exam->attempts_allowed && !$isOwner) {
            return redirect()->route("courses.exams.show", ["course" => $course->id, "exam" => $exam->id])->with("error", "Has alcanzado el l�mite de intentos.");
        }

        // Load exam with questions and options
        $exam->load(['questions' => function($q) {
            $q->orderBy('position', 'asc');
        }, 'questions.options' => function($q) {
            $q->select('id', 'question_id', 'content'); // Prevent cheating
        }]);

        // Mismo cálculo de progreso para el layout
        $course->load(["chapters" => function($q) use ($userId) {
            $q->where("is_published", true)->orderBy("position", "asc")->with(['userProgress' => function($qu) use ($userId) {
                $qu->where('user_id', $userId);
            }]);
        }, "exams" => function($q) {
            $q->where("is_published", true)->orderBy("position", "asc");
        }]);
        $publishedChapterIds = $course->chapters->pluck('id');
        $validCompletedChapters = \App\Models\UserProgress::where('user_id', $userId)
            ->whereIn('chapter_id', $publishedChapterIds)
            ->where('is_completed', true)
            ->count();
        $progressCount = count($publishedChapterIds) > 0 ? ($validCompletedChapters / count($publishedChapterIds)) * 100 : 0;

        return Inertia::render('Courses/Exams/Take', [
            'course' => $course,
            'exam' => $exam,
            'progressCount' => round($progressCount)
        ]);
    }

    public function submit(Request $request, Course $course, Exam $exam)
    {
        if ($exam->course_id !== $course->id || !$exam->is_published) abort(404);

        $userId = Auth::id();
        $isOwner = $course->user_id === $userId;
        $pastAttempts = $exam->attempts()->where("user_id", $userId)->count();
        if ($exam->attempts_allowed && $pastAttempts >= $exam->attempts_allowed && !$isOwner) {
            return response()->json(["error" => "Has alcanzado el l�mite de intentos."], 403);
        }

        $validated = $request->validate([
            "answers" => "array",
            "answers.*" => "array" // question_id => array of selected option IDs
        ]);

        $score = 0;
        $totalQuestions = $exam->questions()->count();

        if ($totalQuestions > 0) {
            $correctQuestionsCount = 0;

            foreach($exam->questions as $question) {
                $userOptions = collect($validated["answers"][$question->id] ?? []);
                
                $correctOptions = collect($question->options()->where("is_correct", true)->pluck("id"));
                
                // Si seleccionaron exactamente las opciones correctas y ninguna extra
                if ($userOptions->count() === $correctOptions->count() && $userOptions->diff($correctOptions)->isEmpty()) {
                    $correctQuestionsCount++;
                }
            }

            $score = round(($correctQuestionsCount / $totalQuestions) * 100);
        }

        $exam->attempts()->create([
            "user_id" => $userId,
            "score" => $score,
            "status" => "completed",
            "answers" => $validated["answers"] ?? []
        ]);

        return redirect()->route("courses.exams.show", ["course" => $course->id, "exam" => $exam->id])->with("success", "Examen calificado");
    }
}

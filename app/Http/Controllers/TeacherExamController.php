<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Exam;
use App\Models\ExamQuestion;
use App\Models\ExamOption;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/**
 * Controlador para la creación y gestión de exámenes por parte del profesor.
 */
class TeacherExamController extends Controller
{
    /**
     * Crea un nuevo examen en el curso.
     */
    public function store(Request $request, Course $course)
    {
        if ($course->user_id != Auth::id()) abort(403);
        
        $request->validate(["title" => "required|string|max:255"]);
        
        $lastChapterPosition = $course->chapters()->max("position") ?? 0;
        $lastExamPosition = $course->exams()->max("position") ?? 0;
        $newPosition = max($lastChapterPosition, $lastExamPosition) + 1;
        
        $course->exams()->create([
            "title" => $request->title,
            "position" => $newPosition,
        ]);
        
        return back()->with("success", "Examen creado");
    }

    /**
     * Reordena la lista de exámenes de un curso.
     */
    public function reorder(Request $request, Course $course)
    {
        if ($course->user_id != Auth::id()) abort(403);

        $validated = $request->validate([
            "list" => "required|array",
            "list.*.id" => "required|uuid",
            "list.*.position" => "required|integer|min:1",
        ]);

        $examIds = collect($validated["list"])->pluck("id");
        $ownedCount = $course->exams()->whereIn("id", $examIds)->count();

        if ($ownedCount !== $examIds->count()) abort(403);

        foreach($validated["list"] as $item) {
            Exam::where("id", $item["id"])->update(["position" => $item["position"]]);
        }
        
        return back();
    }

    /**
     * Muestra el formulario para editar la información y preguntas de un examen.
     */
    public function edit(Course $course, Exam $exam)
    {
        if ($course->user_id != Auth::id()) abort(403);
        if ($exam->course_id !== $course->id) abort(404);

        $exam->load(["questions.options"]);

        return Inertia::render("Dashboard/Teacher/Courses/Exams/Edit/Index", [
            "course" => $course,
            "exam" => $exam
        ]);
    }

    /**
     * Actualiza la configuración de un examen.
     */
    public function update(Request $request, Course $course, Exam $exam)
    {
        if ($course->user_id != Auth::id()) abort(403);
        if ($exam->course_id !== $course->id) abort(404);

        $validated = $request->validate([
            "title" => "sometimes|string|max:255",
            "description" => "nullable|string",
            "min_score" => "nullable|integer|min:0|max:100",
            "attempts_allowed" => "nullable|integer|min:0|max:10"
        ]);

        $exam->update($validated);
        
        return back()->with("success", "Examen actualizado");
    }

    /**
     * Publica un examen si tiene preguntas configuradas.
     */
    public function publish(Course $course, Exam $exam)
    {
        if ($course->user_id != Auth::id()) abort(403);
        if ($exam->course_id !== $course->id) abort(404);

        // Required checks before publishing
        if (!$exam->title || $exam->questions()->count() == 0) {
            return back()->withErrors(["error" => "Faltan campos o preguntas para publicar"]);
        }
        
        $exam->update(["is_published" => true]);
        return back();
    }

    /**
     * Oculta un examen publicado.
     */
    public function unpublish(Course $course, Exam $exam)
    {
        if ($course->user_id != Auth::id()) abort(403);
        if ($exam->course_id !== $course->id) abort(404);

        $exam->update(["is_published" => false]);
        return back();
    }

    /**
     * Elimina un examen por completo.
     */
    public function destroy(Course $course, Exam $exam)
    {
        if ($course->user_id != Auth::id()) abort(403);
        if ($exam->course_id !== $course->id) abort(404);

        $exam->delete();
        return redirect()->route("teacher.courses.edit", $course->id)->with("success", "Examen eliminado");
    }

    /**
     * Crea una nueva pregunta con sus respectivas opciones para un examen.
     */
    public function storeQuestion(Request $request, Course $course, Exam $exam)
    {
        if ($course->user_id != Auth::id()) abort(403);
        if ($exam->course_id !== $course->id) abort(404);

        $request->validate([
            "content" => "required|string", 
            "type" => "required|string|in:single,multiple",
            "options" => "required|array|min:2",
            "options.*.content" => "required|string",
            "options.*.is_correct" => "required|boolean",
        ]);

        $lastQuestion = $exam->questions()->orderBy("position", "desc")->first();
        $newPosition = $lastQuestion ? $lastQuestion->position + 1 : 1;

        $question = $exam->questions()->create([
            "content" => $request->content,
            "type" => $request->type,
            "position" => $newPosition
        ]);

        $question->options()->createMany($request->options);

        return back();
    }

    /**
     * Actualiza el contenido y las opciones de una pregunta existente.
     */
    public function updateQuestion(Request $request, Course $course, Exam $exam, ExamQuestion $question)
    {
        if ($course->user_id != Auth::id() || $exam->course_id !== $course->id || $question->exam_id !== $exam->id) abort(403);

        $validated = $request->validate([
            "content" => "required|string", 
            "type" => "required|string|in:single,multiple",
            "options" => "required|array|min:2",
            "options.*.content" => "required|string",
            "options.*.is_correct" => "required|boolean",
        ]);

        $question->update([
            "content" => $validated["content"],
            "type" => $validated["type"],
        ]);

        $question->options()->delete();
        $question->options()->createMany($validated["options"]);

        return back();
    }

    /**
     * Reordena las preguntas de un examen.
     */
    public function reorderQuestions(Request $request, Course $course, Exam $exam)
    {
        if ($course->user_id != Auth::id() || $exam->course_id !== $course->id) abort(403);

        $validated = $request->validate([
            "list" => "required|array",
            "list.*.id" => "required|uuid",
            "list.*.position" => "required|integer|min:1",
        ]);

        $questionIds = collect($validated["list"])->pluck("id");
        if ($exam->questions()->whereIn("id", $questionIds)->count() !== $questionIds->count()) abort(403);

        foreach($validated["list"] as $item) {
            ExamQuestion::where("id", $item["id"])->update(["position" => $item["position"]]);
        }
        
        return back();
    }

    /**
     * Elimina una pregunta de un examen.
     */
    public function destroyQuestion(Course $course, Exam $exam, ExamQuestion $question)
    {
        if ($course->user_id != Auth::id() || $exam->course_id !== $course->id || $question->exam_id !== $exam->id) abort(403);
        $question->delete();
        return back();
    }

    /**
     * Añade una nueva opción de respuesta a una pregunta.
     */
    public function storeOption(Request $request, Course $course, Exam $exam, ExamQuestion $question)
    {
        if ($course->user_id != Auth::id() || $exam->course_id !== $course->id || $question->exam_id !== $exam->id) abort(403);

        $request->validate([
            "content" => "required|string",
            "is_correct" => "required|boolean"
        ]);

        if ($question->type === "single" && $request->is_correct) {
            $question->options()->update(["is_correct" => false]);
        }

        $question->options()->create([
            "content" => $request->content,
            "is_correct" => $request->is_correct
        ]);

        return back();
    }

    /**
     * Actualiza el contenido o estado de una opción de respuesta.
     */
    public function updateOption(Request $request, Course $course, Exam $exam, ExamQuestion $question, ExamOption $option)
    {
        if ($course->user_id != Auth::id() || $exam->course_id !== $course->id || $question->exam_id !== $exam->id || $option->question_id !== $question->id) abort(403);

        $validated = $request->validate([
            "content" => "sometimes|string",
            "is_correct" => "sometimes|boolean"
        ]);

        // If setting this option as correct for single choice, reset all others in this question
        if ($question->type === "single" && isset($validated["is_correct"]) && $validated["is_correct"]) {
            $question->options()->where("id", "!=", $option->id)->update(["is_correct" => false]);
        }

        $option->update($validated);
        return back();
    }

    /**
     * Elimina una opción de respuesta.
     */
    public function destroyOption(Course $course, Exam $exam, ExamQuestion $question, ExamOption $option)
    {
        if ($course->user_id != Auth::id() || $exam->course_id !== $course->id || $question->exam_id !== $exam->id || $option->question_id !== $question->id) abort(403);
        
        $option->delete();
        return back();
    }
}

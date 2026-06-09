<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Chapter;
use App\Models\Purchase;
use App\Models\UserProgress;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

/**
 * Controlador para la visualización pública y progreso de los cursos (vista de estudiante).
 */
class CourseController extends Controller
{
    /**
     * Redirige al estudiante al primer capítulo publicado del curso.
     *
     * @param Course $course Curso al que se intenta acceder.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function show(Course $course)
    {
        $firstChapter = $course->chapters()->where('is_published', true)->orderBy('position', 'asc')->first();
        
        if (!$firstChapter) {
            return redirect()->route('dashboard')->withErrors(['error' => 'Este curso no tiene capítulos publicados']);
        }
        
        return redirect()->route('courses.chapter', [$course->id, $firstChapter->id]);
    }

    /**
     * Muestra un capítulo específico del curso y gestiona el acceso según compras o permisos.
     *
     * @param Course $course Curso al que pertenece el capítulo.
     * @param Chapter $chapter Capítulo a mostrar.
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function chapter(Course $course, Chapter $chapter)
    {
        $user = Auth::user();
        
        // Validar que el capítulo está publicado y pertenece al curso
        if (!$chapter->is_published || $chapter->course_id !== $course->id) {
            return redirect()->route('dashboard');
        }
        
        // Cargar todo lo que necesita el Layout Estudiantil y el Sidebar
        $course->load(['chapters' => function($query) use ($user) {
            $query->where('is_published', true)
                  ->orderBy('position', 'asc')
                  ->with(['userProgress' => function($q) use ($user) {
                      $q->where('user_id', $user->id);
                  }]);
        }, 'exams' => function($q) use ($user) {
            $q->where('is_published', true)
              ->orderBy('position', 'asc')
              ->with(['attempts' => function($query) use ($user) {
                  $query->where('user_id', $user->id);
              }]);
        }]);

        $purchase = Purchase::where('user_id', $user->id)->where('course_id', $course->id)->first();
        
        // Si el usuario es dueño del curso, le damos acceso total falseando su estado "purchase"
        if ((string) $course->user_id === (string) $user->id) {
            $purchase = true;
        }
        
        $progressCount = $course->getProgressPercentageForUser($user->id);
        
        // Datos específicos del Capítulo seleccionado
        $attachments = [];
        $nextChapter = null;
        
        if ($purchase || $chapter->is_free) {
            $attachments = $course->attachments()->orderBy('created_at', 'desc')->get();
            $nextChapter = $course->chapters()
                ->where('is_published', true)
                ->where('position', '>', $chapter->position)
                ->orderBy('position', 'asc')
                ->first();
        }

        $userProgress = UserProgress::where('user_id', $user->id)->where('chapter_id', $chapter->id)->first();
        
        return Inertia::render('Course/Chapter/Index', [
            'course' => $course,
            'chapter' => $chapter,
            'purchase' => $purchase,
            'progressCount' => round($progressCount),
            'attachments' => $attachments,
            'nextChapter' => $nextChapter,
            'userProgress' => $userProgress
        ]);
    }

    /**
     * Procesa la inscripción a un curso.
     *
     * @param Request $request
     * @param Course $course Curso al que el usuario se inscribe.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function checkout(Request $request, Course $course)
    {
        $user = Auth::user();

        if ((string) $course->user_id === (string) $user->id) {
            return back()->withErrors(['error' => 'No puedes inscribirte a tu propio curso']);
        }

        if (!$course->is_published) {
            return back()->withErrors(['error' => 'Este curso no esta disponible para inscripción']);
        }

        // Validar si ya lo compró/inscribió
        $purchase = Purchase::where('user_id', $user->id)->where('course_id', $course->id)->exists();
        if ($purchase) {
            return back()->withErrors(['error' => 'Ya estás inscrito en este curso']);
        }

        // Inscripción directa (bypass)
        Purchase::firstOrCreate([
            'user_id' => $user->id,
            'course_id' => $course->id
        ]);

        return redirect()->back();
    }

    /**
     * Actualiza el progreso de un usuario en un capítulo específico marcándolo como completado o no completado.
     *
     * @param Request $request
     * @param Course $course
     * @param Chapter $chapter
     * @return \Illuminate\Http\RedirectResponse
     */
    public function progress(Request $request, Course $course, Chapter $chapter)
    {
        if ($chapter->course_id !== $course->id) {
            abort(404);
        }

        $user = Auth::user();
        $purchase = Purchase::where('user_id', $user->id)->where('course_id', $course->id)->exists();

        if ((string) $course->user_id === (string) $user->id) {
            $purchase = true;
        }

        if (!$chapter->is_free && !$purchase) {
            abort(403);
        }

        UserProgress::updateOrCreate(
            ['user_id' => $user->id, 'chapter_id' => $chapter->id],
            ['is_completed' => $request->boolean('isCompleted')]
        );

        return back();
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Chapter;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

/**
 * Controlador para la gestión de capítulos de un curso por parte del profesor.
 */
class TeacherChapterController extends Controller
{
    /**
     * Muestra el formulario para editar un capítulo.
     */
    public function edit(Course $course, Chapter $chapter)
    {
        if ($course->user_id != Auth::id() || $chapter->course_id != $course->id) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Dashboard/Teacher/Courses/Chapters/Edit/Index', [
            'courseId' => $course->id,
            'courseIsFree' => $course->is_free,
            'chapter' => $chapter
        ]);
    }

    /**
     * Actualiza la información básica de un capítulo.
     */
    public function update(Request $request, Course $course, Chapter $chapter)
    {
        if ($course->user_id != Auth::id() || $chapter->course_id != $course->id) abort(403);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'is_video_required' => 'sometimes|boolean',
        ]);

        if (!empty($validated)) {
            $chapter->update($validated);
        }
        
        return back()->with('success', 'Capítulo actualizado');
    }

    /**
     * Publica un capítulo si tiene el contenido obligatorio requerido.
     */
    public function publish(Course $course, Chapter $chapter)
    {
        if ($course->user_id != Auth::id() || $chapter->course_id != $course->id) abort(403);
        
        if (!$chapter->title || !$chapter->description) {
            return back()->withErrors(['error' => 'Faltan campos obligatorios para publicar']);
        }
        
        if ($chapter->is_video_required && !$chapter->video_url) {
            return back()->withErrors(['error' => 'Falta el video obligatorio para publicar']);
        }
        
        $chapter->update(['is_published' => true]);
        return back();
    }

    /**
     * Oculta un capítulo publicado. Si era el último capítulo publicado, despublica el curso.
     */
    public function unpublish(Course $course, Chapter $chapter)
    {
        if ($course->user_id != Auth::id() || $chapter->course_id != $course->id) abort(403);
        
        $chapter->update(['is_published' => false]);
        
        $hasPublishedChapter = $course->chapters()->where('is_published', true)->where('id', '!=', $chapter->id)->exists();
        if (!$hasPublishedChapter) {
             $course->update(['is_published' => false]);
        }
        
        return back();
    }

    /**
     * Elimina un capítulo y sus archivos asociados (video, imagen).
     */
    public function destroy(Course $course, Chapter $chapter)
    {
        if ($course->user_id != Auth::id() || $chapter->course_id != $course->id) abort(403);
        
        if ($chapter->video_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $chapter->video_url));
        }
        if ($chapter->image_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $chapter->image_url));
        }
        
        $chapter->delete();
        
        $hasPublishedChapter = $course->chapters()->where('is_published', true)->exists();
        if (!$hasPublishedChapter) {
             $course->update(['is_published' => false]);
        }
        
        return redirect()->route('teacher.courses.edit', $course->id);
    }

    /**
     * Sube o reemplaza el video de un capítulo.
     */
    public function uploadVideo(Request $request, Course $course, Chapter $chapter)
    {
        if ($course->user_id != Auth::id() || $chapter->course_id != $course->id) abort(403);
        
        // Validación de video. (Considera los límites de upload_max_filesize en php.ini)
        $request->validate(['video' => 'required|file|mimetypes:video/mp4,video/quicktime,video/webm,video/ogg,video/x-m4v|max:102400']); // Hasta 100MB vía validación Laravel
        
        if ($chapter->video_url) {
             Storage::disk('public')->delete(str_replace('/storage/', '', $chapter->video_url));
        }
        
        $path = $request->file('video')->store('chapters', 'public');
        $chapter->update(['video_url' => '/storage/' . $path]);
        
        return back();
    }

    /**
     * Sube o reemplaza la imagen de portada de un capítulo.
     */
    public function uploadImage(Request $request, Course $course, Chapter $chapter)
    {
        if ($course->user_id != Auth::id() || $chapter->course_id != $course->id) abort(403);
        
        $request->validate(['image' => 'required|image']);
        
        if ($chapter->image_url) {
             Storage::disk('public')->delete(str_replace('/storage/', '', $chapter->image_url));
        }
        
        $path = $request->file('image')->store('chapters/images', 'public');
        $chapter->update(['image_url' => '/storage/' . $path]);
        
        return back();
    }
}

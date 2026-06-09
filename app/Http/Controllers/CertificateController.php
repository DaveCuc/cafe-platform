<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\UserProgress;
use App\Models\ExamAttempt;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Controlador encargado de la gestión y generación de certificados.
 */
class CertificateController extends Controller
{
    /**
     * Genera y descarga el certificado en PDF para un curso completado.
     *
     * @param Course $course Curso del cual se desea obtener el certificado.
     * @return \Illuminate\Http\Response
     */
    public function download(Course $course)
    {
        $userId = Auth::id();

        // 1. Verificar que el usuario tenga acceso al curso
        $purchase = \App\Models\Purchase::where('user_id', $userId)->where('course_id', $course->id)->first();
        if (!$purchase && !$course->is_free && $course->user_id !== $userId) {
            abort(403, 'Debes estar inscrito en el curso.');
        }

        $course->load([
            'chapters' => function ($q) {
                $q->where('is_published', true);
            },
            'exams' => function ($q) {
                $q->where('is_published', true);
            },
            'user'
        ]);

        // 2. Verificar que completó todos los capítulos publicados
        $publishedChapterIds = $course->chapters->pluck('id');
        $completedChaptersCount = UserProgress::where('user_id', $userId)
            ->whereIn('chapter_id', $publishedChapterIds)
            ->where('is_completed', true)
            ->count();

        if (count($publishedChapterIds) > 0 && $completedChaptersCount < count($publishedChapterIds)) {
            abort(403, 'Debes completar todos los capítulos para obtener el certificado.');
        }

        // 3. Verificar que pasó todos los exámenes publicados
        foreach ($course->exams as $exam) {
            $hasPassed = ExamAttempt::where('user_id', $userId)
                ->where('exam_id', $exam->id)
                ->where('score', '>=', $exam->min_score)
                ->exists();

            if (!$hasPassed) {
                abort(403, 'Debes aprobar todos los exámenes para obtener el certificado.');
            }
        }

        // 4. Generar el PDF
        $user = Auth::user();
        $date = now()->format('d/m/Y');

        $pdf = Pdf::loadView('certificates.course', [
            'course' => $course,
            'user' => $user,
            'date' => $date
        ])->setPaper('a4', 'landscape');

        return $pdf->download("Certificado_{$course->title}.pdf");
    }
}

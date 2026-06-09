<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Modelo que representa un curso en la plataforma.
 */
class Course extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'image_url',
        'price',
        'is_published',
        'category_id',
        'is_free'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_free' => 'boolean',
        'price' => 'float',
    ];

    /**
     * Obtiene la categoría a la que pertenece este curso.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Obtiene el usuario (profesor) creador del curso.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Obtiene los capítulos que forman parte de este curso, ordenados por posición.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderBy('position', 'asc');
    }

    /**
     * Obtiene los archivos adjuntos relacionados con este curso.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attachments(): HasMany
    {
        return $this->hasMany(Attachment::class)->orderBy('created_at', 'desc');
    }

    /**
     * Obtiene los exámenes asociados a este curso, ordenados por posición.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class)->orderBy('position', 'asc');
    }

    /**
     * Obtiene los registros de compras o inscripciones de este curso.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }

    /**
     * Calcula el porcentaje de progreso de un usuario específico en este curso, 
     * basado en los capítulos completados y exámenes aprobados.
     *
     * @param string $userId ID del usuario.
     * @return float
     */
    public function getProgressPercentageForUser(string $userId): float
    {
        $publishedChapterIds = $this->chapters()->where('is_published', true)->pluck('id');
        
        $validCompletedChapters = UserProgress::where('user_id', $userId)
            ->whereIn('chapter_id', $publishedChapterIds)
            ->where('is_completed', true)
            ->count();

        $publishedExams = $this->exams()->where('is_published', true)->get();
        $validCompletedExams = 0;
        
        foreach ($publishedExams as $exam) {
            $hasPassed = $exam->attempts()
                ->where('user_id', $userId)
                ->where('score', '>=', $exam->min_score)
                ->exists();
                
            if ($hasPassed) {
                $validCompletedExams++;
            }
        }

        $totalItems = count($publishedChapterIds) + $publishedExams->count();

        if ($totalItems === 0) {
            return 0;
        }

        return (($validCompletedChapters + $validCompletedExams) / $totalItems) * 100;
    }
}

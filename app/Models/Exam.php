<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Modelo que representa un examen o evaluación asociado a un curso.
 */
class Exam extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'description',
        'course_id',
        'position',
        'is_published',
        'attempts_allowed',
        'min_score'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'attempts_allowed' => 'integer',
        'min_score' => 'integer',
        'position' => 'integer',
    ];

    /**
     * Obtiene el curso al que pertenece este examen.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Obtiene las preguntas formuladas en este examen, ordenadas por posición.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function questions(): HasMany
    {
        return $this->hasMany(ExamQuestion::class)->orderBy('position', 'asc');
    }

    /**
     * Obtiene todos los intentos de resolución registrados para este examen.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attempts(): HasMany
    {
        return $this->hasMany(ExamAttempt::class);
    }
}

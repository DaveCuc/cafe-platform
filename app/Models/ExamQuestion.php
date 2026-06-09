<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Modelo que representa una pregunta dentro de un examen.
 */
class ExamQuestion extends Model
{
    use HasUuids;

    protected $fillable = [
        'exam_id',
        'content',
        'type',
        'position'
    ];

    protected $casts = [
        'position' => 'integer',
    ];

    /**
     * Obtiene el examen al que pertenece esta pregunta.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    /**
     * Obtiene las opciones de respuesta formuladas para esta pregunta.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function options(): HasMany
    {
        return $this->hasMany(ExamOption::class, 'question_id');
    }
}

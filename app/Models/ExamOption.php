<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo que representa una opción de respuesta para una pregunta de examen.
 */
class ExamOption extends Model
{
    use HasUuids;

    protected $fillable = [
        'question_id',
        'content',
        'is_correct'
    ];

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    /**
     * Obtiene la pregunta a la cual pertenece esta opción.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(ExamQuestion::class);
    }
}

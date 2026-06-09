<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo que representa un intento de resolución de un examen por parte de un usuario.
 */
class ExamAttempt extends Model
{
    use HasUuids;

    protected $fillable = [
        'exam_id',
        'user_id',
        'score',
        'answers',
        'status'
    ];

    protected $casts = [
        'score' => 'float',
        'answers' => 'array',
    ];

    /**
     * Obtiene el examen asociado a este intento.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    /**
     * Obtiene el usuario que realizó este intento de examen.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

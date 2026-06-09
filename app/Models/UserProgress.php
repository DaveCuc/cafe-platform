<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo que registra el progreso (completado o no) de un usuario en un capítulo específico.
 */
class UserProgress extends Model
{
    use HasUuids;

    protected $table = 'user_progress';

    protected $fillable = [
        'user_id',
        'chapter_id',
        'is_completed'
    ];

    protected $casts = [
        'is_completed' => 'boolean',
    ];

    /**
     * Obtiene el capítulo cuyo progreso se está registrando.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }
}

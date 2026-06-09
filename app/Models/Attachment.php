<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo que representa un archivo adjunto (documento, recurso) asociado a un curso.
 */
class Attachment extends Model
{
    use HasUuids;

    protected $fillable = [
        'name',
        'url',
        'course_id'
    ];

    /**
     * Obtiene el curso al que pertenece este archivo adjunto.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}

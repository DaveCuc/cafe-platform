<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * Modelo que representa un capítulo o lección dentro de un curso.
 */
class Chapter extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'description',
        'video_url',
        'position',
        'is_published',
        'is_free',
        'course_id',
        'is_video_required',
        'image_url'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_free' => 'boolean',
        'is_video_required' => 'boolean',
        'position' => 'integer',
    ];

    /**
     * Obtiene el curso al que pertenece este capítulo.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Obtiene los datos de video asociados a este capítulo en Mux.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function muxData(): HasOne
    {
        return $this->hasOne(MuxData::class);
    }

    /**
     * Obtiene el historial de progreso de los usuarios para este capítulo.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function userProgress(): HasMany
    {
        return $this->hasMany(UserProgress::class);
    }
}

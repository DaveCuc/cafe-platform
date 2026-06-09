<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo que representa un evento organizado o promocionado en la plataforma.
 */
class Event extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'title',
        'short_description',
        'description',
        'location',
        'event_date',
        'event_time',
        'rsvp_link',
        'image_url',
        'cover_image_url',
        'is_published',
        'published_at',
        'topics',
        'hosts',
        'collaborators',
        'organizers',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'event_date' => 'date',
        'topics' => 'array',
        'hosts' => 'array',
        'collaborators' => 'array',
        'organizers' => 'array',
    ];

    /**
     * Obtiene el usuario (organizador/profesor) que creó este evento.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

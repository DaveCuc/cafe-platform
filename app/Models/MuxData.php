<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo que almacena la información de integración con Mux (plataforma de video) para un capítulo.
 */
class MuxData extends Model
{
    use HasUuids;

    protected $fillable = [
        'asset_id',
        'playback_id',
        'chapter_id'
    ];

    /**
     * Obtiene el capítulo asociado a esta información de video de Mux.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }
}

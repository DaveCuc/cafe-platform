<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Modelo que representa un municipio geográfico, asociado a una región.
 */
class Municipio extends Model
{
    use HasUuids;

    protected $fillable = ['region_id', 'name'];

    /**
     * Obtiene la región a la que pertenece este municipio.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    /**
     * Obtiene todos los comercios del directorio ubicados en este municipio.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function directorios(): HasMany
    {
        return $this->hasMany(Directorio::class);
    }
}

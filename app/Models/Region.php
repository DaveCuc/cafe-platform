<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Modelo que representa una región geográfica que agrupa varios municipios.
 */
class Region extends Model
{
    use HasUuids;

    protected $fillable = ['name'];

    /**
     * Obtiene todos los municipios que pertenecen a esta región.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function municipios(): HasMany
    {
        return $this->hasMany(Municipio::class);
    }

    /**
     * Obtiene todos los comercios del directorio registrados en esta región.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function directorios(): HasMany
    {
        return $this->hasMany(Directorio::class);
    }
}

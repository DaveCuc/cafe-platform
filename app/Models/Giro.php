<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * Modelo que representa el giro comercial o actividad económica de un negocio en el directorio.
 */
class Giro extends Model
{
    use HasUuids;

    protected $fillable = ['name'];

    /**
     * Obtiene todos los comercios del directorio que pertenecen a este giro.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function directorios(): BelongsToMany
    {
        return $this->belongsToMany(Directorio::class, 'directorio_giro');
    }
}

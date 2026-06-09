<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Modelo que representa una categoría para clasificar los cursos.
 */
class Category extends Model
{
    use HasUuids;

    protected $fillable = ['name'];

    /**
     * Obtiene todos los cursos asociados a esta categoría.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }
}

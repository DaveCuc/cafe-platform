<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo que representa la compra o inscripción de un usuario a un curso.
 */
class Purchase extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'course_id'
    ];

    /**
     * Obtiene el curso al cual se realizó esta compra o inscripción.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}

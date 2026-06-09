<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo que representa un certificado de finalización otorgado a un usuario por un curso.
 */
class Certificate extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'course_id',
        'issued_at'
    ];

    protected $casts = [
        'issued_at' => 'datetime',
    ];

    /**
     * Obtiene el usuario al que se le emitió este certificado.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Obtiene el curso asociado a la emisión de este certificado.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}

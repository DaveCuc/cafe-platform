<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo que representa un certificado, distintivo o documento legal asociado a un comercio del directorio.
 */
class DirectorioCertificate extends Model
{
    use HasUuids;

    protected $fillable = [
        'directorio_id',
        'name',
        'issued_at',
        'file_url',
    ];

    protected $casts = [
        'issued_at' => 'date',
    ];

    /**
     * Obtiene el comercio del directorio al que pertenece este certificado.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function directorio(): BelongsTo
    {
        return $this->belongsTo(Directorio::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function directorio(): BelongsTo
    {
        return $this->belongsTo(Directorio::class);
    }
}

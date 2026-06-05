<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Directorio extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'comercial_name',
        'giro',
        'region',
        'region_id',
        'municipio_id',
        'name',
        'descripcion',
        'descripcion_corta',
        'descripcion_larga',
        'activities',
        'website',
        'digital',
        'image_url',
        'is_published',
        'status',
        'address',
        'map_location',
        'phone',
        'email',
        'personal_name',
        'personal_cargo',
        'personal_phone',
        'personal_email',
        'gallery_images',
        'rejection_reason',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'status' => 'string',
        'activities' => 'array',
        'gallery_images' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function giros(): BelongsToMany
    {
        return $this->belongsToMany(Giro::class, 'directorio_giro');
    }

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class);
    }

    public function municipio(): BelongsTo
    {
        return $this->belongsTo(Municipio::class);
    }

    public function certificates(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(DirectorioCertificate::class)->orderBy('issued_at', 'desc');
    }
}

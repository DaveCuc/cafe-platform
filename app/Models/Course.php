<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasUuids;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'image_url',
        'price',
        'is_published',
        'category_id',
        'is_free'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_free' => 'boolean',
        'price' => 'float',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function chapters(): HasMany
    {
        return $this->hasMany(Chapter::class)->orderBy('position', 'asc');
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(Attachment::class)->orderBy('created_at', 'desc');
    }

    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class)->orderBy('position', 'asc');
    }

    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class);
    }
}

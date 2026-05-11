<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exam extends Model
{
    use HasUuids;

    protected $fillable = [
        'title',
        'description',
        'course_id',
        'position',
        'is_published',
        'attempts_allowed',
        'min_score'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'attempts_allowed' => 'integer',
        'min_score' => 'integer',
        'position' => 'integer',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(ExamQuestion::class)->orderBy('position', 'asc');
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(ExamAttempt::class);
    }
}

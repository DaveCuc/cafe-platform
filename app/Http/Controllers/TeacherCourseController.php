<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Category;
use App\Models\Attachment;
use App\Models\Chapter;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TeacherCourseController extends Controller
{
    public function edit(Course $course)
    {
        if ($course->user_id != Auth::id()) {
            return redirect()->route('dashboard');
        }

        $course->load(['chapters' => function ($query) {
            $query->orderBy('position', 'asc');
        }, 'exams' => function ($query) {
            $query->orderBy('position', 'asc');
        }, 'attachments' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }]);

        $categories = Category::orderBy('name', 'asc')->get();

        return Inertia::render('Dashboard/Teacher/Courses/Edit/Index', [
            'course' => $course,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Course $course)
    {
        if ($course->user_id != Auth::id()) abort(403);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0',
            'is_free' => 'nullable|boolean',
            'category_id' => 'nullable|uuid|exists:categories,id',
        ]);

        if (!empty($validated)) {
            $course->update($validated);
        }
        
        return back()->with('success', 'Curso actualizado');
    }

    public function publish(Course $course)
    {
        if ($course->user_id != Auth::id()) abort(403);
        
        $hasPublishedChapter = $course->chapters()->where('is_published', true)->exists();
        if (!$course->title || !$course->description || !$course->image_url || !$course->category_id || !$hasPublishedChapter) {
            return back()->withErrors(['error' => 'Faltan campos obligatorios']);
        }
        
        $course->update(['is_published' => true]);
        return back();
    }

    public function unpublish(Course $course)
    {
        if ($course->user_id != Auth::id()) abort(403);
        
        $course->update(['is_published' => false]);
        return back();
    }

    public function destroy(Course $course)
    {
        if ($course->user_id != Auth::id()) abort(403);
        
        if ($course->image_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $course->image_url));
        }
        foreach($course->attachments as $attachment) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $attachment->url));
        }
        
        $course->delete();
        return redirect()->route('teacher.courses');
    }

    public function uploadImage(Request $request, Course $course)
    {
        if ($course->user_id != Auth::id()) abort(403);
        
        $request->validate(['image' => 'required|image']);
        
        if ($course->image_url) {
             Storage::disk('public')->delete(str_replace('/storage/', '', $course->image_url));
        }
        
        $path = $request->file('image')->store('courses', 'public');
        $course->update(['image_url' => '/storage/' . $path]);
        
        return back();
    }

    public function uploadAttachment(Request $request, Course $course)
    {
             if ($course->user_id != Auth::id()) abort(403);
         
         $request->validate(['attachment' => 'required|file']);
         
         $path = $request->file('attachment')->store('attachments', 'public');
         
         $course->attachments()->create([
             'name' => $request->name ?? $request->file('attachment')->getClientOriginalName(),
             'url' => '/storage/' . $path
         ]);
         
         return back();
    }
    
    public function deleteAttachment(Course $course, Attachment $attachment)
    {
        if ($course->user_id != Auth::id()) abort(403);

        if ($attachment->course_id !== $course->id) {
            abort(404);
        }
        
        Storage::disk('public')->delete(str_replace('/storage/', '', $attachment->url));
        $attachment->delete();
        
        return back();
    }

    public function createChapter(Request $request, Course $course)
    {
        if ($course->user_id != Auth::id()) abort(403);
        
        $request->validate(['title' => 'required|string']);
        
        $lastChapterPosition = $course->chapters()->max('position') ?? 0;
        $lastExamPosition = $course->exams()->max('position') ?? 0;
        $newPosition = max($lastChapterPosition, $lastExamPosition) + 1;
        
        $course->chapters()->create([
            'title' => $request->title,
            'position' => $newPosition,
        ]);
        
        return back();
    }

    public function reorderContent(Request $request, Course $course)
    {
        if ($course->user_id != Auth::id()) abort(403);

        $validated = $request->validate([
            'list' => 'required|array',
            'list.*.id' => 'required|uuid',
            'list.*.position' => 'required|integer|min:1',
            'list.*.type' => 'required|string|in:chapter,exam',
        ]);

        foreach($validated['list'] as $item) {
            if ($item['type'] === 'chapter') {
                \App\Models\Chapter::where('id', $item['id'])->where('course_id', $course->id)->update(['position' => $item['position']]);
            } elseif ($item['type'] === 'exam') {
                \App\Models\Exam::where('id', $item['id'])->where('course_id', $course->id)->update(['position' => $item['position']]);
            }
        }
        
        return back();
    }

    public function reorderChapters(Request $request, Course $course)
    {
        if ($course->user_id != Auth::id()) abort(403);

        $validated = $request->validate([
            'list' => 'required|array',
            'list.*.id' => 'required|uuid',
            'list.*.position' => 'required|integer|min:1',
        ]);

        $chapterIds = collect($validated['list'])->pluck('id');
        $ownedCount = $course->chapters()->whereIn('id', $chapterIds)->count();

        if ($ownedCount !== $chapterIds->count()) {
            abort(403);
        }

        foreach($validated['list'] as $item) {
            Chapter::where('id', $item['id'])->update(['position' => $item['position']]);
        }
        
        return back();
    }
}

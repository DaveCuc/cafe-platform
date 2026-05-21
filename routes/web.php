<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DirectoryTradeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// --- DOMINIO 1: PÁGINAS PÚBLICAS (HOME/LANDING) ---

Route::get('/', function () {
    $recentEvents = \App\Models\Event::where('is_published', true)
        ->orderBy('published_at', 'desc')
        ->take(3)
        ->get();

    return Inertia::render('LandingPage/Inicio', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'recentEvents' => $recentEvents,
    ]);
})->name('home');

Route::get('/mapa', function () {
    return Inertia::render('LandingPage/Mapa');
})->name('mapa');

Route::get('/directorio', function () {
    return Inertia::render('LandingPage/Directorio');
})->name('directorio');

Route::get('/cursos', function () {
    return Inertia::render('LandingPage/Cursos');
})->name('cursos.index');

Route::get('/negocio/{trade}', function (\App\Models\Directorio $trade) {
    $trade->load(['giros', 'region', 'municipio']);
    return Inertia::render('LandingPage/Negocio/index', [
        'trade' => $trade
    ]);
})->name('negocio');

Route::get('/articulos/{article}', function (\App\Models\Article $article) {
    if (!$article->is_published) {
        abort(404);
    }
    
    $article->load(['user', 'category']);
    
    $recentArticles = \App\Models\Article::where('is_published', true)
        ->where('id', '!=', $article->id)
        ->with(['user', 'category'])
        ->orderBy('published_at', 'desc')
        ->take(4)
        ->get();
        
    return Inertia::render('LandingPage/Articulos/Index', [
        'article' => $article,
        'recentArticles' => $recentArticles
    ]);
})->name('articulos.show');

// Eventos (Public)
Route::get('/eventos', [\App\Http\Controllers\EventController::class, 'index'])->name('eventos.index');
Route::get('/eventos/{evento}', [\App\Http\Controllers\EventController::class, 'show'])->name('eventos.show');


// --- API ENDPOINT DE MIGRACIÓN PARA DIRECTORIO ---
Route::get('/api/directorio', function (\Illuminate\Http\Request $request) {
    $query = \App\Models\Directorio::query()
        ->with('giros')
        ->where('status', 'approved');

    if ($request->filled('giro')) {
        $query->where(function ($giroQuery) use ($request) {
            $giroQuery->where('giro', $request->giro)
                ->orWhereHas('giros', function ($relatedQuery) use ($request) {
                    $relatedQuery->where('name', $request->giro);
                });
        });
    }

    if ($request->filled('region')) {
        $query->where('region', $request->region);
    }

    return response()->json($query->take(50)->get());
});

// --- DOMINIO PROTEGIDO (USUARIOS LOGUEADOS) ---

Route::get('/dashboard', function () {
    $user = Auth::user();
    
    // Obtener los cursos comprados por el usuario
    $purchasedCourseIds = \App\Models\Purchase::where('user_id', $user->id)
        ->pluck('course_id');
        
    $courses = \App\Models\Course::whereIn('id', $purchasedCourseIds)
        ->with(['category', 'chapters' => function($q) {
            $q->where('is_published', true)->orderBy('position', 'asc');
        }])
        ->get();
        
    $completedCourses = [];
    $coursesInProgress = [];
    
    foreach ($courses as $course) {
        $publishedChapterIds = $course->chapters->pluck('id');
        
        $validCompletedChapters = \App\Models\UserProgress::where('user_id', $user->id)
            ->whereIn('chapter_id', $publishedChapterIds)
            ->where('is_completed', true)
            ->count();
            
        $progressPercentage = count($publishedChapterIds) > 0 
            ? ($validCompletedChapters / count($publishedChapterIds)) * 100 
            : 0;
            
        $courseData = [
            'id' => $course->id,
            'title' => $course->title,
            'imageUrl' => $course->image_url,
            'price' => $course->price,
            'progress' => $progressPercentage,
            'category' => $course->category,
            'chapters' => $course->chapters
        ];
        
        if ($progressPercentage === 100) {
            $completedCourses[] = $courseData;
        } else {
            $coursesInProgress[] = $courseData;
        }
    }

    return Inertia::render('Dashboard/Index', [
        'completedCourses' => $completedCourses,
        'coursesInProgress' => $coursesInProgress
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/trade', [DirectoryTradeController::class, 'index'])->name('trade');

    Route::get('/directory/trades', [DirectoryTradeController::class, 'index'])->name('directory.trades.index');
    Route::get('/directory/trades/create', [DirectoryTradeController::class, 'create'])->name('directory.trades.create');
    Route::post('/directory/trades', [DirectoryTradeController::class, 'store'])->name('directory.trades.store');
    Route::get('/directory/trades/{trade}/edit', [DirectoryTradeController::class, 'edit'])->name('directory.trades.edit');
    Route::patch('/directory/trades/{trade}', [DirectoryTradeController::class, 'update'])->name('directory.trades.update');
    Route::patch('/directory/trades/{trade}/submit', [DirectoryTradeController::class, 'submitForReview'])->name('directory.trades.submit');
    Route::patch('/directory/trades/{trade}/revert-draft', [DirectoryTradeController::class, 'revertToDraft'])->name('directory.trades.revert-draft');
    Route::delete('/directory/trades/{trade}', [DirectoryTradeController::class, 'destroy'])->name('directory.trades.destroy');
    Route::patch('/directory/trades/{trade}/publish', [DirectoryTradeController::class, 'publish'])->name('directory.trades.publish');
    Route::patch('/directory/trades/{trade}/unpublish', [DirectoryTradeController::class, 'unpublish'])->name('directory.trades.unpublish');
    Route::post('/directory/trades/{trade}/image', [DirectoryTradeController::class, 'uploadImage'])->name('directory.trades.image');
    Route::post('/directory/trades/{trade}/gallery-image', [DirectoryTradeController::class, 'uploadGalleryImage'])->name('directory.trades.gallery.image');
    Route::delete('/directory/trades/{trade}/gallery-image', [DirectoryTradeController::class, 'deleteGalleryImage'])->name('directory.trades.gallery.image.delete');

    Route::get('/teacher/solicitudes', [DirectoryTradeController::class, 'requestsIndex'])->name('teacher.requests.index');
    Route::get('/teacher/solicitudes/{trade}', [DirectoryTradeController::class, 'requestShow'])->name('teacher.requests.show');
    Route::patch('/teacher/solicitudes/{trade}/approve', [DirectoryTradeController::class, 'approve'])->name('teacher.requests.approve');
    Route::patch('/teacher/solicitudes/{trade}/reject', [DirectoryTradeController::class, 'reject'])->name('teacher.requests.reject');

    Route::get('/search', function (\Illuminate\Http\Request $request) {
        $categories = \App\Models\Category::orderBy('name')->get();
        
        $courses = \App\Models\Course::with(['category', 'chapters'])
            ->where('is_published', true)
            ->when($request->title, function($query, $title) {
                $query->where('title', 'like', "%{$title}%");
            })
            ->when($request->categoryId, function($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->get()
            ->map(function($course) {
                return [
                    'id' => $course->id,
                    'title' => $course->title,
                    'imageUrl' => $course->image_url,
                    'price' => $course->price,
                    'progress' => null,
                    'category' => $course->category,
                    'chapters' => $course->chapters,
                ];
            });

        return Inertia::render('Dashboard/Search/Index', [
            'categories' => $categories,
            'courses' => $courses,
            'filters' => $request->only(['title', 'categoryId'])
        ]);
    })->name('search');

    Route::get('/discover', function (\Illuminate\Http\Request $request) {
        $categories = \App\Models\Category::orderBy('name')->get();
        
        $isEvents = $request->categoryId === 'eventos';
        $articles = [];
        $events = [];

        if ($isEvents) {
            $events = \App\Models\Event::where('is_published', true)
                ->when($request->title, function($query, $title) {
                    $query->where('title', 'like', "%{$title}%");
                })
                ->orderBy('published_at', 'desc')
                ->get();
        } else {
            $articles = \App\Models\Article::with(['category', 'user'])
                ->where('is_published', true)
                ->when($request->title, function($query, $title) {
                    $query->where('title', 'like', "%{$title}%");
                })
                ->when($request->categoryId, function($query, $categoryId) {
                    $query->where('category_id', $categoryId);
                })
                ->orderBy('published_at', 'desc')
                ->get();
        }

        return Inertia::render('Dashboard/Discover/Index', [
            'categories' => $categories,
            'articles' => $articles,
            'events' => $events,
            'filters' => $request->only(['title', 'categoryId'])
        ]);
    })->name('discover');

    Route::get('/courses/{course}', function (\App\Models\Course $course) {
        $userId = Auth::id();
        
        $course->load(['category', 'chapters' => function($q) use ($userId) {
            $q->where('is_published', true)->orderBy('position', 'asc')->with(['userProgress' => function($query) use ($userId) {
                $query->where('user_id', $userId);
            }]);
        }, 'exams' => function($q) use ($userId) {
            $q->where('is_published', true)->orderBy('position', 'asc')->with(['attempts' => function($query) use ($userId) {
                $query->where('user_id', $userId);
            }]);
        }]);

        $purchase = \App\Models\Purchase::where('user_id', $userId)->where('course_id', $course->id)->first();
        if ((string) $course->user_id === (string) $userId) {
            $purchase = true;
        }

        $firstChapter = $course->chapters()->where('is_published', true)->orderBy('position', 'asc')->first();

        $progressCount = $course->getProgressPercentageForUser($userId);

        return Inertia::render('Courses/Show/Cover', [
            'course' => $course,
            'purchase' => $purchase,
            'firstChapter' => $firstChapter,
            'progressCount' => round($progressCount),
        ]);
    })->name('courses.show');

    Route::post('/courses/{course}/checkout', [\App\Http\Controllers\CourseController::class, 'checkout'])->name('courses.checkout');

    Route::get('/courses/{course}/chapters/{chapter}', function (\App\Models\Course $course, \App\Models\Chapter $chapter) {
        if ($chapter->course_id !== $course->id) {
            abort(404);
        }

        if (!$chapter->is_published) {
            return redirect()->route('dashboard');
        }

        $userId = Auth::id();
        
        $course->load(['chapters' => function($q) use ($userId) {
            $q->where('is_published', true)->orderBy('position', 'asc')->with(['userProgress' => function($query) use ($userId) {
                $query->where('user_id', $userId);
            }]);
        }, 'exams' => function($q) use ($userId) {
            $q->where('is_published', true)->orderBy('position', 'asc')->with(['attempts' => function($query) use ($userId) {
                $query->where('user_id', $userId);
            }]);
        }]);

        $purchase = \App\Models\Purchase::where('user_id', $userId)->where('course_id', $course->id)->first();
        if ((string) $course->user_id === (string) $userId) {
            $purchase = true;
        }

        $nextChapter = null;
        $attachments = [];
        if ($purchase || $chapter->is_free) {
            $nextChapter = $course->chapters()
                ->where('is_published', true)
                ->where('position', '>', $chapter->position)
                ->orderBy('position', 'asc')
                ->first();
            $attachments = $course->attachments()->orderBy('created_at', 'desc')->get();
        }

        $userProgress = $chapter->userProgress()->where('user_id', $userId)->first();

        $progressCount = $course->getProgressPercentageForUser($userId);

        return Inertia::render('Courses/Show/Index', [
            'course' => $course,
            'chapter' => $chapter,
            'attachments' => $attachments,
            'nextChapter' => $nextChapter,
            'userProgress' => $userProgress,
            'purchase' => $purchase,
            'isLocked' => !$chapter->is_free && !$purchase,
            'progressCount' => round($progressCount)
        ]);
    })->name('courses.chapters.show');

    // Student Exams
    Route::get('/courses/{course}/exams/{exam}', [\App\Http\Controllers\ExamController::class, 'show'])->name('courses.exams.show');
    Route::get('/courses/{course}/exams/{exam}/take', [\App\Http\Controllers\ExamController::class, 'take'])->name('courses.exams.take');
    Route::post('/courses/{course}/exams/{exam}/take', [\App\Http\Controllers\ExamController::class, 'submit'])->name('courses.exams.submit');

    // Certificates
    Route::get('/courses/{course}/certificate', [\App\Http\Controllers\CertificateController::class, 'download'])->name('courses.certificate');

    Route::put('/courses/{course}/chapters/{chapter}/progress', function (\Illuminate\Http\Request $request, \App\Models\Course $course, \App\Models\Chapter $chapter) {
        if ($chapter->course_id !== $course->id) {
            abort(404);
        }

        if (!$chapter->is_published) {
            abort(403);
        }

        $userId = Auth::id();

        $purchase = \App\Models\Purchase::where('user_id', $userId)
            ->where('course_id', $course->id)
            ->exists();

        if ((string) $course->user_id === (string) $userId) {
            $purchase = true;
        }

        if (!$chapter->is_free && !$purchase) {
            abort(403);
        }

        \App\Models\UserProgress::updateOrCreate(
            ['user_id' => $userId, 'chapter_id' => $chapter->id],
            ['is_completed' => $request->boolean('isCompleted')]
        );
        return back();
    });

    Route::get('/teacher/courses', function () {
        $courses = \App\Models\Course::where('user_id', Auth::id())->orderBy('created_at', 'desc')->get();
        return Inertia::render('Dashboard/Teacher/Courses/Index', ['courses' => $courses]);
    })->name('teacher.courses');

    Route::get('/teacher/create', function () {
        return Inertia::render('Dashboard/Teacher/Create/Index');
    })->name('teacher.courses.create');

    Route::post('/teacher/courses', function (\Illuminate\Http\Request $request) {
        $request->validate(['title' => 'required|string|max:255']);
        $course = \App\Models\Course::create([
            'title' => $request->title,
            'user_id' => Auth::id(),
        ]);
        return redirect()->route('teacher.courses.edit', $course->id);
    });

    Route::get('/teacher/courses/{course}', [\App\Http\Controllers\TeacherCourseController::class, 'edit'])->name('teacher.courses.edit');
    Route::patch('/teacher/courses/{course}', [\App\Http\Controllers\TeacherCourseController::class, 'update'])->name('teacher.courses.update');
    Route::delete('/teacher/courses/{course}', [\App\Http\Controllers\TeacherCourseController::class, 'destroy'])->name('teacher.courses.destroy');
    Route::patch('/teacher/courses/{course}/publish', [\App\Http\Controllers\TeacherCourseController::class, 'publish'])->name('teacher.courses.publish');
    Route::patch('/teacher/courses/{course}/unpublish', [\App\Http\Controllers\TeacherCourseController::class, 'unpublish'])->name('teacher.courses.unpublish');
    
    // Multimedia y capítulos directos:
    Route::post('/teacher/courses/{course}/image', [\App\Http\Controllers\TeacherCourseController::class, 'uploadImage']);
    Route::post('/teacher/courses/{course}/attachments', [\App\Http\Controllers\TeacherCourseController::class, 'uploadAttachment']);
    Route::delete('/teacher/courses/{course}/attachments/{attachment}', [\App\Http\Controllers\TeacherCourseController::class, 'deleteAttachment']);
    Route::post('/teacher/courses/{course}/chapters', [\App\Http\Controllers\TeacherCourseController::class, 'createChapter']);
    Route::put('/teacher/courses/{course}/chapters/reorder', [\App\Http\Controllers\TeacherCourseController::class, 'reorderChapters']);
    Route::put('/teacher/courses/{course}/content/reorder', [\App\Http\Controllers\TeacherCourseController::class, 'reorderContent'])->name('teacher.courses.content.reorder');

    // Teacher Exams
    Route::post('/teacher/courses/{course}/exams', [\App\Http\Controllers\TeacherExamController::class, 'store'])->name('teacher.exams.store');
    Route::put('/teacher/courses/{course}/exams/reorder', [\App\Http\Controllers\TeacherExamController::class, 'reorder'])->name('teacher.exams.reorder');
    Route::get('/teacher/courses/{course}/exams/{exam}', [\App\Http\Controllers\TeacherExamController::class, 'edit'])->name('teacher.exams.edit');
    Route::patch('/teacher/courses/{course}/exams/{exam}', [\App\Http\Controllers\TeacherExamController::class, 'update'])->name('teacher.exams.update');
    Route::delete('/teacher/courses/{course}/exams/{exam}', [\App\Http\Controllers\TeacherExamController::class, 'destroy'])->name('teacher.exams.destroy');
    Route::patch('/teacher/courses/{course}/exams/{exam}/publish', [\App\Http\Controllers\TeacherExamController::class, 'publish'])->name('teacher.exams.publish');
    Route::patch('/teacher/courses/{course}/exams/{exam}/unpublish', [\App\Http\Controllers\TeacherExamController::class, 'unpublish'])->name('teacher.exams.unpublish');

    Route::post('/teacher/courses/{course}/exams/{exam}/questions', [\App\Http\Controllers\TeacherExamController::class, 'storeQuestion'])->name('teacher.exams.questions.store');
    Route::patch('/teacher/courses/{course}/exams/{exam}/questions/{question}', [\App\Http\Controllers\TeacherExamController::class, 'updateQuestion'])->name('teacher.exams.questions.update');
    Route::delete('/teacher/courses/{course}/exams/{exam}/questions/{question}', [\App\Http\Controllers\TeacherExamController::class, 'destroyQuestion'])->name('teacher.exams.questions.destroy');
    Route::put('/teacher/courses/{course}/exams/{exam}/questions/reorder', [\App\Http\Controllers\TeacherExamController::class, 'reorderQuestions'])->name('teacher.exams.questions.reorder');
    
    Route::post('/teacher/courses/{course}/exams/{exam}/questions/{question}/options', [\App\Http\Controllers\TeacherExamController::class, 'storeOption'])->name('teacher.exams.options.store');
    Route::patch('/teacher/courses/{course}/exams/{exam}/questions/{question}/options/{option}', [\App\Http\Controllers\TeacherExamController::class, 'updateOption'])->name('teacher.exams.options.update');
    Route::delete('/teacher/courses/{course}/exams/{exam}/questions/{question}/options/{option}', [\App\Http\Controllers\TeacherExamController::class, 'destroyOption'])->name('teacher.exams.options.destroy');

    // Teacher Articles
    Route::get('/teacher/articles', [\App\Http\Controllers\TeacherArticleController::class, 'index'])->name('teacher.articles.index');
    Route::get('/teacher/articles/create', function () {
        return Inertia::render('Dashboard/Teacher/Articles/Create/Index');
    })->name('teacher.articles.create');
    Route::post('/teacher/articles', [\App\Http\Controllers\TeacherArticleController::class, 'store'])->name('teacher.articles.store');
    Route::get('/teacher/articles/{article}', [\App\Http\Controllers\TeacherArticleController::class, 'edit'])->name('teacher.articles.edit');
    Route::patch('/teacher/articles/{article}', [\App\Http\Controllers\TeacherArticleController::class, 'update'])->name('teacher.articles.update');
    Route::delete('/teacher/articles/{article}', [\App\Http\Controllers\TeacherArticleController::class, 'destroy'])->name('teacher.articles.destroy');
    Route::patch('/teacher/articles/{article}/publish', [\App\Http\Controllers\TeacherArticleController::class, 'publish'])->name('teacher.articles.publish');
    Route::patch('/teacher/articles/{article}/unpublish', [\App\Http\Controllers\TeacherArticleController::class, 'unpublish'])->name('teacher.articles.unpublish');
    Route::post('/teacher/articles/{article}/image', [\App\Http\Controllers\TeacherArticleController::class, 'uploadImage'])->name('teacher.articles.image');
    Route::post('/teacher/articles/{article}/card-image', [\App\Http\Controllers\TeacherArticleController::class, 'uploadCardImage'])->name('teacher.articles.card-image');

    // Teacher Events
    Route::get('/teacher/events', [\App\Http\Controllers\TeacherEventController::class, 'index'])->name('teacher.events.index');
    Route::get('/teacher/events/create', function () {
        return Inertia::render('Dashboard/Teacher/Events/Create/Index');
    })->name('teacher.events.create');
    Route::post('/teacher/events', [\App\Http\Controllers\TeacherEventController::class, 'store'])->name('teacher.events.store');
    Route::get('/teacher/events/{event}', [\App\Http\Controllers\TeacherEventController::class, 'edit'])->name('teacher.events.edit');
    Route::patch('/teacher/events/{event}', [\App\Http\Controllers\TeacherEventController::class, 'update'])->name('teacher.events.update');
    Route::delete('/teacher/events/{event}', [\App\Http\Controllers\TeacherEventController::class, 'destroy'])->name('teacher.events.destroy');
    Route::patch('/teacher/events/{event}/publish', [\App\Http\Controllers\TeacherEventController::class, 'publish'])->name('teacher.events.publish');
    Route::patch('/teacher/events/{event}/unpublish', [\App\Http\Controllers\TeacherEventController::class, 'unpublish'])->name('teacher.events.unpublish');
    Route::post('/teacher/events/{event}/image', [\App\Http\Controllers\TeacherEventController::class, 'uploadImage'])->name('teacher.events.image');
    Route::post('/teacher/events/{event}/cover-image', [\App\Http\Controllers\TeacherEventController::class, 'uploadCoverImage'])->name('teacher.events.cover-image');
    Route::post('/teacher/events/{event}/person-image', [\App\Http\Controllers\TeacherEventController::class, 'uploadPersonImage'])->name('teacher.events.person-image');

    // Capítulos individuales (Sub-Editor)
    Route::get('/teacher/courses/{course}/chapters/{chapter}', [\App\Http\Controllers\TeacherChapterController::class, 'edit'])->name('teacher.courses.chapters.edit');
    Route::patch('/teacher/courses/{course}/chapters/{chapter}', [\App\Http\Controllers\TeacherChapterController::class, 'update']);
    Route::delete('/teacher/courses/{course}/chapters/{chapter}', [\App\Http\Controllers\TeacherChapterController::class, 'destroy']);
    Route::patch('/teacher/courses/{course}/chapters/{chapter}/publish', [\App\Http\Controllers\TeacherChapterController::class, 'publish']);
    Route::patch('/teacher/courses/{course}/chapters/{chapter}/unpublish', [\App\Http\Controllers\TeacherChapterController::class, 'unpublish']);
    Route::post('/teacher/courses/{course}/chapters/{chapter}/video', [\App\Http\Controllers\TeacherChapterController::class, 'uploadVideo']);
    Route::post('/teacher/courses/{course}/chapters/{chapter}/image', [\App\Http\Controllers\TeacherChapterController::class, 'uploadImage']);

    Route::get('/teacher/analytics', function () {
        $userId = Auth::id();

        $purchases = \App\Models\Purchase::whereHas('course', function($query) use ($userId) {
            $query->where('user_id', $userId);
        })->with('course')->get();

        $groupedEarnings = [];
        foreach ($purchases as $purchase) {
            $courseTitle = $purchase->course->title;
            if (!isset($groupedEarnings[$courseTitle])) {
                $groupedEarnings[$courseTitle] = 0;
            }
            $groupedEarnings[$courseTitle] += $purchase->course->price ?? 0;
        }

        $data = [];
        $totalRevenue = 0;
        foreach ($groupedEarnings as $title => $total) {
            $data[] = ['name' => $title, 'total' => $total];
            $totalRevenue += $total;
        }
        $totalSales = count($purchases);

        return Inertia::render('Dashboard/Teacher/Analytics/Index', [
            'data' => $data,
            'totalRevenue' => $totalRevenue,
            'totalSales' => $totalSales,
        ]);
    })->name('teacher.analytics');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});





// require __DIR__.'/auth.php';




// Endpoint abierto exento de CSRF (cross-site request forgery) para recibir pagos de Stripe
Route::post('/webhook', function(\Illuminate\Http\Request $request) {
    \Stripe\Stripe::setApiKey(env('STRIPE_API_KEY'));
    $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');
    
    $payload = $request->getContent();
    $sig_header = $request->header('Stripe-Signature');
    $event = null;
    
    try {
        if ($endpoint_secret) {
            $event = \Stripe\Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
        } else {
            // Fallback para testing si no hay endpoint_secret definido localmente.
            $event = \Stripe\Event::constructFrom(json_decode($payload, true));
        }
    } catch(\UnexpectedValueException $e) {   
        return response()->json(['error' => 'Invalid payload'], 400);
    } catch(\Stripe\Exception\SignatureVerificationException $e) {  
        return response()->json(['error' => 'Invalid signature'], 400);
    }
    
    // Accionar con base al tipo de evento
    if ($event->type == 'checkout.session.completed') {
        $session = $event->data->object;
        
        $courseId = $session->metadata->courseId ?? null;
        $userId = $session->metadata->userId ?? null;
        
        if ($courseId && $userId) {
            $course = \App\Models\Course::find($courseId);
            $user = \App\Models\User::find($userId);

            if ($course && $user && (string) $course->user_id !== (string) $user->id) {
                \App\Models\Purchase::firstOrCreate([
                    'course_id' => $courseId,
                    'user_id' => $userId,
                ]);
            }
        }
    }

    
    
    return response('Webhook Handled By Laravel', 200);
});


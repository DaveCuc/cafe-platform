<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Chapter;
use App\Models\Purchase;
use App\Models\UserProgress;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    public function show(Course $course)
    {
        $firstChapter = $course->chapters()->where('is_published', true)->orderBy('position', 'asc')->first();
        
        if (!$firstChapter) {
            return redirect()->route('dashboard')->withErrors(['error' => 'Este curso no tiene capítulos publicados']);
        }
        
        return redirect()->route('courses.chapter', [$course->id, $firstChapter->id]);
    }

    public function chapter(Course $course, Chapter $chapter)
    {
        $user = Auth::user();
        
        // Validar que el capítulo está publicado y pertenece al curso
        if (!$chapter->is_published || $chapter->course_id !== $course->id) {
            return redirect()->route('dashboard');
        }
        
        // Cargar todo lo que necesita el Layout Estudiantil y el Sidebar
        $course->load(['chapters' => function($query) use ($user) {
            $query->where('is_published', true)
                  ->orderBy('position', 'asc')
                  ->with(['userProgress' => function($q) use ($user) {
                      $q->where('user_id', $user->id);
                  }]);
        }, 'exams' => function($q) {
            $q->where('is_published', true)->orderBy('position', 'asc');
        }]);

        $purchase = Purchase::where('user_id', $user->id)->where('course_id', $course->id)->first();
        
        // Si el usuario es dueño del curso, le damos acceso total falseando su estado "purchase"
        if ((string) $course->user_id === (string) $user->id) {
            $purchase = true;
        }
        
        // Cálculo del Porcentaje de Progreso
        $publishedChapterIds = $course->chapters->pluck('id');
        $validCompletedChapters = UserProgress::where('user_id', $user->id)
            ->whereIn('chapter_id', $publishedChapterIds)
            ->where('is_completed', true)
            ->count();
            
        $progressCount = count($publishedChapterIds) > 0 ? ($validCompletedChapters / count($publishedChapterIds)) * 100 : 0;
        
        // Datos específicos del Capítulo seleccionado
        $attachments = [];
        $nextChapter = null;
        
        if ($purchase || $chapter->is_free) {
            $attachments = $course->attachments()->orderBy('created_at', 'desc')->get();
            $nextChapter = $course->chapters()
                ->where('is_published', true)
                ->where('position', '>', $chapter->position)
                ->orderBy('position', 'asc')
                ->first();
        }

        $userProgress = UserProgress::where('user_id', $user->id)->where('chapter_id', $chapter->id)->first();
        
        return Inertia::render('Course/Chapter/Index', [
            'course' => $course,
            'chapter' => $chapter,
            'purchase' => $purchase,
            'progressCount' => round($progressCount),
            'attachments' => $attachments,
            'nextChapter' => $nextChapter,
            'userProgress' => $userProgress
        ]);
    }

    public function checkout(Request $request, Course $course)
    {
        $user = Auth::user();

        if ((string) $course->user_id === (string) $user->id) {
            return back()->withErrors(['error' => 'No puedes comprar tu propio curso']);
        }

        if (!$course->is_published) {
            return back()->withErrors(['error' => 'Este curso no esta disponible para compra']);
        }

        if ($course->is_free) {
            Purchase::firstOrCreate([
                'user_id' => $user->id,
                'course_id' => $course->id
            ]);
            return redirect()->back();
        }

        if (is_null($course->price) || $course->price <= 0) {
            return back()->withErrors(['error' => 'Este curso no tiene un precio valido']);
        }

        // Validar si ya lo compró
        $purchase = Purchase::where('user_id', $user->id)->where('course_id', $course->id)->exists();
        if ($purchase) {
            return back()->withErrors(['error' => 'Ya compraste este curso']);
        }

        $stripeApiKey = env('STRIPE_API_KEY');
        if (empty($stripeApiKey)) {
            return back()->withErrors(['error' => 'No se pudo iniciar el pago. Intenta mas tarde']);
        }

        \Stripe\Stripe::setApiKey($stripeApiKey);

        // Obtener o crear Customer
        $stripeCustomer = \App\Models\StripeCustomer::where('user_id', $user->id)->first();
        if (!$stripeCustomer) {
            $customer = \Stripe\Customer::create([
                'email' => $user->email,
            ]);
            $stripeCustomer = \App\Models\StripeCustomer::create([
                'user_id' => $user->id,
                'stripe_customer_id' => $customer->id,
            ]);
        }

        try {
            $session = \Stripe\Checkout\Session::create([
                'customer' => $stripeCustomer->stripe_customer_id,
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'mxn',
                        'product_data' => [
                            'name' => $course->title,
                            'description' => strip_tags($course->description ?? ''),
                        ],
                        'unit_amount' => round($course->price * 100),
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('courses.show', $course->id) . '?success=1',
                'cancel_url' => route('courses.show', $course->id) . '?canceled=1',
                'metadata' => [
                    'courseId' => $course->id,
                    'userId' => $user->id,
                ],
            ]);
        } catch (\Stripe\Exception\ApiErrorException $e) {
            return back()->withErrors(['error' => 'No se pudo iniciar el pago. Intenta mas tarde']);
        }

        return \Inertia\Inertia::location($session->url);
    }

    public function progress(Request $request, Course $course, Chapter $chapter)
    {
        if ($chapter->course_id !== $course->id) {
            abort(404);
        }

        $user = Auth::user();
        $purchase = Purchase::where('user_id', $user->id)->where('course_id', $course->id)->exists();

        if ((string) $course->user_id === (string) $user->id) {
            $purchase = true;
        }

        if (!$chapter->is_free && !$purchase) {
            abort(403);
        }

        UserProgress::updateOrCreate(
            ['user_id' => $user->id, 'chapter_id' => $chapter->id],
            ['is_completed' => $request->boolean('isCompleted')]
        );

        return back();
    }
}

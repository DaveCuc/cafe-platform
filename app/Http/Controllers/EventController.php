<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;

/**
 * Controlador para la visualización pública de eventos.
 */
class EventController extends Controller
{
    /**
     * Muestra la lista de eventos publicados en la página de inicio.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $events = Event::where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('LandingPage/Eventos/Index', [
            'events' => $events
        ]);
    }

    /**
     * Muestra los detalles de un evento específico.
     *
     * @param Event $evento El evento que se va a mostrar.
     * @return \Inertia\Response
     */
    public function show(Event $evento)
    {
        if (!$evento->is_published) {
            abort(404);
        }

        return Inertia::render('LandingPage/Eventos/Show', [
            'event' => $evento->load('user')
        ]);
    }
}

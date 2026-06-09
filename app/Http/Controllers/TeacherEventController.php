<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

/**
 * Controlador para la gestión de eventos por parte del profesor.
 */
class TeacherEventController extends Controller
{
    /**
     * Muestra la lista de eventos creados por el profesor.
     */
    public function index()
    {
        $events = Event::where('user_id', Auth::id())->orderBy('created_at', 'desc')->get();
        return Inertia::render('Dashboard/Teacher/Events/Index', ['events' => $events]);
    }

    /**
     * Crea un nuevo evento en estado borrador.
     */
    public function store(Request $request)
    {
        $request->validate(['title' => 'required|string|max:255']);
        $event = Event::create([
            'title' => $request->title,
            'user_id' => Auth::id(),
        ]);
        return redirect()->route('teacher.events.edit', $event->id);
    }

    /**
     * Muestra la vista para editar un evento específico.
     */
    public function edit(Event $event)
    {
        if ($event->user_id != Auth::id()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Dashboard/Teacher/Events/Edit/Index', [
            'event' => $event->load('user'),
        ]);
    }

    /**
     * Actualiza la información de un evento.
     */
    public function update(Request $request, Event $event)
    {
        if ($event->user_id != Auth::id()) abort(403);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'event_date' => 'nullable|date',
            'event_time' => 'nullable|string|max:255',
            'rsvp_link' => 'nullable|url|max:255',
            'topics' => 'nullable|array',
            'hosts' => 'nullable|array',
            'collaborators' => 'nullable|array',
            'organizers' => 'nullable|array',
        ]);

        if (!empty($validated)) {
            $event->update($validated);
        }
        
        return back()->with('success', 'Evento actualizado');
    }

    /**
     * Publica un evento si cumple con los campos obligatorios.
     */
    public function publish(Event $event)
    {
        if ($event->user_id != Auth::id()) abort(403);
        
        if (!$event->title || !$event->short_description || !$event->image_url || !$event->cover_image_url || !$event->description || !$event->event_date) {
            return back()->withErrors(['error' => 'Faltan campos obligatorios']);
        }
        
        $event->update([
            'is_published' => true,
            'published_at' => now(),
        ]);
        return back();
    }

    /**
     * Oculta un evento regresándolo a estado borrador.
     */
    public function unpublish(Event $event)
    {
        if ($event->user_id != Auth::id()) abort(403);
        
        $event->update([
            'is_published' => false,
            'published_at' => null,
        ]);
        return back();
    }

    /**
     * Elimina un evento y sus imágenes de portada principales asociadas.
     */
    public function destroy(Event $event)
    {
        if ($event->user_id != Auth::id()) abort(403);
        
        if ($event->image_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $event->image_url));
        }
        if ($event->cover_image_url) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $event->cover_image_url));
        }
        
        // Could also attempt to delete images within JSON, but since they might be shared or small, we'll skip for MVP to avoid complexity.
        
        $event->delete();
        return redirect()->route('teacher.events.index');
    }

    /**
     * Sube o reemplaza la imagen en miniatura de un evento.
     */
    public function uploadImage(Request $request, Event $event)
    {
        if ($event->user_id != Auth::id()) abort(403);
        
        $request->validate(['image' => 'required|image']);
        
        if ($event->image_url) {
             Storage::disk('public')->delete(str_replace('/storage/', '', $event->image_url));
        }
        
        $path = $request->file('image')->store('events', 'public');
        $event->update(['image_url' => '/storage/' . $path]);
        
        return back();
    }

    /**
     * Sube o reemplaza la imagen de portada de un evento.
     */
    public function uploadCoverImage(Request $request, Event $event)
    {
        if ($event->user_id != Auth::id()) abort(403);
        
        $request->validate(['image' => 'required|image']);
        
        if ($event->cover_image_url) {
             Storage::disk('public')->delete(str_replace('/storage/', '', $event->cover_image_url));
        }
        
        $path = $request->file('image')->store('events', 'public');
        $event->update(['cover_image_url' => '/storage/' . $path]);
        
        return back();
    }
    
    /**
     * Sube imágenes genéricas de personas (hosts, organizadores, etc.) para el evento.
     * Retorna la URL de la imagen para ser añadida al estado JSON.
     */
    public function uploadPersonImage(Request $request, Event $event)
    {
        if ($event->user_id != Auth::id()) abort(403);
        
        $request->validate(['image' => 'required|image']);
        
        $path = $request->file('image')->store('events/people', 'public');
        
        return response()->json(['url' => '/storage/' . $path]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Directorio;
use App\Models\Giro;
use App\Models\Municipio;
use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DirectoryTradeController extends Controller
{
    private const STATUS_DRAFT = 'draft';
    private const STATUS_PENDING = 'pending';
    private const STATUS_APPROVED = 'approved';
    private const STATUS_REJECTED = 'rejected';
    private const GALLERY_LIMIT = 10;

    public function index()
    {
        $trades = Directorio::query()
            ->with(['giros', 'region', 'municipio'])
            ->where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Dashboard/Trades/Index', [
            'trades' => $trades,
        ]);
    }

    public function create()
    {
        return Inertia::render('Dashboard/Trades/Create/Index');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'comercial_name' => ['required', 'string', 'max:80'],
        ]);

        $trade = Directorio::create([
            'user_id' => Auth::id(),
            'comercial_name' => $validated['comercial_name'],
            'status' => self::STATUS_DRAFT,
            'is_published' => false,
        ]);

        return redirect()->route('directory.trades.edit', $trade->id);
    }

    public function edit(Directorio $trade)
    {
        $this->ensureOwner($trade);
        $trade->load(['giros', 'region', 'municipio']);

        $giros = Giro::orderBy('name')->get();
        $regions = Region::with(['municipios' => function ($query) {
            $query->orderBy('name');
        }])->orderBy('name')->get();

        return Inertia::render('Dashboard/Trades/Edit/Index', [
            'trade' => $trade,
            'giros' => $giros,
            'regions' => $regions,
        ]);
    }

    public function update(Request $request, Directorio $trade)
    {
        $this->ensureOwner($trade);

        $validated = $request->validate([
            'comercial_name' => ['nullable', 'string', 'max:80'],
            'descripcion' => ['nullable', 'string'],
            'descripcion_corta' => ['nullable', 'string', 'max:800'],
            'descripcion_larga' => ['nullable', 'string'],
            'activities' => ['nullable', 'array'],
            'activities.*' => ['nullable', 'string', 'max:255'],
            'giro_ids' => ['nullable', 'array'],
            'giro_ids.*' => ['uuid', Rule::exists('giros', 'id')],
            'website' => ['nullable', 'url', 'max:255'],
            'name' => ['nullable', 'string', 'max:120'],
            'phone' => ['nullable', 'string', 'max:30'],
            'email' => ['nullable', 'email', 'max:191', 'unique:directorios,email,' . $trade->id],
            'personal_name' => ['nullable', 'string', 'max:120'],
            'personal_cargo' => ['nullable', 'string', 'max:120'],
            'personal_phone' => ['nullable', 'string', 'max:30'],
            'personal_email' => ['nullable', 'email', 'max:191'],
            'region_id' => ['nullable', 'uuid', Rule::exists('regions', 'id')],
            'municipio_id' => ['nullable', 'uuid'],
            'address' => ['nullable', 'string', 'max:255'],
            'map_location' => ['nullable', 'string', 'max:255'],
        ]);

        if (!empty($validated['municipio_id']) && !empty($validated['region_id'])) {
            $municipioBelongsToRegion = Municipio::where('id', $validated['municipio_id'])
                ->where('region_id', $validated['region_id'])
                ->exists();

            if (!$municipioBelongsToRegion) {
                return back()->withErrors([
                    'municipio_id' => 'El municipio no pertenece a la región seleccionada.',
                ]);
            }
        }

        if (array_key_exists('giro_ids', $validated)) {
            $giroIds = $validated['giro_ids'] ?? [];
            unset($validated['giro_ids']);

            $trade->giros()->sync($giroIds);

            $primaryGiro = null;
            if (!empty($giroIds)) {
                $primaryGiro = Giro::find($giroIds[0]);
            }

            $validated['giro'] = $primaryGiro?->name;
        }

        if (!empty($validated['region_id'])) {
            $validated['region'] = Region::find($validated['region_id'])?->name;
        }

        if (array_key_exists('activities', $validated)) {
            $validated['activities'] = collect($validated['activities'] ?? [])
                ->filter(fn ($value) => filled($value))
                ->values()
                ->all();
        }

        if ($trade->status === self::STATUS_APPROVED) {
            $validated['status'] = self::STATUS_DRAFT;
            $validated['is_published'] = false;
        }

        $trade->update($validated);

        return back();
    }

    public function uploadImage(Request $request, Directorio $trade)
    {
        $this->ensureOwner($trade);

        $request->validate([
            'image' => ['required', 'image', 'max:4096'],
        ]);

        if ($trade->image_url) {
            $this->deleteFromPublicDisk($trade->image_url);
        }

        $path = $request->file('image')->store('directorios', 'public');

        $trade->update([
            'image_url' => '/storage/' . $path,
        ]);

        return back();
    }

    public function uploadGalleryImage(Request $request, Directorio $trade)
    {
        $this->ensureOwner($trade);

        $request->validate([
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['image', 'max:4096'],
        ]);

        $gallery = $trade->gallery_images ?? [];
        $remainingSlots = self::GALLERY_LIMIT - count($gallery);

        if ($remainingSlots <= 0) {
            return back()->withErrors([
                'gallery' => 'Solo puedes cargar hasta 10 fotografias en el contenido.',
            ]);
        }

        $images = array_slice($request->file('images', []), 0, $remainingSlots);

        foreach ($images as $image) {
            $path = $image->store('directorios/gallery', 'public');
            $gallery[] = '/storage/' . $path;
        }

        $trade->update([
            'gallery_images' => $gallery,
        ]);

        return back();
    }

    public function deleteGalleryImage(Request $request, Directorio $trade)
    {
        $this->ensureOwner($trade);

        $validated = $request->validate([
            'image_url' => ['required', 'string'],
        ]);

        $gallery = collect($trade->gallery_images ?? []);

        if (!$gallery->contains($validated['image_url'])) {
            return back();
        }

        $this->deleteFromPublicDisk($validated['image_url']);

        $trade->update([
            'gallery_images' => $gallery
                ->reject(fn ($url) => $url === $validated['image_url'])
                ->values()
                ->all(),
        ]);

        return back();
    }

    public function revertToDraft(Directorio $trade)
    {
        $this->ensureOwner($trade);

        if ($trade->status !== self::STATUS_APPROVED) {
            return back();
        }

        $trade->update([
            'status' => self::STATUS_DRAFT,
            'is_published' => false,
        ]);

        return back();
    }

    public function publish(Directorio $trade)
    {
        $this->ensureOwner($trade);

        // Legacy endpoint compatibility: map to approved state.
        $trade->update([
            'is_published' => true,
            'status' => self::STATUS_APPROVED,
        ]);

        return back();
    }

    public function unpublish(Directorio $trade)
    {
        $this->ensureOwner($trade);

        $trade->update([
            'is_published' => false,
            'status' => self::STATUS_DRAFT,
        ]);

        return back();
    }

    public function submitForReview(Directorio $trade)
    {
        $this->ensureOwner($trade);

        $requiredFields = [
            $trade->comercial_name,
            $trade->descripcion_corta,
            $trade->descripcion_larga,
            $trade->phone,
            $trade->address,
            $trade->image_url,
            $trade->region_id,
            $trade->municipio_id,
            $trade->personal_name,
            $trade->personal_cargo,
            $trade->personal_phone,
        ];

        $hasActivities = collect($trade->activities ?? [])->filter(fn ($value) => filled($value))->isNotEmpty();
        $isComplete = collect($requiredFields)->every(fn ($value) => !empty($value))
            && $trade->giros()->exists()
            && $hasActivities;

        if (!$isComplete) {
            return back()->withErrors([
                'error' => 'Faltan campos obligatorios para enviar la solicitud.',
            ]);
        }

        if (!in_array($trade->status, [self::STATUS_DRAFT, self::STATUS_REJECTED], true)) {
            return back()->withErrors([
                'error' => 'Este registro no puede enviarse a revision en su estado actual.',
            ]);
        }

        $trade->update([
            'status' => self::STATUS_PENDING,
            'is_published' => false,
        ]);

        return back();
    }

    public function destroy(Directorio $trade)
    {
        $this->ensureOwner($trade);

        if ($trade->image_url) {
            $this->deleteFromPublicDisk($trade->image_url);
        }

        collect($trade->gallery_images ?? [])->each(function ($url) {
            $this->deleteFromPublicDisk($url);
        });

        $trade->delete();

        return redirect()->route('directory.trades.index');
    }

    public function requestsIndex()
    {
        $this->ensureReviewer();

        $trades = Directorio::query()
            ->with(['user', 'giros', 'region', 'municipio'])
            ->whereIn('status', [self::STATUS_PENDING, self::STATUS_APPROVED, self::STATUS_REJECTED])
            ->orderByRaw("CASE WHEN status = 'pending' THEN 0 ELSE 1 END")
            ->orderByDesc('updated_at')
            ->get();

        return Inertia::render('Dashboard/Teacher/Solicitudes/Index', [
            'trades' => $trades,
        ]);
    }

    public function requestShow(Directorio $trade)
    {
        $this->ensureReviewer();

        $trade->load(['user', 'giros', 'region', 'municipio']);

        return Inertia::render('Dashboard/Teacher/Solicitudes/Show/Index', [
            'trade' => $trade,
        ]);
    }

    public function approve(Directorio $trade)
    {
        $this->ensureReviewer();

        if ($trade->status !== self::STATUS_PENDING) {
            return back()->withErrors([
                'error' => 'Solo puedes aprobar solicitudes pendientes.',
            ]);
        }

        $trade->update([
            'status' => self::STATUS_APPROVED,
            'is_published' => true,
        ]);

        return back();
    }

    public function reject(Directorio $trade)
    {
        $this->ensureReviewer();

        if ($trade->status !== self::STATUS_PENDING) {
            return back()->withErrors([
                'error' => 'Solo puedes rechazar solicitudes pendientes.',
            ]);
        }

        $trade->update([
            'status' => self::STATUS_REJECTED,
            'is_published' => false,
        ]);

        return back();
    }

    private function ensureOwner(Directorio $trade): void
    {
        if ((int) $trade->user_id !== (int) Auth::id()) {
            abort(403);
        }
    }

    private function ensureReviewer(): void
    {
        $user = Auth::user();

        if (!$user instanceof \App\Models\User) {
            abort(403);
        }

        $isTeacher = (bool) $user->is_teacher;
        $isAdmin = (bool) ($user->is_admin ?? false);

        if (!$isTeacher && !$isAdmin) {
            abort(403);
        }
    }

    private function deleteFromPublicDisk(string $url): void
    {
        $relative = str_replace('/storage/', '', $url);

        if (Storage::disk('public')->exists($relative)) {
            Storage::disk('public')->delete($relative);
        }
    }
}

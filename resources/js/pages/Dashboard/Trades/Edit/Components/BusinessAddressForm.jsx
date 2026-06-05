import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { BaseCard } from "./SimpleForms";
import { Search } from "lucide-react";

let DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker({ position, setPosition, setAddress }) {
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            map.flyTo(e.latlng, map.getZoom());
            
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                .then(res => res.json())
                .then(data => {
                    if (data && data.display_name) {
                        setAddress(data.display_name);
                    }
                })
                .catch(err => console.error("Error fetching address:", err));
        },
    });

    useEffect(() => {
        if (position) {
            map.flyTo(position, 15);
        }
    }, [position, map]);

    return position === null ? null : (
        <Marker position={position} />
    );
}

export function BusinessAddressForm({ initialData, tradeId }) {
    const [isEditing, setIsEditing] = useState(false);
    const [address, setAddress] = useState(initialData.address || "");
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    
    // Coordenadas iniciales (Tehuacán aprox, basado en el código anterior)
    const defaultPosition = [18.4627, -97.3941]; 
    
    const initialPosition = initialData.map_location 
        ? initialData.map_location.split(',').map(Number)
        : defaultPosition;

    const [position, setPosition] = useState(initialData.map_location ? initialPosition : null);

    const handleSearch = async () => {
        if (!address.trim()) return;
        
        setIsSearching(true);
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
            const data = await res.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error en búsqueda:", error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectResult = (result) => {
        const newPos = [parseFloat(result.lat), parseFloat(result.lon)];
        setPosition(newPos);
        setAddress(result.display_name);
        setSearchResults([]);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const locString = position ? `${position[0]},${position[1]}` : "";

        router.patch(
            `/directory/trades/${tradeId}`,
            { address, map_location: locString },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    setIsEditing(false);
                },
                onError: () => setIsLoading(false),
            },
        );
    };

    const handleToggle = () => {
        setIsEditing((current) => !current);
        if (!isEditing) {
             if (initialData.map_location) {
                 setPosition(initialData.map_location.split(',').map(Number));
             } else {
                 setPosition(null);
             }
             setAddress(initialData.address || "");
             setSearchResults([]);
        }
    };

    return (
        <BaseCard
            title="Dirección del negocio"
            isEditing={isEditing}
            onToggle={handleToggle}
            isCompleted={!!initialData.address}
            preview={<p className={`mt-2 text-sm ${initialData.address ? "text-brand-text" : "italic text-brand-ink"}`}>{initialData.address || "Sin dirección"}</p>}
        >
            <div className="mt-4 space-y-4">
                <div className="flex gap-2">
                    <Input
                        disabled={isLoading}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ingresa la dirección para buscar"
                        className="bg-white flex-1"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                    />
                    <Button type="button" onClick={handleSearch} disabled={isSearching || isLoading}>
                        <Search className="h-4 w-4 mr-2" />
                        Buscar
                    </Button>
                </div>

                {searchResults.length > 0 && (
                    <div className="border rounded-none bg-white shadow-sm max-h-48 overflow-y-auto z-10 relative">
                        {searchResults.map((result, idx) => (
                            <button
                                key={idx}
                                type="button"
                                className="w-full text-left px-3 py-2 text-sm hover:bg-brand-soft hover:text-white border-b last:border-0"
                                onClick={() => handleSelectResult(result)}
                            >
                                {result.display_name}
                            </button>
                        ))}
                    </div>
                )}

                <p className="text-xs text-brand-ink">
                    Si no encuentras tu dirección, haz clic en el mapa para colocar el marcador manualmente.
                </p>

                <div className="border rounded-none overflow-hidden relative z-0">
                    <MapContainer
                        center={initialPosition}
                        zoom={position ? 15 : 13}
                        scrollWheelZoom={true}
                        style={{ height: "400px", width: "100%", zIndex: 0 }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker position={position} setPosition={setPosition} setAddress={setAddress} />
                    </MapContainer>
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                    <Button type="button" variant="destructive" onClick={handleToggle} disabled={isLoading} className="w-full md:w-auto rounded-none font-bold uppercase tracking-wider">Cancelar</Button>
                    <Button type="button" onClick={onSubmit} disabled={isLoading} className="w-full md:w-auto rounded-none bg-brand text-white hover:bg-brand-darker font-bold uppercase tracking-wider">Guardar</Button>
                </div>
            </div>
        </BaseCard>
    );
}

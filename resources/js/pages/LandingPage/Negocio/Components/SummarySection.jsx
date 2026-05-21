import React, { useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {
    Bus, Wrench, Leaf, Trees, Waves, Mountain, BedDouble, Droplets, Utensils, Info,
    MapPin, Phone, Mail, Globe
} from "lucide-react";

// Fix Leaflet marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const getGiroIcon = (giroName) => {
    const name = giroName.toLowerCase();
    if (name.includes("transporte")) return <Bus className="w-4 h-4 mr-2" />;
    if (name.includes("talleres")) return <Wrench className="w-4 h-4 mr-2" />;
    if (name.includes("medicina")) return <Leaf className="w-4 h-4 mr-2" />;
    if (name.includes("parques temáticos")) return <Trees className="w-4 h-4 mr-2" />;
    if (name.includes("acuáticas")) return <Waves className="w-4 h-4 mr-2" />;
    if (name.includes("aventura") || name.includes("naturaleza")) return <Mountain className="w-4 h-4 mr-2" />;
    if (name.includes("hospedaje")) return <BedDouble className="w-4 h-4 mr-2" />;
    if (name.includes("balneario")) return <Droplets className="w-4 h-4 mr-2" />;
    if (name.includes("gastronomía")) return <Utensils className="w-4 h-4 mr-2" />;
    return <Info className="w-4 h-4 mr-2" />;
};

const SummarySection = ({ trade }) => {
    if (!trade) return null;

    const mapLocation = trade.map_location ? trade.map_location.split(',').map(Number) : null;

    // Transform gallery images
    const galleryItems = (trade.gallery_images || []).map(imgUrl => ({
        original: imgUrl,
        thumbnail: imgUrl,
    }));

    // If no gallery images, use a placeholder or image_url
    if (galleryItems.length === 0 && trade.image_url) {
        galleryItems.push({
            original: trade.image_url,
            thumbnail: trade.image_url
        });
    }

    return (
        <section className="bg-brand-soft mx-auto px-20 md:px-25 py-15 md:py-20 pb-20">
            <div className=" container max-w-7xl mx-auto px-5 ">
                <div className="space-y-10">
                    {/* Cabecera */}
                    <div className="space-y-4 text-center md:text-left">
                        <h1 className="text-7xl text-white font-bold text-brand-text">{trade.comercial_name}</h1>
                        {trade.descripcion_corta && (
                            <p className="text-3xl text-brand-ink max-w-3xl  text-white">{trade.descripcion_corta}</p>
                        )}
                    </div>


                    {/* Giros */}

                    {trade.giros && trade.giros.length > 0 && (
                        <div className="flex flex-wrap gap-3 justify-center md:justify-end mt-4">
                            {trade.giros.map((giro, idx) => (
                                <div key={idx} className="flex items-center px-4 py-2 border rounded-full bg-brand-earth font-medium text-2xl shadow-sm text-white">
                                    {getGiroIcon(giro.name)}
                                    {giro.name}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Contacto */}


                    <div className="flex flex-wrap gap-6 justify-center md:justify-start bg-white p-4 rounded-xl border shadow-sm">
                        {trade.address && (
                            <div className="flex items-center text-lg text-brand-ink">
                                <MapPin className="w-5 h-5 mr-2 text-brand-text" />
                                {trade.address}
                            </div>
                        )}
                        {trade.phone && (
                            <div className="flex items-center text-lg text-brand-ink">
                                <Phone className="w-5 h-5 mr-2 text-brand-text" />
                                {trade.phone}
                            </div>
                        )}
                        {trade.email && (
                            <div className="flex items-center text-lg text-brand-ink">
                                <Mail className="w-5 h-5 mr-2 text-brand-text" />
                                {trade.email}
                            </div>
                        )}
                        {trade.website && (
                            <div className="flex items-center text-lg text-brand-ink">
                                <Globe className="w-5 h-5 mr-2 text-brand-text" />
                                <a href={trade.website} target="_blank" rel="noreferrer" className="hover:underline">{trade.website}</a>
                            </div>
                        )}
                    </div>










                    {/* Contenido Visual (Galería y Mapa) */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-5 gap-6 lg:gap-8 lg:min-h-[600px]">

                        {/* div1: Galería */}
                        {galleryItems.length > 0 && (
                            <div className="lg:col-span-3 lg:row-span-5 rounded-xl overflow-hidden shadow-sm border bg-white p-2">
                                <ImageGallery
                                    items={galleryItems}
                                    showPlayButton={false}
                                    showFullscreenButton={true}
                                    showThumbnails={galleryItems.length > 1}
                                />
                            </div>
                        )}

                        {/* div3:
                        <div className="lg:col-span-2 lg:col-start-4 lg:row-start-1 rounded-xl overflow-hidden shadow-sm border border-white/20 bg-white/10 p-6 flex flex-col items-center justify-center backdrop-blur-md">
                            <h3 className="text-white font-bold text-2xl mb-1">Calificaciones</h3>
                            <span className="text-white/70 text-sm font-medium uppercase tracking-wider">Próximamente</span>
                        </div>
 Calificaciones (Próximamente) */}
                        {/* div2: Mapa */}
                        {mapLocation && mapLocation.length === 2 && !isNaN(mapLocation[0]) && (
                            <div className="lg:col-span-2 lg:row-span-4 lg:col-start-4 lg:row-start-2 rounded-xl overflow-hidden shadow-sm border h-[400px] lg:h-full z-0 relative">
                                <MapContainer
                                    center={mapLocation}
                                    zoom={15}
                                    scrollWheelZoom={false}
                                    style={{ height: "100%", width: "100%", zIndex: 0 }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={mapLocation} />
                                </MapContainer>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SummarySection;
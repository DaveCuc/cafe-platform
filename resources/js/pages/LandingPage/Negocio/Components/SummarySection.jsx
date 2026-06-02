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
        <section className="bg-brand-darker relative overflow-hidden mx-auto px-20 md:px-25 py-15 md:py-20 pb-20">
            <div className=" container max-w-7xl mx-auto px-5 relative z-10">
                <div className="space-y-10">
                    {/* Cabecera */}
                    <div className="space-y-4 text-center md:text-left">
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white uppercase tracking-tight">{trade.comercial_name}</h1>
                        {trade.descripcion_corta && (
                            <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-4xl leading-relaxed">{trade.descripcion_corta}</p>
                        )}
                    </div>


                    {/* Giros */}

                    {trade.giros && trade.giros.length > 0 && (
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            {trade.giros.map((giro, idx) => (
                                <div key={idx} className="flex items-center px-4 py-2 border-2 border-brand text-brand bg-white rounded-none font-bold text-sm shadow-sm uppercase tracking-wider hover:bg-brand hover:text-white transition-colors cursor-default">
                                    <span className="mr-2">{getGiroIcon(giro.name)}</span>
                                    {giro.name}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Contacto */}


                    <div className="flex flex-wrap gap-8 justify-center md:justify-start bg-white p-6 rounded-none shadow-xl">
                        {trade.address && (
                            <div className="flex items-center text-base text-brand-darker">
                                <MapPin className="w-5 h-5 mr-3 text-brand" />
                                {trade.address}
                            </div>
                        )}
                        {trade.phone && (
                            <div className="flex items-center text-base text-brand-darker">
                                <Phone className="w-5 h-5 mr-3 text-brand" />
                                {trade.phone}
                            </div>
                        )}
                        {trade.email && (
                            <div className="flex items-center text-base text-brand-darker">
                                <Mail className="w-5 h-5 mr-3 text-brand" />
                                {trade.email}
                            </div>
                        )}
                        {trade.website && (
                            <div className="flex items-center text-base text-brand-darker">
                                <Globe className="w-5 h-5 mr-3 text-brand" />
                                <a href={trade.website} target="_blank" rel="noreferrer" className="hover:text-brand hover:underline transition-colors">{trade.website}</a>
                            </div>
                        )}
                    </div>










                    {/* Contenido Visual (Galería y Mapa) */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 relative z-10 items-start">

                        {/* div1: Galería (Estilo Foto Instantánea) */}
                        {galleryItems.length > 0 && (
                            <div className="lg:col-span-3 relative z-20 group cursor-pointer">
                                {/* Fondo inclinado estilo Polaroid separado del contenedor principal */}
                                <div className="absolute bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-2 transition-all duration-500 group-hover:rotate-0 group-hover:-translate-y-2 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-0 pointer-events-none" 
                                     style={{ top: '-12px', left: '-12px', right: '-12px', bottom: '-48px' }}>
                                </div>
                                
                                {/* Contenedor de la galería (sin transformaciones de rotación para no romper pantalla completa) */}
                                <div className="relative z-10 p-1 md:p-2 bg-white transition-transform duration-500 group-hover:-translate-y-2">
                                    <ImageGallery
                                        items={galleryItems}
                                        showPlayButton={false}
                                        showFullscreenButton={true}
                                        showThumbnails={galleryItems.length > 1}
                                    />
                                </div>
                            </div>
                        )}

                        {/* div3:
                        <div className="lg:col-span-2 lg:col-start-4 lg:row-start-1 rounded-xl overflow-hidden shadow-sm border border-white/20 bg-white/10 p-6 flex flex-col items-center justify-center backdrop-blur-md">
                            <h3 className="text-white font-bold text-2xl mb-1">Calificaciones</h3>
                            <span className="text-white/70 text-sm font-medium uppercase tracking-wider">Próximamente</span>
                        </div>
 Calificaciones (Próximamente) */}
                        {/* div2: Mapa Cartesiano */}
                        {mapLocation && mapLocation.length === 2 && !isNaN(mapLocation[0]) && (
                            <div className="lg:col-span-2 relative mt-4 lg:mt-10 p-6 shadow-2xl bg-[#fdfbf7] overflow-hidden group">
                                {/* Decoración de fondo (SVG de apoyo) */}
                                <div className="absolute -bottom-10 -right-10 w-[32rem] h-[32rem] opacity-15 pointer-events-none z-0">
                                    <img src="/Decorativo/map.svg" alt="" className="w-full h-full object-contain" />
                                </div>
                                {/* Cuadrícula Cartesiana */}
                                <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#e6dcc8 1px, transparent 1px), linear-gradient(90deg, #e6dcc8 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.4 }} />

                                <h3 className="relative z-10 text-xl font-bold text-brand-darker uppercase tracking-widest mb-4 flex items-center bg-white/80 w-fit px-3 py-1 shadow-sm">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    Ubicación
                                </h3>

                                {/* Contenedor del Mapa */}
                                <div className="shadow-inner h-[350px] lg:h-[450px] relative z-10">
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
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SummarySection;
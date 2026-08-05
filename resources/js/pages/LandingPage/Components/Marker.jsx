import React, { useState, useMemo } from 'react';
import L from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

// ─── Colores por categoría de la cadena productiva del café ──────────────────
// Deben coincidir exactamente con las claves de CATEGORIES en TradeNav.jsx
// para que el color del marcador en el mapa sea consistente con el filtro.
export const CATEGORY_COLORS = {
    "Productor de Café":               "#15803D",
    "Beneficiador":                    "#78350F",
    "Tostador":                        "#991B1B",
    "Comercializador":                 "#B45309",
    "Tienda y Punto de Venta":         "#1E40AF",
    "Cooperativa / Sociedad":          "#6B21A8",
    "Transformación y Valor Agregado": "#0F766E",
};

// ─── Referencia de ayuda para desarrollo / manipulación futura ───────────────
// Mapeo original de categorías de turismo conservado como guía de referencia:
/*
const CATEGORY_COLORS_TURISMO_GUIA = {
    "Transporte Comunitario": "#FF7A5C",
    "Talleres comunitarios": "#00D126",
    "Medicina tradicional y bienestar": "#5C7AFF",
    "Parques temáticos comunitarios": "#FF8AC8",
    "Actividades acuáticas comunitarias": "#00D1C7",
    "Actividades de Aventura o Naturaleza": "#C7D100",
    "Hospedaje comunitario": "#C88AFF",
    "Balneario y Parque Acuático": "#FFA35C",
    "Gastronomía tradicional": "#00A347",
};
*/

export const getCategoryColor = (trade) => {
    const category = trade.giros?.[0]?.name || trade.giro;
    return CATEGORY_COLORS[category] || "#0B5139";
};

/**
 * MarkerMap component renders a custom Leaflet marker for a trade.
 * Note: iconSize can be adjusted manually here:
 */
const ICON_SIZE = 100;

export const MarkerMap = ({ trade, onClick }) => {
    const map = useMap();
    const [isOpen, setIsOpen] = useState(false);
    const position = trade.map_location?.split(',').map(Number);
    if (!position || position.length !== 2) return null;

    const color = getCategoryColor(trade);
    
    const handleMarkerClick = () => {
        onClick(trade);
        
        // Calcular un ligero desplazamiento (offset) hacia arriba para que el popup (que se abre arriba del marcador)
        // quede perfectamente centrado en la pantalla visualmente.
        // Un ligero desplazamiento de latitud hacia el norte funciona muy bien.
        const zoomLevel = Math.max(map.getZoom(), 14); // Acercar si está muy lejos
        const latOffset = 0.008 * (14 / zoomLevel); // Ajuste empírico basado en el zoom
        
        map.flyTo([position[0] + latOffset, position[1]], zoomLevel, { 
            animate: true, 
            duration: 1.2,
            easeLinearity: 0.2
        });
    };

    // Custom modern icon: Teardrop shape with image inside and sleek pill label
    const icon = useMemo(() => L.divIcon({
        className: `custom-marker bg-transparent border-none transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`,
        html: `
            <div style="position: relative; display: flex; flex-direction: column; align-items: center; width: 150px; left: -51px;" class="group cursor-pointer">
                <!-- Wrapper for Zoom Animation -->
                <div class="transition-transform duration-300 group-hover:scale-125 origin-bottom" style="z-index: 2; display: flex; flex-direction: column; align-items: center;">
                    <!-- Modern Teardrop Pin -->
                    <div style="
                        width: ${ICON_SIZE}px;
                        height: ${ICON_SIZE}px;
                        background-color: ${color};
                        border-radius: 50% 50% 50% 0;
                        transform: rotate(-45deg);
                        box-shadow: -3px 3px 8px rgba(0,0,0,0.3);
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: 3px solid white;
                    ">
                        <img src="${trade.image_url || '/placeholder.jpg'}" style="
                            width: ${ICON_SIZE - 10}px;
                            height: ${ICON_SIZE - 10}px;
                            border-radius: 50%;
                            transform: rotate(45deg);
                            object-fit: cover;
                        " />
                    </div>
                </div>
                
                <!-- Sleek Pill Label -->
                <div style="
                    margin-top: 8px;
                    background: white;
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 700;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    max-width: 140px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
                    color: #1f2937;
                    border: 1px solid #f3f4f6;
                    z-index: 3;
                    font-family: 'Outfit', sans-serif;
                    text-align: center;
                " class="transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                    ${trade.comercial_name}
                </div>
            </div>
        `,
        iconSize: [ICON_SIZE, ICON_SIZE],
        iconAnchor: [ICON_SIZE / 2, ICON_SIZE],
        popupAnchor: [0, 0],
    }), [trade, color, isOpen]);

    return (
        <Marker 
            position={position} 
            icon={icon} 
            eventHandlers={{ 
                click: handleMarkerClick,
                popupopen: () => setIsOpen(true),
                popupclose: () => setIsOpen(false)
            }}
        >
            <Popup className="modern-popup" closeButton={false} autoPan={false}>
                <div className="popup-spring-anim relative" style={{ width: '311px', height: '311px' }}>
                    
                    {/* The Inflated Teardrop Shape */}
                    <div className="absolute inset-0 m-auto bg-white shadow-2xl overflow-hidden flex items-center justify-center" style={{
                        width: '220px',
                        height: '220px',
                        borderRadius: '50% 50% 50% 0',
                        transform: 'rotate(-45deg)',
                        border: `4px solid ${color}`,
                    }}>
                        
                        {/* The Counter-Rotated Content inside the teardrop */}
                        <div className="flex flex-col items-center justify-center text-center p-2 relative" style={{ 
                            width: '220px', 
                            height: '220px',
                            transform: 'rotate(45deg)' 
                        }}>
                            {/* Full Dark Background Image */}
                            <div className="absolute inset-0 pointer-events-none bg-brand-darker rounded-full scale-110">
                                <img src={trade.image_url || '/placeholder.jpg'} className="w-full h-full object-cover opacity-50 mix-blend-luminosity" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
                            </div>

                            {/* Actual Content */}
                            <div className="z-10 flex flex-col items-center justify-center w-full px-5 h-full pt-4">
                                <div className="text-[10px] font-bold text-white px-3 py-1 rounded-full uppercase tracking-widest mb-3 shadow-lg" style={{ backgroundColor: color }}>
                                    {trade.giros?.[0]?.name || trade.giro}
                                </div>
                                <h3 className="font-extrabold text-white text-lg leading-tight mb-2 drop-shadow-md px-1">{trade.comercial_name}</h3>
                                <p className="text-[11px] text-gray-200 line-clamp-3 leading-relaxed drop-shadow-sm px-2">{trade.descripcion_corta}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </Popup>
        </Marker>
    );
};

export const TradeCard = ({ trade }) => {
    const color = getCategoryColor(trade);

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="flex flex-col rounded-none border border-gray-200 bg-white shadow-sm overflow-hidden mb-4"
        >
            <div
                className="h-40 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${trade.image_url || '/placeholder.jpg'})` }}
            />
            <div className="p-5 flex flex-col gap-3" style={{ borderTop: `5px solid ${color}` }}>
                <h3 className="text-xl font-bold text-brand-dark leading-tight">{trade.comercial_name}</h3>
                <span
                    className="text-[11px] font-bold px-2 py-1 rounded-md text-white w-fit uppercase tracking-wider"
                    style={{ backgroundColor: color }}
                >
                    {trade.giros?.[0]?.name || trade.giro}
                </span>
                <p className="text-sm text-brand-ink leading-relaxed line-clamp-4">{trade.descripcion_corta}</p>

                <div className="flex flex-col gap-2 mt-2 text-xs text-brand-ink">
                    <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-brand-soft shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>{trade.address}</span>
                    </div>
                    {trade.phone && (
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-brand-soft shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span>{trade.phone}</span>
                        </div>
                    )}
                </div>

                <Link
                    href={route('negocio', trade.id)}
                    className="mt-4 w-full py-2.5 bg-brand text-white rounded-md text-center font-bold hover:bg-brand-soft transition-colors shadow-sm"
                >
                    Ir al negocio
                </Link>
            </div>
        </motion.div>
    );
};

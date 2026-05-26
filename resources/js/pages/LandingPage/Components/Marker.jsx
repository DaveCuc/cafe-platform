import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Link } from '@inertiajs/react';

export const CATEGORY_COLORS = {
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
    const position = trade.map_location?.split(',').map(Number);
    if (!position || position.length !== 2) return null;

    const color = getCategoryColor(trade);
    
    // Custom icon: Circular image inside a pin
    const icon = L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="position: relative; width: ${ICON_SIZE}px; height: ${ICON_SIZE}px;">
                <div style="
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 12px solid ${color};
                    z-index: 1;
                "></div>
                <div style="
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: ${ICON_SIZE}px;
                    height: ${ICON_SIZE}px;
                    background-color: ${color};
                    border-radius: 50%;
                    border: 2px solid white;
                    overflow: hidden;
                    z-index: 2;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                ">
                    <img src="${trade.image_url || '/placeholder.jpg'}" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
                <div style="
                    position: absolute;
                    top: -22px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: bold;
                    white-space: nowrap;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                    border: 1px solid ${color};
                    z-index: 3;
                    color: ${color};
                ">
                    ${trade.comercial_name}
                </div>
            </div>
        `,
        iconSize: [ICON_SIZE, ICON_SIZE + 10],
        iconAnchor: [ICON_SIZE / 2, ICON_SIZE + 10],
    });

    return (
        <Marker position={position} icon={icon} eventHandlers={{ click: () => onClick(trade) }}>
            <Popup>
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <img src={trade.image_url || '/placeholder.jpg'} alt={trade.comercial_name} className="w-full h-24 object-cover rounded-md" />
                    <h3 className="font-bold text-brand-dark">{trade.comercial_name}</h3>
                    <p className="text-xs text-brand-ink line-clamp-2">{trade.descripcion_corta}</p>
                    {/*
                    <button
                        onClick={() => onClick(trade)}
                        className="bg-brand text-white text-center py-1 px-3 rounded-md text-xs hover:bg-brand-soft transition-colors mt-1"
                    >
                        Ver más
                    </button>
                    */}
                </div>
            </Popup>
        </Marker>
    );
};

export const TradeCard = ({ trade }) => {
    const color = getCategoryColor(trade);
    
    return (
        <div className="flex flex-col rounded-lg border border-brand-panel bg-white shadow-sm overflow-hidden mb-4">
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
        </div>
    );
};

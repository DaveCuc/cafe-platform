import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REGIONES } from './GeneralMap';
import { TradeCard } from './Marker';

const normalizarTexto = (texto) => {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};

// LAYER_TITLES define qué capas tienen panel de información en el SlideRight.
// PENDIENTE: 'reserva' y 'general' comentados porque sus capas GeoJSON están desactivadas.
// Para reactivarlos: descomenta las líneas correspondientes y activa las capas en SlideLeft.jsx
const LAYER_TITLES = {
    // reserva: "Reserva de la Biosfera",   // PENDIENTE: descomenta al reactivar tehmap.geojson
    // general: "Regiones y Municipios",     // PENDIENTE: descomenta al reactivar general.geojson
    negocios: "Caficultores y Tiendas"
};

// PENDIENTE: agregar 'reserva' y 'general' cuando sus capas sean reactivadas
const LAYER_ORDER = ['negocios'];

const SlideRight = ({ mapRef, rightSlideOpen, setRightSlideOpen, hiddenMunicipios, setHiddenMunicipios, hiddenRegions, setHiddenRegions, activeInfoPanel, setActiveInfoPanel, capasActivas, selectedTrade, setSelectedTrade }) => {
    const [reservaInfo, setReservaInfo] = useState(null);
    const [regiones, setRegiones] = useState([]);

    const [selectedRegion, setSelectedRegion] = useState(null);
    const [expandedMunicipio, setExpandedMunicipio] = useState(null);

    useEffect(() => {
        Promise.all([
            fetch('/Mapas/Informacion/reserva.json').then(res => res.json()),
            fetch('/Mapas/Informacion/general.json').then(res => res.json())
        ]).then(([reservaData, generalData]) => {
            setReservaInfo(reservaData);
            setRegiones(generalData.regiones || []);
        }).catch(err => console.error("Error loading info:", err));
    }, []);

    const handleZoom = (lat, lng, zoom = 14) => {
        if (mapRef?.current && lat && lng) {
            mapRef.current.flyTo([lat, lng], zoom, { duration: 1.5 });
        }
    };

    const toggleRegionCheckbox = (region, e) => {
        e.stopPropagation();
        const regionName = normalizarTexto(region.nombre);
        if (hiddenRegions.includes(regionName)) {
            setHiddenRegions(prev => prev.filter(r => r !== regionName));
        } else {
            setHiddenRegions(prev => [...prev, regionName]);
        }
    };

    const toggleMunicipioCheckbox = (municipioName, e) => {
        e.stopPropagation();
        const normalName = normalizarTexto(municipioName);
        if (hiddenMunicipios.includes(normalName)) {
            setHiddenMunicipios(prev => prev.filter(m => m !== normalName));
        } else {
            setHiddenMunicipios(prev => [...prev, normalName]);
        }
    };

    // Filtramos las capas activas que sí tienen contenido JSON definido en LAYER_TITLES, respetando el orden del menú izquierdo
    const activeLayersWithJSON = LAYER_ORDER.filter(key => capasActivas[key] && LAYER_TITLES[key]);

    return (
        <div className={`relative h-full w-96 shrink-0 bg-white shadow-2xl z-[1001] transition-all duration-300 ease-in-out flex flex-col ${rightSlideOpen ? 'mr-0' : '-mr-96'}`}>
            <button
                onClick={() => setRightSlideOpen(!rightSlideOpen)}
                className="absolute top-1/2 -left-10 -translate-y-1/2 flex items-center justify-center w-10 h-16 bg-brand text-white rounded-none shadow-lg hover:bg-brand-dark transition-all border border-r-0 border-brand z-[1002]"
                title={rightSlideOpen ? "Cerrar Información" : "Abrir Información"}
            >
                <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-transform duration-300 ${rightSlideOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>

            <div className="pt-24 flex items-center p-5 border-b border-brand-panel shrink-0">
                <h2 className="text-2xl font-semibold text-brand-text">Información</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-gray-50">
                
                {activeLayersWithJSON.length === 0 ? (
                    <div className="flex flex-col gap-4 justify-center items-center h-full text-gray-500">
                        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <div className="flex flex-col gap-2 text-center px-4">
                            <p className="text-sm font-semibold text-brand-darker">Mapa en construcción</p>
                            <p className="text-xs text-gray-400 leading-relaxed">
                                Las capas geográficas de la Red de Caficultores están siendo preparadas.
                                Activa <strong>Caficultores y Tiendas</strong> para ver los registros disponibles.
                            </p>
                        </div>
                    </div>
                ) : (
                    activeLayersWithJSON.map((layerKey) => {
                        const isExpanded = activeInfoPanel === layerKey;
                        
                        return (
                            <div key={layerKey} className="flex flex-col rounded-none border border-gray-200 bg-white shadow-sm overflow-hidden shrink-0">
                                {/* Encabezado del Acordeón Principal */}
                                <div 
                                    className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${isExpanded ? 'bg-brand text-white' : 'hover:bg-gray-100 text-brand-darker'}`}
                                    onClick={() => setActiveInfoPanel(isExpanded ? null : layerKey)}
                                >
                                    <h3 className="text-[16px] font-semibold">{LAYER_TITLES[layerKey]}</h3>
                                    <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-white' : 'text-brand-ink'}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>

                                {/* Contenido Expansible */}
                                <div className={`transition-all duration-300 ease-in-out ${isExpanded ? 'opacity-100 max-h-[2000px]' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <div className="p-5 border-t border-brand-panel bg-white flex flex-col gap-6">
                                        
                                        {/* --- CONTENIDO RESERVA --- */}
                                        {layerKey === 'reserva' && reservaInfo && (
                                            <div className="flex flex-col gap-5">
                                                <p className="text-[14px] text-brand-ink leading-relaxed">{reservaInfo.descripcion}</p>
                                                
                                                {reservaInfo.aspectos_clave && (
                                                    <div className="flex flex-col gap-3 mt-2 bg-brand-light/30 p-4 rounded-lg border border-brand-panel">
                                                        <h4 className="font-semibold text-brand-text flex items-center gap-2">
                                                            <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                            Aspectos Clave
                                                        </h4>
                                                        <ul className="flex flex-col gap-3 text-[13px] text-brand-ink">
                                                            {reservaInfo.aspectos_clave.biodiversidad && (
                                                                <li><strong className="text-brand-dark">Biodiversidad:</strong> {reservaInfo.aspectos_clave.biodiversidad}</li>
                                                            )}
                                                            {reservaInfo.aspectos_clave.fauna && (
                                                                <li><strong className="text-brand-dark">Fauna:</strong> {reservaInfo.aspectos_clave.fauna}</li>
                                                            )}
                                                            {reservaInfo.aspectos_clave.patrimonio_mixto && (
                                                                <li><strong className="text-brand-dark">Patrimonio:</strong> {reservaInfo.aspectos_clave.patrimonio_mixto}</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* --- CONTENIDO GENERAL (Regiones y Municipios) --- */}
                                        {layerKey === 'general' && (
                                            <div className="flex flex-col gap-6">
                                                {/* REGIONES */}
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex flex-col gap-1">
                                                        <h4 className="text-sm font-semibold text-brand-darker uppercase tracking-wider">Lista de Regiones</h4>
                                                        <p className="text-xs text-gray-500 italic">Selecciona para explorar.</p>
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        {regiones.map((region, idx) => {
                                                            const regionMuns = region.municipios.map(m => normalizarTexto(m.nombre));
                                                            const isRegionChecked = !hiddenRegions.includes(normalizarTexto(region.nombre));
                                                            const isSelected = selectedRegion?.nombre === region.nombre;
                                                            const regionColor = REGIONES[region.nombre.toUpperCase()]?.color || '#0B5139'; // #0B5139 is brand color

                                                            return (
                                                                <div 
                                                                    key={idx} 
                                                                    className={`flex flex-col rounded-none border transition-all cursor-pointer overflow-hidden ${isSelected ? 'ring-1 shadow-sm' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                                                                    style={isSelected ? { borderColor: regionColor, ringColor: regionColor, backgroundColor: `${regionColor}15` } : {}}
                                                                    onClick={() => {
                                                                        setSelectedRegion(region);
                                                                        if (region.coordenadas) {
                                                                            handleZoom(region.coordenadas.lat, region.coordenadas.lng, region.coordenadas.zoom || 9);
                                                                        }
                                                                    }}
                                                                >
                                                                    <div className="flex items-center justify-between p-3">
                                                                        <div className="flex items-center gap-3">
                                                                            <input 
                                                                                type="checkbox" 
                                                                                checked={isRegionChecked} 
                                                                                onChange={(e) => toggleRegionCheckbox(region, e)}
                                                                                onClick={(e) => e.stopPropagation()}
                                                                                className="w-4 h-4 rounded cursor-pointer shrink-0"
                                                                                style={{ color: regionColor }}
                                                                            />
                                                                            <span 
                                                                                className="font-semibold text-[14px] transition-colors"
                                                                                style={{ color: isSelected ? regionColor : 'inherit' }}
                                                                            >
                                                                                {region.nombre}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    {isSelected && (
                                                                        <div className="p-3 pt-0 text-[12px] text-brand-ink leading-relaxed pl-10 border-t border-brand-panel/30 mt-2">
                                                                            {region.descripcion}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                {/* MUNICIPIOS */}
                                                <div className="flex flex-col gap-3 pt-6 border-t border-gray-200">
                                                    <div className="flex flex-col gap-1">
                                                        <h4 className="text-sm font-semibold text-brand-darker uppercase tracking-wider">Municipios</h4>
                                                        {selectedRegion ? (
                                                            <p className="text-xs text-gray-500 italic">Mostrando municipios de: <span className="font-semibold text-brand-darker">{selectedRegion.nombre}</span></p>
                                                        ) : (
                                                            <p className="text-xs text-gray-500 italic">Selecciona una región arriba.</p>
                                                        )}
                                                    </div>

                                                    {selectedRegion && (
                                                        <div className="flex flex-col gap-2">
                                                            {selectedRegion.municipios.map((mun, mIdx) => {
                                                                const isMunChecked = !hiddenMunicipios.includes(normalizarTexto(mun.nombre));
                                                                const isMunExpanded = expandedMunicipio === mun.nombre;
                                                                const regionColor = REGIONES[selectedRegion.nombre.toUpperCase()]?.color || '#0B5139';

                                                                return (
                                                                    <div key={mIdx} className="flex flex-col rounded-none border border-gray-200 bg-white shadow-sm overflow-hidden">
                                                                        <div 
                                                                            className={`flex items-center justify-between p-3 pl-4 cursor-pointer transition-colors ${isMunExpanded ? '' : 'hover:bg-gray-50'}`}
                                                                            style={isMunExpanded ? { backgroundColor: `${regionColor}15` } : {}}
                                                                            onClick={() => {
                                                                                setExpandedMunicipio(isMunExpanded ? null : mun.nombre);
                                                                                if (mun.coordenadas) {
                                                                                    handleZoom(mun.coordenadas.lat, mun.coordenadas.lng, mun.coordenadas.zoom || 14);
                                                                                }
                                                                            }}
                                                                        >
                                                                            <div className="flex items-center gap-3">
                                                                                <input 
                                                                                    type="checkbox" 
                                                                                    checked={isMunChecked} 
                                                                                    onChange={(e) => toggleMunicipioCheckbox(mun.nombre, e)}
                                                                                    onClick={(e) => e.stopPropagation()}
                                                                                    className="w-4 h-4 rounded cursor-pointer shrink-0"
                                                                                    style={{ color: regionColor }}
                                                                                />
                                                                                <span className="text-[13px] text-brand-dark font-medium">{mun.nombre}</span>
                                                                            </div>
                                                                            <svg viewBox="0 0 24 24" className={`w-4 h-4 shrink-0 text-brand-ink transition-transform duration-200 ${isMunExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                                                        </div>

                                                                        {isMunExpanded && (
                                                                            <div className="p-4 bg-brand-light/20 flex flex-col gap-4 text-[12px] border-t border-brand-panel/50">
                                                                                {mun.agricultura && (
                                                                                    <div>
                                                                                        <span className="font-semibold text-brand-text flex items-center gap-2 mb-1">
                                                                                            <svg className="w-3.5 h-3.5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                                                                                            Agricultura
                                                                                        </span>
                                                                                        <p className="text-brand-ink">{mun.agricultura.productos}</p>
                                                                                    </div>
                                                                                )}
                                                                                {mun.artesanias && (
                                                                                    <div>
                                                                                        <span className="font-semibold text-brand-text flex items-center gap-2 mb-1">
                                                                                            <svg className="w-3.5 h-3.5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                                                                            Artesanías
                                                                                        </span>
                                                                                        <p className="text-brand-ink">{mun.artesanias.productos}</p>
                                                                                    </div>
                                                                                )}
                                                                                {mun.turismo_potencial && (
                                                                                    <div>
                                                                                        <span className="font-semibold text-brand-text flex items-center gap-2 mb-1">
                                                                                            <svg className="w-3.5 h-3.5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                                            Turismo
                                                                                        </span>
                                                                                        <p className="text-brand-ink">{mun.turismo_potencial.atracciones}</p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {/* --- CONTENIDO NEGOCIOS --- */}
                                        {layerKey === 'negocios' && (
                                            <div className="flex flex-col gap-4">
                                                <AnimatePresence mode="wait">
                                                    {selectedTrade ? (
                                                        <TradeCard key={`trade-${selectedTrade.id}`} trade={selectedTrade} />
                                                    ) : (
                                                        <motion.div 
                                                            key="empty-state"
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-none border border-dashed border-gray-300 text-gray-500"
                                                        >
                                                            <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                            <p className="text-xs text-center font-medium">Selecciona un marcador en el mapa para ver los detalles del negocio.</p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default SlideRight;
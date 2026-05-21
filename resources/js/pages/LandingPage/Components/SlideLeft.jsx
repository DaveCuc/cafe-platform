import React, { useState } from 'react';


const SlideLeft = ({ capasActivas, setCapasActivas, mapRef, setRightSlideOpen, setActiveInfoPanel }) => {
    // Estado para controlar si el menú está abierto o cerrado
    const [isOpen, setIsOpen] = useState(true);

    const handleMapAction = (layer, lat, lng, zoom, hasJson = false) => {
        const isActiveNow = !capasActivas[layer];
        setCapasActivas(prev => ({ ...prev, [layer]: isActiveNow }));
        
        if (mapRef?.current) {
            mapRef.current.setView([lat, lng], zoom);
        }

        if (hasJson && isActiveNow) {
            setActiveInfoPanel(layer);
            setRightSlideOpen(true);
        } else if (hasJson && !isActiveNow) {
            setActiveInfoPanel(prev => prev === layer ? null : prev);
        }
    };

    return (
        <div className={`relative h-full w-72 shrink-0 bg-white shadow-2xl z-[1001] transition-all duration-300 ease-in-out flex flex-col ${isOpen ? 'ml-0' : '-ml-72'}`}>

            {/* Pestaña flotante que sobresale para abrir/cerrar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-1/2 -right-10 -translate-y-1/2 flex items-center justify-center w-10 h-16 bg-white rounded-r-xl shadow-[4px_0_6px_-1px_rgba(0,0,0,0.2)] text-brand-text hover:text-brand hover:bg-brand-light transition-all border border-l-0 border-brand-panel z-[1002]"
                title={isOpen ? "Cerrar Mapas" : "Abrir Mapas"}
            >
                <svg viewBox="0 0 24 24" className={`w-6 h-6 transition-transform duration-300 ${isOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {/* Cabecera: Título */}
            <div className="pt-24 flex items-center p-5 border-b border-brand-panel">
                <h2 className="text-2xl font-semibold text-brand-text">Mapa</h2>
            </div>





            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">

                <button
                    onClick={() => handleMapAction('reserva', 18.11111, -97.179541, 9, true)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium shadow-sm ${capasActivas?.reserva ? 'bg-brand-soft text-white' : 'text-brand-ink hover:bg-brand-panel hover:text-brand-text'}`}
                >
                    Reserva de la Biosfera
                </button>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-brand-dark border-b border-brand-panel pb-2">Regiones</h3>
                    <button
                        onClick={() => handleMapAction('general', 18.11111, -97.179541, 9, true)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium shadow-sm ${capasActivas?.general ? 'bg-brand-soft text-white' : 'text-brand-ink hover:bg-brand-panel hover:text-brand-text'}`}
                    >
                        General
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-brand-dark border-b border-brand-panel pb-2">Rutas Turisticas</h3>
                    {/* Rutas */}

                    {/* Ruta 1: Onix y Sal */}
                    <button
                        onClick={() => handleMapAction('ruta1', 18.3273, -97.4752, 13)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium shadow-sm ${capasActivas?.ruta1 ? 'bg-brand-soft text-white' : 'text-brand-ink hover:bg-brand-panel hover:text-brand-text'}`}
                    >
                        Onix y Sal
                    </button>

                    {/* Ruta 2: Dinosaurios */}
                    <button
                        onClick={() => handleMapAction('ruta2', 18.3145, -97.6149, 13)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium shadow-sm ${capasActivas?.ruta2 ? 'bg-brand-soft text-white' : 'text-brand-ink hover:bg-brand-panel hover:text-brand-text'}`}
                    >
                        Dinosaurios
                    </button>

                    {/* Ruta 3: Mezcal y Barro */}
                    <button
                        onClick={() => handleMapAction('ruta3', 18.2252, -97.4865, 13)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium shadow-sm ${capasActivas?.ruta3 ? 'bg-brand-soft text-white' : 'text-brand-ink hover:bg-brand-panel hover:text-brand-text'}`}
                    >
                        Mezcal y Barro
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-brand-dark border-b border-brand-panel pb-2">Puntos de Interés</h3>



                    <button
                        onClick={() => handleMapAction('puntos', 18.11111, -97.179541, 9)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium shadow-sm ${capasActivas?.puntos ? 'bg-brand-soft text-white' : 'text-brand-ink hover:bg-brand-panel hover:text-brand-text'}`}
                    >
                        Localidades
                    </button>


                    <button
                        onClick={() => handleMapAction('puntos', 18.11111, -97.179541, 9)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-colors font-medium shadow-sm ${capasActivas?.puntos ? 'bg-brand-soft text-white' : 'text-brand-ink hover:bg-brand-panel hover:text-brand-text'}`}
                    >
                        Negocios
                    </button>

                </div>

            </div>












        </div>
    );
}

export default SlideLeft;
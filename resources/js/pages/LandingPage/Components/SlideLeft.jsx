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
                className="absolute top-1/2 -right-10 -translate-y-1/2 flex items-center justify-center w-10 h-16 bg-brand text-white rounded-none shadow-lg hover:bg-brand-dark transition-all border border-l-0 border-brand z-[1002]"
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





            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-gray-50">

                <div className="flex flex-col rounded-none border border-gray-200 bg-white shadow-sm overflow-hidden shrink-0">
                    <button
                        onClick={() => handleMapAction('reserva', 18.11111, -97.179541, 9, true)}
                        className={`w-full text-left p-4 transition-colors font-semibold text-[16px] ${capasActivas?.reserva ? 'bg-brand text-white' : 'text-brand-darker hover:bg-gray-100'}`}
                    >
                        Reserva de la Biosfera
                    </button>
                </div>

                <div className="flex flex-col rounded-none border border-gray-200 bg-white shadow-sm overflow-hidden shrink-0">
                    <div className="p-3 bg-gray-100/50 border-b border-gray-200">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Regiones</h3>
                    </div>
                    <button
                        onClick={() => handleMapAction('general', 18.11111, -97.179541, 9, true)}
                        className={`w-full text-left px-4 py-3 transition-colors font-medium text-sm ${capasActivas?.general ? 'bg-brand text-white' : 'text-brand-darker hover:bg-gray-50'}`}
                    >
                        Vista General
                    </button>
                </div>

                <div className="flex flex-col rounded-none border border-gray-200 bg-white shadow-sm overflow-hidden shrink-0">
                    <div className="p-3 bg-gray-100/50 border-b border-gray-200">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rutas Turísticas</h3>
                    </div>

                    <button
                        onClick={() => handleMapAction('ruta1', 18.3273, -97.4752, 13)}
                        className={`w-full text-left px-4 py-3 transition-colors font-medium text-sm border-b border-gray-100 ${capasActivas?.ruta1 ? 'bg-brand text-white' : 'text-brand-darker hover:bg-gray-50'}`}
                    >
                        Onix y Sal
                    </button>

                    <button
                        onClick={() => handleMapAction('ruta2', 18.3145, -97.6149, 13)}
                        className={`w-full text-left px-4 py-3 transition-colors font-medium text-sm border-b border-gray-100 ${capasActivas?.ruta2 ? 'bg-brand text-white' : 'text-brand-darker hover:bg-gray-50'}`}
                    >
                        Dinosaurios
                    </button>

                    <button
                        onClick={() => handleMapAction('ruta3', 18.2252, -97.4865, 13)}
                        className={`w-full text-left px-4 py-3 transition-colors font-medium text-sm ${capasActivas?.ruta3 ? 'bg-brand text-white' : 'text-brand-darker hover:bg-gray-50'}`}
                    >
                        Mezcal y Barro
                    </button>
                </div>

                <div className="flex flex-col rounded-none border border-gray-200 bg-white shadow-sm overflow-hidden shrink-0">
                    <div className="p-3 bg-gray-100/50 border-b border-gray-200">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Puntos de Interés</h3>
                    </div>

                    {/**

                    <button
                        onClick={() => handleMapAction('puntos', 18.11111, -97.179541, 9)}
                        className={`w-full text-left px-4 py-3 transition-colors font-medium text-sm border-b border-gray-100 ${capasActivas?.puntos ? 'bg-brand text-white' : 'text-brand-darker hover:bg-gray-50'}`}
                    >
                        Localidades
                    </button>
                    **/}

                    <button
                        onClick={() => handleMapAction('negocios', 18.11111, -97.179541, 9, true)}
                        className={`w-full text-left px-4 py-3 transition-colors font-medium text-sm ${capasActivas?.negocios ? 'bg-brand text-white' : 'text-brand-darker hover:bg-gray-50'}`}
                    >
                        Negocios
                    </button>
                </div>

            </div>

        </div>
    );
}

export default SlideLeft;
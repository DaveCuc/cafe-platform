import { useState, useRef, useEffect } from "react";
import SlideLeft from "./SlideLeft";
import ReservaMap from "./ReservaMap";
import SlideRight from "./SlideRight";
import TradeNav from "./TradeNav";

const ContainerMap = () => {
    // Estado de capas del mapa:
    // reserva: false  — PENDIENTE: tehmap.geojson (Reserva de la Biosfera) comentado temporalmente
    // general: false  — PENDIENTE: vista de regiones coloreadas comentada temporalmente
    // ruta1/2/3: false — PENDIENTE: rutas cafetaleras GeoJSON pendientes de subir
    // puntos: false   — PENDIENTE: puntosinteres.geojson con datos cafetaleros pendiente
    // negocios: activo por defecto — muestra caficultores y tiendas registradas en la plataforma
    const [capasActivas, setCapasActivas] = useState({ general: false, reserva: false, ruta1: false, ruta2: false, ruta3: false, puntos: false, negocios: false });
    const mapRef = useRef(null);

    // Estado para controlar la visibilidad del SlideRight
    const [rightSlideOpen, setRightSlideOpen] = useState(true);
    // Estado para filtrar/ocultar municipios del mapa
    const [hiddenMunicipios, setHiddenMunicipios] = useState([]);
    const [hiddenRegions, setHiddenRegions] = useState([]);
    // PENDIENTE: activeInfoPanel inicia en null porque el panel 'reserva' está comentado
    // Cuando se reactive la capa reserva, cambiar a: setActiveInfoPanel('reserva')
    const [activeInfoPanel, setActiveInfoPanel] = useState(null);

    // Estado para los negocios (trades)
    const [trades, setTrades] = useState([]);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [activeCategories, setActiveCategories] = useState(["Todos"]);

    // Cargar negocios desde la API
    useEffect(() => {
        fetch('/api/directorio')
            .then(res => res.json())
            .then(data => setTrades(data))
            .catch(err => console.error("Error fetching trades:", err));
    }, []);

    const filteredTrades = activeCategories.includes("Todos") 
        ? trades 
        : trades.filter(trade => {
            const category = trade.giros?.[0]?.name || trade.giro;
            return activeCategories.includes(category);
        });

    return (
        <section className="relative z-0">
            <div className="flex w-full h-[100vh] overflow-hidden z-0">
                <TradeNav 
                    capasActivas={capasActivas} 
                    activeCategories={activeCategories} 
                    setActiveCategories={setActiveCategories} 
                />
                <SlideLeft
                    capasActivas={capasActivas}
                    setCapasActivas={setCapasActivas}
                    mapRef={mapRef}
                    setRightSlideOpen={setRightSlideOpen}
                    setActiveInfoPanel={setActiveInfoPanel}
                />
                <div className="flex-1 relative h-full z-0">
                    <ReservaMap
                        capasActivas={capasActivas}
                        mapRef={mapRef}
                        hiddenMunicipios={hiddenMunicipios}
                        hiddenRegions={hiddenRegions}
                        trades={filteredTrades}
                        setSelectedTrade={setSelectedTrade}
                        setRightSlideOpen={setRightSlideOpen}
                        setActiveInfoPanel={setActiveInfoPanel}
                    />
                </div>
                <SlideRight
                    mapRef={mapRef}
                    rightSlideOpen={rightSlideOpen}
                    setRightSlideOpen={setRightSlideOpen}
                    hiddenMunicipios={hiddenMunicipios}
                    setHiddenMunicipios={setHiddenMunicipios}
                    hiddenRegions={hiddenRegions}
                    setHiddenRegions={setHiddenRegions}
                    activeInfoPanel={activeInfoPanel}
                    setActiveInfoPanel={setActiveInfoPanel}
                    capasActivas={capasActivas}
                    selectedTrade={selectedTrade}
                    setSelectedTrade={setSelectedTrade}
                />
            </div>
        </section>
    );
}

export default ContainerMap;
import { useState, useRef, useEffect } from "react";
import SlideLeft from "./SlideLeft";
import ReservaMap from "./ReservaMap";
import SlideRight from "./SlideRight";
import TradeNav from "./TradeNav";

const ContainerMap = () => {
    const [capasActivas, setCapasActivas] = useState({ general: false, reserva: true, ruta1: false, ruta2: false, ruta3: false, puntos: false, negocios: false });
    const mapRef = useRef(null);

    // Estado para controlar la visibilidad del SlideRight
    const [rightSlideOpen, setRightSlideOpen] = useState(true);
    // Estado para filtrar/ocultar municipios del mapa
    const [hiddenMunicipios, setHiddenMunicipios] = useState([]);
    const [hiddenRegions, setHiddenRegions] = useState([]);
    // Estado para saber qué información cargar en el SlideRight (ahora funciona como expandedLayer)
    const [activeInfoPanel, setActiveInfoPanel] = useState('reserva');

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
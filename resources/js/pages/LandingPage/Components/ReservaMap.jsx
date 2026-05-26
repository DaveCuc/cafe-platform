import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import GeneralMap from './GeneralMap';
import RutasMap from './RutasMap';
import PuntosInteresMap from './PuntosInteresMap';
import { MarkerMap } from './Marker';

// Importante: Para que los iconos de los marcadores por defecto se vean bien en Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Componente para recalcular el tamaño del mapa al redimensionarse su contenedor
const MapResizer = () => {
    const map = useMap();
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            map.invalidateSize();
        });
        resizeObserver.observe(map.getContainer());
        return () => resizeObserver.disconnect();
    }, [map]);
    return null;
};

const ReservaMap = ({ capasActivas, mapRef, hiddenMunicipios, hiddenRegions, trades, setSelectedTrade, setRightSlideOpen, setActiveInfoPanel }) => {
    const [geoJsonData, setGeoJsonData] = useState(null);

    const handleTradeClick = (trade) => {
        setSelectedTrade(trade);
        setActiveInfoPanel('negocios');
        setRightSlideOpen(true);
    };

    useEffect(() => {
        // Al estar en public/Mapas/tehmap.geojson, la ruta es directamente '/Mapas/tehmap.geojson'
        fetch('/Mapas/tehmap.geojson')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar el archivo geojson');
                }
                return response.json();
            })
            .then(data => {
                setGeoJsonData(data);
            })
            .catch(error => {
                console.error("Hubo un problema con la carga del mapa:", error);
            });
    }, []);

    // Coordenadas aproximadas de Tehuacán para centrar el mapa inicialmente
    const centroTehuacan = [18.11111, -97.179541];

    return (
        <div className="map-wrapper w-full h-full">
            <MapContainer
                center={centroTehuacan}
                zoom={9}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={true}
                zoomControl={false}
                ref={mapRef}
            >
                <MapResizer />
                <ZoomControl position="bottomright" />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {capasActivas?.general && <GeneralMap hiddenMunicipios={hiddenMunicipios} hiddenRegions={hiddenRegions} />}
                <RutasMap capasActivas={capasActivas} />
                <PuntosInteresMap capasActivas={capasActivas} />

                {/* Marcadores de Negocios */}
                {capasActivas?.negocios && trades?.map((trade) => (
                    <MarkerMap 
                        key={trade.id} 
                        trade={trade} 
                        onClick={handleTradeClick}
                    />
                ))}

                {/* Solo renderizamos el GeoJSON si la data ya fue cargada */}
                {capasActivas?.reserva && geoJsonData && (
                    <GeoJSON
                        data={geoJsonData}
                        style={() => ({
                            color: '#2c3e50',
                            weight: 2,
                            fillColor: '#3498db',
                            fillOpacity: 0.5
                        })}
                        onEachFeature={(feature, layer) => {
                            if (feature.properties?.nombre || feature.properties?.name) {
                                layer.bindPopup(`<b>${feature.properties?.nombre || feature.properties?.name}</b>`);
                            }
                        }}
                    />
                )}
            </MapContainer>
        </div>
    );
}

export default ReservaMap;
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import GeneralMap from './GeneralMap';
// PENDIENTE: Rutas del café — descomenta cuando existan archivos GeoJSON de rutas cafetaleras en public/Mapas/
// import RutasMap from './RutasMap';
// PENDIENTE: Puntos de interés — descomenta cuando exista puntosinteres.geojson con datos de caficultores
// import PuntosInteresMap from './PuntosInteresMap';
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

// Leyenda flotante: informa al usuario que el mapa está en construcción
const MapLegend = () => (
    <div
        style={{
            position: 'absolute',
            bottom: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            background: 'rgba(255,255,255,0.97)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px 18px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.13)',
            minWidth: '260px',
            maxWidth: '340px',
            pointerEvents: 'none',
        }}
    >
        <p style={{ fontWeight: '700', fontSize: '13px', color: '#0B5139', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Leyenda
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#374151' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#2ecc71', display: 'inline-block', flexShrink: 0, border: '2px solid #27ae60' }}></span>
                Región Sierra Negra (Zona cafetalera)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#374151' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#3498db', display: 'inline-block', flexShrink: 0, border: '2px solid #2980b9' }}></span>
                Región Septentrional
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#374151' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#e67e22', display: 'inline-block', flexShrink: 0, border: '2px solid #d35400' }}></span>
                Región Valle Zapotitlán-Tehuacán
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#374151' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#9b59b6', display: 'inline-block', flexShrink: 0, border: '2px solid #8e44ad' }}></span>
                Región Chazumba
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                <span style={{ width: '14px', height: '14px', borderRadius: '3px', background: '#f3f4f6', display: 'inline-block', flexShrink: 0, border: '1.5px dashed #9ca3af' }}></span>
                Otros distritos (información pendiente)
            </div>
        </div>
        <p style={{ marginTop: '10px', fontSize: '11px', color: '#9ca3af', borderTop: '1px solid #f3f4f6', paddingTop: '8px' }}>
            📍 Activa «Caficultores y Tiendas» para ver ubicaciones registradas
        </p>
    </div>
);

const ReservaMap = ({ capasActivas, mapRef, hiddenMunicipios, hiddenRegions, trades, setSelectedTrade, setRightSlideOpen, setActiveInfoPanel }) => {
    // PENDIENTE: tehmap.geojson corresponde a la Reserva de la Biosfera Tehuacán-Cuicatlán.
    // No aplica directamente a la Red de Caficultores. Descomenta cuando se requiera mostrar
    // el polígono oficial de la reserva como referencia geográfica.
    // const [geoJsonData, setGeoJsonData] = useState(null);

    const handleTradeClick = (trade) => {
        setSelectedTrade(trade);
        setActiveInfoPanel('negocios');
        setRightSlideOpen(true);
    };

    // PENDIENTE: Carga de tehmap.geojson (Reserva de la Biosfera) — comentada temporalmente
    // Para reactivar: descomenta el useState de geoJsonData arriba y este useEffect completo
    /*
    useEffect(() => {
        fetch('/Mapas/tehmap.geojson')
            .then(response => {
                if (!response.ok) throw new Error('Error al cargar el archivo geojson');
                return response.json();
            })
            .then(data => setGeoJsonData(data))
            .catch(error => console.error("Hubo un problema con la carga del mapa:", error));
    }, []);
    */

    // Coordenadas aproximadas de Tehuacán para centrar el mapa inicialmente
    const centroTehuacan = [18.11111, -97.179541];

    return (
        <div className="map-wrapper w-full h-full" style={{ position: 'relative' }}>
            {/* Leyenda flotante — siempre visible sobre el mapa */}
            <MapLegend />

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

                {/* Capa de regiones municipales — activa según toggle */}
                {capasActivas?.general && <GeneralMap hiddenMunicipios={hiddenMunicipios} hiddenRegions={hiddenRegions} />}

                {/* PENDIENTE: RutasMap — descomenta cuando existan GeoJSON de rutas cafetaleras */}
                {/* <RutasMap capasActivas={capasActivas} /> */}

                {/* PENDIENTE: PuntosInteresMap — descomenta cuando existan datos de puntos cafetaleros */}
                {/* <PuntosInteresMap capasActivas={capasActivas} /> */}

                {/* Marcadores de Negocios/Caficultores registrados en la plataforma */}
                {capasActivas?.negocios && trades?.map((trade) => (
                    <MarkerMap 
                        key={trade.id} 
                        trade={trade} 
                        onClick={handleTradeClick}
                    />
                ))}

                {/* PENDIENTE: Polígono Reserva de la Biosfera (tehmap.geojson)
                    Descomenta cuando se requiera mostrar el límite oficial de la reserva.
                    También debes descomentar: useState(geoJsonData) y su useEffect de carga.
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
                */}
            </MapContainer>
        </div>
    );
}

export default ReservaMap;
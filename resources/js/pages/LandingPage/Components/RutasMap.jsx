import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';

const RutasMap = ({ capasActivas }) => {
    const [rutas, setRutas] = useState({ ruta1: null, ruta2: null, ruta3: null });

    useEffect(() => {
        // Cargar los GeoJSON de las rutas (si existen en public/Mapas/)
        Promise.all([
            fetch('/Mapas/ruta1.geojson').then(res => res.ok ? res.json() : null).catch(() => null),
            fetch('/Mapas/ruta2.geojson').then(res => res.ok ? res.json() : null).catch(() => null),
            fetch('/Mapas/ruta3.geojson').then(res => res.ok ? res.json() : null).catch(() => null)
        ]).then(([data1, data2, data3]) => {
            setRutas({ ruta1: data1, ruta2: data2, ruta3: data3 });
        });
    }, []);

    return (
        <>
            {capasActivas?.ruta1 && rutas.ruta1 && (
                <GeoJSON 
                    data={rutas.ruta1} 
                    style={{ color: '#991B1B', weight: 4 }} 
                    onEachFeature={(feature, layer) => {
                        if (feature.properties?.nombre || feature.properties?.name) {
                            layer.bindPopup(`<b>${feature.properties?.nombre || feature.properties?.name}</b><br/>Ruta 1: Trazabilidad`);
                        }
                    }}
                />
            )}
            {capasActivas?.ruta2 && rutas.ruta2 && (
                <GeoJSON 
                    data={rutas.ruta2} 
                    style={{ color: '#15803D', weight: 4 }} 
                    onEachFeature={(feature, layer) => {
                        if (feature.properties?.nombre || feature.properties?.name) {
                            layer.bindPopup(`<b>${feature.properties?.nombre || feature.properties?.name}</b><br/>Ruta 2: Capacitación`);
                        }
                    }}
                />
            )}
            {capasActivas?.ruta3 && rutas.ruta3 && (
                <GeoJSON 
                    data={rutas.ruta3} 
                    style={{ color: '#6B21A8', weight: 4 }} 
                    onEachFeature={(feature, layer) => {
                        if (feature.properties?.nombre || feature.properties?.name) {
                            layer.bindPopup(`<b>${feature.properties?.nombre || feature.properties?.name}</b><br/>Ruta 3: Comercialización`);
                        }
                    }}
                />
            )}
        </>
    );
};

export default RutasMap;
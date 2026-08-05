import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';

const PuntosInteresMap = ({ capasActivas }) => {
    const [puntos, setPuntos] = useState({ puntos: null });

    useEffect(() => {
        // Cargar los GeoJSON de las rutas (si existen en public/Mapas/)
        Promise.all([
            fetch('/Mapas/puntosinteres.geojson').then(res => res.ok ? res.json() : null).catch(() => null)
        ]).then(([data1]) => {
            setPuntos({ puntos: data1 });
        });
    }, []);

    return (
        <>
            {capasActivas?.puntos && puntos.puntos && (
                <GeoJSON
                    data={puntos.puntos}
                    style={{ color: '#991B1B', weight: 4 }}
                    onEachFeature={(feature, layer) => {
                        if (feature.properties?.nombre || feature.properties?.name) {
                            layer.bindPopup(`<b>${feature.properties?.nombre || feature.properties?.name}</b><br/>Puntos de interes`);
                        }
                    }}
                />
            )}
        </>
    )
}
export default PuntosInteresMap
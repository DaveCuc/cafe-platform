import React, { useState, useEffect } from 'react';
import { GeoJSON } from 'react-leaflet';

// 1. Definimos las regiones, sus colores y sus municipios
export const REGIONES = {
    "REGIÓN SEPTENTRIONAL": {
        color: "#1E40AF", // Deep Navy Blue
        municipios: [
            "Tecamachalco", "Palmar de Bravo", "Yehualtepec", "Tlacotepec de Benito Juárez",
            "Tepanco de López", "Santiago Miahuatlán", "Cañada Morelos", "Chapulco"
        ]
    },
    "REGIÓN DEL VALLE ZAPOTITLÁN-TEHUACÁN": {
        color: "#B45309", // Warm Amber / Ocre
        municipios: [
            "Tehuacán", "Zapotitlán", "San Gabriel Chilac", "San José Miahuatlán",
            "Juan N. Méndez", "Atexcal", "Caltepec"
        ]
    },
    "REGIÓN SIERRA NEGRA": {
        color: "#15803D", // Deep Forest Green
        municipios: [
            "Ajalpan", "Coyomeapan", "Coxcatlán", "Zinacatepec"
        ]
    },
    "REGIÓN CHAZUMBA": {
        color: "#6B21A8", // Deep Royal Purple
        municipios: [
            "San Pedro Tequixtepec", "Santiago Chazumba", "Totoltepec de Guerrero"
        ]
    },
    "DISTRITO 3": {
        color: "#A16207", // Warm Bronze Ocre
        municipios: [
            "Concepción Buena Vista", "San Juan Bautista Coixtlahuaca",
            "San Miguel Tequixtepec", "Tepelmeme Villa De Morelos"
        ]
    },
    "DISTRITO 4": {
        color: "#991B1B", // Deep Crimson Red
        municipios: [
            "Teotitlán de Flores Magón", "San Juan de los Cues", "San Martín Toxpalan",
            "San Antonio Nanahuatipam", "Santa María Tecomavaca", "Santa María Ixcatlan",
            "Mazatlan Villa de Flores"
        ]
    },
    "DISTRITO 5": {
        color: "#0F766E", // Deep Teal
        municipios: [
            "San Juan Tepeuxila", "San Pedro Jaltepetongo", "Santiago Nacaltepec",
            "Santa Maria Papalo", "Santos Reyes Papalo", "Concepción Papalo",
            "San Juan Bautista Cuicatlán", "Santa María Texcatitlan", "Valerio Trujano",
            "San Pedro Jocotipac"
        ]
    },
    "DISTRITO 10": {
        color: "#34495e", // Azul oscuro/Gris
        municipios: [
            "San Pedro Cántaros Coxcaltepec", "Santiago Huauclilla", "Santiago Apoala",
            "Santa Maria Apazco", "Asunción Nochixtlan", "San Miguel Huautla"
        ]
    },
    "DISTRITO 11": {
        color: "#d35400", // Calabaza
        municipios: [
            "Santa Catarina Zapoquila", "San Juan Bautista Atatlahuaca"
        ]
    }
};

// 2. Función auxiliar para normalizar texto (quita acentos y mayúsculas para evitar errores de tipeo al comparar)
const normalizarTexto = (texto) => {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
};

// 3. Crear un mapa de búsqueda rápida { "tehuacan": { region: "...", color: "..." } }
const mapaMunicipios = {};
Object.entries(REGIONES).forEach(([nombreRegion, datos]) => {
    datos.municipios.forEach(municipio => {
        mapaMunicipios[normalizarTexto(municipio)] = {
            region: nombreRegion,
            color: datos.color,
            nombreOriginal: municipio
        };
    });
});

const GeneralMap = ({ hiddenMunicipios = [], hiddenRegions = [] }) => {
    const [mapas, setMapas] = useState({ general: null });

    // Cargar los archivos GeoJSON al montar el componente
    useEffect(() => {
        Promise.all([
            fetch('/Mapas/general.geojson').then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
        ])
            .then(([dataGeneral]) => {
                setMapas({ general: dataGeneral });
            })
            .catch(error => console.error("Error cargando mapas:", error));
    }, []);

    // Función para obtener la información de un municipio si está en nuestra lista
    const getMunicipioInfo = (feature) => {
        // INEGI normalmente usa NOMGEO, pero cubrimos 'name' por si acaso
        const nombreFeature = feature.properties?.NOMGEO || feature.properties?.name;
        const nombreNormalizado = normalizarTexto(nombreFeature);
        return mapaMunicipios[nombreNormalizado];
    };

    // Filtro: Solo dibuja el polígono si el municipio y la región no están ocultos
    const filtrarMunicipios = (feature) => {
        const info = getMunicipioInfo(feature);
        if (!info) return false;

        const regionNormalizada = normalizarTexto(info.region);
        if (hiddenRegions.includes(regionNormalizada)) {
            return false;
        }

        // Si el municipio está oculto, no lo renderizamos
        const nombreNormalizado = normalizarTexto(info.nombreOriginal);
        if (hiddenMunicipios.includes(nombreNormalizado)) {
            return false;
        }

        return true;
    };

    // Estilo: Asigna el color correspondiente a la región
    const estiloRegiones = (feature) => {
        const info = getMunicipioInfo(feature);
        return {
            color: 'white',       // Borde blanco para separar municipios
            weight: 1,
            fillColor: info.color,
            fillOpacity: 0.7     // Ligeramente transparente
        };
    };

    // Popups: Muestra el nombre y la región al hacer clic
    const onEachFeature = (feature, layer) => {
        const info = getMunicipioInfo(feature);
        if (info) {
            layer.bindPopup(
                `<div style="text-align: center;">
                    <b>${info.nombreOriginal}</b><br/>
                    <span style="color: ${info.color}; font-weight: bold; font-size: 0.9em;">
                        ${info.region}
                    </span>
                </div>`
            );
        }
    };

    // React-Leaflet's GeoJSON component is immutable y no reevalúa el prop `filter` automáticamente.
    // Usamos una key dinámica para forzar a React a destruir y recrear el componente cuando cambian los filtros, logrando un cambio en tiempo real.
    const geoJsonKey = `geojson-general-${hiddenMunicipios.join('-')}-${hiddenRegions.join('-')}`;

    return (
        <>
            {mapas.general && (
                <GeoJSON
                    key={geoJsonKey}
                    data={mapas.general}
                    filter={filtrarMunicipios}
                    style={estiloRegiones}
                    onEachFeature={onEachFeature}
                />
            )}
        </>
    );
}

export default GeneralMap;
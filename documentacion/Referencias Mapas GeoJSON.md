# Referencias: Implementación de Mapas con JSON y GeoJSON

> Referencia técnica directa. Describe **qué hace** cada pieza del sistema de mapas, no cómo aprenderlo ni cómo usarlo paso a paso. Para entender el contexto general del mapa, ver `Explicacion LandingPage.md`.

---

## Archivos GeoJSON activos

Ubicación: `public/Mapas/`

| Archivo | Tipo de geometría | Consumido por |
|---|---|---|
| `general.geojson` | `MultiPolygon` — divisiones municipales INEGI | `GeneralMap.jsx` |
| `tehmap.geojson` | `MultiPolygon` — polígono de la Reserva de la Biosfera | `ReservaMap.jsx` |
| `ruta1.geojson` | `LineString` — trazado Ruta Onix y Sal | `RutasMap.jsx` |
| `ruta2.geojson` | `LineString` — trazado Ruta Dinosaurios | `RutasMap.jsx` |
| `ruta3.geojson` | `LineString` — trazado Ruta Mezcal y Barro | `RutasMap.jsx` |
| `puntosinteres.geojson` | `Point` — coordenadas de localidades de interés | `PuntosInteresMap.jsx` |

---

## Estructura GeoJSON esperada

### FeatureCollection (formato raíz)

```json
{
  "type": "FeatureCollection",
  "features": [ ...Feature[] ]
}
```

`type` — siempre la cadena literal `"FeatureCollection"`.  
`features` — arreglo de objetos `Feature` (puede estar vacío).

---

### Feature con geometría de punto (`Point`)

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-97.475198, 18.327338, 0]
  },
  "properties": {
    "name": "Zapotitlán Salinas"
  }
}
```

`coordinates` — arreglo `[longitud, latitud, altitud_opcional]`. **Leaflet invierte el orden internamente** (espera `[lat, lng]`), pero GeoJSON siempre va `[lng, lat]`.  
`properties.name` — clave leída por `PuntosInteresMap.jsx` y `RutasMap.jsx` para mostrar en el popup. Alternativa aceptada: `properties.nombre`.

---

### Feature con geometría de línea (`LineString`)

```json
{
  "type": "Feature",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-97.5, 18.3],
      [-97.6, 18.4],
      [-97.7, 18.35]
    ]
  },
  "properties": {
    "nombre": "Tramo principal"
  }
}
```

Usado en `ruta1.geojson`, `ruta2.geojson`, `ruta3.geojson`.  
`style` en `RutasMap.jsx` asigna un color fijo por ruta (`color: '#e74c3c'`, `'#2ecc71'`, `'#9b59b6'`) y un grosor `weight: 4`.

---

### Feature con geometría de polígono (`Polygon` / `MultiPolygon`)

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [-97.5, 18.3],
        [-97.6, 18.4],
        [-97.7, 18.35],
        [-97.5, 18.3]
      ]
    ]
  },
  "properties": {
    "NOMGEO": "Tehuacán"
  }
}
```

`properties.NOMGEO` — clave INEGI estándar leída por `GeneralMap.jsx` para identificar el municipio. Alternativa de respaldo: `properties.name`.  
El polígono **debe cerrarse**: el último par de coordenadas debe ser igual al primero.  
`MultiPolygon` — igual que `Polygon` pero `coordinates` es un arreglo de arreglos de anillos.

---

## Cómo se carga un archivo GeoJSON en el componente

```js
// Ejemplo de GeneralMap.jsx y RutasMap.jsx
useEffect(() => {
    fetch('/Mapas/general.geojson')           // Ruta pública desde public/
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();                // Parsea el texto en objeto JS
        })
        .then(data => setMapas({ general: data }))
        .catch(error => console.error("Error cargando mapas:", error));
}, []);
```

`fetch('/Mapas/...')` — la barra inicial `/` resuelve desde la raíz del dominio (equivale a `public/Mapas/` en Laravel). No usar rutas relativas como `./Mapas/`.  
El segundo `.then(res => res.json())` — convierte la respuesta HTTP a un objeto JavaScript que `react-leaflet` puede consumir directamente.  
El `useEffect` con arreglo vacío `[]` — garantiza que la carga ocurra **una sola vez** al montar el componente.

---

## Cómo se renderiza con react-leaflet

```jsx
// Dentro del return del componente, envuelto en <MapContainer>
<GeoJSON
    key={geoJsonKey}           // Clave dinámica para forzar re-render al cambiar filtros
    data={mapas.general}       // Objeto JS con la FeatureCollection cargada del fetch
    filter={filtrarMunicipios} // Función (feature) => boolean — omite features que retornan false
    style={estiloRegiones}     // Función (feature) => objeto de estilo Leaflet
    onEachFeature={onEachFeature} // Función (feature, layer) — adjunta popups o eventos
/>
```

`data` — acepta directamente el objeto JSON parseado. No requiere transformación adicional.  
`filter` — se evalúa **una vez por feature** al momento del renderizado. Para que se re-evalúe al cambiar el estado, se usa `key` dinámica (ver abajo).  
`key` dinámica — `react-leaflet`'s `<GeoJSON />` es inmutable: no reevalúa `filter` ni `style` tras el primer render. Cambiar la `key` fuerza a React a **destruir y recrear** el componente con los nuevos datos.

```js
// GeneralMap.jsx — cómo se construye la key dinámica
const geoJsonKey = `geojson-general-${hiddenMunicipios.join('-')}-${hiddenRegions.join('-')}`;
```

---

## Cómo se filtran los polígonos por región

```js
// GeneralMap.jsx
const filtrarMunicipios = (feature) => {
    const info = getMunicipioInfo(feature);
    if (!info) return false;                          // Feature fuera del catálogo: ocultar

    if (hiddenRegions.includes(normalizarTexto(info.region))) return false;
    if (hiddenMunicipios.includes(normalizarTexto(info.nombreOriginal))) return false;

    return true;
};
```

La normalización (`normalizarTexto`) quita acentos y pasa a minúsculas para evitar errores de comparación:

```js
const normalizarTexto = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
```

`NOMGEO` de INEGI puede tener variaciones tipográficas (acentos, espacios). La normalización absorbe estas diferencias.

---

## Catálogo de regiones y municipios (JSON interno)

El objeto `REGIONES` en `GeneralMap.jsx` define qué municipios pertenecen a cada región y qué color hexadecimal se les asigna:

```js
export const REGIONES = {
    "REGIÓN SIERRA NEGRA": {
        color: "#2ecc71",
        municipios: ["Ajalpan", "Coyomeapan", "Coxcatlán", "Zinacatepec"]
    },
    // ... otras regiones
};
```

Para **agregar un municipio** a una región: agregarlo al arreglo `municipios` con el mismo nombre que aparece en `properties.NOMGEO` del archivo `general.geojson`.  
Para **cambiar el color** de una región: cambiar el valor `color` en este objeto.  
Para **agregar una región nueva**: agregar una entrada nueva con su nombre, color y listado de municipios. No requiere cambios en el archivo GeoJSON.

---

## Cómo agregar un punto de interés nuevo

Editar `public/Mapas/puntosinteres.geojson` y agregar una entrada al arreglo `features`:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-97.521000, 18.350000, 0]
  },
  "properties": {
    "name": "Nombre del lugar"
  }
}
```

`coordinates` — obtener con Google Maps: clic derecho en el lugar → copiar coordenadas → el primer número es **latitud**, el segundo es **longitud**. En GeoJSON el orden es `[longitud, latitud]`.

---

## Cómo agregar una ruta nueva

1. Crear el archivo `public/Mapas/ruta4.geojson` con geometría `LineString`.
2. En `RutasMap.jsx`, agregar al `Promise.all`:

```js
fetch('/Mapas/ruta4.geojson').then(res => res.ok ? res.json() : null).catch(() => null),
```

3. Agregar el estado `ruta4: null` al `useState`.
4. Agregar el bloque de renderizado condicional:

```jsx
{capasActivas?.ruta4 && rutas.ruta4 && (
    <GeoJSON
        data={rutas.ruta4}
        style={{ color: '#f39c12', weight: 4 }}
        onEachFeature={(feature, layer) => {
            layer.bindPopup(`<b>${feature.properties?.nombre || ''}</b><br/>Ruta Nueva`);
        }}
    />
)}
```

5. Exponer el toggle `ruta4` desde `ContainerMap.jsx` en el estado `capasActivas`.

---

## Herramientas externas para crear/editar GeoJSON

| Herramienta | URL | Uso recomendado |
|---|---|---|
| geojson.io | https://geojson.io | Dibujar polígonos, rutas y puntos visualmente y exportar como `.geojson` |
| QGIS | https://qgis.org | Editar capas complejas, exportar desde shapefiles INEGI |
| Mapshaper | https://mapshaper.org | Simplificar polígonos grandes para reducir tamaño de archivo |

`general.geojson` pesa 7 MB porque contiene todos los municipios de la región con alta resolución. Si el mapa carga lento, usar Mapshaper para reducir la cantidad de vértices.

# Documentación Detallada: Landing Page

La carpeta `resources/js/Pages/LandingPage` agrupa todas las pantallas públicas principales (que no requieren inicio de sesión) del proyecto. Está estructurada modularmente: cada sección grande (Artículos, Eventos, Negocio) tiene su propia carpeta con su página principal y sus subcomponentes.

A continuación se desglosa el funcionamiento y las conexiones de cada archivo.

---

## 1. Raíz (`LandingPage/`)
Estos archivos son las "Páginas Principales" (Inertia Pages). Reciben datos directamente desde los Controladores de Laravel y arman la estructura general llamando a componentes más pequeños.

### `Inicio.jsx`
*   **Funcionamiento:** Es la página de inicio (Home) de toda la plataforma. Actúa como una vitrina o índice maestro.
*   **Conexiones:** Está envuelta en el `HomeLayout`. Importa y renderiza secuencialmente las "secciones" de la portada: `HeroSection` (carrusel de fotos), `NewsSection` (noticias/artículos), `MapSection` (acceso directo a los mapas), `ConocenosSection` (información institucional) y `CursosSection` (bloque de LMS).

### `Directorio.jsx`
*   **Funcionamiento:** Es el buscador interactivo de empresas turísticas. Tiene tres grandes bloques: un buscador con filtros (Categoría/Giro y Región), un área de visualización de resultados dinámicos y un "Call to action" para registrarse. 
*   **Lógica:** Utiliza un `useEffect` para leer los parámetros de la URL (`?giro=x&region=y`) y hace peticiones asíncronas (`fetch` a la API `/api/directorio`) para cargar los comercios sin recargar toda la página.
*   **Conexiones:** Se apoya fuertemente en librerías externas de UI (`Carousel`, `Select`, `Badge`, `Card`) e importa componentes genéricos para estilar los resultados.

### `Cursos.jsx`
*   **Funcionamiento:** Es el catálogo público de cursos disponibles. 
*   **Conexiones:** Reutiliza `HomeLayout` y componentes de interfaz (Botones, Carruseles) para presentar las tarjetas de los cursos a los estudiantes potenciales.

### `Mapa.jsx`
*   **Funcionamiento:** Contenedor maestro de la experiencia cartográfica.
*   **Conexiones:** Delega todo el renderizado visual y funcionalidad pesada importando el subcomponente `./Components/ContainerMap`.

---

## 2. Carpeta `LandingPage/Components/`
Almacena bloques grandes de código (secciones) que pertenecen específicamente a las páginas raíz (generalmente a `Inicio.jsx` o a `Mapa.jsx`).

### Secciones de la Portada (`Inicio.jsx`)
*   **`HeroSection.jsx`**: Carrusel automático a pantalla completa (`embla-carousel-autoplay`) con un mensaje de bienvenida dinámico.
*   **`NewsSection.jsx`**: Un bloque horizontal que muestra un resumen de las últimas noticias (Eventos o Artículos). Usa framer-motion para animaciones de entrada.
*   **`ConocenosSection.jsx`**: Bloque estático que explica qué es la reserva de la biosfera.
*   **`MapSection.jsx`**: Botón grande o área gráfica que invita al usuario a explorar el mapa interactivo.
*   **`CursosSection.jsx`**: Muestra una cuadrícula o lista destacada con los últimos cursos subidos.

### Componentes de Mapas (`Mapa.jsx`)
*   **`ContainerMap.jsx`**: Es el director de orquesta del mapa. Administra el estado global (qué municipio se seleccionó, qué marcadores hay) y se divide en tres columnas o paneles: `SlideLeft`, `ReservaMap` (centro), y `SlideRight`.
*   **`ReservaMap.jsx`**: Es el componente pesado que levanta el mapa base (`react-leaflet`). Importa polígonos GeoJSON de `GeneralMap`, `RutasMap` y `PuntosInteresMap`, y pone los pines importando `Marker`.
*   **`GeneralMap.jsx` / `PuntosInteresMap.jsx` / `RutasMap.jsx`**: Componentes que devuelven capas geográficas vectoriales (`<GeoJSON />`) para dibujar divisiones municipales o rutas en el mapa de Leaflet.
*   **`Marker.jsx`**: Define el diseño individual de cada "Pin" en el mapa, configurando iconos custom de Leaflet y renderizando un pop-up que enlaza hacia el detalle de un comercio.
*   **`TradeNav.jsx` / `SlideLeft.jsx` / `SlideRight.jsx`**: Paneles de navegación laterales superpuestos al mapa para que el usuario pueda filtrar resultados sin salir del mismo.

---

## 3. Carpeta `LandingPage/Articulos/`
El módulo del Blog o Noticias orgánicas.

*   **`Index.jsx`**: La página principal del blog. Muestra una grilla con los artículos publicados. 
*   **`Components/ArticleCover.jsx`**: Componente visual que dibuja la miniatura (portada), título y fecha del artículo.
*   **`Components/RecentArticlesSidebar.jsx`**: Una barra lateral que lista los títulos de los últimos artículos para fomentar la lectura continua. Conecta mediante componentes de `@inertiajs/react` (`Link`) para la navegación rápida.

---

## 4. Carpeta `LandingPage/Eventos/`
El módulo para consultar webinars, ferias y clases magistrales.

*   **`Index.jsx`**: Lista cronológicamente todos los próximos eventos.
*   **`Show.jsx`**: La vista de detalle de un evento específico. Recibe un gran objeto JSON con el evento y delega el dibujado en sus múltiples subcomponentes.
*   **Subcomponentes de `Eventos/Components/`**:
    *   `EventCover.jsx` / `EventBanner.jsx`: Cabecera y foto principal del evento.
    *   `EventAbout.jsx` / `EventTopics.jsx`: Descripción textual y temario del evento.
    *   `EventLocation.jsx`: Datos de contacto o ubicación física/virtual.
    *   `EventOrganizers.jsx` / `EventCollaborators.jsx` / `EventHosts.jsx`: Muestran avatares o nombres de las instituciones y maestros ponentes.

---

## 5. Carpeta `LandingPage/Negocio/`
La pantalla más compleja e importante de detalle: el "Perfil Público" de un comercio (restaurante, hotel, tour) tras ser encontrado en el buscador o el mapa.

*   **`index.jsx`** *(Nota: la i está en minúscula)*: Es la página principal del comercio (`/negocio/{id}`). Une toda la información estructurada pasándola a varios subcomponentes altamente especializados.
*   **`Components/HeroSection.jsx`**: Cabecera principal con el nombre del negocio (`comercial_name`) y su fondo.
*   **`Components/SummarySection.jsx`**: Componente dual muy complejo. Por un lado usa `react-image-gallery` para mostrar una galería deslizable de las fotos del negocio, y por el otro lado levanta un pequeño mapa de `react-leaflet` exclusivo para marcar la dirección de esa sede exacta.
*   **`Components/DescriptionSection.jsx`**: Renderiza la "Descripción Larga". Usa `@/Components/Preview` (un visor de texto enriquecido/Markdown) en caso de que la descripción tenga formatos avanzados.
*   **`Components/ActivitysSection.jsx`**: Lista las "Actividades" u ofertas (ej. Ecoturismo, Hiking, Comida) usando iconos de `lucide-react`.
*   **`Components/CertificateSection.jsx`**: Si el negocio tiene certificaciones formales (ej. Distintivo M), las muestra en este apartado.

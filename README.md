<p align="center">
  <h1 align="center">Plataforma Digital de Capacitación y Promoción<br>Clúster Cafetalero de la Sierra Negra</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PHP-8.2%2B-777BB4?style=flat-square&logo=php&logoColor=white" alt="PHP 8.2+">
  <img src="https://img.shields.io/badge/Laravel-11-FF2D20?style=flat-square&logo=laravel&logoColor=white" alt="Laravel 11">
  <img src="https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19">
  <img src="https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=flat-square&logo=inertia&logoColor=white" alt="Inertia.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=flat-square&logo=github-actions&logoColor=white" alt="CI/CD">
</p>

<p align="center">
  <em>Ecosistema digital integral para la profesionalización caficultora, gestión de directorio regional, mapeo territorial y capacitación continua (LMS) avalada por el Instituto Tecnológico de Tehuacán (ITT) y DEPI.</em>
</p>

---

## 📋 Prerrequisitos

Antes de iniciar, asegúrate de contar con el siguiente software en tu entorno local de desarrollo:

- **PHP** (v8.2 o superior)
- **Composer** (v2.x)
- **Node.js** (v20.x o superior)
- **npm** (v10.x o superior)
- **Git** (v2.x)
- **MySQL / MariaDB** (Servidor de base de datos local o en la nube)

---

## 🚀 Tecnologías y Arquitectura

La plataforma combina un stack tecnológico moderno, reactivo y robusto para brindar una experiencia de usuario fluida y de alto rendimiento:

- **Backend:** Laravel 11 (PHP) bajo arquitectura MVC y API RESTful.
- **Frontend:** React 19 (JSX) gestionado reactivamente mediante Inertia.js (sin SPA compleja ni API duplicada).
- **Estilos:** Tailwind CSS y sistema de componentes Shadcn UI con reglas estrictas de contraste accesible (Guinda, Verde Oscuro, Mostaza, Blanco).
- **Autenticación:** Laravel Fortify (Autenticación sin fricción y gestión de sesiones).
- **Mapeo Territorial:** Leaflet.js con integración de capas GeoJSON interactivas para visualizar la cadena productiva.
- **Certificación PDF:** Barryvdh DomPDF para la emisión de diplomas oficiales con marca de agua e identidad gráfica institucional (`cafe.png`).
- **Graphify:** Knowledge Graph interno (`graphify-out/`) para la navegación estructurada del código fuente mediante AST.
- **CI/CD Pipeline:** GitHub Actions para la ejecución automatizada de pruebas unitarias/feature, compilación de assets en Node 20 y publicación de imágenes Docker en **GitHub Container Registry (GHCR)**.

---

## 📂 Estructura General del Proyecto

La organización del código fuente sigue las convenciones del ecosistema Laravel + Inertia:

```text
├── .github/
│   └── workflows/
│       └── laravel.yml          # Pipeline CI/CD (Tests PHP 8.2, Build Node 20, GHCR Login & Docker Push)
├── app/
│   ├── Actions/Fortify          # Acciones personalizadas de autenticación
│   ├── Http/Controllers/        # Controladores divididos por áreas (Landing, Dashboard, Cursos, Directorio)
│   ├── Models/                  # Modelos Eloquent (Course, Chapter, Trade, User, etc.)
│   └── Providers/               # Proveedores de servicio y arranque global
├── database/
│   ├── migrations/              # Esquemas de base de datos con UUIDs
│   └── seeders/                 # Datos iniciales de catálogo y usuarios
├── documentacion/               # Manuales y guías del sistema (*.md)
├── graphify-out/                # Grafo de conocimiento AST del proyecto
├── public/                  
│   ├── Certificados/            # Logos e insumos de certificación (cafe.png, itt.png, depi.png)
│   ├── Decorativo/              # Vectores e iconos decorativos
│   ├── Directorios/             # Galería de imágenes de giros y negocios
│   ├── Fotos/                   # Fototeca del Clúster Cafetalero
│   ├── Institution/             # Logotipos oficiales del ITT y DEPI
│   └── Maestros/                # Fotos e insumos para el carrusel de educadores y galería
├── resources/
│   ├── css/                     # Estilos globales y capas de componentes (app.css)
│   ├── js/
│   │   ├── Components/          # Componentes reutilizables React (UI, modales, formularios)
│   │   ├── Layouts/             # Plantillas base (HomeLayout, MainLayout, CourseLayout)
│   │   └── pages/               # Vistas principales en JSX (LandingPage, Dashboard, Courses, Trades)
│   └── views/                   # Plantillas Blade para correos y certificados PDF
├── routes/                      # Definiciones de rutas de la aplicación (web.php)
└── storage/                     # Archivos de medios, caches y logs
```

---

## 📖 Documentación Interna

Toda la información técnica y de arquitectura se encuentra organizada en el directorio `/documentacion`:

- [Guía de Instalación](./documentacion/Guia%20de%20Instalación.md)
- [Guía para Producción](./documentacion/Guia%20para%20Producción.md)
- [MasterPro.md](./documentacion/MasterPro.md)
- [Referencias de Controladores](./documentacion/Referencias%20Controladores.md)
- [Referencias de Modelos](./documentacion/Referencias%20de%20Modelos.md)
- [Referencias de Base de Datos](./documentacion/Referencias%20de%20Base%20de%20Datos.md)
- [Referencias FrontEnd](./documentacion/Referencias%20FrontEnd.md)
- [Referencias Public](./documentacion/Referencias%20Public.md)

---

## 🛠️ Inicio Rápido (Entorno Local)

Para levantar el proyecto en tu entorno local de desarrollo:

1. **Clonar el repositorio y navegar a la carpeta raíz:**
   ```bash
   git clone https://github.com/DaveCuc/cafe-platform.git
   cd cafe-platform
   ```

2. **Instalar las dependencias de Backend y Frontend:**
   ```bash
   composer install
   npm install
   ```

3. **Configurar las variables de entorno y migrar la base de datos:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   php artisan migrate --seed
   ```

4. **Iniciar los servidores de desarrollo:**
   ```bash
   php artisan serve
   npm run dev
   ```

---

## 🔄 Integración Continua (CI/CD)

El proyecto cuenta con un flujo completo en GitHub Actions (`.github/workflows/laravel.yml`) que realiza:
- Pruebas automatizadas en PHP 8.2 con SQLite en memoria.
- Verificación y compilación de producción de la interfaz React + Vite.
- Inicio de sesión y publicación automática del contenedor Docker en **GHCR** (`ghcr.io/davecuc/cafe-platform:latest`).

---

## 👤 Créditos e Información

- **Desarrollo**: José David Cuahutencos Peña
- **Institución**: Instituto Tecnológico de Tehuacán (ITT) & División de Estudios de Posgrado e Investigación (DEPI)
- **Enfoque**: Plataforma tecnológica para la competitividad, gobernanza y profesionalización del **Clúster Cafetalero de la Sierra Negra**.

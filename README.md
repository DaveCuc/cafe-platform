<p align="center">
  <h1 align="center">Plataforma Digital de Capacitación y Promoción Turística<br>Reserva de la Biosfera Tehuacán–Cuicatlán</h1>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PHP-8.5-777BB4?style=flat-square&logo=php&logoColor=white" alt="PHP">
  <img src="https://img.shields.io/badge/Laravel-11-FF2D20?style=flat-square&logo=laravel&logoColor=white" alt="Laravel">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Inertia.js-9553E9?style=flat-square&logo=inertia&logoColor=white" alt="Inertia.js">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind">
</p>

<p align="center">
  <em>Prototipo funcional integral para la gestión turística y la capacitación comunitaria (LMS)</em>
</p>

---

## 📋 Prerrequisitos

Antes de iniciar, asegúrate de tener instalado el siguiente software en sus versiones correspondientes para garantizar un entorno estable:

- **PHP** (v8.5)
- **Composer** (v2.9.5)
- **Node.js** (v25.6.1)
- **npm** (v11.9.0)
- **Git** (v2.53.0)
- **XAMPP** (requerido para el servidor de base de datos MySQL)

---

## 🚀 Tecnologías Utilizadas

El sistema aprovecha un stack moderno para asegurar una experiencia de usuario rápida y un código fácil de mantener:

- **Backend:** Laravel 11 (PHP) bajo arquitectura MVC.
- **Frontend:** React (JSX) gestionado reactivamente con Inertia.js.
- **Estilos:** Tailwind CSS para una interfaz limpia y estética.
- **Base de Datos:** MySQL / MariaDB (gestión mediante UUIDs).
- **Autenticación:** Laravel Fortify.

---

## 📂 Estructura General del Proyecto

La organización del código fuente sigue las convenciones del ecosistema Laravel e Inertia:

```text
├── app/
|   ├── Actions/Forty        # Action Classes para el funcionamiento de Laravel Forty
│   ├── Http/Controllers/    # Controladores separados por roles
|   ├── Models/              # Modelos del LMS (Course, Chapter, Purchase)
│   └── Providers/           # Arranque y configuración global de los servicios de la aplicación.   
├── database/
│   ├── migrations/          # Definición de esquemas con UUIDs
│   └── seeders/             # Semillas de datos para desarrollo
├── documentacion/           # Guías detalladas del proyecto (*.md)
├── public/                  
|   ├── Certificados         # Logos institucionales de DEPI, ITT y Reserva de la Biosfera
|   ├── Decorativo           # Contiene imagenes SVG para decorar el Landing Page 
|   ├── Directorios          # Imagenes que sirven para el HerosSection de Directorios
|   ├── Fotos                # Imagenes que sirven para el Herosection Principal
|   ├── Institution          # Logos institucionales del NavBar
|   ├── Maestros             # Fotos del carrucel de maestros de Cursos
|   └── Mapas                # Contiene Archivos .geojson para generar los mapas ilustrativos
├── resources/js/            
|   ├── css                  # Configuracion del CSS del proyecto
|   ├── js
|   |   ├── Components       # Componentes React (Botones, formularios, etc)
|   |   ├── hooks            # Elementos visuales
|   |   ├── Layout           # Layouts principales del proyecto
|   |   ├── lib
|   |   └── pages            # Estructura completa de las paginas formato JSX
|   |       ├── Auth         # Autenticacion de usuario
|   |       ├── Courses      # Cursos (Private)
|   |       ├── Dashboard    # Panel principal (Private)
|   |       ├── LandingPage  # Pagina de inicio, contiene mapa, directorio, acerca de los cursos.
|   |       └── Profile      # Editor del perfil (Private)
│   └── views/               # Generador de documentos como el certificado y el correo electronico.
├── routes/                  # Definiciones de rutas (web.php y auth.php)
└── sotrage                  # Almacenamiento de archivos e imagenes cargadas
```
---

## 📖 Documentación
Toda la información operativa y guías profundas están estructuradas de manera modular en la carpeta /documentacion:
- [Guía de Instalación](./documentacion/Guia%20de%20Instalación.md) 
- [Guia para Producción.md](./documentacion/Guia%20para%20Producción.md)

---

## 🛠️ Inicio Rápido
Para levantar el entorno local de desarrollo de forma rapida (Solo si antes ya leiste la guia completa):

1. Clonar el repositorio y acceder a la carpeta del proyecto
```
git clone https://github.com/DaveCuc/reserva-platform.git
cd reserva-platform
```
> Ref: [1. Clonar el repositorio](./documentacion/Guia%20de%20Instalación.md#1-clonar-el-repositorio)
2. Instalar dependencias del Backend (PHP) y Frontend (React)
```
composer install
npm install
```
> Ref: [2. Instalar dependencias](./documentacion/Guia%20de%20Instalación.md#2-instalar-dependencias)
3. Configurar entorno, generar clave y migrar base de datos (Asegúrate de iniciar MySQL en XAMPP)
```
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```
> Ref: [3. Configurar el entorno y base de datos](./documentacion/Guia%20de%20Instalación.md#3-configurar-el-entorno-y-base-de-datos)
4. Ejecutar el servidor de desarrollo Backend
```
php artisan serve
npm run dev
```
> Ref: [4. Ejecutar los servidores de desarrollo](./documentacion/Guia%20de%20Instalación.md#4-ejecutar-los-servidores-de-desarrollo)

---

## 👤 Información del Proyecto
Autor: Jose David Cuahutencos Peña
Investigación: Viabilidad tecnológica y prototipo de una plataforma digital para la gestión turística en la Reserva de la Biosfera Tehuacán-Cuicatlán.
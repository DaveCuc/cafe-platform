# WORKSPACE INITIALIZATION REPORT (/init)

Este documento contiene la radiografía de la plataforma web, identificando sus tecnologías base, estructura de archivos y los puntos de interacción visual para la integración del sistema de diseño oficial de **Gobierno de México (GobMx) 2024-2030**.

---

## 1. Identificación de la Plataforma

La plataforma es una aplicación web moderna orientada a la gestión de cursos, directorio y mapas turísticos de la Reserva de la Biosfera Tehuacán-Cuicatlán.

### Stack Tecnológico
- **Framework Backend**: Laravel 11.0
- **Framework Frontend**: React 19.0 (RC)
- **Enlace de Estado/Datos**: Inertia.js 2.0 (React wrapper)
- **Compilador/Empaquetador**: Vite 6.0.11
- **Motor CSS**: Tailwind CSS (con soporte para `@tailwindcss/vite` v4 y v3)
- **Librería de Componentes**: Primitivas de Radix UI (shadcn/ui customizado)

---

## 2. Mapa de Navegación del Código (Estructura de Archivos)

```text
cafe-platform/
├── config/                  # Configuración de Laravel
├── plan/                    # Planes de implementación del sistema
│   ├── design-gobmx-rebranding-1.md
│   └── workspace-init.md    # [ESTE ARCHIVO]
├── resources/
│   ├── css/
│   │   └── app.css          # Estilos globales y definición de variables de color
│   ├── js/
│   │   ├── app.jsx          # Punto de entrada de React + Inertia
│   │   ├── Components/      # Componentes UI reutilizables (Botones, Inputs, etc.)
│   │   │   └── ui/          # Primitivas de diseño (Dropdown, Button, Sheet, Card, etc.)
│   │   ├── Layouts/         # Plantillas base de envoltura visual (Navbar, Footer, Sidebar)
│   │   │   ├── HomeLayout.jsx        # Plantilla pública (Inicio, Cursos, Directorio, Mapa)
│   │   │   └── MainLayout.jsx        # Plantilla autenticada (Dashboard, Panel de cursos)
│   │   └── pages/           # Vistas/Vistas de Inertia
│   │       ├── LandingPage/ # Landing page principal e hijos públicos
│   │       │   ├── Inicio.jsx        # Página principal
│   │       │   ├── Cursos.jsx        # Listado de cursos
│   │       │   ├── Directorio.jsx    # Directorio de negocios locales
│   │       │   └── Components/       # Subsecciones de la Landing Page (Hero, News, Map)
│   │       └── Dashboard/   # Panel privado del usuario
└── tailwind.config.js       # Configuración y extensión de temas de Tailwind CSS
```

---

## 3. Plan de Movimiento del Frontend (Estrategia de Ejecución)

En concordancia con las restricciones estrictas de diseño y seguridad:
1. **No tocar lógica real**: No se modificarán React Hooks, enrutamiento, controladores de Laravel ni eventos de negocio.
2. **Re-theming Centralizado**: Toda la inyección de colores se gestionará mediante variables CSS nativas en `resources/css/app.css` mapeadas a Tailwind. Esto permite actualizar toda la aplicación cambiando solo las variables institucionales.
3. **Control del Imagotipo y Spacing**:
   - Ajustar el padding de logos en `HomeLayout.jsx` y `MainLayout.jsx` para respetar el área de protección (Clear Space de la "O" de México).
   - Inyección de las restricciones de render para el asset "Joven Mexicana".

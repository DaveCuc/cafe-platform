# Documentación del Frontend (React + Inertia.js)

La carpeta `resources/js` es el corazón visual y la interfaz interactiva de tu aplicación. En un proyecto tradicional de Laravel, aquí solo habría un poco de código jQuery o Vue, pero gracias a **Inertia.js**, esta carpeta alberga una aplicación completa de una sola página (SPA) construida con **React**.

A continuación se explica la arquitectura general de esta carpeta y sus funciones principales, sin entrar en el detalle microscópico de cada archivo.

---

## 1. El Archivo de Arranque: `app.jsx` (u origen)
Es el punto de entrada de todo el frontend. 
*   **¿Qué hace?** Se encarga de inicializar React, configurar Inertia.js, e inyectar tu aplicación dentro del elemento `<div id="app"></div>` que viene del servidor (normalmente en `resources/views/app.blade.php`).
*   **Enrutamiento:** También le enseña a Inertia cómo resolver las vistas, diciéndole que cuando el servidor de Laravel pide renderizar una pantalla (ej. `Inertia::render('Dashboard/Index')`), debe ir a buscar el componente correspondiente adentro de la carpeta `Pages/`.

## 2. Carpeta `Pages/` (Tus Pantallas)
Aquí viven todas las pantallas principales que ve el usuario. Cada archivo `.jsx` dentro de esta carpeta equivale a una "URL" o ruta completa en tu sistema.
*   **Autenticación (`Auth/`):** Pantallas de login, registro, recuperación de contraseña y la validación de doble factor (2FA).
*   **Públicas (`Course/`, `Directory/`, `Event/`):** El catálogo de cursos, la vista de un curso individual, la pantalla interactiva donde ves un video de Mux, y el buscador de negocios del directorio.
*   **Profesores (`Teacher/`):** El panel de administración o CMS para los dueños del contenido. Aquí están las pantallas complejas donde se usa drag-and-drop para reordenar lecciones, creadores de exámenes interactivos y subida de archivos pesados.
*   **Usuario (`Profile/`):** Pantallas para gestionar la cuenta, descargar los certificados ganados y administrar métodos de pago.

## 3. Carpeta `Components/` (Tus Piezas de Lego)
A diferencia de `Pages/`, los archivos aquí **no son pantallas completas**, sino piezas reutilizables de código de interfaz de usuario.
*   **UI Core:** Botones (`PrimaryButton.jsx`, `DangerButton.jsx`), inputs de texto (`TextInput.jsx`), etiquetas (`InputLabel.jsx`), y ventanas modales (`Modal.jsx`). Muchos de estos provienen del "Starter Kit" de Laravel Breeze o de librerías como Shadcn UI.
*   **Especializados:** Tarjetas de cursos (`CourseCard.jsx`), reproductores de video, o bloques para las preguntas de exámenes. Al encapsular estos elementos aquí, si necesitas cambiar el color o la sombra de un botón, lo haces en un solo archivo y se actualiza en las 100 pantallas del proyecto.

## 4. Carpeta `Layouts/` (Marcos Estructurales)
Los Layouts envuelven a las páginas para no tener que repetir la barra de navegación (navbar) o el pie de página (footer) en cada archivo.
*   **GuestLayout:** Un marco muy limpio, usualmente usado para la pantalla de Login o Registro, centrado en medio de la pantalla con el logotipo.
*   **AuthenticatedLayout:** El marco principal para usuarios logueados, que contiene el menú lateral (Sidebar) o menú superior con foto de perfil, y el espacio dinámico en el centro donde Inertia inyecta la pantalla (Page) que se haya solicitado.

## 5. El flujo de trabajo: ¿Cómo se conecta todo?
1.  **Laravel (Backend):** Un Controlador recibe la URL y busca datos en la base de datos (Models).
2.  **Inertia.js (El Puente):** El controlador emite `Inertia::render('Nombre/DeLaPantalla', ['datos' => $datos])`.
3.  **React (Frontend):** Inertia busca el archivo `resources/js/Pages/Nombre/DeLaPantalla.jsx` y le entrega los `$datos` como propiedades (Props) de React.
4.  **Componentes:** Esa pantalla recibe los datos, los envuelve en un `AuthenticatedLayout`, y luego dibuja un `CourseCard` (desde la carpeta Components) por cada curso recibido.

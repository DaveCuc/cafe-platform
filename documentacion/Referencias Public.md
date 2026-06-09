# Documentación de la carpeta `public`

La carpeta `public` es uno de los directorios más importantes en cualquier aplicación Laravel. Su propósito principal es servir como **el único punto de entrada (Entry Point)** público para toda la aplicación y como el lugar donde residen los recursos estáticos (imágenes, CSS, JavaScript) que el navegador web del usuario puede descargar directamente.

A continuación, se detalla qué almacena específicamente tu carpeta `public`:

## 1. Archivos Core del Framework
*   **`index.php`**: Es el archivo más crítico. Absolutamente todas las peticiones que llegan a tu dominio (por ejemplo, `tudominio.com/cursos` o `tudominio.com/login`) pasan primero por este archivo. Se encarga de arrancar el framework de Laravel y delegar la URL al router correspondiente.
*   **`.htaccess`**: Es un archivo de configuración para servidores web Apache. Contiene reglas para proteger archivos ocultos y para forzar que cualquier URL que el usuario escriba sea enviada de forma limpia a `index.php` (evitando URLs feas como `index.php?/cursos`).
*   **`robots.txt`**: Un archivo de texto sencillo que le indica a los motores de búsqueda (Google, Bing) qué partes del sitio web tienen permitido rastrear y cuáles no (SEO).

## 2. Compilados del Frontend (React/Inertia)
*   **Carpeta `build/`**: Laravel por sí solo trabaja en el servidor (backend). Para mostrar las interfaces visuales rápidas, tu proyecto usa React + Vite. Cuando ejecutas el comando `npm run build`, Vite compila, minifica y empaqueta todo tu código de `resources/js`, y escupe el resultado final dentro de esta carpeta `public/build/`. Esta carpeta contiene los archivos `.js` y `.css` finales y ultra-optimizados que Inertia.js le manda al navegador del usuario.

## 3. Almacenamiento Vinculado (Symlink)
*   **`storage` (Acceso directo / Symlink)**: Por seguridad, las fotos que suben los profesores o negocios no se guardan directamente en `public`. Se guardan en la carpeta protegida `storage/app/public`. Sin embargo, para que una foto se pueda ver en el navegador, se crea este acceso directo (symlink) que funciona como un "túnel". Cuando la web pide `/storage/imagen.png`, este túnel la busca y la devuelve de forma segura.

## 4. Recursos Visuales y Estáticos del Proyecto
A diferencia de los archivos que suben los usuarios (que van a `storage`), tu carpeta `public` tiene carpetas con imágenes "quemadas" o estáticas que diseñaste para armar la interfaz visual de tu plataforma.

*   **Archivos Sueltos (`banner.svg`, `logo.png`, `logo.svg`, `logo2.png`, `logo2.svg`, `favicon.ico`)**: El logotipo principal de la plataforma, sus variantes (blanco/negro), el banner y el ícono de la pestaña del navegador (favicon).
*   **Carpeta `Institution/`**: Contiene logotipos de las instituciones que respaldan el proyecto (ej. escudos del TecNM, del ITT, SECIHTI, tanto en versiones a color como en blanco para fondos oscuros).
*   **Carpetas de Imágenes de Diseño (`Decorativo/`, `Fotos/`, `Mapas/`, `Maestros/`, `Directorios/`, `Certificados/`)**: Estas carpetas guardan material gráfico, iconos, fotos de *stock* o placeholders que utilizas para maquetar el sitio. Por ejemplo, imágenes que pones de fondo en los sliders, marcos para los certificados de los alumnos o mapas estáticos para mostrar zonas geográficas en el directorio. Todos estos archivos pueden ser leídos directamente en React usando rutas absolutas como `src="/Institution/tecnm.png"`.

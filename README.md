# PROPUESTA DE UN PROTOTIPO DE PLATAFORMA DIGITAL DE CAPACITACIÓN Y PROMOCIÓN TURÍSTICA PARA LA RESERVA DE LA BIOSFERA TEHUACÁN – CUICATLÁN

## Autor: **DAVID CUAHUTENCOS**

## Estado: **Proyecto Final**

## Asunto: **PARA LA OBTENCIÓN DEL TITULO DE INGENIERÍA EN SISTEMAS COMPUTACIONALES**

## Asosciado a la investigacion: **Viabilidad tecnológica y prototipo de una plataforma digital para la gestión turística en la Reserva de la Biosfera Tehuacán-Cuicatlán.**

## Descripción
Este es un proyecto con la finalidad de solucionar las siguientes problematicas en las comunidades de la Reserva de la Biosfera Tehuacan-Cuicatlán
- Falta de visibilidad digital.
- Acceso limitado a capacitacion especializada.
- Falta de centralziacion de informacion turistica.
El objetivo es
- proveer de una plataforma digital integral de gestion turistica.
- proveer capacitacion a traves de un gestor de aprendizaje (LMS).

## Características Técnicas

- **Stack**: Backend Laravel 11 (PHP), frontend Inertia.js + React (JSX), Vite para bundling, Tailwind CSS para estilos.
- **Estructura**: MVC en Laravel; páginas Inertia en `resources/js/pages/*.jsx`; rutas en `routes/web.php` y `routes/auth.php`.
- **Autenticación y autorización**: Fortify para autenticación; checks de propiedad/ownership en controladores para autorización de recursos.
- **Bases de datos**: MySQL / MariaDB (configurable en `.env`); migraciones en `database/migrations`; seeders en `database/seeders`.
- **IDs y modelos**: UUIDs como claves primarias (trait `HasUuids`) en modelos principales (`Course`, `Chapter`, `Purchase`, `Attachment`, etc.).
- **Almacenamiento**: Archivos públicos en disco `public` (disk `public`), URLs guardadas como `/storage/...`; el código elimina el prefijo `/storage/` al borrar.
- **Pagos**: Integración con Stripe (cliente y webhooks) para checkout y persistencia de compras.
- **Arquitectura LMS**: Modelos principales: `Course`, `Chapter`, `Attachment`, `Purchase`, `UserProgress`. Flujos separados para estudiantes y docentes (`TeacherCourseController`, `TeacherChapterController`).
- **Frontend**: Import alias `@/` configurado en `jsconfig.json`; componentes React en JSX (no TSX); rutas generadas por Ziggy (`route(...)`).
- **Validación**: Requests en `app/Http/Requests/*` con reglas (`uuid`, etc.) para proteger entradas.
- **Seguridad**:
  - Protege rutas sensibles con middleware (`auth`) y comprobaciones de propiedad.
  - `robots.txt` y `sitemap.xml` para control de indexación (robots no es seguridad).
  - Configurar reglas del servidor y autenticación para contenido privado.
- **Entornos**:
  - Variables en `.env`: `APP_ENV`, `APP_URL`, `DB_*`, `STRIPE_*`, `FILESYSTEM_DRIVER`, `CACHE_*`, `QUEUE_CONNECTION`.
  - Recomendado bloquear staging con `robots.txt` (`Disallow: /`) y producción con `Sitemap:` explícito.
- **Colas y tareas**: Soporte para `queue` (configurar `QUEUE_CONNECTION` y workers).
- **Testing & calidad**:
  - Tests PHPUnit en `tests/Feature` y `tests/Unit`.
  - Ejecutar tests: `php artisan test`.
  - Lint/format PHP: `vendor/bin/pint`.
  - Frontend: `npm run dev`, `npm run build`.
- **CI / despliegue**:
  - Ejecutar migraciones: `php artisan migrate --force`.
  - Ejecutar seeders si procede: `php artisan db:seed --class=SeederName`.
  - Compilar assets: `npm ci && npm run build`.
  - Recomendado: tareas de CI para tests, lint y build.
- **Observabilidad**:
  - Logs en `storage/logs` (Laravel logging).
  - Integrar monitoreo/alertas (Sentry, New Relic) según necesidad.
- **Backup & mantenimiento**:
  - Backups periódicos de la base de datos y `storage`/assets.
  - Rotación de logs y políticas de retención.
- **Notas operativas**:
  - No confiar en `robots.txt` para seguridad; usar autenticación y reglas de servidor.
  - Proteger endpoints de webhook con firma (`STRIPE_WEBHOOK_SECRET`).
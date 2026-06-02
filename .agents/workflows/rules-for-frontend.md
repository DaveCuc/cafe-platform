---
description: Rules for front end
---

Actúa como un experto en maquetación UI/UX y Tailwind CSS. Vamos a rediseñar el frontend de esta aplicación de manera progresiva. Ya existe un backend sólido en Laravel 11 y un flujo frontend con React e Inertia.js. Tu único objetivo es mejorar la capa visual.

Tienes TOTALMENTE PROHIBIDO crear, modificar, mover o eliminar cualquier tipo de lógica del sistema. Esto incluye, pero no se limita a:
- Hooks de React (useState, useEffect, useContext, etc.).
- Llamadas de Inertia (usePage, router.post, router.get, etc.).
- Funciones manejadoras de eventos (ej. handleSubmit, onClick que ejecuten lógica de negocio).
- Helpers de rutas de Ziggy (route()).
- Estructuras de datos, props recibidas desde el servidor o validaciones.
TU ALCANCE PERMITIDO:
- Modificación de Clases: Únicamente puedes modificar, agregar o eliminar el atributo className dentro de los archivos .jsx en resources/js/.
- Estandarización CSS: Tu trabajo principal será identificar patrones de Tailwind repetitivos en los componentes y extraerlos hacia resources/css/app.css utilizando la directiva @apply, creando clases utilitarias limpias y semánticas.
- Estructura HTML: Solo puedes modificar las etiquetas HTML (divs, spans, sections) si es estrictamente necesario para aplicar la nueva estructura de diseño (ej. contenedores flex/grid), pero asegurándote de no envolver o romper condicionales de renderizado de React.

Cuando te pida refactorizar un archivo, devuélveme el código solo con los cambios visuales aplicados, manteniendo cada línea de la lógica intacta. Si extraes clases, muéstrame exactamente qué bloque debo pegar en mi app.css ademas de agregar las configuraciones en tailwind.config.js.

Recuerda hacer un analisis de logs antes de dar por finalizado, para asegurarte que el front en en vite y laravel sean compatibles y funcionales.
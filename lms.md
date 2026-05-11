# Especificación Funcional y Técnica - Módulo LMS

Este documento detalla el funcionamiento completo del módulo de Learning Management System (LMS) en la plataforma, abarcando las funcionalidades tanto para alumnos como para profesores. El sistema está construido utilizando **Laravel 11**, **Inertia.js v2**, y **React**, siguiendo un patrón de renderizado híbrido.

---

## 1. Arquitectura Base y Modelos

El módulo gira en torno a los siguientes modelos principales que usan identificadores `UUID` (`HasUuids`):
- **Course (Curso):** Contenedor principal del aprendizaje. Tiene título, descripción, precio, imagen, y pertenece a un creador (`user_id`) y a una categoría.
- **Chapter (Capítulo):** Unidades de aprendizaje dentro de un curso. Contienen video, descripción, posición (para el ordenamiento) y controles de acceso (es gratuito o de pago).
- **UserProgress (Progreso de Usuario):** Registra si un estudiante ha completado un capítulo específico (`is_completed`).
- **Purchase (Compra):** Registro que vincula a un estudiante (`user_id`) con un curso comprado (`course_id`), dándole acceso al contenido bloqueado.
- **Attachment (Adjunto):** Archivos complementarios subidos al almacenamiento público asociados a un curso.
- **Category (Categoría):** Clasificación para organizar los cursos.

---

## 2. Funciones de Alumno

### 2.1 Explorar Cursos
Permite a los estudiantes descubrir cursos disponibles usando filtros por título o categoría.
- **Rutas Backend:** `GET /search` y `GET /discover` (definidas en `routes/web.php`).
- **Controlador/Lógica:** Se obtienen todos los cursos donde `is_published = true`, con sus relaciones (categoría y capítulos). Se aplican filtros de consulta (e.g., `when($request->title, ...)`).
- **Componentes Frontend:** `resources/js/pages/Dashboard/Search/Index.jsx` y `resources/js/pages/Dashboard/Discover/Index.jsx`.
- **Funcionamiento:** Envía los datos estructurados a Inertia para renderizar listas y tarjetas de cursos para el alumno.

### 2.2 Ver Cursos y Capítulos
Permite visualizar el contenido del curso y la navegación entre capítulos.
- **Rutas Backend:**
  - `GET /courses/{course}`: Redirige automáticamente al primer capítulo publicado del curso.
  - `GET /courses/{course}/chapters/{chapter}`: Sirve el contenido del capítulo.
- **Lógica de Acceso:** 
  - Se verifica que el capítulo pertenezca al curso y que esté publicado.
  - Se valida el acceso: si el capítulo es `is_free`, o si el estudiante tiene un registro de `Purchase`, o si es el creador del curso (bypass de propietario). 
  - Se calcula el progreso cargando los capítulos completados (`UserProgress`) contra los totales publicados.
- **Componente Frontend:** `resources/js/pages/Courses/Show/Index.jsx`.
- **Dependencias Técnicas:** Los recursos asociados, como documentos adjuntos (`attachments`) y el identificador del siguiente capítulo (`nextChapter`), se inyectan a la vista solo si el estudiante posee acceso validado.

### 2.3 Comprar Cursos
Flujo de compra de los cursos mediante la pasarela de pagos Stripe.
- **Rutas Backend:** 
  - `POST /courses/{course}/checkout` gestionada en `CourseController@checkout`.
  - `POST /webhook` en `routes/web.php`.
- **Flujo Técnico:**
  1. El estudiante invoca la ruta de `checkout` generando una sesión de pago en Stripe.
  2. Tras un pago exitoso, Stripe envía un evento asíncrono tipo `checkout.session.completed` a la URL del `/webhook`.
  3. El sistema intercepta este evento, valida la firma de Stripe (ignorando CSRF de Laravel en esta ruta específica) y registra un nuevo `Purchase`, vinculando el `course_id` con el `user_id`.

### 2.4 Terminar Capítulos (Progreso)
El alumno marca un capítulo como completado o vuelve a marcarlo como incompleto.
- **Ruta Backend:** `PUT /courses/{course}/chapters/{chapter}/progress`
- **Lógica:**
  - Verifica primero el permiso de visualización (debe tener el curso comprado, ser propietario o estar en un capítulo gratuito). Aborta con HTTP `403` si falla.
  - Utiliza `UserProgress::updateOrCreate()` para crear o actualizar el estado de la bandera `is_completed` basado en un parámetro booleano de la solicitud HTTP (frontend).
- **Interacción:** El componente React de Inertia envía una solicitud que recarga automáticamente la sesión actual para refrescar el estado del progreso global visible.

### 2.5 Concluir Cursos (Dashboard)
Visualización en el tablero principal del porcentaje de progreso y separación de cursos concluidos.
- **Ruta Backend:** `GET /dashboard`
- **Lógica:**
  - Obtiene una lista de los IDs de cursos del usuario a través de su historial de compras (`Purchase`).
  - Itera sobre estos cursos y evalúa el porcentaje de completitud resolviendo: `(Capítulos Completados / Total de Capítulos Publicados) * 100`.
  - Agrupa los cursos en dos colecciones dinámicas: `completedCourses` (si el progreso equivale a 100%) y `coursesInProgress` (si es menor).
- **Componente Frontend:** `resources/js/pages/Dashboard/Index.jsx`.

---

## 3. Funciones de Profesor

### 3.1 Gestión de Cursos (Crear y Editar)
Herramientas para configurar la estructura base de sus cursos.
- **Rutas Backend:**
  - `GET /teacher/courses` y `GET /teacher/create`: Renderizan las vistas iniciales y el creador.
  - `POST /teacher/courses`: Crea un nuevo curso asignando como `user_id` al profesor autenticado.
  - `GET /teacher/courses/{course}`: Renderiza la vista de edición general (`TeacherCourseController@edit`).
  - `PATCH /teacher/courses/{course}` y `DELETE /teacher/courses/{course}`: Permiten modificar campos básicos (título, descripción, precio y categoría) o eliminar el curso en su totalidad.
- **Almacenamiento Multimedia:**
  - Las rutas `POST /teacher/courses/{course}/image` y `POST /teacher/courses/{course}/attachments` permiten la subida de recursos (carátulas de cursos o documentos anexos) que se guardan en el disco público de Laravel persistidos con el prefijo `/storage/`.

### 3.2 Crear y Editar Capítulos
Estructuración del contenido en módulos o episodios.
- **Creación y Orden:**
  - `POST /teacher/courses/{course}/chapters`: Genera un nuevo capítulo base asignado a un curso particular (`TeacherCourseController@createChapter`).
  - `PUT /teacher/courses/{course}/chapters/reorder`: Recibe un arreglo modificado desde el frontend (Drag & Drop) y ejecuta una actualización masiva del campo `position` de los capítulos (`TeacherCourseController@reorderChapters`).
- **Edición Detallada (Sub-Editor de Capítulos):**
  - Controlado por `TeacherChapterController` en los Endpoints `GET/PATCH/DELETE /teacher/courses/{course}/chapters/{chapter}`.
  - Sirve el módulo de edición específica que permite el control a nivel de granularidad, permitiendo adjuntar videos.
  - `POST /teacher/courses/{course}/chapters/{chapter}/video`: Recibe un archivo o fuente para el material audiovisual del capítulo.
- **Reglas de Seguridad:** Los Controladores bajo el namespace de Teacher realizan verificaciones continuas para asegurar que el usuario manipulador sea el creador registrado del curso: `if ($course->user_id !== Auth::id()) abort(403);`.

### 3.3 Publicar Cursos y Capítulos
Sistemas de validación para determinar cuándo el contenido está listo para los estudiantes.
- **Rutas Backend:**
  - Cursos: `PATCH /teacher/courses/{course}/publish` y `unpublish` gestionadas por `TeacherCourseController`.
  - Capítulos: `PATCH /teacher/courses/{course}/chapters/{chapter}/publish` y `unpublish` por `TeacherChapterController`.
- **Lógica de Reglas de Negocio:** Antes de habilitar el booleano de publicación (`is_published`), los métodos suelen validar que existan metadatos suficientes. Por ejemplo, es probable que no se permita publicar un curso si no contiene al menos un capítulo previamente publicado, o un capítulo si no posee título ni archivo de video.

### 3.4 Estadísticas de Ventas
Tablero analítico con reporte de ingresos directos.
- **Ruta Backend:** Función anónima en `GET /teacher/analytics` (declarado en `routes/web.php`).
- **Lógica de Procesamiento de Negocios:**
  - Extrae todos los registros del modelo `Purchase` anidando sus relaciones donde el curso subyacente (`$query->where('user_id', Auth::id())`) pertenezca al profesor.
  - Mediante un proceso de reducción, acumula los ingresos financieros en un arreglo asociativo `groupedEarnings`, asignando como clave el título del curso y sumando iterativamente el campo de su precio.
  - Exporta `totalRevenue` (suma neta de ingresos) y el total de adquisiciones (`totalSales`).
- **Componente Frontend:** Envía el arreglo `data` optimizado a `resources/js/pages/Dashboard/Teacher/Analytics/Index.jsx` para su consumo gráfico mediante librerías de UI (ej. Recharts).

# Documentación de Modelos de Base de Datos (Eloquent)

Este documento detalla la función de cada modelo en `app/Models`, sus métodos (principalmente relaciones) y cómo se conectan entre sí a través del ORM Eloquent.

---

## 1. Módulo Core / Usuarios

### `User`
El modelo principal de autenticación. Representa a estudiantes, profesores y administradores.
*   **Se conecta con:**
    *   `directorios()`: Un usuario (`HasMany`) puede ser propietario o gestor de múltiples negocios en el directorio turístico.
*   **Funciones / Traits:** Usa `HasFactory`, `Notifiable`, y `TwoFactorAuthenticatable` para gestionar inicios de sesión biométricos y de doble factor. Además mapea el casteo de `password` a tipo `hashed`.

---

## 2. Módulo de Cursos (LMS)

### `Category`
Categorías base para clasificar los cursos ofertados.
*   **Se conecta con:**
    *   `courses()`: Una categoría (`HasMany`) agrupa a múltiples cursos.

### `Course`
El pilar del sistema educativo. Representa un curso creado por un profesor.
*   **Se conecta con:**
    *   `category()`: Pertenece (`BelongsTo`) a una categoría específica.
    *   `user()`: Pertenece (`BelongsTo`) al profesor que lo creó.
    *   `chapters()`: Tiene muchos (`HasMany`) capítulos, ordenados por su posición.
    *   `attachments()`: Tiene muchos (`HasMany`) archivos adjuntos (PDFs, guías).
    *   `exams()`: Tiene muchos (`HasMany`) exámenes.
    *   `purchases()`: Tiene muchos (`HasMany`) estudiantes inscritos a través de compras.
*   **Funciones de lógica de negocio:**
    *   `getProgressPercentageForUser(string $userId)`: Un algoritmo crítico que calcula el porcentaje de avance (0 al 100) de un estudiante, contando el número total de capítulos publicados completados más los exámenes aprobados.

### `Chapter`
Lecciones individuales de video o texto que conforman un curso.
*   **Se conecta con:**
    *   `course()`: Pertenece (`BelongsTo`) a un curso padre.
    *   `muxData()`: Tiene una sola (`HasOne`) integración de video vinculada al procesador de streaming Mux.
    *   `userProgress()`: Tiene muchos (`HasMany`) registros que indican qué usuarios han terminado la lección.

### `MuxData`
Registra los metadatos de los videos subidos.
*   **Se conecta con:**
    *   `chapter()`: Pertenece (`BelongsTo`) al capítulo donde se reproduce el video. Almacena el `asset_id` y el `playback_id` necesarios para inyectar el reproductor en React.

### `Attachment`
Archivos complementarios del curso.
*   **Se conecta con:**
    *   `course()`: Pertenece (`BelongsTo`) al curso que complementan.

---

## 3. Módulo de Inscripción y Seguimiento

### `Purchase`
Representa el acceso de un estudiante a un curso (incluso si fue gratuito).
*   **Se conecta con:**
    *   `course()`: Pertenece (`BelongsTo`) al curso comprado. *(Nota: La relación al usuario se deduce por la columna `user_id`, aunque no se explícita la función `user()` en el modelo).*

### `UserProgress`
Tabla pivote que marca una lección concreta como vista/completada.
*   **Se conecta con:**
    *   `chapter()`: Pertenece (`BelongsTo`) al capítulo que se marcó como terminado.

### `Certificate`
Los diplomas digitales generados por la plataforma.
*   **Se conecta con:**
    *   `user()`: Pertenece (`BelongsTo`) al estudiante galardonado.
    *   `course()`: Pertenece (`BelongsTo`) al curso completado.

---

## 4. Módulo de Exámenes y Evaluación

### `Exam`
La entidad principal de la prueba.
*   **Se conecta con:**
    *   `course()`: Pertenece (`BelongsTo`) al curso.
    *   `questions()`: Tiene muchas (`HasMany`) preguntas formuladas dentro de él.
    *   `attempts()`: Tiene muchos (`HasMany`) intentos realizados por los alumnos.

### `ExamQuestion`
Las preguntas de opción múltiple u otro tipo.
*   **Se conecta con:**
    *   `exam()`: Pertenece (`BelongsTo`) al examen padre.
    *   `options()`: Tiene muchas (`HasMany`) opciones de respuesta (A, B, C, D).

### `ExamOption`
Cada inciso de respuesta posible.
*   **Se conecta con:**
    *   `question()`: Pertenece (`BelongsTo`) a la pregunta formulada. Mapea la propiedad booleana `is_correct` (verdadero si es la respuesta correcta).

### `ExamAttempt`
La "hoja de respuestas" de un estudiante.
*   **Se conecta con:**
    *   `exam()`: Pertenece (`BelongsTo`) al examen realizado.
    *   `user()`: Pertenece (`BelongsTo`) al estudiante que lo tomó. Almacena en un array de JSON las respuestas que el usuario mandó.

---

## 5. Módulo del Directorio Comercial

### `Directorio`
El perfil público de una empresa turística (restaurante, hotel, tour operador).
*   **Se conecta con:**
    *   `user()`: Pertenece (`BelongsTo`) al dueño o encargado que registró la ficha.
    *   `giros()`: Tiene una relación de muchos a muchos (`BelongsToMany`) con las actividades comerciales.
    *   `region()`: Pertenece (`BelongsTo`) a la zona macro (ej. costa, sierra).
    *   `municipio()`: Pertenece (`BelongsTo`) a la demarcación específica.
    *   `certificates()`: Tiene muchos (`HasMany`) certificados de calidad turística (PDFs probatorios).

### `Giro`
La actividad económica de una empresa.
*   **Se conecta con:**
    *   `directorios()`: De muchos a muchos (`BelongsToMany`) con los negocios que practican dicha actividad a través de la tabla pivote `directorio_giro`.

### `Region`
Área geográfica principal.
*   **Se conecta con:**
    *   `municipios()`: Tiene muchos (`HasMany`) poblados dentro de ella.
    *   `directorios()`: Tiene muchos (`HasMany`) comercios alojados en toda el área.

### `Municipio`
Ciudad o pueblo específico.
*   **Se conecta con:**
    *   `region()`: Pertenece (`BelongsTo`) a la región superior.
    *   `directorios()`: Tiene muchos (`HasMany`) negocios locales.

### `DirectorioCertificate`
Documentos formales subidos por la empresa (ej. licencia de funcionamiento, Distintivo M).
*   **Se conecta con:**
    *   `directorio()`: Pertenece (`BelongsTo`) al comercio que lo cargó.

---

## 6. Contenido de Marketing

### `Event`
Webinars o eventos presenciales publicados en la plataforma.
*   **Se conecta con:**
    *   `user()`: Pertenece (`BelongsTo`) al usuario (profesor) organizador del evento. Guarda temas y colaboradores casteados como arrays JSON.

### `Article`
Noticias del blog del sitio.
*   **Se conecta con:**
    *   `user()`: Pertenece (`BelongsTo`) al redactor.
    *   `category()`: Pertenece (`BelongsTo`) a la etiqueta del blog.

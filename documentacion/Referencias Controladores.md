# Documentación de Controladores y Lógica de Negocio

Este documento detalla la función de cada controlador en `app/Http/Controllers`, los métodos que contiene, y con qué modelos o vistas (frontend) se conecta.

---

## 1. Módulo Público / Estudiantes

### `CourseController`
Maneja la visualización de los cursos para los estudiantes y la lógica de compras.
*   **Se conecta con Modelos:** `Course`, `Chapter`, `Purchase`, `UserProgress`.
*   **Se conecta con Vistas:** `Dashboard/Index` (Catálogo), `Course/Show` (Detalle del curso), `Course/Chapter/Show` (Ver lección).
*   **Métodos principales:**
    *   `index()`: Muestra el catálogo de cursos publicados.
    *   `show()`: Muestra la vista previa (landing page) de un curso.
    *   `chapter()`: Muestra el contenido de un capítulo específico (video y descripción) validando si el estudiante tiene acceso.
    *   `checkout()`: Inicia el proceso de pago/inscripción creando el registro en la tabla `purchases`.
    *   `progress()`: Marca un capítulo como completado/no completado para el estudiante.

### `ExamController`
Maneja la lógica de los estudiantes al tomar un examen.
*   **Se conecta con Modelos:** `Exam`, `ExamAttempt`, `ExamQuestion`, `Certificate`.
*   **Se conecta con Vistas:** `Course/Exam/Show` (Pantalla para hacer el examen).
*   **Métodos principales:**
    *   `show()`: Valida si el usuario puede tomar el examen y renderiza la vista con las preguntas.
    *   `submit()`: Recibe las respuestas del estudiante, las califica automáticamente verificando `is_correct` en las opciones, guarda el intento (`ExamAttempt`) y si aprueba todo, genera el `Certificate`.

### `EventController`
Controlador sencillo para la vista pública de eventos/masterclasses.
*   **Se conecta con Modelos:** `Event`.
*   **Se conecta con Vistas:** `Event/Index` (Calendario/Lista), `Event/Show` (Detalle).
*   **Métodos principales:**
    *   `index()`: Lista los eventos próximos publicados.
    *   `show()`: Muestra la información detallada de un evento para que el usuario pueda inscribirse o unirse.

### `CertificateController`
Generación de documentos PDF.
*   **Se conecta con Modelos:** `Certificate`.
*   **Se conecta con Vistas:** No renderiza frontend, devuelve un archivo PDF en formato binario.
*   **Métodos principales:**
    *   `download()`: Recibe un ID de certificado, utiliza la librería `barryvdh/laravel-dompdf` para renderizar el HTML del diploma y fuerza la descarga del PDF en el navegador del estudiante.

---

## 2. Módulo de Autores / Profesores (`Teacher...`)

Estos controladores están protegidos para que solo los usuarios con `is_teacher = true` (o dueños del contenido) puedan acceder a ellos.

### `TeacherCourseController`
Permite al profesor gestionar la información general de sus cursos.
*   **Se conecta con Modelos:** `Course`, `Category`.
*   **Se conecta con Vistas:** `Teacher/Courses/Index`, `Teacher/Courses/Create`, `Teacher/Courses/Edit`.
*   **Métodos principales:**
    *   `index() / create() / store()`: CRUD básico para listar y crear nuevos cursos.
    *   `edit() / update()`: Formulario principal de configuración del curso (título, precio, categoría).
    *   `uploadImage()`: Sube la imagen de portada al almacenamiento (`Storage::disk('public')`).
    *   `publish() / unpublish()`: Valida que el curso tenga todos los requisitos mínimos antes de permitir que sea público.

### `TeacherChapterController`
Gestiona el temario y las lecciones de un curso específico.
*   **Se conecta con Modelos:** `Course`, `Chapter`, `MuxData`.
*   **Se conecta con Vistas:** `Teacher/Chapters/Edit`.
*   **Métodos principales:**
    *   `store()`: Crea un nuevo capítulo en blanco.
    *   `edit() / update()`: Edita el contenido del capítulo.
    *   `uploadVideo()`: Sube el video y lo conecta con la API de Mux para el procesamiento de streaming.
    *   `reorder()`: Recibe un array de IDs desde el frontend mediante drag & drop para actualizar la columna `position` de cada capítulo.

### `TeacherExamController`
Creador de exámenes interactivos.
*   **Se conecta con Modelos:** `Course`, `Exam`, `ExamQuestion`, `ExamOption`.
*   **Se conecta con Vistas:** `Teacher/Exams/Edit`.
*   **Métodos principales:**
    *   `store() / update()`: Crea o modifica la configuración base del examen.
    *   `storeQuestion() / updateQuestion() / destroyQuestion()`: API interna para agregar o quitar preguntas al examen.
    *   `storeOption() / updateOption()`: API para agregar las opciones de A, B, C, D y marcar cuál es la respuesta correcta.

### `TeacherArticleController` y `TeacherEventController`
Gestión de contenido de marketing.
*   **Se conecta con Modelos:** `Article`, `Event`.
*   **Se conecta con Vistas:** `Teacher/Articles/*` y `Teacher/Events/*`.
*   **Métodos principales:**
    *   Manejan operaciones CRUD estándar (index, create, store, edit, update, destroy).
    *   Ambos incluyen métodos para subir imágenes (`uploadCoverImage` o `uploadCardImage`) y publicar/despublicar el contenido.

---

## 3. Módulo del Directorio Turístico

### `DirectoryTradeController`
Es el controlador más grande de la plataforma, maneja tanto la vista del dueño del negocio como el panel de revisión del administrador.
*   **Se conecta con Modelos:** `Directorio`, `Giro`, `Region`, `Municipio`, `DirectorioCertificate`.
*   **Se conecta con Vistas:** `Directory/Index` (Buscador público), `Directory/Trade/Form/Index` (Wizard paso a paso del dueño), `Admin/Directory/Review` (Panel de aprobación).
*   **Métodos principales:**
    *   `index()`: Motor de búsqueda público con filtros (por municipio, categoría, texto).
    *   `create() / store() / update()`: Formularios multipaso para que un negocio registre su información.
    *   `uploadGallery() / deleteGalleryImage()`: Sube y borra arreglos de imágenes asociadas a la columna JSON `gallery_images`.
    *   `uploadCertificate()`: Guarda los archivos formales (PDFs) en la tabla secundaria `DirectorioCertificate`.
    *   `adminReview() / approve() / reject()`: Flujo de moderación. El administrador puede aprobar la publicación del negocio o rechazarla llenando la columna `rejection_reason`.

---

## 4. Sistema (Core)

### `ProfileController`
*   **Se conecta con Modelos:** `User`.
*   **Se conecta con Vistas:** `Profile/Edit`.
*   **Métodos principales:**
    *   `edit() / update()`: Actualiza el nombre, email o contraseña del usuario actual.
    *   `destroy()`: Borra la cuenta del usuario permanentemente.

### `Controller`
*   **Clase Base:** Es una clase abstracta de la cual heredan absolutamente todos los demás controladores. No tiene métodos propios de lógica de negocio, pero sirve para inyectar validaciones o *middleware* globales de forma predeterminada a nivel arquitectura.

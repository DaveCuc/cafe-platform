# Documentación Detallada: Dashboard (Panel de Usuario)

La carpeta `resources/js/Pages/Dashboard` contiene todas las interfaces privadas a las que accede un usuario **después de iniciar sesión**. Es decir, todo el contenido de esta carpeta está protegido por autenticación y utiliza el marco `MainLayout` (que incluye el menú lateral o sidebar).

Se divide en varias subcarpetas dependiendo del rol del usuario (Estudiante, Profesor, o Dueño de Negocio). A continuación se explica cada sección:

---

## 1. Raíz (`Dashboard/`)

### `Index.jsx`
*   **Funcionamiento:** Es la pantalla inicial de bienvenida cuando un usuario se loguea. Está enfocada en el rol de **Estudiante** ("Mi Espacio de Estudiante").
*   **Lógica:** Recibe desde el backend las propiedades `completedCourses` y `coursesInProgress`. 
*   **Conexiones:** Utiliza el subcomponente `InfoCard.jsx` (ubicado en `Dashboard/Components/`) para mostrar contadores rápidos (ej. "3 Cursos en Progreso"), y se conecta con `CoursesList` (importado desde la carpeta `Search/`) para desplegar la grilla con los cursos que el estudiante está cursando actualmente para que continúe aprendiendo.

### `Components/InfoCard.jsx`
*   **Funcionamiento:** Un componente visual sencillo y reutilizable que dibuja una tarjeta con un icono (`lucide-react`), un título y un número grande. Se usa para las estadísticas rápidas del estudiante.

---

## 2. Carpeta `Dashboard/Discover/`
El área de descubrimiento general.

*   **`Index.jsx`:** Es la pantalla "Explorar" o catálogo privado de cursos. Permite a los estudiantes navegar por la oferta educativa de la plataforma estando logueados.
*   **`Components/`:** Contiene subcomponentes visuales específicos para renderizar las tarjetas o categorías dentro de esta pantalla de exploración.
*   **Conexiones:** Se conecta con el controlador `CourseController` para traer la lista paginada de todos los cursos disponibles y sus categorías.

---

## 3. Carpeta `Dashboard/Search/`
El motor de búsqueda interno del LMS.

*   **`Index.jsx`:** Pantalla dedicada a buscar cursos por palabras clave o categorías.
*   **`Components/`:** Contiene la lógica visual de los resultados.
    *   **Importante:** Aquí reside el componente `CoursesList.jsx`, el cual es extremadamente reutilizable y es importado incluso por `Dashboard/Index.jsx` para dibujar las grillas de los cursos de forma consistente en todo el panel.

---

## 4. Carpeta `Dashboard/Teacher/` (CMS del Profesor)
Esta es una de las áreas más complejas del proyecto. Es exclusiva para usuarios con la bandera `is_teacher = true`. Es el "Backoffice" donde los instructores o administradores gestionan todo el contenido.

*   **`Courses/`:** Pantallas para administrar cursos. Aquí se listan los cursos que el profesor ha creado, y se conecta a las pantallas de edición complejas donde suben videos a Mux, reordenan capítulos (drag & drop) y configuran el precio.
*   **`Events/` & `Articles/`:** Pantallas CRUD (Crear, Leer, Actualizar, Borrar) para que el maestro redacte noticias para el blog o programe nuevos eventos/webinars públicos.
*   **`Create/`:** Subpantallas de inicio rápido o formularios limpios para dar de alta nuevos contenidos desde cero antes de pasar al panel de configuración detallada.
*   **`Solicitudes/`:** Pantallas para administradores donde revisan y aprueban/rechazan las peticiones de los nuevos negocios que quieren unirse al directorio turístico.
*   **Conexiones:** Esta sección entera se comunica estrechamente con los controladores `TeacherCourseController`, `TeacherChapterController`, `TeacherArticleController`, etc., enviando grandes formularios (`FormData`) para subir imágenes o PDFs.

---

## 5. Carpeta `Dashboard/Trades/` (Panel del Negocio)
Es el panel exclusivo para los usuarios (dueños de empresas turísticas) que buscan publicar su negocio en el "Directorio Local".

*   **`Index.jsx`:** El panel de control del dueño del negocio. Muestra el estado actual de su ficha (por ejemplo: "Borrador", "En Revisión" o "Aprobado") y le permite acceder a la edición.
*   **`Create/`:** Un flujo tipo "Wizard" (paso a paso) para que un negocio nuevo capture toda su información inicial (nombre, giro, región, mapas).
*   **`Edit/`:** La pantalla compleja de administración de la empresa. Aquí el dueño puede actualizar su dirección, editar su descripción enriquecida, subir fotos a su galería o cargar sus certificados (Distintivos de calidad).
*   **`Components/`:** Elementos visuales reutilizables propios de la gestión del directorio, como previsualizadores de fotos subidas o selectores anidados (Seleccionar una Región -> Desplegar Municipios).
*   **Conexiones:** Se conecta permanentemente con `DirectoryTradeController`, enviando datos a las tablas `directorios`, `directorio_certificates` y a la tabla pivote de categorías comerciales.

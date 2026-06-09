# Documentación Detallada: Módulo de Cursos (LMS)

La carpeta `resources/js/Pages/Courses` contiene la interfaz crítica donde ocurre **el aprendizaje del estudiante**. Es la "sala de clases virtual" y el sistema de evaluación interactiva. A diferencia de la carpeta `Dashboard` (que es administrativa), esta carpeta está 100% enfocada en el consumo de contenido.

Se divide en dos grandes subcarpetas lógicas: `Show` (consumo de video y progreso) y `Exams` (evaluaciones).

---

## 1. Carpeta `Courses/Show/` (El Aula Virtual)
Esta subcarpeta maneja toda la visualización del contenido de un curso, desde la vista previa comercial hasta el reproductor de video de las lecciones.

### Archivos Principales
*   **`Cover.jsx`:** Es la "Landing Page" de un curso específico. Cuando un alumno hace clic en un curso desde el catálogo, llega aquí primero. Muestra la portada, descripción, precio y el botón de "Comprar" o "Inscribirse". Si el curso es de pago, redirige al flujo de checkout de Stripe.
*   **`Index.jsx`:** Es el corazón del reproductor. Una vez que el alumno está inscrito, esta es la pantalla que dibuja el contenido del capítulo actual (título, descripción enriquecida, adjuntos descargables y el video). Se conecta fuertemente al backend para marcar el progreso cuando se termina una lección.

### Carpeta `Components/` (El esqueleto del aula)
Estos componentes construyen la interfaz inmersiva tipo Udemy/Platzi:
*   **`CourseLayout.jsx`:** El marco estructural. Esconde el menú general de la plataforma y crea un espacio inmersivo libre de distracciones. Recibe la lista de capítulos para inyectarlos en la barra lateral.
*   **`CourseNavbar.jsx`:** La barra superior simplificada dentro de un curso. Usualmente muestra el título del curso y un botón para volver al Dashboard.
*   **`CourseSidebar.jsx`:** La barra lateral (Sidebar) de navegación. Mapea todos los capítulos del curso y pinta de un color diferente los que ya están completados (usando candados para capítulos bloqueados o sin acceso).
*   **`VideoPlayer.jsx`:** El reproductor interactivo. En lugar de un `<video>` normal HTML5, este componente suele envolver un reproductor avanzado conectado a los identificadores (`playback_id`) de Mux Data para servir streaming rápido y adaptable a la velocidad del internet del estudiante.
*   **`CourseButtons.jsx`:** Los botones de "Marcar como completado", "Siguiente Lección" o "Lección Anterior". Manejan peticiones POST/PUT a Laravel para actualizar la tabla de `UserProgress`.
*   **`Certificate.jsx`:** Un componente condicional. Cuando el algoritmo del curso (la barra lateral) detecta que el estudiante ha completado el 100% de los capítulos obligatorios y ha aprobado todos los exámenes, despliega un botón especial para reclamar el certificado en PDF.

---

## 2. Carpeta `Courses/Exams/` (Sistema de Evaluaciones)
Esta subcarpeta es la responsable de aplicar las pruebas a los estudiantes para asegurar que retuvieron el conocimiento del curso.

### Archivos Principales
*   **`Show.jsx`:** Es la sala de espera del examen. Antes de que corra el tiempo, le muestra al estudiante las reglas de la evaluación, la calificación mínima aprobatoria y cuántos intentos tiene.
*   **`Take.jsx`:** Es el "pupitre". Muestra el examen interactivo en tiempo real.
    *   **Funcionamiento:** Renderiza las preguntas (`ExamQuestions`) y las opciones múltiples de respuesta (A, B, C, D). El estudiante interactúa seleccionando sus respuestas.
    *   **Conexiones:** Al terminar y presionar "Enviar", este componente empaqueta todas las respuestas en un objeto JSON y hace una petición a `ExamController@submit` en el backend, el cual calculará la calificación final usando las banderas `is_correct` en la base de datos y le informará al estudiante de inmediato si aprobó o falló.

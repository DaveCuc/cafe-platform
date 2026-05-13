<!--
# Actualziaciones
**Tareas en General**
Agregar las siguientes funcionalidades al lms.
1. Examenes.
2. capitulo sin videos.
3. capitulos con imagenes.
4. Cursos gratis.
5. solicitud de certificado.

# 1. Examenes
**utilizar los siguientes archivos:**
resources\js\pages\Dashboard\Teacher\Courses\Edit\Components\ChaptersForm.jsx
resources\js\pages\Courses\Show\Components\Exam.jsx
resources\js\pages\Dashboard\Teacher\Courses\Exams\Components
- dividiras sus funciones en componentes utilziando la carpeta components.

**agregar boton de añadir examen**
- en chapters forms añadir un boton llamado agregar examen y sus funciones.

**Caracteristicas del examen:**
Contara con las siguientes funciones:
- Crear y editar examen
- agregar preguntas

**Edicion de Examen**
-resources\js\pages\Dashboard\Teacher\Courses\Chapters\Edit\Index.jsx
crearas una copia de este elemento pero adaptado a examen con las sigueintes funcionalidades.
- agregar preguntas con la siguientes caracteristicas:
    - **seleccion unica (radio buttons).**
    - **seleccion multiple (checkboxes).**
    - **tendran un guardado automatico.**
**Requisitos**
- las preguntas no tendran indice real mientras se edita, solamente aparecera ese indice cuando se muestren durante el examen en la interfaz del alumno.
- para agregar las preguntas del examen copiaras el funcionamiento de agregar capitulos de ChaptersForm.jsx, replicando las funciones en un archivo llamado TestForm.jsx. la diferencia es que sera en vistas en grande para que se muestren tanto las preguntas como las respuestas.
- marcar la respuesta correcta para guardar la pregunta.
-se geneeraran preguntas en forma de cards individuales para diferenciar las preguntas.
- agregar botones para agregar preguntas de seleccion unica o multiple
- limite de 4 respuestas por pregunta rerspuestas<=4. 
- no existe limite de preguntas.
- agregar una alerta de ventana flotante cuando no se haya agregado como minimo un examen al curso,resources\js\pages\Dashboard\Teacher\Courses\Index.jsx.
- agregar numero de intentos.

**Vista de Examen estudiante**
- crear una vista de estado antes de iniciar el examen  con los siguientes elementos:
- **Detalles de la Tarea:** Una tarjeta informativa que resume las condiciones del examen:

    *   **Intentos** permitidos (ej. Ilimitado).
    *   **Enviado** (Fecha y hora de la última entrega).
    *   **Botón de Acción Principal:** En este caso "Reanudar" (para volver a intentar) o "Comenzar" (si es la primera vez).
*   **Panel de Calificación (Resultados):** Una tarjeta destacada (generalmente de color verde si está aprobada) que indica:
    *   **Nota obtenida:** (ej. 100%).
    *   **Regla de aprobación:** "Para aprobar necesitas al menos un 75%. Guardamos tu puntaje más alto."

**El examen**
-renderizar el examen en esa misma pagina, accediendo a el mediante el boton de conmenzar
- mostrar preguntas y respuestas, y finalment eun boton de submit.
- aparecera una pantalla de carga mientras se muestran los resultados en la vista estado del examen.
- finalmente se cierra el renderizado del examen y muestra los resultados.

# 2. Capitulo sin videos.
archivos a utilizar:
resources\js\pages\Dashboard\Teacher\Courses\Chapters\Edit\Index.jsx
resources\js\pages\Dashboard\Teacher\Courses\Chapters\Edit\Components\VideoForm.jsx

- Agregar la funcion de tener capitulo sin videos
- en editar el capitulo, debajo del elemento agregar un checkbox que diga, no incluir video permitiendo que se pueda pulbicar el capitulo, .
- modificar la vista del capitulo del estudiante,  si no existe video se ignore el elemento del video y mostrando el siguiente elemento.
resources\js\pages\Courses\Show\Index.jsx

# 3. Capitulos con imagenes.
archivos a utilizar:
resources\js\pages\Dashboard\Teacher\Courses\Chapters\Edit\Index.jsx
resources\js\pages\Dashboard\Teacher\Courses\Chapters\Edit\Components\VideoForm.jsx

- Agregar la funcion de poder subir tambien imagenes al capitulo.
- mostrar esas imagenes en el capitulo para el estudainte.
resources\js\pages\Courses\Show\Index.jsx


# 4. Cursos Gratis
arhcivos a editar
resources\js\pages\Dashboard\Teacher\Courses\Index.jsx
resources\js\pages\Dashboard\Teacher\Courses\Edit\Components\SimpleForms.jsx
- en priceform agrega una funcion para desactivar la autenticacion del pago
- añadir un check en la configuracion del curso para hacerlo gratis y bloqueando el input de añadir precio.
- en la vista del usuario al precionar el boton de inscribirse, se inscriba sin necesidad de autenticacion de pago.

# 5. Solicitud de Certificados.
**Que va ser**: una pagina web que te descargue un archivo pdf con el nombre de tu curso, la fecha que se realizo, y tu nombre de usuario.
resources\js\pages\Courses\Show\Components\Certificate.jsx
- estara disponilbe dentro del slide pero solo se  podra acceder cuando todo el curso este terminado y los resultados de los examentes esten aprobatorios.
- este elemnto no se va agregar manualmente sino que se agregara en automatico al crear el curso, siempre estando al final de todos los capitulos y examenes agregados en el curso.
- instala el componente barryvdh/laravel-dompdf para generar los pdf.
-la vista tendra un mensjae que diga, felicidades ya acabste tu curso.
- boton de descargar certificado.

**Contenido del PDF**
1. debe estar en horizontal
2. debe contener un margen de 1 in.
3. todos los elementos deben estar centrados.
3. debe contener los logos en la parte superior extraidos de la carpeta "public\Certificados". estos logos estaran dentro de un contenedor blanco que estara de izquierda a derecha de un tamaño de 1,5 in.
**mensajes**
4. Instituto Tecnológico de Tehuacán y la División de Estudios de Posgrado e Investigación.
5. Fecha, la fecha de emision del certificado (debe almacenarse la fecha de emision del certicado para que cuando en otra fecha se requiera descargar ocupe la misma de la primera vez).
6. Certifica a: [nombre del usuario].
7. que completo con exito el curso:
8. Titulo en grande del curso en seleccion.
9. un curso en linea ofrecido atravez de la plataforma de turismo de la reserva de la biosfera del instituto tecnologico de tehuacan.
10. El fondo del pdf sera la imagen de portada del curso con transparencia de 0.10.







# Corregir Certificados
Corregir el siguiente error:
No se puede generar el certificado
Call to undefined relationship [user] on model [App\Models\Course].


**Slides**
Agregar un efecto visual cuando se haya compeltado capitulo y examen, cambiar el color en verde, texto en blanco, y una palomita como icono de exito.


# Corregir vista de modulos de cursos
## Mejorar
**La vista actual tiene una leyenda que dice "Este capitulo no tiene Contenidos multimedia."**
- Eliminar esta leyenda y ocultar el espacio de la imagen si est amarcado como sin contenido multimedia desde el editor del profesor.
**Actualmente la vista la vista de cursos muestra unicamente el video o imagen como contenido multimedia principal pero no en simultaneo**
- Si se agrega un video y una imagen, agregar la imagen al final del texto mostrado en la vista del capitulo.



# Vista de Estudiante.
**Slide de temas**
- Modificar la vista del slide de contendio del estudiante.
    - Conservar el orden hecho por el maestro en el editor del curso.
    - No separar capitulo o examenes en apartados distintos.

- Es obligatorio conluir los examenes con calificacion aprovatoria para dar por hehco que se completo el curso.
- cuando se complete los examenes contaran para rellenar el porcentaje de completado del curso.


-- Agregar Portada dentro de la vista del estudiante
va a incluir lo siguiente:
- Foto de portada
- Titulo del curso
- Descripcion del Curso
- Categoria del curso

un boton que diga:
Si es Gratis: Inscribirse, Accion te inscribe
Si es de paga: Comprar por ${precio}, Accion de comprar
Si ya esta comprado: Inscrito, Ninguna botn en gris sin hoover

Un boton que diga Comenzar y que avance al capitulo siguiente: solo va aparecer cuando este comprado o inscrito el curso. 



**Slides**
Actualmente se ve incompleto la parte visual del frontend  en el slide del apartado de cursos para los estudaintes:

1. No se ve correctamente visualmente si ya se commpleto un capitulo, estos deben marcarse en verde si estan completados.
2. Cuando se selecciona el apartado para antes de iniciar el examen, se oculta la barra de progreso ocultando la vista de tu progreso, debe mostrarse la barra en todo momento hasta que se ouclte cunado se inicia el examen.

**Tareas a realizar:** 

- Corregir el efecto visual cuando se haya Completado un "capitulo", se supone que ya esta implementado pero no se ve reflejado al guardar, unicamente se ve reflejado en examenes.


-->
# Corregir Certificados
Corregir el siguiente error:
No se puede generar el certificado
Call to undefined relationship [user] on model [App\Models\Course].

# Modulo Maestro
- Cualquier edicion en personaliza tu cruso, contenido de curso, precio de curso o adjuntar archivos al curo,  despublica el curso.
Editar Capitulo y examen tambien despublica y quita el campo de valido para publicar, 
- arreglar completar los campos



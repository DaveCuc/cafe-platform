# MANUAL DE OPERACIÓN Y REFERENCIA TÉCNICA

**Propósito del Sistema:** MasterPro es un orquestador maestro diseñado específicamente para gestionar y automatizar despliegues de aplicaciones basadas en Laravel 11, React e Inertia.js dentro de servidores compartidos restrictivos (ej. Ferozo de DonWeb). El script mitiga proactivamente los bloqueos habituales de consola, intercepta las restricciones de seguridad perimetral y previene fallos críticos del sistema como el Error 500.

---

## 1. Especificaciones Técnicas y Compatibilidad

El núcleo del orquestador ha sido calibrado para interactuar de forma segura con las siguientes tecnologías de servidor y configuraciones del stack de desarrollo:

| **Componente**             | **Requisito / Compatibilidad**                                                                      |
| :--- | :--- |
| **Framework Backend**      | Laravel 11.x (retrocompatible con versiones 10.x).                                                  |
| **Lenguaje del Servidor**  | PHP 8.2 y PHP 8.3 de forma obligatoria. Versiones inferiores provocan fallos de sintaxis nativos.   |
| **Motor de Base de Datos** | MySQL y MariaDB mediante conexión PDO nativa y universal.                                           |
| **Compilación Frontend**   | React.js, Vue.js, Inertia.js, Tailwind CSS y Vite (procesamiento enfocado en `public/build` ).      |
| **Entornos de Hosting**    | Optimizado para Ferozo (DonWeb), cPanel estándar y Hostinger Shared Hosting (sin SSH/Terminal).     |

**Requisitos Previos de Infraestructura**
- Estructura del archivo comprimido: El proyecto base debe ser empaquetado exclusivamente en formato de extensión `ZIP`, purgado de dependencias locales innecesarias.
- Archivo de Entorno de Red ( `.env` ): Debe existir y estar configurado de forma nativa en la raíz del hosting antes de arrancar los despliegues automáticos.
- Permisos de Escritura del Servidor: La cuenta del hosting requiere permisos de escritura estándar (directorio estructurado bajo máscaras `CHMOD 75`5 y archivos bajo `CHMOD 644`) para posibilitar procesos de descompresión, purga y simlinks.

---

## 2. Protocolo de Acceso y Seguridad
Para evitar la exposición no autorizada de las herramientas críticas del servidor, MasterPro implementa un protocolo perimetral basado en variables de entorno locales.

**Configuración Obligatoria del Servidor**

Abre el archivo de entorno `.env` ubicado en la raíz del servidor de producción e inyecta la siguiente directiva de seguridad con una cadena alfanumérica compleja:

```env
MASTER_PANEL_PASSWORD= #Agrega aqui una contraseña
```

**Autenticación en Interfaz**
Apunta el navegador web hacia la ruta física del archivo (ej. https://sitioweb.com/MasterProFinal.php ).
El panel interceptará la petición y solicitará la c la contraseña definida en el paso anterior para desbloquear las operaciones técnicas.

---

## 3. Arquitectura del Panel: Referencia de Módulos

### Pestaña 1: Despliegue (Orquestación Automatizada)
Concentra las fases secuenciales para el refresco del código de producción. Los módulos deben operarse de izquierda a derecha de forma estricta:

- **Módulo 01: Limpiar Servidor**
Ejecuta el borrado físico de los directorios clave del despliegue anterior ( `app , routes , vendor , public/ build `). Prepara el entorno para una extracción libre de archivos corruptos o heredados.
> ⚠️**ATENCIÓN CRÍTICA**: Mantén la casilla "Incluir /storage" desactivada si la plataforma se encuentra en producción activa. Activarla destruirá de forma permanente los archivos cargados por los usuarios, avatares y certificados del sistema.

- **Módulo 02: Extraer Proyecto**
Localiza, lee y procesa los paquetes comprimidos en formato `ZIP` cargados en el directorio raíz o en la carpeta pública del hosting, descompimiéndolos de manera nativa e instantánea en el servidor.

- **Módulo 03: Conectar y Migrar**
Parsea las credenciales del archivo de entorno .env , valida el canal de red con la base de datos, ejecuta las migraciones pendientes del framework y regenera automáticamente el enlace simbólico del sistema de archivos (` storage:link ` ).

> ⚠️ **RIESGO DE PÉRDIDA DE DATOS**: La opción "Forzar Fresh" ejecuta un comando destructivo que elimina por completo el esquema de tablas antes de migrar. No la utilices a menos que requieras un reseteo total de la infraestructura de datos.

- **Módulo 04: Semilleros (Seeders)**
Rellena las tablas de la base de datos con datos y estructuras de catálogo iniciales. Ofrece la opción global `DatabaseSeeder` o el aislamiento selectivo de clases específicas.

### Pestaña 2: Módulo de Usuarios (Accesos Nativos)
Permite la inyección directa de credenciales administrativas en frío en la base de datos. Está diseñado específicamente para recuperar el control del software tras la ejecución de limpiezas destructivas (como el comando `Fresh`) o pérdidas de acceso general.

El módulo cifra automáticamente las contraseñas utilizando el algoritmo nativo del framework (`Bcrypt/Argon2`) y asigna el rol de `Maestro` saltándose las restricciones de la aplicación (MFA).

### Pestaña 3: Terminal Artisan
Simula una consola virtual interactiva que encapsula la ejecución de comandos CLI hacia el núcleo del framework sin requerir conexiones seguras vía SSH o clientes externos (`PuTTY`). El prefijo binario `php artisan` se encuentra predefinido de manera implícita.

**Ejemplos de diagnóstico y control operativo:**
- `route:list` — Inspección técnica del mapa de enrutamiento y middlewares activos.
- `make:controller NombreController` — Creación automatizada de controladores directamente en caliente.
- `cache:clear` — Depuración estándar de la memoria intermedia del framework.

### Pestaña 4: Consola SQL (Inyectador)
Proporciona un puente de comunicación directa con el motor de base de datos a través de una conexión PDO purificada, aislada de la capa ORM de la aplicación. Devuelve los resultados estructurados en texto `JSON` para una rápida depuración.

**Sentencias de uso frecuente:**
```sql
SELECT * FROM directorios;
UPDATE users SET is_teacher = 1 WHERE email = 'desarrollador@dominio.com';
```
### Pestaña 5: Seguridad (Mantenimiento Vital y Emergencias)
1. **Diagnóstico y Purga de Caché**: Botón de mitigación quirúrgica ante colapsos de entorno. Elimina físicamente los archivos fantasmas de configuración serializados dentro de las rutas internas latentes ( `bootstrap/cache` , `framework/views` , `framework/sessions` ), forzando una nueva compilación del entorno compartido.
2. **Generador de Copia de Seguridad**: Ejecuta un volcado rápido de la base de datos, empaquetando las estructuras de las tablas y sus registros dentro de un archivo ejecutable plano con extensión `.sql` , habilitando un enlace de descarga directa.

## 4. Flujo de Trabajo Estándar de Despliegue
Para asegurar despliegues exitosos y evitar la caída del servicio de producción, ejecuta estrictamente el siguiente algoritmo distribuido:

**Fase A: Compilación y Depuración Local (Tu Computadora)**
1. Abre la terminal en tu entorno local y purga las rutas absolutas:
`php artisan optimize:clear`
2. Compila y optimiza de forma definitiva los componentes del frontend para producción:
`npm run build`
3. Elimina las librerías de desarrollo, frameworks de testeo y genera el mapeo óptimo de clases:
`composer install --optimize-autoloader --no-dev`
> ⚠️**Importante**: No subas la carpeta `node_modules/` . Comprime todas las carpetas del proyecto en un archivo `.zip` y súbelo al servidor compartido mediante FTP o el Administrador de Archivos de tu panel de hosting.

**Fase B: Orquestación en Servidor (Mediante MasterPro)**
1. Accede a la pestaña Despliegue de MasterPro.
2. Ejecuta el **Módulo 1** para limpiar el software heredado (Asegúrate de mantener desactivada la casilla de storage si ya existen datos de usuario).
3. Ejecuta el **Módulo 2** seleccionando el archivo `.zip` para su descompresión.
4. Ejecuta el **Módulo 3** para asentar los cambios de base de datos estructurales sin reiniciar los registros operacionales (No marques _Forzar Fresh_).
5. Navega a la pestaña **Seguridad** y presiona **Escanear** y **Purgar Caché** para asentar de forma definitiva los mapeos de rutas del hosting.

## 5. Resoluciones Técnicas a Fallos Frecuentes (Troubleshooting)

1. **Bloqueo de Funciones del Sistema: `Call to undefined function proc_open()`**
- **Origen:** Servidores restrictivos como Ferozo bloquean la función `proc_open` por políticas estrictas de seguridad. Laravel 11 invoca nativamente esta función para estimar el tamaño de las líneas en la interfaz de comandos, rompiendo la ejecución del script.
- **Solución**: El módulo base de MasterPro inyecta automáticamente una capa de Polyfills en su inicialización. Al detectar la ausencia de la función, declara una réplica controlada de `proc_open()` que emite un retorno controlado `( false )`. El framework interpreta de forma segura la respuesta y procede a ejecutar las migraciones de manera lineal.

2. **Error 500 Persistente apuntando a Rutas del Entorno Local ( `C:/Users/...` )**
- **Origen 1:** Ocurre cuando el archivo `ZIP` contiene copias de las configuraciones cacheadas en tu ordenador local. Laravel lee el archivo compilado anterior e intenta mapear directorios del disco local que no existen en el entorno del hosting.
- **Solución 1**: Accede de forma inmediata a la pestaña de Seguridad en MasterPro y ejecuta el comando **Escanear** y **Purgar Caché**. Esto limpia por completo el contenido dinámico de `bootstrap/cache/` y restablece el flujo natural del entorno web de producción.
- **Origen 2:** Ocurre tambien porque no seeliminaron las librerías de desarrollo, frameworks de testeo provocando una sobrecarga.
- **Solución 2:** Ejecutar de la terminal antes de comprimir y generar el build, el siguiente codigo: `composer install --optimize-autoloader --no-dev`.

3. **Fallo de Conexión de Base de Datos bajo Clústeres de Red**
- **Origen**: Configurar el parámetro `DB_HOST=127.0.0.1` en el archivo `.env` provoca errores de tiempo de espera o rechazo de conexión debido a las reglas de firewall que aíslan las peticiones de red TCP/IP internas del clúster. 
- **Solución**: Edita la variable de entorno a `DB_HOST=localhost` . Este ajuste fuerza a la capa de abstracción del framework a saltarse la red e interactuar directamente mediante el Socket Unix local, evadiendo los bloqueos perimetrales del Firewall.


# Guía Práctica: Cómo preparar y desplegar el proyecto en producción
**Objetivo:** Preparar los archivos locales del proyecto, subirlos a un servidor de producción y pfconfigurar el entorno público de forma segura.

## Paso 1: Preparación en el Entorno Local
Ejecuta las siguientes acciones en tu entorno de desarrollo local para generar los archivos listos para producción.

1. **Limpia las configuraciones locales:**
Abre la terminal en la raíz del proyecto y ejecuta:
`php artisan optimize:clear`

2. **Aísla las dependencias para producción:**
Descarga solo los paquetes necesarios para producción y optimiza el autoloader:
`composer install --optimize-autoloader --no-dev`

3. **Compila el Frontend:**
Genera los archivos estáticos de React, Inertia y Tailwind CSS:
`npm run build`

4. **Empaqueta el proyecto:**

Comprime las siguientes carpetas y archivos en un archivo **.zip** (Esto es para copiar rapidamente los archivos al servidor y extraer la carpeta principal):

> **⚠️ Advertencia** Si los subes uno por uno te tardaras una eternidad ya que algunos servidores si no tienes los privilegios completos solo permiten subir archivos uno por uno, _como fue mi caso :.(_.

Esto es lo unico que debes incluir en tu archivo zip.

* **Carpetas:** 
- `app`
- `bootstrap`
- `config`
- `database`
- `public` (debe incluir la subcarpeta `build`)
- `resources`
- `routes`
- `vendor`
- `storage`
* **Archivos:**
- `artisan`
- `composer.json`
- `.env` (Este lo editaras en el servidor)

> **⚠️ Advertencia sobre la carpeta `storage`:** Si estás actualizando un proyecto que ya está en producción con usuarios activos, **NO sobrescribas la carpeta `storage/app/public`**.

---

## Paso 2: Carga y Configuración en el Servidor

1. **Sube los archivos:**
Sube el archivo `proyecto.zip` mediante tu panel de hosting (o FTP) y extráelo en el directorio correspondiente de tu servidor.

2. **Configura las variables de entorno:**
Localiza el archivo `.env`. Ábrelo y configura las variables principales y credenciales:

> **⚠️ RECUERDA SOLICITAR TODOS ESTOS ELEMENTOS A TU PROVEEDOR DE HOSTING**

```env
# Configuracion principal
APP_ENV=production
APP_DEBUG=false
APP_URL= #DOMINIO DE LA PAGINA PRINCIPAL https://tu-dominio.com

# Configuracion del base de datos

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE= # NOMBRE DE TU BASE DE DATOS
DB_USERNAME= # USUARIO DE LA BASE DE DATOS
DB_PASSWORD= # CONTRASEÑA DE LA BASE DE DATOS

# Configuracion del servicio de correo saliente
MAIL_MAILER=smtp
MAIL_HOST= # NOMBRE DEL SERVIDOR SMTP
MAIL_PORT=465
MAIL_USERNAME= # CORREO DEL DOMINIO EMISOR correo_emisor@dominio.com
MAIL_PASSWORD= # CONTRASEÑA DEL CORREO
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS= # CORREO DEL DOMINIO EMISOR correo_emisor@dominio.com
MAIL_FROM_NAME="${APP_NAME}"
```

---

## Paso 3: Enrutamiento Público Seguro
Para evitar la exposición de archivos sensibles, debes dirigir el tráfico web exclusivamente a la carpeta `public/`.

* **Opción 1 - Desde el Panel de Hosting (Recomendada):**
Ve a la sección de configuración de Dominios/Subdominios y cambia el destino del **Document Root** (Directorio Raíz) para que apunte directamente a `reserva-plataform/public`.

* **Opción 2 - Mediante archivo .htaccess:**
Si el panel no permite cambiar el Document Root, crea un archivo `.htaccess` en la raíz física del proyecto (fuera de la carpeta public) y agrega este bloque:

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```
---

## Paso 3: Inicialización de Infraestructura

Sigue las instrucciones del **Escenario A** o **Escenario B**, dependiendo de las herramientas que te ofrezca tu proveedor de hosting.

### Escenario A: Con acceso a Terminal / SSH (Recomendado)
Abre la terminal de tu servidor web en el directorio del proyecto y ejecuta secuencialmente:

1. **Construye la Base de Datos:**
`php artisan migrate --force`

2. **Vincula el almacenamiento de archivos públicos:**
`php artisan storage:link`

3. **Optimiza el rendimiento (Solo PHP 8.2+):**
`php artisan optimize`

### Escenario B: Sin acceso a Terminal (Panel Visual)

1. **Base de Datos:** Abre PHPMyAdmin en tu panel de hosting, selecciona la base de datos de producción, ve a la pestaña "Importar" y ejecuta el archivo `.sql` con la estructura inicial.
> Este debes generarlo antes desde tu PHPMyAdmin de XAMPP. Esto debido a que la base de datos esta distribuida en varios archivos debido a  migraciones del proyecto.

2. **Vincula las fotos (Symlink Manual):** Desde el Administrator de Archivos de tu hosting, entra a la carpeta `public/`. Utiliza la herramienta de "Crear Enlace" o "Symlink" de tu panel para crear un acceso directo llamado `storage` que apunte hacia la ruta relativa `../storage/app/public`.


### Escenario C: Ningun acceso solo FTP
Si contaste con la mala suerte de tener que levantar el proyecto y solamente estas subiendo los archivos atraves de FilleZilla, lo que es lo mas probable, cree una solución poderosa, permitiendote tener el control del proyecto sin depender del panel del proveedor de hosting.

Para esto tus datos del `.env` que se conectan al servidor deben estar **100% correctos**, si estan incorrectos no funcionara.

Cree un archivo llamado MasterPro.php que se debe colocar en el siguiente directorio `/public`

```text
Proyecto
├── app/...
├── database/...
├── public/                  
|   └── MasterPro.php        # Aqui debe estar el archivo        
├── resources/...         
├── routes/...             
└── sotrage/...                  
```
Lo que hace esta solución, es poder hacer la migración de base de datos y vincular los archivos de manera automatica y visual teniendo el control de la producción.
Si nada cambia debe funcionarte sin problemas.

> **⚠️ Advertencia sobre `MasterPro.php`:** Solamente ocupar para levantar el proyecto **NO conservarlo en el servidor** Eliminarlo justo despues. 

**Aqui encontraras mas información de como usarlo**
- [MasterPro.md](./documentacion/Master%20Pro.md)


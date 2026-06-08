# ¿Cómo configurar el entorno de desarrollo local?

En este tutorial configurarás tu entorno de desarrollo local y levantarás la aplicación en estado de desarrollo para verificar que todo funcione correctamente antes de comenzar a trabajar.

## Prerrequisitos
Antes de iniciar, asegúrate de tener instalado el siguiente software en tu máquina:

- PHP >= 8.2
- Composer
- Node.js y npm
- Git
- XAMPP (Requerido para el servidor de Base de Datos MySQL)


## Paso 1: Clonar el repositorio
Abre tu terminal, navega hasta la carpeta donde guardas tus proyectos y ejecuta el comando para clonar el repositorio:

```
git clone https://github.com/DaveCuc/reserva-platform.git
```
Una vez finalizado, entra al directorio del proyecto:
```
cd reserva-platform
```
## Paso 2: Instalación de dependencias y configuración inicial
Con el repositorio clonado y dentro de la carpeta del proyecto (reserva-platform), prepara el entorno instalando los paquetes necesarios y configurando tu conexión local.

### Instala las dependecias
Ejecuta en tu terminal:
**Backend (PHP):**
```
composer install
```

**Frontend (Inertia/Vue/React):**
```
npm install
```
### Configura las variables de entorno:

Copia el archivo de configuración de ejemplo para crear el tuyo propio y genera la clave de seguridad de la aplicación:
```
cp .env.example .env
php artisan key:generate
```

### Configura la Base de Datos (XAMPP):
- Abre el panel de control de XAMPP e inicia el servicio de MySQL.
- Crea una base de datos vacía llamada reserva_platform.
- Abre el archivo .env en tu editor de código y verifica que las credenciales coincidan con la configuración por defecto de XAMPP:

**Debe verse algo parecido a esto:**
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=reserva_platform
DB_USERNAME=root
DB_PASSWORD=
```

**Ejecuta las migraciones:**
Construye la estructura de la base de datos ejecutando el siguiente comando en tu terminal:

```
php artisan migrate
php artisan db:seed

```

## Paso 3: Ejecución del proyecto

Para poner en marcha la aplicación, debes levantar tanto el servidor del backend (Laravel) como el servidor de desarrollo del frontend (Vite) de manera simultánea.

En tu terminal principal , ejecuta el siguientes comandos para arrancar los servidores:

**Servidor local de PHP:**
```
php artisan serve
```
Una vez ejecutado debe aparecerte algo como esto:
```
 INFO  Server running on [http://127.0.0.1:8000].  
```

**Servidor de desarrollo frontend:**
```
npm run dev
```
Una vez ejecutado debe aparecerte algo como esto:
```
 VITE v6.2.2  ready in 266 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Paso 4: Verificación
Una vez que ambos servidores estén corriendo sin errores, abre tu navegador web y navega a la siguiente dirección:

> http://localhost:8000

Si todo se configuró correctamente, deberías ver la pantalla de inicio


7. Siguientes pasos

Enlaces a los otros cuadrantes (ej. "Ahora que el proyecto está corriendo, revisa las Guías How-To para aprender a hacer un despliegue, o la Referencia de la API").

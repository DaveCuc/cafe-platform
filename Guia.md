# Cómo configurar el entorno de desarrollo local

En esta guía configurarás tu entorno de desarrollo local y levantarás la aplicación para verificar que todo funcione correctamente antes de comenzar a trabajar.

## Prerrequisitos

Antes de iniciar, asegúrate de tener instalado el siguiente software:

- PHP (v8.5)
- Composer (v2.9.5) 
- Node.js (v25.6.1)
- npm (v11.9.0)
- Git (v2.53.0)
- XAMPP (requerido para el servidor de base de datos MySQL)

## 1. Clonar el repositorio

Abre tu terminal, navega hasta la carpeta de tus proyectos y clona el repositorio:

```bash
git clone https://github.com/DaveCuc/reserva-platform.git
```

Entra al directorio del proyecto:

```bash
cd reserva-platform
```

## 2. Instalar dependencias

Instala los paquetes necesarios para el backend y frontend.

**Backend (PHP):**
```bash
composer install
```

**Frontend (Inertia/Vue/React):**
```bash
npm install
```

## 3. Configurar el entorno y base de datos

Copia el archivo de configuración de ejemplo y genera la clave de seguridad de la aplicación:

```bash
cp .env.example .env
php artisan key:generate
```

Abre el panel de control de XAMPP, inicia el servicio de **MySQL** y crea una base de datos vacía llamada `reserva_platform`.

Abre el archivo `.env` en tu editor y configura las variables de conexión a la base de datos:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=reserva_platform
DB_USERNAME=root
DB_PASSWORD=
```

Construye la estructura de la base de datos y llénala con los datos iniciales:

```bash
php artisan migrate
php artisan db:seed
```

## 4. Ejecutar los servidores de desarrollo

Para poner en marcha la aplicación, debes levantar los servidores de backend y frontend en terminales separadas.

**Servidor local de PHP:**
```bash
php artisan serve
```
*Salida esperada:*
```text
 INFO  Server running on [http://127.0.0.1:8000].
```

**Servidor de desarrollo frontend:**
Abre una nueva pestaña en tu terminal y ejecuta:
```bash
npm run dev
```
*Salida esperada:*
```text
 VITE v6.2.2  ready in 266 ms

  ➜  Local:   http://localhost:5173/
```

## 5. Verificar la instalación

Con ambos servidores en ejecución, abre tu navegador web y dirígete a:

> http://localhost:8000

Deberías ver la pantalla de inicio de la plataforma.

## Siguientes pasos

Para continuar interactuando con la plataforma, consulta la siguiente documentación:

- **Guías Prácticas (How-To):** [Cómo crear una nueva reserva]()
- **Referencia:** [Referencia de la API REST]()
- **Explicación:** [Arquitectura del sistema de reservas]()
<?php
/**
 * MASTERPRO FINAL - VERSION FINAL
 * Desarrollo Profesional Avanzado por Cuahutencos Tech (JDC Tech Core)
 * Sistema Blindado de Despliegue y Automatizacion para Laravel 11 / Inertia.js / React
 * Disenado especificamente para superar y mitigar las restricciones de entornos compartidos como Ferozo / DonWeb.
 */

// =========================================================================
// 1. CAPA DE INTERCEPCION ULTRA-POTENTE (POLYFILLS DE SEGURIDAD)
// =========================================================================
if (!function_exists('proc_open')) {
    function proc_open($cmd, $desc, &$pipes, $cwd=null, $env=null, $opts=null) { return false; }
}
if (!function_exists('proc_close')) {
    function proc_close($process) { return 0; }
}
if (!function_exists('proc_get_status')) {
    function proc_get_status($process) { return ['running' => false]; }
}
if (!function_exists('shell_exec')) {
    function shell_exec($cmd) { return null; }
}

session_start();

// =========================================================================
// 2. PROTOCOLO AUTONOMO DE AUTENTICACION (CONTROL VIA .ENV)
// =========================================================================
$envPath = __DIR__ . '/../.env';
$masterPassword = null;

if (file_exists($envPath)) {
    $envContent = file_get_contents($envPath);
    if (preg_match('/^MASTER_PANEL_PASSWORD=(.*)$/m', $envContent, $matches)) {
        $masterPassword = trim($matches[1], "\"' \t\n\r\0\x0B");
    }
}

if (empty($masterPassword)) {
    die("<div style='background:#000; color:#fff; height:100vh; display:flex; align-items:center; justify-content:center; font-family:sans-serif;'>
        <div style='text-align:center; padding:30px; border:1px solid #222; background: #050505; border-radius:12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); max-width:450px;'>
            <h1 style='color:#ef4444; font-size: 20px; font-weight:700; letter-spacing:2px; margin-bottom:10px;'>ALERTA DE SEGURIDAD CRITICA</h1>
            <p style='color:#a3a3a3; font-size:13px; line-height:1.6;'>Debes definir la variable de entorno <b style='color:#fff; font-family:monospace;'>MASTER_PANEL_PASSWORD</b> dentro de tu archivo <b>.env</b> para habilitar este panel de administracion.</p>
            <div style='margin-top: 15px; border-top: 1px solid #222; padding-top: 15px; font-size:11px; color:#525252;'>Cuahutencos Tech Core - vFinal</div>
        </div>
    </div>");
}

if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: " . basename(__FILE__));
    exit;
}

if (isset($_POST['login_password'])) {
    if ($_POST['login_password'] === $masterPassword) {
        $_SESSION['master_final_auth'] = true;
        header("Location: " . basename(__FILE__));
        exit;
    } else {
        $error_login = "Acceso Denegado: Credencial incorrecta.";
    }
}

if (empty($_SESSION['master_final_auth'])) {
?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Acceso Maestro</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body { background-color: #000000; background-image: radial-gradient(circle at 50% 0%, #121212 0%, #000000 75%); min-height: 100vh; color: #ffffff; }
            .glass { background: rgba(255, 255, 255, 0.01); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.04); }
            .btn-gold { background: linear-gradient(135deg, #D4AF37 0%, #AA8B2B 100%); color: #000000; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
            .btn-gold:hover { background: linear-gradient(135deg, #F3C63F 0%, #D4AF37 100%); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(212, 175, 55, 0.2); }
        </style>
    </head>
    <body class="flex items-center justify-center font-sans">
        <div class="glass p-8 rounded-xl max-w-sm w-full text-center shadow-2xl mx-4">
            <h1 class="text-xl font-light tracking-widest text-white mb-1">MASTER<span class="text-[#D4AF37] font-bold">PRO</span></h1>
            <p class="text-[10px] text-gray-500 mb-6 uppercase tracking-widest font-mono">VERSION FINAL - CUAHUTENCOS TECH</p>
            <?php if (isset($error_login)): ?>
                <div class="bg-red-950/40 border border-red-500/30 text-red-300 text-xs p-3 rounded-lg mb-4 text-center font-mono"><?= $error_login ?></div>
            <?php endif; ?>
            <form method="POST">
                <input type="password" name="login_password" placeholder="****************" autofocus class="w-full bg-black/60 border border-white/10 p-3 rounded-lg text-sm focus:border-[#D4AF37] outline-none text-center mb-4 text-[#D4AF37] tracking-widest transition-all placeholder-gray-700">
                <button type="submit" class="w-full btn-gold font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest">Desbloquear Panel</button>
            </form>
        </div>
    </body>
    </html>
<?php
    exit;
}

// =========================================================================
// 3. MOTOR CENTRAL Y ENRUTADOR DE ACCIONES AJAX NATIVAS
// =========================================================================

$baseDirSeeders = __DIR__ . '/../database/seeders/';

function fetchDatabaseConfiguration() {
    $envPath = __DIR__ . '/../.env';
    $vars = [];
    if (file_exists($envPath)) {
        foreach (file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            if (strpos($line, '=') !== false) {
                list($k, $v) = explode('=', $line, 2);
                $vars[trim($k)] = trim($v, "\"' \t\n\r\0\x0B");
            }
        }
    }
    return [
        'host' => $vars['DB_HOST'] ?? '127.0.0.1',
        'port' => $vars['DB_PORT'] ?? '3306',
        'db'   => $vars['DB_DATABASE'] ?? '',
        'user' => $vars['DB_USERNAME'] ?? 'root',
        'pass' => $vars['DB_PASSWORD'] ?? ''
    ];
}

function bootLaravelFramework() {
    putenv('COLUMNS=120');
    putenv('LINES=50');
    require_once __DIR__ . '/../vendor/autoload.php';
    $app = require_once __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
    return [$app, $kernel];
}

if (isset($_GET['action'])) {
    header('Content-Type: application/json');
    $action = $_GET['action'];
    $logs = [];

    try {
        if ($action === 'borrar_servidor') {
            $elementos = ['../app', '../bootstrap', '../config', '../database', '../resources', '../routes', '../vendor', '../artisan', '../composer.json', 'build'];
            $incluirStorage = filter_var($_POST['incluir_storage'] ?? false, FILTER_VALIDATE_BOOLEAN);
            if ($incluirStorage) {
                $elementos[] = '../storage';
            }

            function eliminarRecursivo($ruta) {
                if (!file_exists($ruta)) return true;
                if (!is_dir($ruta)) return unlink($ruta);
                foreach (scandir($ruta) as $item) {
                    if ($item == '.' || $item == '..') continue;
                    if (!eliminarRecursivo($ruta . DIRECTORY_SEPARATOR . $item)) return false;
                }
                return rmdir($ruta);
            }

            foreach ($elementos as $el) {
                $realPath = realpath(__DIR__ . '/' . $el);
                if ($realPath && file_exists($realPath)) {
                    eliminarRecursivo($realPath) ? $logs[] = "Eliminado por completo: " . basename($el) : $logs[] = "Error al borrar: " . basename($el);
                }
            }
            echo json_encode(['success' => true, 'logs' => $logs, 'message' => 'Estructura antigua purgada exitosamente.']);
            exit;
        }

        if ($action === 'descomprimir_zip') {
            $zipFile = $_POST['zip_archivo'] ?? '';
            if (empty($zipFile)) throw new Exception("No has seleccionado ningun archivo ZIP valido.");

            $posiblesRutas = [__DIR__ . '/' . basename($zipFile), __DIR__ . '/../' . basename($zipFile)];
            $rutaFinal = null;
            foreach ($posiblesRutas as $r) {
                if (file_exists($r)) { $rutaFinal = $r; break; }
            }

            if (!$rutaFinal) throw new Exception("El archivo [$zipFile] ya no esta presente en el servidor.");

            $zip = new ZipArchive;
            if ($zip->open($rutaFinal) === TRUE) {
                $zip->extractTo(__DIR__ . '/../');
                $zip->close();
                $logs[] = "Extraido exitosamente: " . basename($zipFile);
                echo json_encode(['success' => true, 'logs' => $logs, 'message' => 'Descompresion de codigo finalizada correctamente.']);
            } else {
                throw new Exception("No se pudo abrir o procesar el archivo ZIP seleccionado.");
            }
            exit;
        }

        if ($action === 'conectar_migrar') {
            $isFresh = filter_var($_POST['forzar_fresh'] ?? false, FILTER_VALIDATE_BOOLEAN);

            $logFantasmas = __DIR__ . '/../storage/logs/laravel.log';
            if (file_exists($logFantasmas)) {
                @unlink($logFantasmas);
                $logs[] = "Historial antiguo de errores locales (laravel.log) removido del almacenamiento.";
            }

            if ($isFresh) {
                $db = fetchDatabaseConfiguration();
                if (empty($db['db'])) throw new Exception("Faltan configurar las credenciales de la BD en el archivo .env.");
                
                $pdo = new PDO("mysql:host={$db['host']};port={$db['port']};dbname={$db['db']};charset=utf8mb4", $db['user'], $db['pass'], [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                ]);

                $pdo->exec("SET FOREIGN_KEY_CHECKS = 0;");
                $tables = $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);
                foreach ($tables as $t) {
                    $pdo->exec("DROP TABLE IF EXISTS `$t`");
                }
                $pdo->exec("SET FOREIGN_KEY_CHECKS = 1;");
                $logs[] = "Base de datos vaciada por completo (Fresh PDO ejecutado exitosamente).";
            }

            putenv('APP_DEBUG=false');
            list($app, $kernel) = bootLaravelFramework();

            \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
            $outputArtisan = trim(\Illuminate\Support\Facades\Artisan::output());
            $logs[] = "Motor de Laravel ejecuto las siguientes operaciones:\n" . (!empty($outputArtisan) ? $outputArtisan : "Database is up to date.");

            $target = realpath(__DIR__ . '/../storage/app/public');
            $link = __DIR__ . '/storage';
            if (!file_exists($link) && $target) {
                @symlink($target, $link);
                $logs[] = "Enlace de fotos (/public/storage) recreado en produccion.";
            } else {
                $logs[] = "Enlace de fotos verificado y operativo.";
            }

            echo json_encode(['success' => true, 'logs' => $logs, 'message' => 'Proceso de Migracion Oficial completado con exito!']);
            exit;
        }

        if ($action === 'ejecutar_seeder') {
            $seederClase = $_POST['seeder_clase'] ?? 'Todas';
            list($app, $kernel) = bootLaravelFramework();

            $params = ['--force' => true];
            if ($seederClase !== 'Todas') {
                $params['--class'] = $seederClase;
            }

            \Illuminate\Support\Facades\Artisan::call('db:seed', $params);
            $output = trim(\Illuminate\Support\Facades\Artisan::output());
            $logs[] = "Semillero ejecutado con salida:\n" . (!empty($output) ? $output : "Proceso ejecutado sin logs.");

            echo json_encode(['success' => true, 'logs' => $logs, 'message' => 'Semillas inyectadas correctamente!']);
            exit;
        }

        if ($action === 'crear_usuario') {
            $name = trim($_POST['u_name'] ?? '');
            $email = trim($_POST['u_email'] ?? '');
            $password = trim($_POST['u_pass'] ?? '');
            $role = $_POST['u_role'] ?? 'alumno'; 

            if (empty($name) || empty($email) || empty($password)) {
                throw new Exception("Todos los campos (Nombre, Correo, Contraseña) son obligatorios.");
            }

            $db = fetchDatabaseConfiguration();
            $pdo = new PDO("mysql:host={$db['host']};port={$db['port']};dbname={$db['db']};charset=utf8mb4", $db['user'], $db['pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);

            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->fetch()) throw new Exception("El correo electronico ya se encuentra registrado.");

            $hashPassword = password_hash($password, PASSWORD_BCRYPT);
            $now = date('Y-m-d H:i:s');
            $isTeacher = ($role === 'admin') ? 1 : 0;

            $stmt = $pdo->prepare("INSERT INTO users (name, email, password, is_teacher, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$name, $email, $hashPassword, $isTeacher, $now, $now]);

            $logs[] = "Usuario [$email] creado con exito (Rol: " . strtoupper($role) . ").";
            echo json_encode(['success' => true, 'logs' => $logs, 'message' => 'Usuario registrado correctamente y listo para iniciar sesion!']);
            exit;
        }

        if ($action === 'ejecutar_terminal') {
            $comando = trim($_POST['comando'] ?? '');
            if (empty($comando)) throw new Exception("Por favor especifica un comando Artisan valido.");

            $cleanCmd = trim(str_replace(['php artisan', 'artisan '], '', $comando));
            $logs[] = "<span class='text-[#D4AF37]'>$ php artisan " . htmlspecialchars($cleanCmd) . "</span>";

            try {
                list($app, $kernel) = bootLaravelFramework();
                $argv = explode(' ', $cleanCmd);
                $commandName = array_shift($argv);
                
                $parsedParams = [];
                foreach ($argv as $arg) {
                    if (strpos($arg, '=') !== false) {
                        list($k, $v) = explode('=', $arg, 2);
                        $parsedParams[$k] = $v;
                    } else {
                        $parsedParams[$arg] = true;
                    }
                }

                \Illuminate\Support\Facades\Artisan::call($commandName, $parsedParams);
                $output = \Illuminate\Support\Facades\Artisan::output();
                $logs[] = "<span class='text-gray-300'>" . htmlspecialchars(!empty($output) ? trim($output) : "Comando ejecutado con exito (Sin salida de texto).") . "</span>";
            } catch (\Exception $ex) {
                $logs[] = "<span class='text-red-400'>Error de ejecucion: " . htmlspecialchars($ex->getMessage()) . "</span>";
            }

            echo json_encode(['success' => true, 'logs' => $logs, 'message' => 'Instruccion procesada.']);
            exit;
        }

        if ($action === 'ejecutar_sql') {
            $query = trim($_POST['query'] ?? '');
            if (empty($query)) throw new Exception("La caja de consulta SQL esta vacia.");

            $db = fetchDatabaseConfiguration();
            $pdo = new PDO("mysql:host={$db['host']};port={$db['port']};dbname={$db['db']};charset=utf8mb4", $db['user'], $db['pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);

            if (stripos($query, 'select') === 0 || stripos($query, 'show') === 0 || stripos($query, 'describe') === 0) {
                $stmt = $pdo->query($query);
                $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $logs[] = "Resultados devueltos:\n" . json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            } else {
                $affected = $pdo->exec($query);
                $logs[] = "Consulta de mutacion ejecutada de manera nativa. Filas afectadas: $affected";
            }

            echo json_encode(['success' => true, 'logs' => $logs, 'message' => 'Sentencia SQL procesada sin errores.']);
            exit;
        }

        if ($action === 'ejecutar_diagnostico') {
            $logs[] = "<b>Iniciando Diagnostico de Entorno (Cuahutencos Tech Core):</b>";
            $logs[] = file_exists(__DIR__ . '/../.env') ? "Archivo maestro .env detectado." : "ALERTA: Falta el archivo .env en la raiz.";
            $logs[] = file_exists(__DIR__ . '/build') || file_exists(__DIR__ . '/../public/build') ? "Compilacion de produccion de Vite (React/Inertia) detectada." : "Advertencia: No se encontro la carpeta public/build. Asegurate de compilar localmente.";

            $carpetasCache = [
                __DIR__ . '/../bootstrap/cache',
                __DIR__ . '/../storage/framework/views',
                __DIR__ . '/../storage/framework/cache/data',
                __DIR__ . '/../storage/framework/sessions'
            ];

            foreach ($carpetasCache as $folder) {
                if (is_dir($folder)) {
                    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($folder, RecursiveDirectoryIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST);
                    $contador = 0;
                    foreach ($files as $fileinfo) {
                        $todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
                        if ($fileinfo->getFilename() !== '.gitignore') {
                            if (@$todo($fileinfo->getRealPath())) $contador++;
                        }
                    }
                    $logs[] = "Higienizada carpeta [ " . basename($folder) . " ]: $contador archivos temporales destruidos.";
                }
            }

            echo json_encode(['success' => true, 'logs' => $logs, 'message' => 'Estructuras de cache formateadas al 100%! El entorno se encuentra esteril.']);
            exit;
        }

        if ($action === 'ejecutar_respaldo') {
            $db = fetchDatabaseConfiguration();
            if (empty($db['db'])) throw new Exception("No hay base de datos configurada en el .env.");

            $pdo = new PDO("mysql:host={$db['host']};port={$db['port']};dbname={$db['db']};charset=utf8mb4", $db['user'], $db['pass'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);

            $sqlDump = "-- BACKUP AUTOMATICO MASTERPRO FINAL\n-- GENERADO POR CUAHUTENCOS TECH\n-- Fecha: " . date('Y-m-d H:i:s') . "\n\nSET FOREIGN_KEY_CHECKS=0;\n\n";
            $tables = $pdo->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);

            foreach ($tables as $t) {
                $create = $pdo->query("SHOW CREATE TABLE `$t`")->fetch(PDO::FETCH_ASSOC);
                $sqlDump .= "DROP TABLE IF EXISTS `$t`;\n" . $create['Create Table'] . ";\n\n";

                $rows = $pdo->query("SELECT * FROM `$t`")->fetchAll(PDO::FETCH_ASSOC);
                foreach ($rows as $row) {
                    $cols = implode("`, `", array_keys($row));
                    $vals = array_map(function($v) use ($pdo) {
                        return is_null($v) ? 'NULL' : $pdo->quote($v);
                    }, array_values($row));
                    $sqlDump .= "INSERT INTO `$t` (`$cols`) VALUES (" . implode(", ", $vals) . ");\n";
                }
                $sqlDump .= "\n";
            }
            $sqlDump .= "SET FOREIGN_KEY_CHECKS=1;\n";

            $backupName = 'respaldo_maestro_' . date('Y-m-d_H-i-s') . '.sql';
            file_put_contents(__DIR__ . '/' . $backupName, str_replace("\n", "
", $sqlDump));

            $logs[] = "Copia de seguridad generada con exito de forma nativa.";
            $logs[] = "Archivo guardado de forma segura en la carpeta publica: <a href='$backupName' target='_blank' class='text-[#D4AF37] underline font-mono'>$backupName</a>";

            echo json_encode(['success' => true, 'logs' => $logs, 'message' => 'Respaldo blindado finalizado!']);
            exit;
        }

    } catch (\Throwable $e) {
        echo json_encode(['success' => false, 'message' => 'ERROR DE PROCESAMIENTO: ' . $e->getMessage()]);
        exit;
    }
}

$zipsDisponibles = [];
foreach (array_merge(scandir(__DIR__), scandir(__DIR__ . '/../')) as $archivo) {
    if (pathinfo($archivo, PATHINFO_EXTENSION) === 'zip' && !in_array($archivo, $zipsDisponibles)) {
        $zipsDisponibles[] = $archivo;
    }
}

$seedersDisponibles = [];
if (is_dir($baseDirSeeders)) {
    foreach (scandir($baseDirSeeders) as $file) {
        if (pathinfo($file, PATHINFO_EXTENSION) === 'php') {
            $seedersDisponibles[] = pathinfo($file, PATHINFO_FILENAME);
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MasterPro Final - Panel Core</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #000000; background-image: radial-gradient(circle at 50% 0%, #161616 0%, #000000 80%); min-height: 100vh; color: #ffffff; }
        .glass { background: rgba(255, 255, 255, 0.01); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.04); }
        .nav-link { transition: all 0.3s ease; border-bottom: 2px solid transparent; }
        .nav-link.active { border-bottom: 2px solid #D4AF37; color: #D4AF37; }
        .btn-gold { background: linear-gradient(135deg, #D4AF37 0%, #AA8B2B 100%); color: #000000; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .btn-gold:hover { background: linear-gradient(135deg, #F3C63F 0%, #D4AF37 100%); transform: translateY(-1px); box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2); }
        .brand-green { color: #10B981; }
        textarea, input, select { background-color: rgba(0,0,0,0.6) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #fff !important; }
        textarea:focus, input:focus, select:focus { border-color: #D4AF37 !important; outline: none !important; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #333; }
    </style>
</head>
<body class="font-sans antialiased flex flex-col min-h-screen selection:bg-[#D4AF37] selection:text-black">

    <nav class="glass sticky top-0 z-50 border-b border-white/5">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center gap-3">
                    <span class="text-lg font-light tracking-widest text-white">MASTER<span class="text-[#D4AF37] font-bold">PRO</span></span>
                    <span class="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded font-mono text-gray-400">VERSION FINAL</span>
                </div>
                <div class="flex items-center space-x-1 md:space-x-6 overflow-x-auto text-xs font-medium tracking-wider uppercase">
                    <button onclick="changeTab('deploy')" id="nav-deploy" class="nav-link active px-2 py-5 text-gray-400 hover:text-white">Despliegue</button>
                    <button onclick="changeTab('users')" id="nav-users" class="nav-link px-2 py-5 text-gray-400 hover:text-white">Usuarios</button>
                    <button onclick="changeTab('terminal')" id="nav-terminal" class="nav-link px-2 py-5 text-gray-400 hover:text-white">Terminal</button>
                    <button onclick="changeTab('sql')" id="nav-sql" class="nav-link px-2 py-5 text-gray-400 hover:text-white">SQL</button>
                    <button onclick="changeTab('seguridad')" id="nav-seguridad" class="nav-link px-2 py-5 text-gray-400 hover:text-white">Seguridad</button>
                    <a href="?logout=1" class="text-red-400 hover:text-white border border-red-900/30 hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-all font-mono normal-case">Salir</a>
                </div>
            </div>
        </div>
    </nav>

    <main class="flex-grow max-w-6xl mx-auto w-full p-6 mt-4">
        
        <div id="tab-deploy" class="tab-content space-y-6">
            <div class="glass p-6 rounded-xl border border-white/5 shadow-xl">
                <h2 class="text-xl font-light mb-1 text-white tracking-wide">Orquestacion de Codigo e Infraestructura</h2>
                <p class="text-xs text-gray-400 mb-6">Modulos nativos secuenciales diseñados para evadir restricciones de consola.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    
                    <div class="bg-black/40 p-5 rounded-xl border border-white/5 flex flex-col justify-between shadow-inner">
                        <div>
                            <div class="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] mb-1">Modulo 01</div>
                            <h3 class="font-bold text-sm mb-2 text-white">1. Limpiar Servidor</h3>
                            <p class="text-[11px] text-gray-400 mb-4 leading-relaxed">Remueve codigo antiguo para garantizar una instalacion limpia.</p>
                            <label class="flex items-center space-x-2 text-xs text-gray-300 mb-4 cursor-pointer select-none">
                                <input type="checkbox" id="checkStorage" class="accent-[#D4AF37] rounded">
                                <span class="text-red-400 font-medium">Incluir directorio /storage</span>
                            </label>
                        </div>
                        <button onclick="ejecutarLimpiezaServidor()" class="w-full bg-red-900/30 hover:bg-red-900/60 border border-red-500/20 text-red-200 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all">Purgar Servidor</button>
                    </div>
                    
                    <div class="bg-black/40 p-5 rounded-xl border border-white/5 flex flex-col justify-between shadow-inner">
                        <div>
                            <div class="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] mb-1">Modulo 02</div>
                            <h3 class="font-bold text-sm mb-2 text-white">2. Extraer Proyecto</h3>
                            <p class="text-[11px] text-gray-400 mb-3 leading-relaxed">Descomprime el codigo fuente en la raiz.</p>
                            <select id="select-zip" class="w-full bg-black border border-white/10 rounded-lg p-2 text-xs mb-4 outline-none">
                                <option value="" disabled selected>Selecciona un archivo .zip...</option>
                                <?php foreach($zipsDisponibles as $zip): ?>
                                    <option value="<?= $zip ?>"><?= $zip ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <button onclick="ejecutarDescompresionZip()" class="w-full bg-blue-900/30 hover:bg-blue-900/60 border border-blue-500/20 text-blue-200 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all">Extraer ZIP elegido</button>
                    </div>

                    <div class="bg-black/40 p-5 rounded-xl border border-white/5 flex flex-col justify-between shadow-inner">
                        <div>
                            <div class="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] mb-1">Modulo 03</div>
                            <h3 class="font-bold text-sm mb-2 text-white">3. Conectar y Migrar</h3>
                            <p class="text-[11px] text-gray-400 mb-3 leading-relaxed">Inicializa la base de datos leyendo los archivos del sistema.</p>
                            <label class="flex items-center space-x-2 text-xs text-gray-300 mb-4 cursor-pointer select-none">
                                <input type="checkbox" id="checkFresh" class="accent-[#D4AF37] rounded">
                                <span class="text-[#D4AF37] font-medium">Forzar Fresh (Reset BD)</span>
                            </label>
                        </div>
                        <button onclick="ejecutarConectarMigrar()" class="w-full btn-gold font-bold py-2 rounded-lg text-xs tracking-wide">Ejecutar Migracion</button>
                    </div>

                    <div class="bg-black/40 p-5 rounded-xl border border-white/5 flex flex-col justify-between shadow-inner">
                        <div>
                            <div class="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] mb-1">Modulo 04</div>
                            <h3 class="font-bold text-sm mb-2 text-white">4. Semilleros</h3>
                            <p class="text-[11px] text-gray-400 mb-3 leading-relaxed">Alimenta la base de datos con las taxonomias y registros semilla.</p>
                            <select id="select-seeder" class="w-full bg-black border border-white/10 rounded-lg p-2 text-xs mb-4 outline-none">
                                <option value="Todas">-> Todas (DatabaseSeeder)</option>
                                <?php foreach($seedersDisponibles as $seed): ?>
                                    <option value="<?= $seed ?>"><?= $seed ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                        <button onclick="ejecutarSeeder()" class="w-full bg-emerald-900/30 hover:bg-emerald-900/60 border border-emerald-500/20 text-emerald-200 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all">Poblar Tablas</button>
                    </div>

                </div>
            </div>
        </div>

        <div id="tab-users" class="tab-content hidden">
            <div class="glass p-6 rounded-xl border border-white/5 max-w-md mx-auto shadow-xl">
                <h2 class="text-xl font-light mb-1 text-white tracking-wide text-center">Registro de Accesos Nativos</h2>
                <p class="text-xs text-gray-400 mb-6 text-center">Inyecta cuentas de forma directa saltando bloqueos.</p>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-[11px] font-mono uppercase text-gray-400 mb-1">Nombre Completo</label>
                        <input type="text" id="u_name" placeholder="Ej: Estudiante" class="w-full p-2.5 rounded-lg text-sm bg-black/50 border border-white/10 outline-none">
                    </div>
                    <div>
                        <label class="block text-[11px] font-mono uppercase text-gray-400 mb-1">Correo Electronico</label>
                        <input type="email" id="u_email" placeholder="ejemplo@dominio.com" class="w-full p-2.5 rounded-lg text-sm bg-black/50 border border-white/10 outline-none">
                    </div>
                    <div>
                        <label class="block text-[11px] font-mono uppercase text-gray-400 mb-1">Contraseña</label>
                        <input type="text" id="u_pass" placeholder="contraseña" class="w-full p-2.5 rounded-lg text-sm bg-black/50 border border-white/10 outline-none font-mono text-[#D4AF37]">
                    </div>
                    <div>
                        <label class="block text-[11px] font-mono uppercase text-gray-400 mb-1">Rol / Permisos de Cuenta</label>
                        <select id="u_role" class="w-full p-2.5 rounded-lg text-sm bg-black/50 border border-white/10 outline-none">
                            <option value="admin">Administrador Maestro</option>
                            <option value="alumno">Alumno de la Plataforma</option>
                        </select>
                    </div>
                    <button onclick="ejecutarCrearUsuario()" class="w-full btn-gold font-bold py-2.5 rounded-lg text-xs uppercase tracking-widest mt-2">Inyectar Credencial</button>
                </div>
            </div>
        </div>

        <div id="tab-terminal" class="tab-content hidden">
            <div class="glass p-6 rounded-xl border border-white/5 shadow-xl">
                <h2 class="text-xl font-light mb-1 text-white tracking-wide">Consola Virtual de Artisan</h2>
                <p class="text-xs text-gray-400 mb-4">Ejecuta instrucciones directamente sobre el nucleo de Laravel.</p>
                <div class="flex gap-2 bg-black/40 p-2 rounded-xl border border-white/5">
                    <span class="text-gray-600 font-mono self-center pl-2 select-none text-sm">$ php artisan</span>
                    <input type="text" id="cmd-terminal" placeholder="route:list, cache:clear, key:generate..." class="w-full p-2.5 bg-transparent border-none text-sm focus:ring-0 outline-none font-mono text-[#D4AF37]" onkeypress="if(event.key === 'Enter') enviarComandoTerminal()">
                    <button onclick="enviarComandoTerminal()" class="bg-white/5 hover:bg-white/10 border border-white/10 px-5 rounded-lg text-xs tracking-widest uppercase font-mono transition-all">Ejecutar</button>
                </div>
            </div>
        </div>

        <div id="tab-sql" class="tab-content hidden">
            <div class="glass p-6 rounded-xl border border-white/5 shadow-xl">
                <h2 class="text-xl font-light mb-1 text-white tracking-wide">Inyectador SQL</h2>
                <p class="text-xs text-gray-400 mb-4">Motor de consulta directa con conexion PDO nativa enlazada al .env.</p>
                <div class="space-y-4">
                    <textarea id="sql-query" class="w-full h-40 p-4 font-mono text-sm rounded-xl bg-black/40 border border-white/5 text-[#D4AF37]" placeholder="SELECT * FROM users;"></textarea>
                    <button onclick="ejecutarConsultaSQL()" class="w-full bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-red-200 font-bold font-mono py-2.5 rounded-lg text-xs uppercase tracking-widest transition-all">Lanzar Sentencia</button>
                </div>
            </div>
        </div>

        <div id="tab-seguridad" class="tab-content hidden space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div class="glass p-6 rounded-xl border border-white/5 flex flex-col justify-between shadow-xl">
                    <div>
                        <h3 class="text-lg font-light text-white mb-2 tracking-wide">Diagnostico de Entorno y Purga</h3>
                        <p class="text-xs text-gray-400 leading-relaxed mb-4">Inspecciona la salud del despliegue y destruye fisicamente la cache de vistas, rutas y configuraciones locales erroneas.</p>
                    </div>
                    <button onclick="ejecutarAccionSeguridad('ejecutar_diagnostico')" class="w-full bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all">Escanear y Purgar Cache</button>
                </div>

                <div class="glass p-6 rounded-xl border border-white/5 flex flex-col justify-between shadow-xl">
                    <div>
                        <h3 class="text-lg font-light text-[#D4AF37] mb-2 tracking-wide">Generador de Copia de Seguridad</h3>
                        <p class="text-xs text-gray-400 leading-relaxed mb-4">Realiza una extraccion de todas las estructuras y filas de datos de tu MySQL en un archivo descargable .sql.</p>
                    </div>
                    <button onclick="ejecutarAccionSeguridad('ejecutar_respaldo')" class="w-full bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-200 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all">Generar Dump (.sql)</button>
                </div>

            </div>
        </div>

        <div class="mt-8 glass rounded-xl overflow-hidden flex flex-col h-72 border border-white/5 shadow-2xl">
            <div class="bg-black/90 border-b border-white/5 px-4 py-2.5 flex justify-between items-center select-none text-[10px] font-mono tracking-widest text-gray-500">
                <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span> TERMINAL LOG CONSOLE</span>
                <button onclick="document.getElementById('console-output').innerHTML=''" class="hover:text-white transition-all uppercase">Limpiar Monitor</button>
            </div>
            <div id="console-output" class="p-5 font-mono text-xs text-gray-300 overflow-y-auto flex-grow bg-[#020202] whitespace-pre-wrap leading-relaxed"></div>
        </div>

    </main>

    <footer class="text-center py-4 text-[10px] text-gray-600 font-mono tracking-wider mt-10 border-t border-white/5">
        Cuahutencos Tech (c) <?= date('Y') ?> - Proceso de Control de Despliegues Blindado.
    </footer>

    <script>
        const outConsole = document.getElementById('console-output');

        function changeTab(tabName) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
            document.getElementById('tab-' + tabName).classList.remove('hidden');
            document.getElementById('nav-' + tabName).classList.add('active');
        }

        function printLog(message, styleClass = 'text-gray-300') {
            let processedClass = styleClass;
            if (message.includes('exito') || message.includes('brand-green')) processedClass = 'brand-green font-semibold mb-2';
            if (message.includes('Error') || message.includes('ERROR')) processedClass = 'text-red-400 font-semibold mb-2';
            outConsole.innerHTML += `<div class="${processedClass} mb-1">${message}</div>`;
            outConsole.scrollTop = outConsole.scrollHeight;
        }

        async function sendAjaxProtocol(actionName, formData, triggerButton) {
            if (triggerButton) {
                triggerButton.disabled = true;
                triggerButton.classList.add('opacity-40');
            }
            printLog(`> Ejecutando operacion del sistema [${actionName}]...`, 'text-gray-500');
            
            try {
                const response = await fetch(`?action=${actionName}`, { method: 'POST', body: formData });
                if (response.redirected) return window.location.reload();
                
                const data = JSON.parse(await response.text());
                if (data.logs) {
                    data.logs.forEach(item => printLog(item));
                }
                printLog(data.message, data.success ? 'brand-green font-bold mt-2' : 'text-red-400 font-bold mt-2');
            } catch (error) {
                printLog(`ERROR CRITICO EN AJAX: ${error.message}`, 'text-red-500');
            }

            if (triggerButton) {
                triggerButton.disabled = false;
                triggerButton.classList.remove('opacity-40');
            }
        }

        function ejecutarLimpiezaServidor() {
            const inclStorage = document.getElementById('checkStorage').checked;
            let msg = "ATENCION: Estas a punto de borrar los directorios principales del sistema. Deseas continuar?";
            if(inclStorage) {
                msg = "ALERTA EXTREMA: Has marcado la opcion de incluir /storage. Esto borrara las fotos de tus usuarios. Estas seguro?";
            }
            if(!confirm(msg)) return;

            let fd = new FormData();
            fd.append('incluir_storage', inclStorage);
            sendAjaxProtocol('borrar_servidor', fd, event.target);
        }

        function ejecutarDescompresionZip() {
            const zipSelected = document.getElementById('select-zip').value;
            if(!zipSelected) {
                alert("Por favor escoge un archivo .zip del listado.");
                return;
            }
            let fd = new FormData();
            fd.append('zip_archivo', zipSelected);
            sendAjaxProtocol('descomprimir_zip', fd, event.target);
        }

        function ejecutarConectarMigrar() {
            const forceFresh = document.getElementById('checkFresh').checked;
            if (forceFresh) {
                if(!confirm("ADVERTENCIA MODO DIOS: Esta accion formateara la BD eliminando todas las tablas antes de correr las migraciones. Deseas proceder?")) return;
            }
            let fd = new FormData();
            fd.append('forzar_fresh', forceFresh);
            sendAjaxProtocol('conectar_migrar', fd, event.target);
        }

        function ejecutarSeeder() {
            const seederClase = document.getElementById('select-seeder').value;
            let fd = new FormData();
            fd.append('seeder_clase', seederClase);
            sendAjaxProtocol('ejecutar_seeder', fd, event.target);
        }

        function ejecutarCrearUsuario() {
            let fd = new FormData();
            fd.append('u_name', document.getElementById('u_name').value);
            fd.append('u_email', document.getElementById('u_email').value);
            fd.append('u_pass', document.getElementById('u_pass').value);
            fd.append('u_role', document.getElementById('u_role').value);
            sendAjaxProtocol('crear_usuario', fd, event.target);
        }

        function enviarComandoTerminal() {
            const cmdInput = document.getElementById('cmd-terminal');
            const cmdValue = cmdInput.value.trim();
            if(!cmdValue) return;

            let fd = new FormData();
            fd.append('comando', cmdValue);
            sendAjaxProtocol('ejecutar_terminal', fd, event.target);
            cmdInput.value = '';
        }

        function ejecutarConsultaSQL() {
            const sqlQuery = document.getElementById('sql-query').value.trim();
            if(!sqlQuery) return;

            let fd = new FormData();
            fd.append('query', sqlQuery);
            sendAjaxProtocol('ejecutar_sql', fd, event.target);
        }

        function ejecutarAccionSeguridad(accion) {
            let fd = new FormData();
            sendAjaxProtocol(accion, fd, event.target);
        }
    </script>
</body>
</html>

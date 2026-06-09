<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Descripción Principal: Crea la tabla para almacenar los archivos adjuntos de los cursos.
     * 
     * Base de datos/Apartado:
     * - attachments: Guarda el nombre y la URL del archivo, vinculándolo a un course_id.
     */
    public function up(): void
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('url');
            $table->uuid('course_id')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attachments');
    }
};

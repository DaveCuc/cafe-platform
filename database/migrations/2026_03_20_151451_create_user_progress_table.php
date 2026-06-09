<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Descripción Principal: Crea la tabla para rastrear el progreso de los usuarios en los capítulos.
     * 
     * Base de datos/Apartado:
     * - user_progress: Indica si un usuario ha completado o no un capítulo específico.
     */
    public function up(): void
    {
        Schema::create('user_progress', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('user_id');
            $table->uuid('chapter_id')->index();
            $table->boolean('is_completed')->default(false);
            $table->timestamps();
            
            $table->unique(['user_id', 'chapter_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_progress');
    }
};

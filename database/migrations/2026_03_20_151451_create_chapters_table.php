<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Descripción Principal: Crea la tabla de capítulos para organizar el contenido de cada curso.
     * 
     * Base de datos/Apartado:
     * - chapters: Almacena título, url del video, orden de aparición (position) y relación con el curso.
     */
    public function up(): void
    {
        Schema::create('chapters', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('video_url')->nullable();
            $table->integer('position');
            $table->boolean('is_published')->default(false);
            $table->boolean('is_free')->default(false);
            $table->uuid('course_id')->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chapters');
    }
};

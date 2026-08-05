<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Descripción Principal: Crea la tabla principal de cursos.
     * 
     * Base de datos/Apartado:
     * - courses: Almacena título, descripción, precio, estado de publicación y relación con categoría y creador.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('user_id');
            $table->text('title');
            $table->text('description')->nullable();
            $table->text('image_url')->nullable();
            $table->float('price')->nullable();
            $table->boolean('is_published')->default(false);
            $table->uuid('category_id')->nullable()->index();
            $table->timestamps();

            if (DB::connection()->getDriverName() !== 'sqlite') {
                $table->fullText('title');
            }
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};

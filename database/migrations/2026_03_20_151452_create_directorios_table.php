<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Descripción Principal: Crea la tabla base del directorio turístico para registrar empresas.
     * 
     * Base de datos/Apartado:
     * - directorios: Guarda la información inicial del negocio (nombre, giro, región, contacto).
     */
    public function up(): void
    {
        Schema::create('directorios', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('comercial_name', 80)->nullable();
            $table->string('giro', 80)->index();
            $table->string('region', 80)->nullable()->index();
            $table->string('name', 80)->index();
            $table->text('descripcion')->nullable();
            $table->string('address', 255)->nullable();
            $table->string('phone', 30)->nullable();
            $table->string('email', 191)->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('directorios');
    }
};

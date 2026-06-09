<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Crea las tablas de taxonomías (giros, regiones, municipios) para estructurar el directorio.
     */
    public function up(): void
    {
        Schema::create('giros', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->timestamps();
        });

        Schema::create('regions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->unique();
            $table->timestamps();
        });

        Schema::create('municipios', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('region_id')->constrained('regions')->cascadeOnDelete();
            $table->string('name');
            $table->timestamps();

            $table->unique(['region_id', 'name']);
        });

        Schema::create('directorio_giro', function (Blueprint $table) {
            $table->foreignUuid('directorio_id')->constrained('directorios')->cascadeOnDelete();
            $table->foreignUuid('giro_id')->constrained('giros')->cascadeOnDelete();
            $table->primary(['directorio_id', 'giro_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('directorio_giro');
        Schema::dropIfExists('municipios');
        Schema::dropIfExists('regions');
        Schema::dropIfExists('giros');
    }
};

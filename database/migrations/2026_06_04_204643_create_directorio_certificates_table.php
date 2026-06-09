<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Crea la tabla para almacenar los certificados/distintivos subidos por empresas del directorio.
     */
    public function up(): void
    {
        Schema::create('directorio_certificates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('directorio_id')->constrained('directorios')->cascadeOnDelete();
            $table->string('name');
            $table->date('issued_at')->nullable();
            $table->string('file_url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('directorio_certificates');
    }
};

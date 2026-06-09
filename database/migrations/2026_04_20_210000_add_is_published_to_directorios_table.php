<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Añade la opción de borrador/publicado a los negocios registrados en el directorio.
     */
    public function up(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->boolean('is_published')->default(false)->after('image_url');
        });
    }

    public function down(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->dropColumn('is_published');
        });
    }
};

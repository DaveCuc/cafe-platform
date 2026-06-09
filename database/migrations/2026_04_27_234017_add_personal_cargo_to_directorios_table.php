<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Añade el cargo personal (puesto) del encargado del negocio en el directorio.
     */
    public function up(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->string('personal_cargo', 120)->nullable()->after('personal_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->dropColumn('personal_cargo');
        });
    }
};

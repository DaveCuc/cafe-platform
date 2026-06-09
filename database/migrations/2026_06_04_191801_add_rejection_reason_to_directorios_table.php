<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Añade un campo para que un admin registre por qué se rechazó un comercio del directorio.
     */
    public function up(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->text('rejection_reason')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->dropColumn('rejection_reason');
        });
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Añade el campo "status" a los comercios para controlar un flujo de revisión/aprobación.
     */
    public function up(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->string('status', 20)->default('draft')->after('is_published');
        });

        DB::table('directorios')
            ->where('is_published', true)
            ->update(['status' => 'approved']);

        DB::table('directorios')
            ->where('is_published', false)
            ->update(['status' => 'draft']);
    }

    public function down(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};

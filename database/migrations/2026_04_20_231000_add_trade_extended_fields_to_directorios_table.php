<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Añade campos extendidos al directorio (descripciones, actividades, galería, contacto).
     */
    public function up(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->text('descripcion_corta')->nullable()->after('descripcion');
            $table->longText('descripcion_larga')->nullable()->after('descripcion_corta');
            $table->json('activities')->nullable()->after('descripcion_larga');
            $table->string('personal_name', 120)->nullable()->after('email');
            $table->string('personal_phone', 30)->nullable()->after('personal_name');
            $table->string('personal_email', 191)->nullable()->after('personal_phone');
            $table->json('gallery_images')->nullable()->after('personal_email');
        });
    }

    public function down(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->dropColumn([
                'descripcion_corta',
                'descripcion_larga',
                'activities',
                'personal_name',
                'personal_phone',
                'personal_email',
                'gallery_images',
            ]);
        });
    }
};

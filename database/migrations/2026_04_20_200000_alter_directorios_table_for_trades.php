<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Modifica la tabla del directorio añadiendo campos web y de ubicación del comercio.
     */
    public function up(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->foreignId('user_id')->nullable()->after('id')->constrained()->nullOnDelete();
            $table->string('giro', 80)->nullable()->change();
            $table->string('name', 80)->nullable()->change();
            $table->string('email', 191)->nullable()->change();
            $table->string('website', 255)->nullable()->after('descripcion');
            $table->string('image_url', 255)->nullable()->after('website');
            $table->string('map_location', 255)->nullable()->after('address');
        });
    }

    public function down(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->dropConstrainedForeignId('user_id');
            $table->dropColumn(['website', 'image_url', 'map_location']);
            $table->string('giro', 80)->nullable(false)->change();
            $table->string('name', 80)->nullable(false)->change();
            $table->string('email', 191)->nullable(false)->change();
        });
    }
};

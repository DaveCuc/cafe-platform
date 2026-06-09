<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Añade una URL para la imagen de portada de la tarjeta del artículo del blog.
     */
    public function up(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->string('card_image_url')->nullable()->after('image_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('card_image_url');
        });
    }
};

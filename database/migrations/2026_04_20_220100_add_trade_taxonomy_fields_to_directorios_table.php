<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Conecta los comercios del directorio con las nuevas tablas de región y municipio.
     */
    public function up(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->foreignUuid('region_id')->nullable()->after('giro')->constrained('regions')->nullOnDelete();
            $table->foreignUuid('municipio_id')->nullable()->after('region_id')->constrained('municipios')->nullOnDelete();
            $table->string('digital', 255)->nullable()->after('website');
            $table->string('email', 191)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('directorios', function (Blueprint $table) {
            $table->dropConstrainedForeignId('region_id');
            $table->dropConstrainedForeignId('municipio_id');
            $table->dropColumn('digital');
        });
    }
};

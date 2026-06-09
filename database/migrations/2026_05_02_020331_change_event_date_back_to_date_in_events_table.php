<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Revierte el tipo de dato de la fecha de evento dejándolo nuevamente como "date".
     */
    public function up(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->date('event_date')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('event_date')->nullable()->change();
        });
    }
};

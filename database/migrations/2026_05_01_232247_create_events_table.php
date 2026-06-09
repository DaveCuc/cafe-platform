<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    /**
     * Descripción Principal: Crea la tabla para registrar eventos públicos, presenciales o masterclasses online.
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignIdFor(\App\Models\User::class)->constrained()->cascadeOnDelete();
            
            $table->string('title');
            $table->string('short_description', 500)->nullable();
            $table->text('description')->nullable();
            $table->string('location')->nullable();
            
            $table->date('event_date')->nullable();
            $table->time('event_time')->nullable();
            $table->string('rsvp_link')->nullable();
            
            $table->string('image_url')->nullable();
            $table->string('cover_image_url')->nullable();
            
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            
            $table->json('topics')->nullable();
            $table->json('hosts')->nullable();
            $table->json('collaborators')->nullable();
            $table->json('organizers')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};

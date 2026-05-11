<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->boolean('is_free')->default(false);
        });

        Schema::table('chapters', function (Blueprint $table) {
            $table->boolean('is_video_required')->default(true);
            $table->text('image_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn('is_free');
        });

        Schema::table('chapters', function (Blueprint $table) {
            $table->dropColumn(['is_video_required', 'image_url']);
        });
    }
};

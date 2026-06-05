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
        Schema::dropIfExists('stripe_customers');
        Schema::dropIfExists('subscriptions');
        
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                if (Schema::hasColumn('users', 'stripe_id')) {
                    $table->dropColumn('stripe_id');
                }
                if (Schema::hasColumn('users', 'pm_type')) {
                    $table->dropColumn('pm_type');
                }
                if (Schema::hasColumn('users', 'pm_last_four')) {
                    $table->dropColumn('pm_last_four');
                }
                if (Schema::hasColumn('users', 'trial_ends_at')) {
                    $table->dropColumn('trial_ends_at');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No rollback
    }
};

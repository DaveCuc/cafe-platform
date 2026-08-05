<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Producción',
            'Tostado',
            'Barismo',
            'Comercio Justo',
            'Administración',
            'Agroecología'
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insertOrIgnore([
                'id' => Str::uuid()->toString(),
                'name' => $category,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

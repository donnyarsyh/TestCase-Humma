<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'admin_user',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('admin123'),
            ],
            [
                'id' => 2,
                'name' => 'user',
                'email' => 'user@gmail.com',
                'password' => bcrypt('user123'),
            ],
        ]);
    }
}

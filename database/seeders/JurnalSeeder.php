<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JurnalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('jurnal')->insert([
            [
                'judul' => 'Jurnal Pertama',
                'tgl' => '2025-05-10',
                'deskripsi' => 'Deskripsi jurnal pertama',
                'gambar' => 'jurnal1.jpg',
                'id' => 1 // pastikan user dengan id=1 ada
            ],
            [
                 'judul' => 'Jurnal Kedua',
                'tgl' => '2025-05-11',
                'deskripsi' => 'Deskripsi jurnal kedua',
                'gambar' => 'jurnal2.jpg',
                'id' => 2
            ],
        ]);
    }
}

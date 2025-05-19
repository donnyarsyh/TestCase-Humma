<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeederCatatan extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('catatan')->insert([
            [
                'user_id' => 1,
                'judul' => 'Tips Presentasi Efektif',
                'deskripsi' => 'Strategi untuk menyampaikan presentasi yang menarik dan informatif.',
                'tgl' => '2025-05-16',
                'gambar' => 'images/presentasi.jpg',
            ],
            [
                'user_id' => 2,
                'judul' => 'Kerangka Pembuatan Karya Tulis Ilmiah',
                'deskripsi' => 'Panduan langkah-langkah membuat KTI yang baik dan benar.',
                'tgl' => '2025-05-15',
                'gambar' => 'images/kti.jpg',
            ],
            [
                'user_id' => 2,
                'judul' => 'Pengenalan Pemrograman Laravel',
                'deskripsi' => 'Dasar-dasar membangun aplikasi web dengan Laravel.',
                'tgl' => '2025-05-18',
                'gambar' => 'images/laravel.jpg',
            ],
            [
                'user_id' => 2,
                'judul' => 'Tips Menulis Karya Ilmiah',
                'deskripsi' => 'Tata cara penulisan Karya Ilmiah dengan baik dan benar.',
                'tgl' => '2025-05-18',
                'gambar' => 'images/laravel.jpg',
            ],
        ]);
    }
}

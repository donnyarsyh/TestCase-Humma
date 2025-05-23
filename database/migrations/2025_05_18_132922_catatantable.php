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
        //
        Schema::create('catatan', function (Blueprint $table) {
            $table->bigIncrements('idcatatan'); // Primary key
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Foreign key ke tabel users
            $table->string('judul');
            $table->text('deskripsi')->nullable(); // Nullable jika deskripsi tidak wajib
            $table->date('tgl'); // Kolom tanggal
            $table->string('gambar')->nullable(); // Nullable jika gambar tidak wajib
            $table->timestamps(); // created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('catatan');
    }
};

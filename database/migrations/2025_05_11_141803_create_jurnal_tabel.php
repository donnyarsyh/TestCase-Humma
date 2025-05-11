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
        Schema::create('jurnal', function (Blueprint $table) {
        $table->id('idjurnal'); // custom primary key
        $table->string('judul');
        $table->date('tgl');
        $table->text('deskripsi');
        $table->string('gambar')->nullable();
        $table->foreignId('id')->constrained('users')->onDelete('cascade');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jurnal_tabel');
    }
};

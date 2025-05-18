<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Catatan extends Model
{
    //
    protected $primaryKey = 'idcatatan'; // Menentukan primary key

    protected $fillable = [
        'user_id',
        'judul',
        'deskripsi',
        'tgl',
        'gambar',
    ];

    /**
     * Relasi dengan model User
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

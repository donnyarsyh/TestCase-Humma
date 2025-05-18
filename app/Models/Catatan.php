<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Catatan extends Model
{
    //
    protected $table = 'catatan';
    protected $primaryKey = 'idcatatan';

    protected $fillable = [
        'user_id',
        'judul',
        'deskripsi',
        'tgl',
        'gambar',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

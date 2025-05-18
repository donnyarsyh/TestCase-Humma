<?php

namespace App\Http\Controllers;

use App\Models\Catatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CatatanController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        // $catatan = Catatan::where('user_id', $user->id)
        //     ->select('idcatatan', 'judul', 'deskripsi', 'tgl', 'gambar')
        //     ->get();
        $catatan = Catatan::select('idcatatan', 'user_id', 'judul', 'deskripsi', 'tgl', 'gambar')
            ->get();

        return Inertia::render('Catatan', [
            'user' => [
                'name' => $user->name,
            ],
            'catatan' => $catatan,
        ]);
    }
}

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
        $catatan = Catatan::with('user')
            ->select('idcatatan', 'user_id', 'judul', 'deskripsi', 'tgl', 'gambar')
            ->get()
            ->map(function ($catatan) {
                return [
                    'idcatatan' => $catatan->idcatatan,
                    'user_id' => $catatan->user_id,
                    'user_name' => $catatan->user ? $catatan->user->name : 'Unknown',
                    'judul' => $catatan->judul,
                    'deskripsi' => $catatan->deskripsi,
                    'tgl' => $catatan->tgl,
                    'gambar' => $catatan->gambar,
                ];
            });

        return Inertia::render('Catatan', [
            'user' => [
                'name' => $user->name,
            ],
            'catatan' => $catatan,
        ]);
    }

    public function destroy($idcatatan)
    {
        // Cari catatan berdasarkan idcatatan dan pastikan milik pengguna yang login
        $catatan = Catatan::where('idcatatan', $idcatatan)
            ->firstOrFail();

        // Hapus catatan
        $catatan->delete();

        // Redirect kembali ke halaman catatan dengan pesan sukses
        return redirect()->route('catatan')->with('message', 'Catatan berhasil dihapus.');
    }
}

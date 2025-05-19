<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DataUserController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();

        // Cek otorisasi: hanya admin yang bisa melihat daftar user
        if ($user->role !== 'admin') {
            // Log::warning('Unauthorized access to user list:', ['user_id' => $user->id]);
            return redirect()->route('catatan')->with('error', 'Anda tidak memiliki izin untuk melihat daftar pengguna.');
        }

        // Ambil semua user
        $users = User::select('id', 'name', 'email', 'role')->get();

        return Inertia::render('DataUser', [
            'user' => [
                'name' => $user->name,
            ],
            'users' => $users,
        ]);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        if ($user->role !== 'admin') {
            return redirect()->back()->with('error', 'Anda tidak memiliki izin.');
        }
        User::findOrFail($id)->delete();
        return redirect()->route('datauser')->with('message', 'Pengguna berhasil dihapus.');
    }
}

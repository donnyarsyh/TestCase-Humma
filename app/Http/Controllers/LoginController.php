<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LoginController extends Controller
{
    //
    public function create()
    {
        return Inertia::render('Login');
    }

    /**
     * Menangani proses autentikasi.
     */
    public function store(Request $request)
    {
        // Validasi input
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        // Coba login
        if (Auth::attempt($credentials)) {
            // Periksa role user
            if (Auth::user()->role === 'admin') {
                $request->session()->regenerate();
                return Inertia::location(route('catatan')); // Redirect ke halaman catatan
            } else {
                // Logout user jika bukan admin
                Auth::logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                return Redirect::back()->withErrors([
                    'email' => 'Akses ditolak. Hanya admin yang dapat login.',
                ]);
            }
        }

        // Jika login gagal
        return Redirect::back()->withErrors([
            'email' => 'Email atau password salah.',
        ]);
    }

    /**
     * Logout pengguna.
     */
    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Inertia::location(route('login'));
    }
}

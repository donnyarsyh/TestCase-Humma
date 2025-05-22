<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function attemptLogin(array $credentials): bool
    {
        return Auth::attempt($credentials);
    }

    public function isAdmin(): bool
    {
        return Auth::check() && Auth::user()->role === 'admin';
    }

    public function logout(Request $request): void
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }

    public function getNonAdminUsers()
    {
        return User::select('id', 'name', 'email', 'role')
                    ->where('role', '!=', 'admin')
                    ->get();
    }

    public function deleteUser($id)
    {
        $currentUser = Auth::user();

        // Hanya admin yang boleh hapus
        if ($currentUser->role !== 'admin') {
            return ['success' => false, 'message' => 'Anda tidak memiliki izin.'];
        }

        $userToDelete = User::findOrFail($id);

        // Tidak bisa hapus sesama admin
        if ($userToDelete->role === 'admin') {
            return ['success' => false, 'message' => 'Pengguna dengan peran admin tidak dapat dihapus.'];
        }

        // Tidak boleh hapus dirinya sendiri
        if ($userToDelete->id === $currentUser->id) {
            return ['success' => false, 'message' => 'Anda tidak dapat menghapus akun Anda sendiri.'];
        }

        $userToDelete->delete();

        return ['success' => true, 'message' => 'Pengguna berhasil dihapus.'];
    }
}

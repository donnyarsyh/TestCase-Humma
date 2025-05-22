<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DataUserController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function index()
    {
        $user = Auth::user();

        if (!$this->authService->isAdmin()) {
            return redirect()->route('catatan')
                ->with('error', 'Anda tidak memiliki izin untuk melihat daftar pengguna.');
        }

        $users = $this->authService->getNonAdminUsers();

        return Inertia::render('UserCopy', [
            'user' => $user,
            'users' => $users,
        ]);
    }
    public function destroy($id)
    {
        $result = $this->authService->deleteUser($id);

        if (!$result['success']) {
            return redirect()->back()->with('error', $result['message']);
        }

        return redirect()->route('datauser')->with('message', $result['message']);
    }
}

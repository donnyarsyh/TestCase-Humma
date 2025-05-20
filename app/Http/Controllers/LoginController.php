<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginFormRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LoginController extends Controller
{
    //
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function create()
    {
        return Inertia::render('Login');
    }

    public function store(LoginFormRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if ($this->authService->attemptLogin($credentials)) {
            if ($this->authService->isAdmin()) {
                $request->session()->regenerate();
                return Inertia::location(route('catatan'));
            }

            $this->authService->logout($request);
            return Redirect::back()->withErrors([
                'email' => 'Akses ditolak. Hanya admin yang dapat login.',
            ]);
        }

        return Redirect::back()->withErrors([
            'email' => 'Email atau password salah.',
        ]);
    }

    public function destroy(Request $request)
    {
        $this->authService->logout($request);
        return Inertia::location(route('login'));
    }
}

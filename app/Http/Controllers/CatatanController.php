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
        return Inertia::render('Catatan', [
            'user' => [
                'name' => $user->name,
            ],
        ]);
    }
}

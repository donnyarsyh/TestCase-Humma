<?php

namespace App\Http\Controllers;

use App\Models\Catatan;
use App\Services\CatatanService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CatatanController extends Controller
{
    //
    protected $catatanService;

    public function __construct(CatatanService $catatanService)
    {
        $this->catatanService = $catatanService;
    }

    public function index()
    {
        $user = Auth::user();

        $catatan = $this->catatanService->getAllWithUser();

        return Inertia::render('Catatan', [
            'user' => [
                'name' => $user->name,
            ],
            'catatan' => $catatan,
        ]);
    }

    public function destroy($idcatatan)
    {
        $this->catatanService->deleteById($idcatatan);
        return redirect()->route('catatan')->with('message', 'Catatan berhasil dihapus.');
    }
}

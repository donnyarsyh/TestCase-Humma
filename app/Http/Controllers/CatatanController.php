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

    public function index(Request $request)
    {
        $user = Auth::user();

        $perPage = $request->input('per_page', 5);
        $search = $request->input('search');
        $sortBy = $request->input('sort_by');
        $sortOrder = $request->input('sort_order', 'asc');

        $catatan = $this->catatanService->getPaginatedCatatan($perPage, $search, $sortBy, $sortOrder);

        return Inertia::render('Catatan', [
            'user' => [
                'name' => $user->name,
            ],
            'catatan' => $catatan,
            'filters' => [
                'search' => $search,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
        ]);
    }

    public function destroy($idcatatan)
    {
        $this->catatanService->deleteById($idcatatan);
        return redirect()->route('catatan')->with('message', 'Catatan berhasil dihapus.');
    }
}

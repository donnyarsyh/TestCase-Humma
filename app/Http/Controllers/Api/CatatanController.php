<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Catatan;
use Illuminate\Http\Request;

class CatatanController extends Controller
{
    public function index($user_id)
    {
        $catatans = Catatan::where('user_id', $user_id)->get();

        return response()->json([
            'success' => true,
            'data' => $catatans,
        ], 200);
    }

    public function store(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'user_id'   => 'required|integer|exists:users,id',
            'judul'     => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tgl'       => 'required|date',
            'gambar'    => 'nullable|string',
        ]);

        // Buat catatan baru
        $catatan = Catatan::create([
            'user_id'   => $validated['user_id'],
            'judul'     => $validated['judul'],
            'deskripsi' => $validated['deskripsi'],
            'tgl'       => $validated['tgl'],
            'gambar'    => $validated['gambar'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Catatan berhasil ditambahkan',
            'data'    => $catatan,
        ], 201);
    }

    // Fungsi update ditambahkan di sini
    public function update(Request $request, $id)
    {
        $catatan = Catatan::find($id);

        if (!$catatan) {
            return response()->json([
                'success' => false,
                'message' => 'Catatan tidak ditemukan',
            ], 404);
        }

        // Validasi data update
        $validated = $request->validate([
            'user_id'   => 'required|integer|exists:users,id',
            'judul'     => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tgl'       => 'required|date',
            'gambar'    => 'nullable|string',
        ]);

        // Update data catatan
        $catatan->user_id = $validated['user_id'];
        $catatan->judul = $validated['judul'];
        $catatan->deskripsi = $validated['deskripsi'];
        $catatan->tgl = $validated['tgl'];
        if (isset($validated['gambar'])) {
            $catatan->gambar = $validated['gambar'];
        }

        $catatan->save();

        return response()->json([
            'success' => true,
            'message' => 'Catatan berhasil diperbarui',
            'data'    => $catatan,
        ], 200);
    }

    public function uploadGambar(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'gambar' => 'required|image|max:2048',
        ]);

        $userId = $request->user_id;
        $file = $request->file('gambar');

        $path = "catatan/{$userId}";
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->storeAs($path, $fileName, 'public');

        $relativePath = $path . '/' . $fileName;
        $publicUrl = asset('storage/' . $relativePath);

        $catatan = Catatan::where('user_id', $userId)->latest()->first();

        if ($catatan) {
            $catatan->gambar = $relativePath;
            $catatan->save();
        } else {
            return response()->json(['message' => 'Catatan tidak ditemukan untuk user ini'], 404);
        }

        return response()->json([
            'message' => 'Upload berhasil',
            'path' => $relativePath,
            'url' => $publicUrl,
        ]);
    }

    public function destroy($id)
    {
        $catatan = Catatan::find($id);

        if (!$catatan) {
            return response()->json([
                'success' => false,
                'message' => 'Catatan tidak ditemukan',
            ], 404);
        }

        if ($catatan->gambar) {
            $filePath = storage_path('app/public/' . $catatan->gambar);
            if (file_exists($filePath)) {
                @unlink($filePath);
            }
        }

        $catatan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Catatan berhasil dihapus',
        ]);
    }
}

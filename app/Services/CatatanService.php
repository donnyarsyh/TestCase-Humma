<?php

namespace App\Services;

use App\Models\Catatan;

class CatatanService
{
    public function getAllWithUser()
    {
        return Catatan::with('user')
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
    }

    public function deleteById($idcatatan)
    {
        $catatan = Catatan::where('idcatatan', $idcatatan)->firstOrFail();
        $catatan->delete();
    }

    public function getPaginatedCatatan($perPage = 10, $search = null, $sortBy = null, $sortOrder = 'asc')
    {
        $query = Catatan::select('catatan.idcatatan', 'catatan.judul', 'catatan.deskripsi', 'catatan.tgl', 'users.name as user_name')
            ->join('users', 'catatan.user_id', '=', 'users.id');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('catatan.judul', 'like', "%$search%")
                    ->orWhere('users.name', 'like', "%$search%");
            });
        }

        if ($sortBy) {
            if (in_array($sortBy, ['judul', 'user_name'])) {
                $query->orderBy($sortBy == 'user_name' ? 'users.name' : 'catatan.' . $sortBy, $sortOrder);
            }
        }

        return $query->paginate($perPage)->appends([
            'search' => $search,
            'sort_by' => $sortBy,
            'sort_order' => $sortOrder,
        ]);
    }
}

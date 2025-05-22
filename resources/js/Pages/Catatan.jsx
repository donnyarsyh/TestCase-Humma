import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import CatatanDetailPopup from './CatatanDetail';
import ConfirmHapusCatatan from '../Components/ConfirmHapusCatatan';

export default function Catatan() {
  const { user, catatan, filters, flash } = usePage().props;
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [catatanIdToDelete, setCatatanIdToDelete] = useState(null);
  const [flashMessage, setFlashMessage] = useState(flash || null);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [sortKey, setSortKey] = useState(filters.sort_by || '');
  const [showPopup, setShowPopup] = useState(null);

  const handlePagination = (url) => {
    if (url) {
      router.visit(url, {
        preserveState: true,
        preserveScroll: true,
      });
    }
  };

  useEffect(() => {
    if (flash) {
      setFlashMessage(flash);
    }
  }, [flash]);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  const handleDelete = (idcatatan) => {
    setCatatanIdToDelete(idcatatan);
    setConfirmingDelete(true);
  };

  const confirmDelete = () => {
    router.delete(route('catatan.destroy', catatanIdToDelete), {
      onSuccess: () => {
        setFlashMessage({ type: 'success', message: 'Catatan berhasil dihapus' });
        setConfirmingDelete(false);
      },
      onError: (errors) => {
        setFlashMessage({
          type: 'error',
          message: errors.message || 'Gagal menghapus catatan.',
        });
      },
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    router.get(route('catatan'), {
      search: value,
      sort_by: sortKey,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortKey(newSort);
    router.get(route('catatan'), {
      search: searchTerm,
      sort_by: newSort,
    }, {
      preserveState: true,
      replace: true,
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSortKey('');
    router.get(route('catatan'), {
      t: new Date().getTime(), // tambahkan timestamp agar selalu dianggap permintaan baru
    }, {
      preserveState: true,
      replace: true,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="bg_halaman p-6">
        <p>Selamat Datang, {user.name}</p>
        <p className="data_pengguna">Data Catatan</p>

        {/* Flash Message */}
        {flashMessage && (
          <div
            className={`mb-4 p-4 rounded ${flashMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
          >
            {flashMessage.message}
          </div>
        )}

        <div className="flex justify-between mb-3">
          <div></div>
          <div className="flex items-center gap-3 ml-auto">

            <input
              type="text"
              placeholder="Cari catatan..."
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded px-4 py-2 w-64"
            />
            <select
              value={sortKey}
              onChange={handleSortChange}
              className="border rounded px-3 py-2 text-sm w-44"
            >
              <option value="">Urutkan</option>
              <option value="nama">Nama A - Z</option>
              <option value="judul">Judul A - Z</option>
            </select>
            <button
              onClick={handleReset}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="wrapper_tabel">
          <table className="tabel_pengguna bg-white">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Pengguna</th>
                <th>Judul</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {catatan.data.length > 0 ? (
                catatan.data.map((item, index) => (
                  <tr key={item.idcatatan}>
                    <td>{(catatan.current_page - 1) * catatan.per_page + index + 1}</td>
                    <td>{item.user_name}</td>
                    <td>{item.judul}</td>
                    <td>
                      <button
                        onClick={() => setShowPopup(item)}
                        className="tombol_detail"
                      >
                        Detail
                      </button>
                      <button
                        onClick={() => handleDelete(item.idcatatan)}
                        className="tombol_hapus"
                      >
                        <span className="hapus">Hapus</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-sm text-gray-500">
                    Belum ada catatan yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex gap-2 justify-end mt-4">
            {catatan.links.map((link, index) => (
              <button
                key={index}
                disabled={!link.url}
                onClick={() => handlePagination(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`px-3 py-1 border rounded-xl ${link.active ? 'bg-[#DDA853] text-white' : 'bg-white'}`}
              />
            ))}
          </div>
        </div>

        {showPopup && (
          <CatatanDetailPopup
            catatan={showPopup}
            onClose={() => setShowPopup(null)}
          />
        )}

        {confirmingDelete && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
            <ConfirmHapusCatatan
              visible={confirmingDelete}
              onConfirm={confirmDelete}
              onCancel={() => setConfirmingDelete(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
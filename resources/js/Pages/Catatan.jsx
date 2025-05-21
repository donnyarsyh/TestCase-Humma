import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import CatatanDetailPopup from './CatatanDetail';

export default function Catatan() {
  const { props } = usePage();
  const { user, catatan, flash } = props;
  
  const [flashMessage, setFlashMessage] = useState(flash || null);
  const [sortKey, setSortKey] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(null);
  
  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);
  
  const handleDelete = (idcatatan) => {
    if (confirm('Are you sure you want to delete this catatan?')) {
      router.delete(route('catatan.destroy', idcatatan), {
        onSuccess: () => {
          setFlashMessage({ type: 'success', message: 'Catatan berhasil dihapus' });
        },
        onError: (errors) => {
          setFlashMessage({
            type: 'error',
            message: errors.message || 'Gagal menghapus catatan.',
          });
        },
      });
    }
  };

  // Filter dan sort
  const filteredCatatan = catatan.filter(
    (item) =>
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCatatan = [...filteredCatatan].sort((a, b) => {
    if (sortKey === 'nama') return a.user_name.localeCompare(b.user_name);
    if (sortKey === 'judul') return a.judul.localeCompare.localeCompare(b.judul);
    return 0;
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
            className={`mb-4 p-4 rounded ${
              flashMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {flashMessage.message}
          </div>
        )}

        <div className="flex justify-between mb-3">
          <div></div> 
          <div className="flex items-center gap-3 ml-auto">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="border rounded px-3 py-2 text-sm w-44"
            >
              <option value="">Urutkan</option>
              <option value="nama">Nama A - Z</option>
              <option value="judul">Judul A - Z</option>
            </select>
            <input
              type="text"
              placeholder="Cari catatan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded px-4 py-2 w-64"
            />
          </div>
        </div>

        {/* Tabel */}
        <div className="wrapper_tabel">
          <table className="tabel_pengguna  bg-white">
            <thead>
              <tr>
                <th>No.</th>
                <th>Nama Pengguna</th>
                <th>Judul</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sortedCatatan.length > 0 ? (
                sortedCatatan.map((item, index) => (
                  <tr key={item.idcatatan}>
                    <td>{index + 1}</td>
                    <td>{item.user_name}</td>
                    <td>{item.judul}</td>
                    <td>
                      <button
                        onClick={() => setShowPopup(item)} className="tombol_detail"
                      >Detail
                      </button>
                      <button onClick={() => handleDelete(item.idcatatan)} className="tombol_hapus">
                        <span className="hapus">Hapus</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-sm text-gray-500">
                    Belum ada catatan yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {showPopup && (
          <CatatanDetailPopup
            catatan={showPopup}
            onClose={() => setShowPopup(null)}
          />
        )}
      </div>
    </div>
  );
}

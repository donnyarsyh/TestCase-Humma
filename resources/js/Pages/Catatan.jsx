import React, { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import CatatanDetailPopup from './CatatanDetail';

export default function Catatan() {
  const { props } = usePage();
  const { user, catatan, flash } = props;

  // State untuk input pencarian
  const [searchTerm, setSearchTerm] = useState('');
  // State untuk popup
  const [showPopup, setShowPopup] = useState(null);
  // State untuk flash message
  const [flashMessage, setFlashMessage] = useState(null);
  // Tambah state sort
  const [sortKey, setSortKey] = useState('');


  const filteredCatatan = catatan.filter(
    (item) =>
      item.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Urutkan catatan setelah disaring
  const sortedCatatan = [...filteredCatatan].sort((a, b) => {
    if (sortKey === 'nama') return a.user_name.localeCompare(b.user_name);
    if (sortKey === 'judul') return a.judul.localeCompare(b.judul);
    return 0;
  });

  // Handler untuk perubahan input pencarian
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 2000); // 2000ms = 2 detik

      // Bersihkan timer saat komponen unmount atau flashMessage berubah
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  // Fungsi untuk menghapus catatan
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

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <div className="p-6">
        {/* Flash Message */}
        {flashMessage && (
          <div
            className={`mb-4 p-4 rounded ${flashMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
          >
            {flashMessage.message}
          </div>
        )}

        <p className="mb-2">Selamat datang, {user.name}!</p>
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-semibold mb-2">Daftar Catatan</h1>
          <div className="flex items-center gap-3">
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="">Urutkan </option>
              <option value="nama">Nama A - Z</option>
              <option value="judul">Judul A - Z</option>
            </select>
            <input
              type="text"
              placeholder="Cari disini..."
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded px-4 py-2 w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto bg-white rounded-lg w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead style={{ backgroundColor: '#27548A' }} className="text-white">
              <tr>
                <th scope="col" className="py-3 px-4 sm:px-6 text-left">
                  No.
                </th>
                <th scope="col" className="py-3 px-4 sm:px-6 text-left">
                  Nama Pengguna
                </th>
                <th scope="col" className="py-3 px-4 sm:px-6 text-left">
                  Judul
                </th>
                <th scope="col" className="py-3 px-4 sm:px-6 text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedCatatan.length > 0 ? (
                sortedCatatan.map((item, index) => (
                  <tr
                    key={item.idcatatan}
                    className="bg-white hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{index + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.user_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900">{item.judul}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                      <button
                        onClick={() => setShowPopup(item)}
                        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-3 py-1.5 focus:outline-none"
                      >
                        Detail
                      </button>
                      {/* <button
                        className="ml-2 text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-400 font-medium rounded text-sm px-3 py-1.5 focus:outline-none"
                      >
                        Ubah
                      </button> */}
                      <button
                        onClick={() => handleDelete(item.idcatatan)}
                        className="ml-2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-3 py-1.5 focus:outline-none"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
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

/** Catatan
 * 
import CatatanDetailPopup from './CatatanDetail';
 return (
 <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-6">
        <h1 className="text-xl font-semibold mb-2">Daftar Catatan, {user.name}</h1>
        <hr className="mb-4 border-gray-300 w-40" />

        <div className="flex justify-end mb-4 gap-2">
          <input
            type="text"
            placeholder="Cari disini..."
            className="border rounded px-4 py-2 w-64"
          />
          <button className="bg-blue-800 text-white px-4 py-2 rounded">
            <img src="/images/filter.png" alt="Filter" className="w-5 h-5 object-contain" />
          </button>
        </div>

        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr>
              <th>No.</th>
              <th>Nama Pengguna</th>
              <th>Judul Catatan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="bg-white shadow-sm rounded">
                <td className="px-4 py-3">{index + 1}.</td>
                <td className="px-4 py-3">{item.nama}</td>
                <td className="px-4 py-3">{item.judul}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => setShowPopup(true)}
                    className="bg-yellow-400 text-white px-4 py-2 rounded-full flex items-center gap-2"
                  >
                    <img src="/images/info.png" alt="Info" className="w-5 h-5 object-contain" />
                    Lihat Detail
                  </button>
                  <button className="bg-red-500 text-white px-3 py-2 rounded-full flex items-center gap-2">
                    <img src="/images/delete.png" alt="Delete" className="w-5 h-5 object-contain" />
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
      {showPopup && <CatatanDetailPopup onClose={() => setShowPopup(false)} />}
    </div>
)
 */

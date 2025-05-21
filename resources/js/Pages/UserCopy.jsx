import { usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import Navbar from '../Components/Navbar';

export default function DataUser() {
  const { props } = usePage();
  const { user, users, flash } = props;
  
  const [flashMessage, setFlashMessage] = useState(flash || null);
  const [sortKey, setSortKey] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);
  
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this data pengguna?')) {
      router.delete(route('users.destroy', id), {
        onSuccess: () => {
          setFlashMessage({ type: 'success', message: 'Data pengguna berhasil dihapus' });
        },
        onError: (errors) => {
          setFlashMessage({
            type: 'error',
            message: errors.message || 'Gagal menghapus data pengguna.',
          });
        },
      });
    }
  };

  // Filter dan sort
  const filteredUsers = users.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortKey === 'name') return a.name.localeCompare(b.name);
    if (sortKey === 'email') return a.email.localeCompare(b.email);
    return 0;
  });

  return (
    <div>
      <Navbar />
      <div className="bg_halaman p-6">
        <p>Selamat Datang, {user.name}</p>
        <p className="data_pengguna">Data Pengguna</p>

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
              <option value="name">Nama A - Z</option>
              <option value="email">Email A - Z</option>
            </select>
            <input
              type="text"
              placeholder="Cari pengguna..."
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
                <th>Email</th>
                <th>Telepon</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>08123456789</td>
                    <td>
                      <button onClick={() => handleDelete(item.id)} className="tombol_hapus">
                        <span className="hapus">Hapus</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-sm text-gray-500">
                    Belum ada pengguna yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

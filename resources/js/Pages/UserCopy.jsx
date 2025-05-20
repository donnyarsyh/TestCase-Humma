import { usePage, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
// import React from 'react';
import Navbar from '../Components/Navbar';

export default function DataUser() {
  const { props } = usePage();
  const { user, users, flash } = props;

  // State untuk flash message
  const [flashMessage, setFlashMessage] = useState(flash || null);

  // Hapus flash message setelah 2 detik
  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 2000); // 2000ms = 2 detik

      // Bersihkan timer saat komponen unmount atau flashMessage berubah
      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  // Handler untuk hapus user
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

  return (
    <div> <Navbar />
      <div className='bg_halaman'>
        <p>Selamat Datang, {user.name}</p>
        <p className='data_pengguna'>Data Pengguna</p>
        {/* Flash Message */}
        {flashMessage && (
          <div
            className={`mb-4 p-4 rounded ${flashMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
          >
            {flashMessage.message}
          </div>
        )}
        <div className='wrapper_tabel'>
          <table className="tabel_pengguna">
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
              {users.length > 0 ? (
                users.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>08123456789</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="tombol_hapus">
                        <span className='hapus'>Hapus</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-sm text-gray-500"
                  >
                    Belum ada pengguna.
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

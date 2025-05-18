import React, { useState } from 'react';
import CatatanDetailPopup from './CatatanDetail';
import Navbar from '../Components/Navbar'; // pastikan path benar

export default function Catatan() {
  const [showPopup, setShowPopup] = useState(false);

  const data = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    nama: 'Donny Ardiansyah',
    judul: 'Kerangka Pembuatan Karya Tulis Ilmiah (KTI)',
  }));

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />

      <div className="p-6">
        <h1 className="text-xl font-semibold mb-2">Daftar Catatan</h1>
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
  );
}

import React from 'react';
import { usePage } from '@inertiajs/react';
import Navbar from '../Components/Navbar';

export default function Catatan() {
  const { props } = usePage();
  const { user } = props;

  return (
    <div className="min-h-screen bg-blue-50">
      <Navbar />
      <div className="p-6">
        <p className='mb-2'>Selamat datang, {user.name}!</p>
        <h1 className="text-xl font-semibold mb-2">Daftar Catatan</h1>
        <hr className="mb-4 border-gray-300 w-40" />

        <div className="flex justify-end mb-4 gap-2">
          <input
            type="text"
            placeholder="Cari disini..."
            className="border rounded px-4 py-2 w-64" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            <img src="/images/filter.png" alt="Filter" className="w-5 h-5 object-contain" />
          </button>
        </div>
        <div class="overflow-x-auto bg-white rounded-lg w-full">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-blue-600 text-white">
              <tr>
                <th scope="col" class="py-3 sm:px-6 text-left">
                  No.
                </th>
                <th scope="col" class="py-3 px-4 sm:px-6 text-left">
                  Nama Pengguna
                </th>
                <th scope="col" class="py-3 px-4 sm:px-6 text-left">
                  Judul
                </th>
                <th scope="col" class="py-3 px-4 sm:px-6 text-left text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">

              <tr class="bg-white hover:bg-gray-100 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">1</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">Donny Arsy
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">Senam Sehat</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                  <form action="#"
                    method="POST" class="inline">
                    <button type="submit"
                      class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded text-sm px-3 py-1.5 focus:outline-none"
                      onclick="return confirm('Are you sure you want to delete this penginapan?')">
                      <i class="fa-solid fa-trash-can"></i> Detail
                    </button>
                  </form>
                  <a href="" class="mx-2"> </a>
                  <a href=""
                    class="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:ring-orange-400 font-medium rounded text-sm px-3 py-1.5 focus:outline-none">
                    <i class="fa-solid fa-pencil"></i> Ubah
                  </a>
                  <a href="" class="mx-2"> </a>
                  <button type="submit"
                    class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-3 py-1.5 focus:outline-none"
                    onclick="return confirm('Are you sure you want to delete this penginapan?')">
                    <i class="fa-solid fa-trash-can"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div >
    </div >
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

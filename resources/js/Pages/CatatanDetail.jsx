import { X } from 'lucide-react';

export default function CatatanDetailPopup({ catatan, onClose }) {
  let deskripsiPertama = 'Tidak ada deskripsi';

  try {
    const deskripsiArray = JSON.parse(catatan.deskripsi);
    if (Array.isArray(deskripsiArray) && deskripsiArray.length > 0) {
      const firstInsert = deskripsiArray[0]?.insert;
      if (typeof firstInsert === 'string') {
        deskripsiPertama = firstInsert;
      } else if (typeof firstInsert === 'object' && firstInsert !== null) {
        deskripsiPertama = '[Gambar]';
      }
    }
  } catch (e) {
    deskripsiPertama = catatan.deskripsi || 'Tidak ada deskripsi';
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-hidden">
      <div className="bg-white rounded-xl shadow-lg w-[90%] md:w-[900px] h-[500px] flex relative">
        {/* Sidebar */}
        <div className="w-[30%] bg-[#f0f4fa] p-6 flex flex-col items-center shadow-inner rounded-l-xl">
          <div className="bg-blue-800 text-white px-4 py-2 rounded-full mb-4">
            {catatan.tgl || 'Tidak ada tanggal'}
          </div>
          <div className="font-semibold mb-4">
            {catatan.user_name || 'Nama pengguna tidak tersedia'}
          </div>
          {catatan.gambar ? (
            <img
              src={`/storage/${catatan.gambar}`}
              alt="Cover"
              className="w-32 h-auto border rounded shadow-sm"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 border rounded shadow-sm flex items-center justify-center text-gray-500">
              Tidak ada gambar
            </div>
          )}
        </div>

        {/* Konten */}
        <div className="w-[70%] p-6 relative overflow-auto">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          <h2 className="text-lg font-bold mb-4">{catatan.judul || 'Tidak ada judul'}</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Deskripsi</strong><br />
            {deskripsiPertama}
          </p>
        </div>
      </div>
    </div>
  );
}

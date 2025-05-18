import { X } from 'lucide-react';

export default function CatatanDetailPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] md:w-[900px] h-[500px] flex relative">
        {/* Sidebar */}
        <div className="w-[30%] bg-[#f0f4fa] p-6 flex flex-col items-center border-r">
          <div className="bg-blue-800 text-white px-4 py-2 rounded-full mb-4">
            tgl
          </div>
          <div className="font-semibold mb-4">nama pengguna</div>
          <img
            src="gambar"
            alt="Cover"
            className="w-32 h-auto border rounded shadow-sm"
          />
        </div>

        {/* Konten */}
        <div className="w-[70%] p-6 relative overflow-auto">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          <h2 className="text-lg font-bold mb-4">Judul</h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>......?</strong><br />
            Deskripsi
          </p>
        </div>
      </div>
    </div>
  );
}

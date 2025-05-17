import React from 'react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3 border-b border-blue-300">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/images/notepad.png" alt="Logo" className="w-6 h-6 object-contain" />
          <span className="text-xl font-semibold text-blue-700">
            Share<span className="text-orange-500">Notes</span>
          </span>
        </div>

        {/* Menu Utama */}
        <div className="bg-blue-800 rounded-full flex px-4 py-2 shadow-lg gap-6 items-center">
          <button className="flex items-center gap-2 text-white hover:opacity-80 transition">
            <img src="/images/catatan.png" alt="Catatan" className="w-5 h-5 object-contain" />
            Catatan
          </button>
          <button className="flex items-center gap-2 text-white hover:opacity-80 transition">
            <img src="/images/user.png" alt="Data Akun" className="w-5 h-5 object-contain" />
            Data Akun
          </button>
        </div>

        {/* Tombol Logout */}
        <button className="text-red-500 border border-red-500 p-2 rounded-full hover:bg-red-100">
          <img src="/images/logout.png" alt="Logout" className="w-5 h-5 object-contain" />
        </button>
      </div>
    </nav>
  );
}

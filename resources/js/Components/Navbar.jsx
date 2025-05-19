import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function Navbar() {
  const [active, setActive] = useState("catatan");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      router.post('/logout', {}, {
        onSuccess: () => {
          // Redirect ke halaman login akan ditangani oleh server
        },
        onError: (errors) => {
          console.error('Gagal logout:', errors);
          alert('Terjadi kesalahan saat logout. Silakan coba lagi.');
        },
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-3 border-b style={{ borderBottomColor: '#27548A' }}">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/images/notepad.png" alt="Logo" className="w-6 h-6 object-contain" />
          <span style={{ color: '#27548A'}}>
            Share
            <span style={{ color: '#DDA853'}}>
              Notes</span>
          </span>
        </div>

        {/* Tombol Burger untuk Mobile/Tablet */}
        <button
          className="md:hidden focus:outline-none" style={{ color: '#27548A' }}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        {/* Menu Utama untuk Desktop */}
        <div className="hidden md:flex rounded-full px-4 py-2 shadow-lg gap-6 items-center" style={{ backgroundColor: '#27548A' }}>
          <button
            onClick={() => {
              setActive("catatan");
              router.visit("/catatan");
            }}
            className={`flex items-center gap-2 px-4 py-2 transition rounded-full ${
              active === "catatan"
                ? "text-white"
                : "text-white hover:text-white hover:bg-[#DDA853]"
            }`}
            style={{
              backgroundColor: active === "catatan" ? "#DDA853" : "transparent",
            }}
          >
            <img src="/images/catatan.png" alt="Catatan" className="w-5 h-5 object-contain" />
            Catatan
          </button>

          <button
            onClick={() => {
              setActive("akun");
              router.visit("");
            }}
            className={`flex items-center gap-2 px-4 py-2 transition rounded-full ${
              active === "akun"
                ? "text-white"
                : "text-white hover:text-white hover:bg-[#DDA853]"
            }`}
            style={{
              backgroundColor: active === "akun" ? "#DDA853" : "transparent",
            }}
          >
            <img src="/images/user.png" alt="Data Akun" className="w-5 h-5 object-contain" />
            Data Akun
          </button>

        </div>

        {/* Tombol Logout untuk Desktop */}
        <button
          onClick={handleLogout}
          className="hidden md:block text-red-500 border border-red-500 p-2 rounded-full hover:bg-red-100"
          title="Logout"
        >
          <img src="/images/logout.png" alt="Logout" className="w-5 h-5 object-contain" />
        </button>
      </div>

      {/* Menu Mobile/Tablet (Tampil saat burger diklik) */}
      {isMenuOpen && (
        <div className="hidden md:flex rounded-full px-4 py-2 shadow-lg gap-6 items-center" style={{ backgroundColor: '#27548A' }}>
          <button
            onClick={() => {
              setActive("catatan");
              router.visit("/catatan");
              setIsMenuOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 transition rounded-full ${active === "catatan" ? "bg-orange-500 text-white" : "text-white hover:bg-orange-600 hover:text-white"}`}
          >
            <img src="/images/catatan.png" alt="Catatan" className="w-5 h-5 object-contain" />
            Catatan
          </button>
          <button
            onClick={() => {
              setActive("akun");
              router.visit("#");
              setIsMenuOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 transition rounded-full ${active === "akun" ? "bg-orange-500 text-white" : "text-white hover:bg-orange-600 hover:text-white"}`}
          >
            <img src="/images/user.png" alt="Data Akun" className="w-5 h-5 object-contain" />
            Data Akun
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-red-500 border border-red-500 rounded-full hover:bg-red-200"
            title="Logout"
          >
            <img src="/images/logout.png" alt="Logout" className="w-5 h-5 object-contain" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import '../../css/styles/Navbar.css';
import ConfirmKeluar from './ConfirmKeluar';
import logo_desktop from '../../assets/Logo Aplikasi.svg';
import logo_mobile from '../../assets/notepad 1.svg';

export default function Navbar() {
  const { url } = usePage();
  const [active, setActive] = useState('catatan');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Sinkronkan state active dengan URL saat ini
  useEffect(() => {
    if (url.includes('/datauser')) {
      setActive('datauser');
    } else if (url.includes('/catatan')) {
      setActive('catatan');
    }
  }, [url]);

const handleLogout = () => {
  setConfirmingLogout(true);
};

  const confirmLogout = () => {
  router.post('/logout', {}, {
    onSuccess: () => {
      console.log("Logout sukses");
    },
    onError: (errors) => {
      console.error('Gagal logout:', errors);
      alert('Terjadi kesalahan saat logout. Silakan coba lagi.');
    },
  });
};


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-5 py-3">
      <div
        className="flex items-center justify-between px-6 py-3 relative"
        style={{ borderBottomColor: '#27548A' }}
      >
        {/* Logo */}
        <div className="logo">
        <img src={logo_desktop} alt='Logo Desktop' className='icon_desktop'/>
        <img src={logo_mobile} alt='Logo Mobile' className='icon_mobile'/>
      </div>

        {/* Tombol Burger untuk Mobile/Tablet */}
        <button
          className="md:hidden focus:outline-none"
          style={{ color: '#27548A' }}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>

        {/* Menu Utama untuk Desktop */}
        <div
  className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 rounded-full px-4 py-2 shadow-lg  items-center mb-5 mt-5"
  style={{ backgroundColor: '#27548A' }}
>
          <button
            onClick={() => {
              setActive('catatan');
              router.visit('/catatan');
            }}
            className={`flex items-center gap-2 px-4 py-2 transition rounded-full ${active === 'catatan'
                ? 'text-white'
                : 'text-white hover:text-white hover:bg-[#DDA853]'
              }`}
            style={{
              backgroundColor: active === 'catatan' ? '#DDA853' : 'transparent',
            }}
          >
            <img src="/images/catatan.png" alt="Catatan" className="w-5 h-5 object-contain" />
            Catatan
          </button>

          <button
            onClick={() => {
              setActive('datauser');
              router.visit('/datauser');
            }}
            className={`flex items-center gap-2 px-4 py-2 transition rounded-full ${active === 'datauser'
                ? 'text-white'
                : 'text-white hover:text-white hover:bg-[#DDA853]'
              }`}
            style={{
              backgroundColor: active === 'datauser' ? '#DDA853' : 'transparent',
            }}
          >
            <img src="/images/user.png" alt="Data Pengguna" className="w-5 h-5 object-contain" />
            Data Pengguna
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

      {/* Menu Mobile/Tablet */}
      {isMenuOpen && (
        <div
          className="md:hidden flex flex-col px-4 py-2 gap-2 bg-[#27548A]"
        >
          <button
            onClick={() => {
              setActive('catatan');
              router.visit('/catatan');
              setIsMenuOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 transition rounded-full ${active === 'catatan'
                ? 'bg-[#DDA853] text-white'
                : 'text-white hover:bg-[#DDA853] hover:text-white'
              }`}
          >
            <img src="/images/catatan.png" alt="Catatan" className="w-5 h-5 object-contain" />
            Catatan
          </button>
          <button
            onClick={() => {
              setActive('datauser');
              router.visit('/datauser');
              setIsMenuOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 transition rounded-full ${active === 'datauser'
                ? 'bg-[#DDA853] text-white'
                : 'text-white hover:bg-[#DDA853] hover:text-white'
              }`}
          >
            <img src="/images/user.png" alt="Data Pengguna" className="w-5 h-5 object-contain" />
            Data Pengguna
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
      {confirmingLogout && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
    <ConfirmKeluar
      visible={confirmingLogout}
      onConfirm={confirmLogout}
      onCancel={() => setConfirmingLogout(false)}
    />
  </div>
)}

    </nav>
  );
}

import React from 'react';

function ConfirmKeluar({ visible, onConfirm, onCancel }) {
  if (!visible) return null;

  return (
    <div className='bg_popup'>
      <div className='judul_popup_hapus'>LOG OUT</div>
      <p className='teks_popup'>Apakah Anda yakin ingin keluar?</p>
      <div className='hapusdankeluarwrapper'>
        <button className='tombol_hapusdankeluar' onClick={onConfirm}>
          IYA
        </button>
        <button className='tombol_hapusdankeluar' onClick={onCancel}>
          TIDAK
        </button>
      </div>
    </div>
  );
}

export default ConfirmKeluar;

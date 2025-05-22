import React from 'react';

function ConfirmHapusCatatan({ visible, onConfirm, onCancel }) {
  if (!visible) return null;

  return (
    <div className='bg_popup'>
      <div className='judul_popup_hapus'>HAPUS CATATAN</div>
      <p className='teks_popup'>Apakah Anda yakin ingin menghapus catatan ini?</p>
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

export default ConfirmHapusCatatan;

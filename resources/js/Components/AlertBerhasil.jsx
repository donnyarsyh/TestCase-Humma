import React from 'react';

function AlertBerhasil({ onClose }) {
  return (
    <div className='bg_popup'>
      <div className='judul_popup_login'>LOG IN</div>
      <p className='teks_popup'>Masuk berhasil</p>
      <button className='tombol_berhasil' onClick={onClose}>OKE</button>
    </div>
  );
}

export default AlertBerhasil;

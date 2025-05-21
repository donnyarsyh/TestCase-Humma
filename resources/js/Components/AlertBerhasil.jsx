import React from 'react';
import popup_berhasil from '../../assets/popup berhasil.svg';

function AlertBerhasil({ onClose }) {
  return (
    <div className='bg_popup'>
      <img src={popup_berhasil} alt='PopUp Berhasil' className='popup_berhasil' />
      <p className='teks_popup'>LOGIN BERHASIL</p>
      <button className='tombol_berhasil' onClick={onClose}>OKE</button>
    </div>
  );
}

export default AlertBerhasil;

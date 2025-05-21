import React, { useState, useEffect } from 'react';
import { router, usePage } from '@inertiajs/react';
import AlertBerhasil from '../Components/AlertBerhasil'; // Pastikan path-nya sesuai

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const { errors, login_success } = usePage().props;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    router.post('/login', formData, {
      onSuccess: () => {
        setShowSuccess(true);
      },
      onError: (errors) => {
        console.log('Login gagal:', errors);
      },
    });
  };

  const handlePopupClose = () => {
    setShowSuccess(false);
    router.visit('/catatan');
  };

  useEffect(() => {
    if (login_success) {
      setShowSuccess(true);
    }
  }, [login_success]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row relative bg-gray-100">
      {/* Ilustrasi Kiri - Hanya tampil di desktop */}
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-[#27548A] p-6">
        <img
          src="/images/bg-login.png"
          alt="Ilustrasi Login"
          className="w-full max-w-md h-auto object-cover"
        />
      </div>

      {/* Form Login - Terpusat di mobile dan desktop */}
      <div className="w-full lg:w-1/2 bg-blue-50 flex justify-center items-center min-h-screen lg:min-h-0 p-4 sm:p-6">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#27548A] text-center">
            Login
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full p-3 rounded border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative mb-6">
              <input
                type={formData.showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full p-3 rounded border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 pr-10`}
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={togglePassword}
              >
                <i className={formData.showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#DDA853] hover:bg-[#E79A1E] text-white p-3 rounded font-bold transition duration-300 transform hover:-translate-y-1"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>

      {/* Popup Sukses */}
      {showSuccess && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <AlertBerhasil onClose={handlePopupClose} />
        </div>
      )}
    </div>
  );
}
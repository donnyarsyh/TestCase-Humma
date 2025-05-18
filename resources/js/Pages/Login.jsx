import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const { errors } = usePage().props; // Mendapatkan error dari Inertia

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
      onError: (errors) => {
        // Optional: Tambahan penanganan error di sisi klien
        console.log('Login gagal:', errors);
      },
    });
  };

  return (
    <div className="flex h-screen">
      {/* Kiri: Ilustrasi */}
      <div className="w-1/2 bg-blue-800 flex justify-center items-center">
        <img src="/images/login.png" alt="Ilustrasi Login" className="w-2/3" />
      </div>

      {/* Kanan: Form Login */}
      <div className="w-1/2 bg-blue-50 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        <form className="w-2/3 max-w-md" onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full p-3 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="relative mb-2">
            <input
              type={formData.showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full p-3 rounded border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            <span
              className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              onClick={togglePassword}
            >
              {formData.showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className="text-right text-sm text-blue-700 mb-4 cursor-pointer">
            Lupa Password?
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded font-bold"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
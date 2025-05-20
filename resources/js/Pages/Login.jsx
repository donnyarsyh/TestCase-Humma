import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const { errors } = usePage().props;

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
        console.log('Login gagal:', errors);
      },
    });
  };

  return (
    <div className="flex h-screen">
      {/* Kiri: Ilustrasi */}
      <div className="w-1/2 flex justify-center items-center" style={{ backgroundColor: '#27548A' }}>
        <img src="/images/bg-login.png" alt="Ilustrasi Login" className="w-3/3" />
      </div>

      {/* Kanan: Form Login */}
      <div className="w-1/2 bg-blue-50 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6 text-[#27548A]">Login</h2>

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
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          
          <button
            type="submit"
            className="mt-4 w-full bg-[#DDA853] hover:bg-[#E79A1E] text-white p-3 rounded font-bold transition"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

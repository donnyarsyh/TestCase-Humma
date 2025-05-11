import React from 'react';
import { router } from '@inertiajs/react';

export default function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
    router.visit('/catatan');
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
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 rounded border"
          />

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-2 rounded border"
            />
            <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">👁️</span>
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

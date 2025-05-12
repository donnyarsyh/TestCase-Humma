import React, { useState } from 'react';

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Ganti dengan fetch/axios untuk kirim ke backend nanti
    console.log("Login attempt...");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2">
        <img
          src="https://storage.googleapis.com/a1aa/image/811fe6a4-3d56-4493-8931-a15c1049e408.jpg"
          alt="Ilustrasi login"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-1 items-center font-poppins justify-center bg-[#E9FFFD] px-6">
        <form className="w-full max-w-md" onSubmit={handleLogin}>
          <h1 className="text-black font-bold text-4xl mb-10 text-center ">Login</h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-md text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#23568B]"
          />

          <div className="relative mb-2">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#23568B]"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Toggle password visibility"
            >
              {passwordVisible ? (
                // Eye off icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.452M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                // Eye icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="text-right mb-6">
            <a href="#" className="text-sm text-[#23568B] font-semibold">Lupa Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D19B44] text-white font-semibold py-3 rounded-md hover:bg-[#b8862f] transition-colors"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
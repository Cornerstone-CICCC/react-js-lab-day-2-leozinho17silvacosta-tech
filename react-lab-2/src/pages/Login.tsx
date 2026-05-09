import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { FaRegMoon } from "react-icons/fa";
import { PiSunDim } from "react-icons/pi";

const Login = () => {
  const [name, setName] = useState('');
  const { login } = useUser();
  const { toggleTheme, isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      navigate('/todos');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <button 
        onClick={toggleTheme} 
        className="px-6 py-2 border-2 rounded-full font-bold transition-all bg-gray-100 dark:bg-gray-800 dark:border-gray-600"
      >
        {isDarkMode ? <PiSunDim /> : <FaRegMoon />}
      </button>

      <form onSubmit={handleLogin} className="p-8 border rounded-2xl shadow-xl bg-gray-50 dark:bg-gray-600 dark:border-gray-700 w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Hi. What's your name?</h1>
        <input 
          className="w-full p-2 border rounded mb-4 text-black dark:text-white outline-none"
          value={name}
          placeholder='Enter your first and last name...'
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-black text-white p-2 rounded font-bold hover:bg-gray-800 transition-colors">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

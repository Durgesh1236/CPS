import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

 const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
      <div onClick={()=>navigate("/")} className="text-3xl flex font-bold text-gray-800">
        <span className='text-blue-500 text-3xl font-bold pr-2'>Central</span> 
        <span className='text-yellow-500 text-3xl font-bold pr-2'>Public</span>
         School
      </div>
      {/* Desktop buttons */}
      <div className="hidden sm:flex gap-4">
        <button onClick={()=> navigate("/login")} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition">
          Login
        </button>
        <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">
          Admission
        </button>
      </div>
      {/* Mobile menu button */}
      <div className="sm:hidden">
        <button
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-lg rounded flex flex-col gap-2 p-4 sm:hidden z-50">
          <button onClick={()=> navigate("/login")} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition">
            Login
          </button>
          <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">
            Admission
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
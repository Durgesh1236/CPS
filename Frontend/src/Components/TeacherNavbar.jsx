import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaRegUser } from "react-icons/fa";
import { UserData } from '../context/User';

const NavbarTeacher = () => {
  const navigate = useNavigate();
  const { logoutTeacher} = UserData();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-white shadow px-4 py-3">
      {/* Sidebar Icon & School Name */}
      <div className="flex items-center justify-center w-full">
        <div onClick={() => navigate("/teacher-home")} className="cursor-pointer flex flex-wrap items-center mx-0 lg:mx-5 md:mx-2 w-full">
          <span className='text-blue-500 text-2xl md:text-3xl pr-2 font-bold'>Central</span>
          <span className='text-yellow-500 text-2xl md:text-3xl pr-2 font-bold'>Public</span>
          <span className='text-gray-800 text-2xl md:text-3xl font-bold'>School</span>
        </div>
      </div>
      {/* Logout Button Only */}
      <button
        className="bg-gradient-to-r cursor-pointer from-red-500 to-red-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:from-red-600 hover:to-red-800 transition flex items-center gap-2 border-2 border-white text-lg"
        onClick={() => logoutTeacher(navigate)}
      >
        Logout
      </button>
    </nav>
  );
};

export default NavbarTeacher;
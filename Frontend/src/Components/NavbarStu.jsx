import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaRegUser } from "react-icons/fa";

const NavbarStu = ({ setSidebarOpen, sidebarOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-white shadow px-4 py-3">
      {/* Sidebar Icon & School Name */}
      <div className="flex items-center gap-3">
        <button
          className="text-2xl text-gray-800 cursor-pointer focus:outline-none mr-0 lg:mr-2 md:mr-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>
        <div onClick={() => navigate("/student-home")} className="cursor-pointer sm:ml-0">
          <span className='text-blue-500 text-3xl pr-2 font-bold'>Central</span>
          <span className='text-yellow-500 text-3xl pr-2 font-bold'>Public</span>
          <span className='text-gray-800 text-3xl font-bold'>School</span>
        </div>
      </div>
      {/* Student Profile */}
      <div className="relative">
        {/* <img
          src="/images/student-avatar.png"
          alt="Student"
          className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-blue-500"
          onMouseEnter={() => setProfileOpen(true)}
        /> */}
        <FaRegUser onMouseEnter={() => setProfileOpen(true)} className="w-10 h-10 rounded-full cursor-pointer" alt="Student" />
        {/* Dropdown */}
        {profileOpen && (
          <div
            className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50"
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              onClick={() => navigate('/profile')}
            >
              Student Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              onClick={() => {
                // Add logout logic here
                alert('Logged out!');
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarStu;
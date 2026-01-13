import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { UserData } from '../context/User';

const NavbarTeacher = () => {
  const navigate = useNavigate();
  const { logoutTeacher, user } = UserData();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between bg-white shadow px-4 py-3">
      {/* Sidebar Icon & School Name */}
      <div className="flex items-center justify-center w-full">
        <div onClick={() => navigate("/teacher-home")} className="cursor-pointer flex flex-wrap items-center mx-0 lg:mx-5 md:mx-2 w-full">
          <span className='text-blue-500 text-3xl md:text-3xl lg:text-3xl pr-2 font-bold'>Central</span>
          <span className='text-yellow-500 text-3xl md:text-3xl lg:text-3xl pr-2 font-bold'>Public</span>
          <span className='text-gray-800 text-3xl md:text-3xl lg:text-3xl font-bold'>School</span>
        </div>
      </div>
      {/* User Image & Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="items-center block lg:hidden md:hidden justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
          onClick={toggleProfileDropdown}
        >
          {/* Replace with user image if available */}
          { user.thumbnails ? (
                          <img
                            src={user.thumbnails.url}
                            alt="Teacher Profile"
                            className="w-14 h-12 lg:h-20 md:w-24 md:h-24 rounded-full"
                            />
                        ):
                        <FaUserTie className="text-2xl text-blue-600" />
                        }
          {/* <FaRegUser className="text-2xl text-gray-700" /> */}
        </button>

         <button
        className="bg-gradient-to-r hidden lg:block md:block cursor-pointer from-red-500 to-red-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:from-red-600 hover:to-red-800 transition items-center gap-2 border-2 border-white text-lg"
        onClick={() => logoutTeacher(navigate)}
      >
        Logout
      </button>

        {profileDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
            <button
              className="w-full text-left font-bold px-4 py-2 text-black hover:bg-blue-500"
              onClick={() => navigate('/teacher-profile')}
            >
              Profile
            </button>

            <button
              className="w-full text-left px-4 py-2 font-bold text-red-600 hover:bg-gray-400"
              onClick={() => logoutTeacher(navigate)}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarTeacher;
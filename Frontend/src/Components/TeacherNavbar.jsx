import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaChevronDown,
  FaSignOutAlt,
  FaTimes,
  FaUser,
  FaUserTie,
} from 'react-icons/fa';
import { UserData } from '../context/User';

const NavbarTeacher = ({ sidebarOpen = false, onToggleSidebar }) => {
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
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener('pointerdown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [profileDropdownOpen]);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 top-0 z-50 flex h-[4.5rem] items-center gap-2 border-b border-indigo-100/70 bg-white/95 px-3 shadow-[0_8px_30px_-18px_rgba(30,27,75,0.45)] backdrop-blur-xl sm:gap-4 sm:px-5"
    >
      {onToggleSidebar && (
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? 'Close dashboard sidebar' : 'Open dashboard sidebar'}
          aria-expanded={sidebarOpen}
          className="hidden h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50 text-indigo-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:h-11 sm:w-11 lg:flex"
        >
          {sidebarOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      )}
      <div className="flex min-w-0 flex-1 items-center">
        <button
          type="button"
          onClick={() => navigate('/teacher-home')}
          aria-label="Central Public School home"
          className="group flex min-w-0 cursor-pointer items-center gap-2.5 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-indigo-300 sm:gap-3"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-500 text-xs font-black tracking-wide text-white shadow-md shadow-indigo-600/25 transition group-hover:-rotate-3 group-hover:scale-105 sm:h-11 sm:w-11 sm:text-sm">
            CPS
          </span>
          <span className="min-w-0">
            <span className="block whitespace-nowrap text-[clamp(0.85rem,4.8vw,1.35rem)] font-extrabold leading-tight tracking-tight sm:text-xl md:text-2xl">
              <span className="text-indigo-700">Central</span>{' '}
              <span className="text-amber-500">Public</span>{' '}
              <span className="text-slate-800">School</span>
            </span>
            <span className="mt-0.5 hidden text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:block">
              Teacher workspace
            </span>
          </span>
        </button>
      </div>

      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          type="button"
          aria-label={profileDropdownOpen ? 'Close profile menu' : 'Open profile menu'}
          aria-expanded={profileDropdownOpen}
          aria-haspopup="menu"
          className="flex min-h-11 cursor-pointer items-center gap-2 rounded-2xl border border-transparent py-1 pl-1 pr-1.5 transition hover:border-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:gap-2.5 sm:pl-2 sm:pr-3"
          onClick={toggleProfileDropdown}
        >
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-100 to-violet-100 text-indigo-700 ring-1 ring-inset ring-indigo-200 sm:h-10 sm:w-10 sm:rounded-2xl">
            {user.thumbnails?.url ? (
              <img src={user.thumbnails.url} alt="" className="h-full w-full object-cover" />
            ) : (
              <FaUserTie className="text-lg" aria-hidden="true" />
            )}
          </span>
          <span className="hidden max-w-36 text-left sm:block">
            <span className="block truncate text-xs font-bold text-slate-800">
              {user.name || 'My account'}
            </span>
            <span className="mt-0.5 block truncate text-[10px] font-medium capitalize text-slate-400">
              {user.role || 'Staff'}
            </span>
          </span>
          <FaChevronDown
            aria-hidden="true"
            className={`hidden text-[10px] text-slate-400 transition-transform sm:block ${profileDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {profileDropdownOpen && (
          <div
            role="menu"
            aria-label="Profile options"
            className="absolute right-0 mt-2 w-[min(17rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 px-3 py-3 sm:hidden">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-indigo-50 text-indigo-700">
                {user.thumbnails?.url ? (
                  <img src={user.thumbnails.url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <FaUserTie aria-hidden="true" />
                )}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-slate-800">{user.name || 'My account'}</span>
                <span className="block truncate text-xs capitalize text-slate-500">{user.role || 'Staff'}</span>
              </span>
            </div>
            <button
              type="button"
              role="menuitem"
              className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              onClick={() => {
                setProfileDropdownOpen(false);
                navigate('/teacher-profile');
              }}
            >
              <FaUser className="text-indigo-500" aria-hidden="true" />
              Profile
            </button>

            <button
              type="button"
              role="menuitem"
              className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-100"
              onClick={() => {
                setProfileDropdownOpen(false);
                logoutTeacher(navigate);
              }}
            >
              <FaSignOutAlt aria-hidden="true" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarTeacher;
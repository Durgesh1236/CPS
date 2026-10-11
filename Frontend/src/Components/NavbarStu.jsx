import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaCalendarCheck,
  FaChevronDown,
  FaRegUser,
} from "react-icons/fa";
import { StudentData } from '../context/Student';

const NavbarStu = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { studentLogout, studentData } = StudentData();

  const goTo = (path) => {
    navigate(path);
    setProfileOpen(false);
  };

  const studentName = studentData?.studentName || 'Student';
  const initials = studentName.slice(0, 1).toUpperCase();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#182036]/95 text-white shadow-[0_8px_24px_rgba(24,32,54,0.18)] backdrop-blur">
      <div className="mx-auto flex h-[72px] w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 gap-3">
          <button type="button" onClick={() => goTo('/student-home')} className="flex min-w-0 items-center gap-2 text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4A73C] text-sm font-black text-[#182036] shadow-inner sm:h-11 sm:w-11">
              CPS
            </span>
            <span className="min-w-0 cursor-pointer leading-none">
              <span className="block truncate text-base font-bold tracking-tight sm:text-lg">Central Public School</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F4A73C]">Student portal</span>
            </span>
          </button>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setProfileOpen(previous => !previous)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5 pr-2.5 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#F4A73C]"
            aria-label="Open student profile menu"
            aria-expanded={profileOpen}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F4A73C] text-sm font-extrabold text-[#182036]">{initials}</span>
            <span className="hidden max-w-24 truncate text-left text-sm font-semibold sm:block">{studentName}</span>
            <FaChevronDown className={`hidden text-[10px] text-white/60 transition sm:block ${profileOpen ? 'rotate-180' : ''}`} />
          </button>
 
          {profileOpen && (
            <div className="absolute right-0 mt-3 w-52 overflow-hidden rounded-2xl border border-[#E7E0CF] bg-white p-2 text-[#2B2B2B] shadow-[0_14px_35px_rgba(24,32,54,0.2)]">
              <div className="border-b border-[#EEE8DA] px-3 pb-3 pt-2">
                <p className="truncate text-sm font-bold">{studentName}</p>
                <p className="mt-1 text-xs text-[#8B8578]">Student account</p>
              </div>
              <button type="button" className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-[#2B2B2B] transition hover:bg-[#FBF7EE]" onClick={() => goTo('/student-profile')}>
                <FaRegUser className="text-[#185FA5]" />
                Student profile
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                onClick={() => studentLogout(navigate)}
              >
                <FaCalendarCheck className="rotate-180" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarStu;
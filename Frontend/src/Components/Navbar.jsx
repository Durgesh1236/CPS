import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

 const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="relative z-40 flex w-full items-center justify-between gap-3 bg-white px-3 py-3 shadow sm:px-5 sm:py-4 lg:px-8">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex min-w-0 items-center text-left text-lg font-bold leading-tight text-gray-800 sm:text-2xl lg:text-3xl"
        aria-label="Central Public School home"
      >
        <span className="text-blue-500">Central</span>
        <span className="mx-1 text-yellow-500">Public</span>
        <span>School</span>
      </button>
      <div className="hidden shrink-0 items-center gap-3 md:flex lg:gap-4">
        <button onClick={()=> navigate("/login")} className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
          Login
        </button>
        <a href='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://warehouse.appilix.com/uploads/app-apk-68c30d6f45ceb-1757613423.apk' className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">Install app</a>
      </div>
      <div className="md:hidden">
        <button
          type="button"
          className="rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M18 6 6 18" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="absolute right-3 top-full z-50 flex min-w-40 flex-col gap-2 rounded-lg bg-white p-3 shadow-lg md:hidden">
          <button onClick={()=> { setMenuOpen(false); navigate("/login"); }} className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
            Login
          </button>
          <a href='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://warehouse.appilix.com/uploads/app-apk-68c30d6f45ceb-1757613423.apk' className="rounded bg-blue-500 px-4 py-2 text-center text-white transition hover:bg-blue-600">Install app</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
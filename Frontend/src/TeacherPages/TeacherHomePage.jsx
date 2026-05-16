import React from 'react';
import {
  FaMoneyCheckAlt, FaHistory, FaExclamationCircle, FaUserTie,
  FaClipboardList, FaUserGraduate, FaSearch, FaRupeeSign,
  FaBell, FaBook
} from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';
import { MdOutlineManageHistory } from "react-icons/md";
import { GiRupee, GiTeacher } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import { FaBookReader } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { LuBookOpenCheck } from "react-icons/lu";

const importantMessage = "Staff meeting scheduled for 28th August at 2:00 PM in the conference hall.";

/* ─── Inject CSS animations once ─── */
const injectStyles = () => {
  if (document.getElementById('thp-styles')) return;
  const s = document.createElement('style');
  s.id = 'thp-styles';
  s.textContent = `
    @keyframes thp-fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes thp-shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position:  400px 0; }
    }
    @keyframes thp-float {
      0%,100% { transform: translateY(0); }
      50%     { transform: translateY(-5px); }
    }
    @keyframes thp-pulse-glow {
      0%,100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
      50%     { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
    }
    @keyframes thp-spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }

    .thp-nav-card {
      position: relative; overflow: hidden;
      border-radius: 16px;
      padding: 16px 14px 18px;
      display: flex; flex-direction: column; gap: 12px;
      cursor: pointer;
      transition: transform 0.25s cubic-bezier(.34,1.56,.64,1),
                  box-shadow 0.25s ease, border-color 0.2s;
      animation: thp-fadeUp 0.45s ease both;
    }
    .thp-nav-card::after {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%);
      background-size: 400px 100%;
      opacity: 0; transition: opacity 0.3s;
      pointer-events: none;
    }
    .thp-nav-card:hover { transform: translateY(-5px) scale(1.025); }
    .thp-nav-card:hover::after { opacity: 1; animation: thp-shimmer 0.65s linear; }
    .thp-nav-card:active { transform: scale(0.97); transition-duration: 0.1s; }
    .thp-nav-card.disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }

    .thp-icon-wrap {
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1);
    }
    .thp-nav-card:hover .thp-icon-wrap { transform: scale(1.2) rotate(-5deg); }

    .thp-stat {
      border-radius: 20px; padding: 22px 22px;
      display: flex; align-items: center; gap: 16px;
      animation: thp-fadeUp 0.45s ease both;
      position: relative; overflow: hidden;
      box-shadow: 0 8px 28px rgba(0,0,0,0.14);
    }
    .thp-stat::before {
      content: '';
      position: absolute; right: -30px; top: -30px;
      width: 110px; height: 110px; border-radius: 50%;
      background: rgba(255,255,255,0.1);
    }
    .thp-stat::after {
      content: '';
      position: absolute; right: 30px; bottom: -50px;
      width: 140px; height: 140px; border-radius: 50%;
      background: rgba(255,255,255,0.07);
    }

    .thp-profile-bar {
      animation: thp-fadeUp 0.4s ease both;
    }

    .thp-section-wrap {
      animation: thp-fadeUp 0.45s ease both;
    }

    .thp-bell:hover {
      transform: rotate(-18deg) scale(1.18);
      animation: thp-pulse-glow 0.8s ease;
    }
    .thp-bell { transition: transform 0.2s; }

    .thp-profile-btn {
      font-size: 13px; font-weight: 700;
      color: #fff;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border: none; border-radius: 999px;
      padding: 10px 22px; cursor: pointer;
      box-shadow: 0 4px 14px rgba(99,102,241,0.4);
      transition: opacity 0.2s, transform 0.2s;
    }
    .thp-profile-btn:hover { opacity: 0.85; transform: scale(1.05); }

    .thp-bottom-card {
      border-radius: 16px; padding: 20px;
      display: flex; align-items: center; gap: 14px;
      cursor: pointer;
      transition: transform 0.22s ease, box-shadow 0.22s ease;
      animation: thp-fadeUp 0.5s ease both;
    }
    .thp-bottom-card:hover { transform: translateY(-4px); box-shadow: 0 10px 32px rgba(0,0,0,0.1); }

    .thp-alert-float { animation: thp-float 2.8s ease-in-out infinite; }

    .thp-divider-rainbow {
      height: 2px; border-radius: 2px;
      background: linear-gradient(to right, #6366f1, #ec4899, #f59e0b, #10b981, #6366f1);
      background-size: 300% 100%;
      animation: thp-shimmer 3s linear infinite;
      margin: 8px 0 28px;
      opacity: 0.4;
    }
  `;
  document.head.appendChild(s);
};

/* ─── Nav Card ─── */
const NavCard = ({ icon: Icon, label, sub, iconBg, iconColor, cardBg, onClick, disabled, delay = 0 }) => {
  React.useEffect(() => { injectStyles(); }, []);
  return (
    <div
      className={`thp-nav-card${disabled ? ' disabled' : ''}`}
      style={{ background: cardBg || '#fff', border: `1.5px solid ${cardBg ? 'transparent' : '#f0f0f0'}`, animationDelay: `${delay}ms`, boxShadow: cardBg ? '0 4px 18px rgba(0,0,0,0.08)' : 'none' }}
      onClick={disabled ? undefined : onClick}
    >
      <div className="thp-icon-wrap" style={{ width: 44, height: 44, background: iconBg }}>
        <Icon style={{ fontSize: 20, color: iconColor }} />
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#111827', lineHeight: 1.35 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: '#6b7280', marginTop: 3 }}>{sub}</div>}
      </div>
    </div>
  );
};

/* ─── Section Header ─── */
const SectionHeader = ({ title, color, emoji }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
    <div style={{
      width: 34, height: 34, borderRadius: 10,
      background: color + '20',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 17, flexShrink: 0,
    }}>{emoji}</div>
    <span style={{ fontSize: 16, fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>{title}</span>
    <div style={{ flex: 1, height: 1.5, background: `linear-gradient(to right, ${color}55, transparent)`, marginLeft: 6, borderRadius: 2 }} />
  </div>
);

/* ─── Stat Card ─── */
const StatCard = ({ icon: Icon, gradient, label, value, sub, delay = 0 }) => {
  React.useEffect(() => { injectStyles(); }, []);
  return (
    <div className="thp-stat" style={{ background: gradient, animationDelay: `${delay}ms` }}>
      <div style={{
        width: 54, height: 54, borderRadius: 14, flexShrink: 0, zIndex: 1,
        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      }}>
        <Icon style={{ fontSize: 26, color: '#fff' }} />
      </div>
      <div style={{ zIndex: 1 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600, marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>{sub}</div>}
      </div>
    </div>
  );
};

/* ─── Main ─── */
const TeacherHomePage = () => {
  const navigate = useNavigate();
  const { user, getStudentCount } = UserData();
  const [totalStudents, setTotalStudents] = React.useState(null);

  React.useEffect(() => { injectStyles(); }, []);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return { text: 'Good Morning', emoji: '🌅' };
    if (h < 17) return { text: 'Good Afternoon', emoji: '☀️' };
    if (h < 21) return { text: 'Good Evening', emoji: '🌇' };
    return { text: 'Good Night', emoji: '🌙' };
  };

  const getInitials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const c = await getStudentCount();
        if (mounted) setTotalStudents(c);
      } catch (err) { console.error(err); }
    })();
    return () => { mounted = false; };
  }, [getStudentCount]);

  const isAdmin     = user.role === 'admin';
  const isAccountent = user.role === 'accountent';
  const isTeacher   = user.role === 'teacher';
  const isAdminOrAcc = isAdmin || isAccountent;
  const greeting    = getGreeting();

  return (
    <TeacherLayout>

      {/* ══════════════ MOBILE — unchanged ══════════════ */}
      <div className="md:hidden min-h-screen p-2 pt-18">
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input type="text" className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 shadow-sm" placeholder="Search modules..." />
        </div>
        <div className="mb-3 bg-blue-300 rounded-2xl p-5 shadow-lg">
          <h1 className="text-lg font-bold text-gray-900">{greeting.text} {greeting.emoji}</h1>
          <h2 className="flex items-center text-2xl font-semibold mt-1">
            Hey, <span className="ml-2 text-blue-900">{user.name.split(" ")[0]} Jii</span>
            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/263a_fe0f/512.gif" alt="☺" width="40" className="ml-2" />
          </h2>
        </div>
        <div className="mb-2 bg-gradient-to-br from-pink-400 via-purple-300 to-blue-400 rounded-2xl shadow-lg p-4 text-white">
          <h1 className="text-2xl font-bold mb-1 drop-shadow">Total Students: {totalStudents}</h1>
        </div>
        <div className="h-px bg-gray-200 my-3"></div>
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {isAdminOrAcc && (<div onClick={() => navigate("/book-sale-data")} className="bg-gradient-to-br from-pink-200 via-yellow-200 to-orange-300 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-pink-200 shadow-md hover:scale-105 transition-transform duration-200"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><FaBookReader className="text-lg text-pink-500" /></div><span className="font-medium text-gray-800 text-xs">BookSale</span></div>)}
            {isAdminOrAcc && (<div onClick={() => navigate("/book-sale-history")} className="bg-gradient-to-br from-pink-200 via-pink-300 to-purple-300 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-pink-200 shadow-md hover:scale-105 transition-transform duration-200"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><FaBookReader className="text-lg text-pink-500" /></div><span className="font-medium text-gray-800 text-xs">BookSale History</span></div>)}
          </div>
          <div className={`grid ${isAdmin ? 'grid-cols-3' : 'grid-cols-2'} gap-4 mb-8`}>
            {isAdmin && (<div onClick={() => navigate("/book-form")} className="bg-gradient-to-br from-green-200 to-green-400 rounded-2xl p-2 h-28 flex flex-col items-center justify-center text-center border border-green-300"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><FaBook className="text-2xl text-green-700" /></div><span className="font-bold text-gray-800 text-xs">Book Form</span></div>)}
            {isAdminOrAcc && (<div onClick={() => navigate("/book-price")} className="bg-gradient-to-br from-blue-200 to-red-400 rounded-2xl p-2 h-28 flex flex-col items-center justify-center text-center border border-pink-300"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><GiRupee className="text-2xl text-pink-600" /></div><span className="font-bold text-gray-800 text-xs">Book Price</span></div>)}
            <div onClick={() => alert("Notifications functionality coming soon!")} className="bg-gradient-to-br from-blue-200 to-blue-400 rounded-3xl p-2 h-28 flex flex-col items-center justify-center text-center border border-blue-300"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><FaBell className="text-2xl text-blue-600" /></div><span className="font-bold text-gray-800 text-xs">Notification</span></div>
          </div>
          <div className="flex items-center gap-3 mb-4"><div className="h-5 w-1 bg-blue-500 rounded-full"></div><h2 className="text-lg font-bold text-gray-900">Student Fees Submit</h2></div>
          <div className="grid grid-cols-3 bg-white rounded-2xl p-5 gap-3">
            {isAdminOrAcc && (<div onClick={() => navigate("/student-fee-submit")} className="bg-gradient-to-br from-teal-200 via-green-200 to-teal-400 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-teal-200 shadow-md hover:scale-105 transition-transform duration-200"><div className="p-2 rounded-lg bg-white shadow-sm mb-2"><FaMoneyCheckAlt className="text-lg text-teal-600" /></div><span className="font-medium text-gray-800 text-xs">Fees Submit</span></div>)}
            {isAdminOrAcc && (<div onClick={() => navigate("/student-fee-history")} className="bg-gradient-to-br from-sky-200 via-blue-200 to-purple-200 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200 shadow-md hover:scale-105 transition-transform duration-200"><div className="p-2 rounded-lg bg-white shadow-sm mb-2"><FaHistory className="text-lg text-purple-600" /></div><span className="font-medium text-gray-800 text-xs">Fees History</span></div>)}
            {isAdminOrAcc && (<div className="bg-gradient-to-br from-red-200 via-pink-200 to-yellow-200 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-red-200 shadow-md hover:scale-105 transition-transform duration-200"><div className="p-2 rounded-lg bg-white shadow-sm mb-2"><FaBell className="text-lg text-red-600" /></div><span className="font-medium text-gray-800 text-xs">Notifications</span></div>)}
            {isAdminOrAcc && (<div onClick={() => navigate("/student-attendence")} className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><FaClipboardList className="text-xl text-blue-600" /></div><span className="font-medium text-gray-800 text-sm">Attendance</span></div>)}
            {isAdminOrAcc && (<div onClick={() => navigate('/student-data-input')} className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><FaUserGraduate className="text-xl text-blue-600" /></div><span className="font-medium text-gray-800 text-sm">Student Data</span></div>)}
            {isAdminOrAcc && (<div onClick={() => navigate('/student-data')} className="bg-gradient-to-br from-blue-100 to-yellow-400 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><FaSearch className="text-xl text-blue-600" /></div><span className="font-medium text-gray-800 text-sm">Search Student</span></div>)}
            {isAdminOrAcc && (<div onClick={() => navigate("/student-register")} className="bg-gradient-to-br from-blue-100 to-black-500 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><FaUserTie className="text-xl text-blue-600" /></div><span className="font-medium text-gray-800 text-sm">Student Registration</span></div>)}
            {isAdminOrAcc && (<div onClick={() => navigate("/set-timetable")} className="bg-gradient-to-br from-red-100 to-black-500 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><IoMdTime className="text-xl text-blue-600" /></div><span className="font-medium text-gray-800 text-sm">Time-Table</span></div>)}
            {isAdminOrAcc && (<div onClick={() => alert("Student Test functionality coming soon!")} className="bg-gradient-to-br from-purple-100 to-black-500 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200"><div className="p-3 rounded-lg bg-white shadow-sm mb-2"><LuBookOpenCheck className="text-xl text-blue-600" /></div><span className="font-medium text-gray-800 text-sm">Student Test</span></div>)}
          </div>
        </div>
        <div className="h-px bg-gray-200 my-6"></div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4"><div className="h-5 w-1 bg-green-500 rounded-full"></div><h2 className="text-lg font-bold text-gray-900">Spend Data Input</h2></div>
          <div className="grid grid-cols-3 gap-3">
            {isAdminOrAcc && (<div onClick={() => navigate("/total-spend")} className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200"><div className="p-2 rounded-lg bg-white shadow-sm mb-2"><FaRupeeSign className="text-lg text-blue-600" /></div><span className="font-medium text-gray-800 text-xs">Spend</span></div>)}
            {isAdminOrAcc && (<div onClick={() => navigate("/spend-history")} className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-green-200"><div className="p-2 rounded-lg bg-white shadow-sm mb-2"><MdOutlineManageHistory className="text-lg text-green-600" /></div><span className="font-medium text-gray-800 text-xs">Spend History</span></div>)}
          </div>
        </div>
        <div className="h-px bg-gray-200 my-6"></div>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4"><div className="h-5 w-1 bg-purple-500 rounded-full"></div><h2 className="text-lg font-bold text-gray-900">Teacher Data Input</h2></div>
          <div className="grid bg-white rounded-2xl p-5 grid-cols-3 gap-3">
            {isAdminOrAcc && (<div onClick={() => navigate("/teacher-payment")} className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-purple-200"><div className="p-2 rounded-lg bg-white shadow-sm mb-2"><GiTeacher className="text-lg text-purple-600" /></div><span className="font-medium text-gray-800 text-xs">Teacher Payment</span></div>)}
            {(isAdminOrAcc || isTeacher) && (<div onClick={() => alert("History Payment feature is under development")} className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-yellow-200"><div className="p-2 rounded-lg bg-white shadow-sm mb-2"><GiTeacher className="text-lg text-yellow-600" /></div><span className="font-medium text-gray-800 text-xs">History Payment</span></div>)}
            {isAdmin && (<div onClick={() => navigate("/teacher-registration")} className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-teal-200"><div className="p-2 rounded-lg bg-white shadow-sm mb-2"><FaUserTie className="text-lg text-teal-600" /></div><span className="font-medium text-gray-800 text-xs">Teacher Registration</span></div>)}
            {isAdmin && (<div onClick={() => navigate("/teacher-data")} className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-teal-200"><div className="p-2 rounded-lg bg-white shadow-sm mb-2"><FaUserTie className="text-lg text-teal-600" /></div><span className="font-medium text-gray-800 text-xs">Teacher Data</span></div>)}
          </div>
        </div>
        <div className="h-px bg-gray-200 my-6"></div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 flex items-center gap-4 border border-gray-200"><div className="p-3 rounded-lg bg-white shadow-sm"><VscFeedback className="text-xl text-gray-700" /></div><div><h3 className="font-semibold text-gray-800 text-sm">FeedBack</h3></div></div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 flex items-center gap-4 border border-blue-200"><div className="p-3 rounded-lg bg-white shadow-sm"><FaUserGraduate className="text-xl text-blue-600" /></div><div><h3 className="font-semibold text-gray-800 text-sm">Request Center</h3></div></div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex items-start gap-3"><FaExclamationCircle className="text-white text-xl mt-1 flex-shrink-0" /><div><h4 className="font-bold text-white text-sm mb-1">Important Message</h4><p className="text-blue-100 text-sm">{importantMessage}</p></div></div>
        </div>
      </div>

      {/* ══════════════ DESKTOP — colorful & animated ══════════════ */}
      <div className="hidden md:block" style={{
        minHeight: '100vh',
        paddingTop: 80,
        background: 'linear-gradient(145deg, #eef2ff 0%, #fdf4ff 45%, #ecfdf5 100%)',
      }}>
        <div style={{ margin: '0 auto', padding: '28px 32px 60px' }}>

          {/* ── Profile Bar ── */}
          <div className="thp-profile-bar" style={{
            background: 'linear-gradient(130deg, #1e1b4b 0%, #3730a3 55%, #5b21b6 100%)',
            borderRadius: 22,
            padding: '22px 30px',
            display: 'flex', alignItems: 'center', gap: 20,
            marginBottom: 26,
            boxShadow: '0 12px 40px rgba(79,70,229,0.32)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* decorative blobs */}
            <div style={{ position:'absolute', right:-50, top:-50, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', right:80, bottom:-70, width:220, height:220, borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />
            <div style={{ position:'absolute', left:220, top:-30, width:120, height:120, borderRadius:'50%', background:'rgba(167,139,250,0.15)', pointerEvents:'none' }} />

            {user.thumbnails ? (
              <img src={user.thumbnails.url} alt="Profile" style={{ width:60, height:60, borderRadius:'50%', objectFit:'cover', border:'3px solid rgba(255,255,255,0.35)', flexShrink:0, zIndex:1 }} />
            ) : (
              <div style={{
                width:60, height:60, borderRadius:'50%', flexShrink:0, zIndex:1,
                background:'linear-gradient(135deg,#a78bfa,#7c3aed)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:20, fontWeight:900, color:'#fff',
                border:'3px solid rgba(255,255,255,0.3)',
                boxShadow:'0 0 0 6px rgba(167,139,250,0.25)',
              }}>
                {getInitials(user.name)}
              </div>
            )}

            <div style={{ zIndex:1 }}>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.55)', fontWeight:600, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4 }}>
                {greeting.emoji} {greeting.text}
              </div>
              <div style={{ fontSize:24, fontWeight:900, color:'#fff', letterSpacing:'-0.03em', lineHeight:1.15 }}>
                {user.name.split(' ')[0]} Jii 👋
              </div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', marginTop:5, textTransform:'capitalize' }}>
                {user.role} · Active session
              </div>
            </div>

            <div style={{ marginLeft:'auto', display:'flex', gap:12, alignItems:'center', zIndex:1 }}>
              <button
                className="thp-bell"
                onClick={() => alert("Notifications functionality coming soon!")}
                style={{
                  background:'rgba(255,255,255,0.12)', border:'1.5px solid rgba(255,255,255,0.22)',
                  borderRadius:13, width:44, height:44,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  cursor:'pointer', color:'#fde68a',
                }}
              >
                <FaBell style={{ fontSize:18 }} />
              </button>
              <button className="thp-profile-btn" onClick={() => navigate("/teacher-profile")}>
                View Profile →
              </button>
            </div>
          </div>

          {/* ── Stats ── */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:32 }}>
            <StatCard delay={0}
              icon={FaUserGraduate}
              gradient="linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)"
              label="Total students" value={totalStudents ?? '—'} sub="Enrolled this session"
            />
            <StatCard delay={90}
              icon={FaMoneyCheckAlt}
              gradient="linear-gradient(135deg, #059669 0%, #0d9488 100%)"
              label="Fees collected" value="₹1.4L" sub="This month"
            />
            <StatCard delay={180}
              icon={FaClipboardList}
              gradient="linear-gradient(135deg, #d97706 0%, #dc2626 100%)"
              label="Today's attendance" value="91%" sub="221 of 248 present"
            />
          </div>

          {/* ════ STUDENT DATA ════ */}
          <div className="thp-section-wrap" style={{ marginBottom:30 }}>
            <SectionHeader title="Student Data" color="#6366f1" emoji="🎓" />
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))', gap:11 }}>
              {isAdminOrAcc && <NavCard delay={0}   icon={FaMoneyCheckAlt}        label="Fees Submit"        sub="Record payments"   iconBg="#bbf7d0" iconColor="#15803d"  cardBg="#f0fdf4" onClick={() => navigate("/student-fee-submit")} />}
              {isAdminOrAcc && <NavCard delay={45}  icon={FaHistory}              label="Fees History"       sub="Past transactions"  iconBg="#bfdbfe" iconColor="#1d4ed8"  cardBg="#eff6ff" onClick={() => navigate("/student-fee-history")} />}
                               <NavCard delay={90}  icon={FaClipboardList}        label="Attendance"         sub="Mark & review"      iconBg="#ddd6fe" iconColor="#6d28d9"  cardBg="#f5f3ff" onClick={() => navigate("/student-attendence")} />
              {isAdmin &&      <NavCard delay={135} icon={FaUserGraduate}         label="Student Data Input" sub="Add records"         iconBg="#fed7aa" iconColor="#c2410c"  cardBg="#fff7ed" onClick={() => navigate('/student-data-input')} />}
              {isAdmin &&      <NavCard delay={180} icon={FaSearch}               label="Search Student"     sub="Find by name / ID"  iconBg="#e2e8f0" iconColor="#334155"  cardBg="#f8fafc" onClick={() => navigate('/student-data')} />}
              {isAdmin &&      <NavCard delay={225} icon={FaUserTie}              label="Registration"       sub="Enrol new student"  iconBg="#a7f3d0" iconColor="#065f46"  cardBg="#ecfdf5" onClick={() => navigate("/student-register")} />}
              {isAdminOrAcc && <NavCard delay={270} icon={FaBookReader}           label="Book Sale"          sub="Sell & track"       iconBg="#fbcfe8" iconColor="#be185d"  cardBg="#fdf2f8" onClick={() => navigate("/book-sale-data")} />}
              {isAdminOrAcc && <NavCard delay={315} icon={FaHistory}              label="Book Sale History"  sub="Past sales log"     iconBg="#f9a8d4" iconColor="#9d174d"  cardBg="#fff0f8" onClick={() => navigate("/book-sale-history")} />}
              {isAdmin &&      <NavCard delay={360} icon={FaBook}                 label="Book Price Form"    sub="Set pricing"        iconBg="#c4b5fd" iconColor="#5b21b6"  cardBg="#ede9fe" onClick={() => navigate("/book-form")} />}
              {isAdminOrAcc && <NavCard delay={405} icon={GiRupee}                label="Book Price"         sub="View / update"      iconBg="#fecdd3" iconColor="#be123c"  cardBg="#fff1f2" onClick={() => navigate("/book-price")} />}
              {isAdminOrAcc && <NavCard delay={450} icon={IoMdTime}               label="Timetable"          sub="Schedule classes"   iconBg="#bae6fd" iconColor="#0369a1"  cardBg="#f0f9ff" onClick={() => navigate("/set-timetable")} />}
              {isAdminOrAcc && <NavCard delay={495} icon={LuBookOpenCheck}        label="Student Test"       sub="Coming soon"        iconBg="#e5e7eb" iconColor="#9ca3af"  cardBg="#f9fafb" onClick={() => alert("Student Test functionality coming soon!")} disabled />}
            </div>
          </div>

          <div className="thp-divider-rainbow" />

          {/* ════ TEACHER DATA ════ */}
          <div className="thp-section-wrap" style={{ marginBottom:30 }}>
            <SectionHeader title="Teacher Data" color="#8b5cf6" emoji="👩‍🏫" />
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))', gap:11 }}>
                               <NavCard delay={0}   icon={FaClipboardList}        label="Teacher Attendance"   sub="Daily roll"       iconBg="#ddd6fe" iconColor="#6d28d9"  cardBg="#f5f3ff" onClick={() => navigate("/teacher-attendenc")} />
              {isAdminOrAcc && <NavCard delay={60}  icon={GiTeacher}              label="Teacher Payment"      sub="Process salary"   iconBg="#bfdbfe" iconColor="#1d4ed8"  cardBg="#eff6ff" onClick={() => navigate("/teacher-payment")} />}
              {isAdminOrAcc && <NavCard delay={120} icon={MdOutlineManageHistory} label="Paid History"         sub="Salary log"       iconBg="#bbf7d0" iconColor="#15803d"  cardBg="#f0fdf4" onClick={() => navigate("/spend-history")} />}
              {isAdmin &&      <NavCard delay={180} icon={FaUserTie}              label="Teacher Registration" sub="Add new teacher"  iconBg="#fed7aa" iconColor="#c2410c"  cardBg="#fff7ed" onClick={() => navigate("/teacher-registration")} />}
              {isAdmin &&      <NavCard delay={240} icon={FaUserTie}              label="Teacher Data"         sub="View & edit"      iconBg="#a7f3d0" iconColor="#065f46"  cardBg="#ecfdf5" onClick={() => navigate("/teacher-data")} />}
            </div>
          </div>

          <div className="thp-divider-rainbow" />

          {/* ════ SPEND DATA ════ */}
          {isAdminOrAcc && (
            <div className="thp-section-wrap" style={{ marginBottom:30 }}>
              <SectionHeader title="Spend Data" color="#10b981" emoji="💰" />
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))', gap:11 }}>
                <NavCard delay={0}  icon={FaRupeeSign}           label="Spend"         sub="Log an expense" iconBg="#a7f3d0" iconColor="#065f46" cardBg="#ecfdf5" onClick={() => navigate("/total-spend")} />
                <NavCard delay={60} icon={MdOutlineManageHistory} label="Spend History" sub="All expenses"   iconBg="#bbf7d0" iconColor="#15803d" cardBg="#f0fdf4" onClick={() => navigate("/spend-history")} />
              </div>
            </div>
          )}

          <div className="thp-divider-rainbow" />

          {/* ════ BOTTOM ROW ════ */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 2fr', gap:16 }}>

            {/* Feedback */}
            <div className="thp-bottom-card" style={{ background:'linear-gradient(135deg,#fdf4ff 0%,#ede9fe 100%)', border:'1.5px solid #c4b5fd' }}>
              <div style={{ width:46, height:46, borderRadius:12, background:'rgba(139,92,246,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <VscFeedback style={{ fontSize:22, color:'#7c3aed' }} />
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:'#4c1d95' }}>Feedback</div>
                <div style={{ fontSize:12, color:'#7c3aed', opacity:0.75, marginTop:2 }}>Share your thoughts</div>
              </div>
            </div>

            {/* Request Center */}
            <div className="thp-bottom-card" style={{ background:'linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%)', border:'1.5px solid #93c5fd' }}>
              <div style={{ width:46, height:46, borderRadius:12, background:'rgba(59,130,246,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <FaUserGraduate style={{ fontSize:21, color:'#1d4ed8' }} />
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:'#1e3a8a' }}>Request Center</div>
                <div style={{ fontSize:12, color:'#1d4ed8', opacity:0.75, marginTop:2 }}>Raise or track requests</div>
              </div>
            </div>

            {/* Important Message */}
            <div className="thp-bottom-card" style={{
              background:'linear-gradient(135deg,#fff5f5 0%,#fee2e2 100%)',
              border:'1.5px solid #fca5a5',
              borderLeft:'5px solid #ef4444',
              alignItems:'flex-start',
            }}>
              <div className="thp-alert-float" style={{ width:46, height:46, borderRadius:12, background:'#fecaca', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:2 }}>
                <FaExclamationCircle style={{ fontSize:22, color:'#dc2626' }} />
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:800, color:'#991b1b', marginBottom:6, letterSpacing:'-0.01em' }}>
                  📢 Important Message
                </div>
                <div style={{ fontSize:13, color:'#b91c1c', lineHeight:1.75 }}>{importantMessage}</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </TeacherLayout>
  );
};

export default TeacherHomePage;
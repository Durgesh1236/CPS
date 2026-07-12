import React from 'react';
import {
  FaMoneyCheckAlt, FaHistory, FaExclamationCircle, FaUserTie,
  FaClipboardList, FaUserGraduate, FaSearch, FaRupeeSign,
  FaBell, FaBook
} from 'react-icons/fa';
import { FcBarChart } from "react-icons/fc";
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
import { FaPersonCircleQuestion } from "react-icons/fa6";

const importantMessage = "Staff meeting scheduled for 28th August at 2:00 PM in the conference hall.";

/* ─────────────────────────────────────────────────────────── */
const TeacherHomePage = () => {
  const navigate = useNavigate();
  const { user, getStudentCount } = UserData();
  const [totalStudents, setTotalStudents] = React.useState(null);
  const [activeTab, setActiveTab] = React.useState('home');

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
      } catch { /* silent */ }
    })();
    return () => { mounted = false; };
  }, [getStudentCount]);

  const isAdmin = user.role === 'admin';
  const isAccountent = user.role === 'accountent';
  const isAdminOrAcc = isAdmin || isAccountent;
  const greeting = getGreeting();

  return (
    <TeacherLayout>
      {/* MOBILE  (< md)*/}
      <div className="md:hidden min-h-screen bg-[#f0f0f7] font-sans pb-20">

        {/* ── HEADER ── */}
        <div className="bg-gradient-to-br from-[#1a0533] via-[#2d1b69] to-[#1e3a5f] pt-16 pb-6 px-5 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-purple-500/20 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-blue-500/20 pointer-events-none" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-white/50 font-bold tracking-wider uppercase mb-1">
                {greeting.emoji} {greeting.text}
              </div>
              <div className="text-2xl font-extrabold text-white leading-tight tracking-tight">
                Hey, {user.name.split(' ')[0]} Jii👋
              </div>
              <div className="mt-2 inline-flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 border border-white/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-white/75 font-bold capitalize">
                  {user.role} · Active
                </span>
              </div>
            </div>

            <div className="flex gap-2.5 items-center shrink-0 ml-3">
              <button
                onClick={() => alert('Notifications coming soon!')}
                className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center cursor-pointer relative shrink-0 hover:bg-white/25 transition-colors"
              >
                <FaBell className="text-amber-200 text-base" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500 border border-[#1a0533]" />
              </button>
              <div
                className="relative w-11 h-11 cursor-pointer shrink-0 rounded-full p-0.5 bg-gradient-to-tr from-indigo-400 via-pink-400 to-amber-300"
                // style={{ animation: 'spin 4s linear infinite' }}
                onClick={() => navigate('/teacher-profile')}
              >
                <div className="absolute inset-0.5 rounded-full bg-indigo-950 flex items-center justify-center">
                  {user.thumbnails ? (
                    <img src={user.thumbnails.url} alt="" className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-300 to-purple-700 flex items-center justify-center text-xs font-black text-white">
                      {getInitials(user.name)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 text-sm pointer-events-none" />
            <input
              className="w-full py-3 pl-10 pr-3 rounded-xl border border-white/20 bg-white/10 text-white text-sm outline-none placeholder:text-white/40 focus:bg-white/20 transition-colors"
              placeholder="Search modules..."
            />
          </div>
        </div>

        {/* ── STATS ROW (admin only) ── */}
        {isAdmin && (
          <div className="px-4 pt-4">
            <div className="flex gap-2.5">
              {[
                { icon: FaUserGraduate, from: 'from-indigo-600', to: 'to-indigo-800', value: totalStudents ?? '—', label: 'Students' },
                { icon: FaMoneyCheckAlt, from: 'from-emerald-600', to: 'to-emerald-800', value: '₹1.4L', label: 'Collected' },
                { icon: FaClipboardList, from: 'from-amber-500', to: 'to-red-600', value: '91%', label: 'Attend.' },
              ].map(({ icon: Icon, from, to, value, label }, i) => (
                <div key={i} className={`flex-1 bg-gradient-to-br ${from} ${to} rounded-2xl py-3.5 px-3 relative overflow-hidden shadow-lg`}>
                  <div className="absolute -right-3 -bottom-3 w-12 h-12 rounded-full bg-white/10" />
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="text-white text-sm" />
                  </div>
                  <div className="text-white text-xl font-black mt-2">{value}</div>
                  <div className="text-white/70 text-[10px] font-bold uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── QUICK ACTIONS ── */}
        <div className="mt-5 px-4">
          <div className="text-[11px] font-black text-gray-500 tracking-wide uppercase mb-3">Quick Actions</div>
          <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex justify-around">
            {[
              isAdminOrAcc && { icon: FaMoneyCheckAlt, label: 'Fees Submit', bg: 'from-emerald-500 to-emerald-700', shadow: 'rgba(16,185,129,0.35)', action: () => navigate('/student-fee-submit') },
              { icon: FaClipboardList, label: 'Attendance', bg: 'from-indigo-500 to-indigo-700', shadow: 'rgba(99,102,241,0.35)', action: () => navigate('/student-attendence') },
              isAdminOrAcc && { icon: FaSearch, label: 'Search', bg: 'from-amber-500 to-amber-700', shadow: 'rgba(245,158,11,0.35)', action: () => navigate('/student-data') },
              isAdminOrAcc && { icon: IoMdTime, label: 'Timetable', bg: 'from-sky-500 to-sky-700', shadow: 'rgba(14,165,233,0.35)', action: () => navigate('/set-timetable') },
              isAdmin && { icon: FaUserTie, label: 'Add Teacher', bg: 'from-teal-500 to-teal-700', shadow: 'rgba(20,184,166,0.35)', action: () => navigate('/teacher-registration') },
            ].filter(Boolean).map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={item.action}>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center shadow-md`}
                  style={{ boxShadow: `0 4px 12px ${item.shadow}` }}
                >
                  <item.icon className="text-white text-xl" />
                </div>
                <span className="text-[10px] font-extrabold text-gray-700 text-center leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── STUDENT DATA ── */}
        <div className="px-4">
          <MobileSectionHeader emoji="🎓" title="Student Data" accentFrom="indigo" />
          <div className="grid grid-cols-3 gap-2.5">
            {isAdminOrAcc && <MobileCard icon={FaMoneyCheckAlt} label="Fees Submit" bg="from-emerald-500 to-emerald-700" delay={0} onClick={() => navigate('/student-fee-submit')} />}
            {isAdminOrAcc && <MobileCard icon={FaHistory} label="Fees History" bg="from-indigo-500 to-indigo-700" delay={40} onClick={() => navigate('/student-fee-history')} />}
            {isAdminOrAcc && <MobileCard icon={FaClipboardList} label="Attendance" bg="from-purple-500 to-purple-700" delay={80} onClick={() => navigate('/student-attendence')} />}
            {isAdmin && <MobileCard icon={FaUserGraduate} label="Student Data" bg="from-amber-500 to-amber-700" delay={120} onClick={() => navigate('/student-data-input')} />}
            {isAdmin && <MobileCard icon={FaSearch} label="Search Student" bg="from-sky-500 to-sky-700" delay={160} onClick={() => navigate('/student-data')} />}
            {isAdmin && <MobileCard icon={FaUserTie} label="Register" bg="from-teal-500 to-teal-700" delay={200} onClick={() => navigate('/student-register')} />}
            {isAdminOrAcc && <MobileCard icon={FaBookReader} label="Book Sale" bg="from-pink-500 to-pink-700" delay={240} onClick={() => navigate('/book-sale-data')} />}
            {isAdminOrAcc && <MobileCard icon={FaHistory} label="Sale History" bg="from-rose-500 to-rose-700" delay={280} onClick={() => navigate('/book-sale-history')} />}
            {isAdmin && <MobileCard icon={FaBook} label="Book Form" bg="from-violet-500 to-violet-700" delay={320} onClick={() => navigate('/book-form')} />}
            {isAdminOrAcc && <MobileCard icon={GiRupee} label="Book Price" bg="from-red-600 to-red-800" delay={360} onClick={() => navigate('/book-price')} />}
            {isAdminOrAcc && <MobileCard icon={IoMdTime} label="Timetable" bg="from-cyan-600 to-cyan-800" delay={400} onClick={() => navigate('/set-timetable')} />}
            {isAdminOrAcc && <MobileCard icon={LuBookOpenCheck} label="Student Test" bg="from-gray-500 to-gray-700" delay={440} onClick={() => navigate('/set-student-test')}/>}
            {<MobileCard icon={FcBarChart} label="Results" bg="from-green-500 to-green-700" delay={480} onClick={() => navigate('/student-result-submission')} />}
            {<MobileCard icon={FaPersonCircleQuestion} label="Question Paper" bg="from-emerald-500 to-green-700" delay={480} onClick={() => navigate('/set-student-question-paper')} />}
              {<MobileCard icon={FaBook} label="Question History" bg="from-purple-500 to-purple-700" delay={480} onClick={() => navigate('/question-history')} />}
          </div>
        </div>

        {/* ── TEACHER DATA ── */}
        <div className="px-4">
          <MobileSectionHeader emoji="👩‍🏫" title="Teacher Data" accentFrom="purple" />
          <div className="grid grid-cols-3 gap-2.5">
            <MobileCard icon={FaClipboardList} label="Attendance" bg="from-purple-500 to-purple-700" delay={0} onClick={() => navigate('/teacher-attendenc')} />
            {isAdminOrAcc && <MobileCard icon={GiTeacher} label="Payment" bg="from-indigo-500 to-indigo-700" delay={50} onClick={() => navigate('/teacher-payment')} />}
            {isAdminOrAcc && <MobileCard icon={MdOutlineManageHistory} label="Pay History" bg="from-emerald-500 to-emerald-700" delay={100} onClick={() => navigate('/spend-history')} />}
            {isAdmin && <MobileCard icon={FaUserTie} label="Reg Teacher" bg="from-amber-500 to-amber-700" delay={150} onClick={() => navigate('/teacher-registration')} />}
            {isAdmin && <MobileCard icon={FaUserTie} label="Teacher Data" bg="from-teal-500 to-teal-700" delay={200} onClick={() => navigate('/teacher-data')} />}
              {<MobileCard icon={FaPersonCircleQuestion} label="Question Paper" bg="from-emerald-500 to-green-700" delay={480} onClick={() => navigate('/set-student-question-paper')} />}
          </div>
        </div>

        {/* ── SPEND DATA ── */}
        {isAdminOrAcc && (
          <div className="px-4">
            <MobileSectionHeader emoji="💰" title="Spend Data" accentFrom="emerald" />
            <div className="grid grid-cols-3 gap-2.5">
              <MobileCard icon={FaRupeeSign} label="Log Spend" bg="from-emerald-500 to-emerald-700" delay={0} onClick={() => navigate('/total-spend')} />
              <MobileCard icon={MdOutlineManageHistory} label="Spend History" bg="from-sky-500 to-sky-700" delay={60} onClick={() => navigate('/spend-history')} />
            </div>
          </div>
        )}

        {/* ── FEEDBACK & REQUESTS ── */}
        <div className="px-4 mt-7">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 flex items-center gap-3 border border-purple-200 cursor-pointer active:scale-95 transition-transform">
              <div className="w-11 h-11 rounded-xl bg-purple-200/50 flex items-center justify-center">
                <VscFeedback className="text-purple-700 text-xl" />
              </div>
              <div>
                <div className="text-sm font-black text-purple-900">Feedback</div>
                <div className="text-xs text-purple-700 font-semibold mt-0.5">Share thoughts</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 flex items-center gap-3 border border-blue-200 cursor-pointer active:scale-95 transition-transform">
              <div className="w-11 h-11 rounded-xl bg-blue-200/50 flex items-center justify-center">
                <FaUserGraduate className="text-blue-700 text-xl" />
              </div>
              <div>
                <div className="text-sm font-black text-blue-900">Requests</div>
                <div className="text-xs text-blue-700 font-semibold mt-0.5">Raise & track</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── IMPORTANT NOTICE ── */}
        <div className="mx-4 mt-4 bg-white rounded-xl border border-rose-200 border-l-4 border-l-rose-500 p-3 flex items-start gap-2.5">
          <FaExclamationCircle className="text-rose-500 text-base shrink-0 mt-0.5" />
          <div>
            <div className="text-[11px] font-black text-rose-800 uppercase tracking-wide mb-1">📢 Important Notice</div>
            <div className="text-sm text-rose-900 font-semibold leading-relaxed">{importantMessage}</div>
          </div>
        </div>

        <div className="h-6" />

        {/* ── BOTTOM NAV ── */}
        {/* <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#0f0a28] border-t border-white/10 flex z-50">
          {[
            { id: 'home', emoji: '🏠', label: 'Home', action: null },
            { id: 'students', emoji: '🎓', label: 'Students', action: () => navigate('/student-data') },
            { id: 'fees', emoji: '💰', label: 'Fees', action: () => navigate('/student-fee-submit') },
            { id: 'profile', emoji: '👤', label: 'Profile', action: () => navigate('/teacher-profile') },
          ].map(tab => (
            <div
              key={tab.id}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer active:opacity-60"
              onClick={() => { setActiveTab(tab.id); tab.action?.(); }}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all duration-200 ${activeTab === tab.id ? 'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50' : ''}`}>
                {tab.emoji}
              </div>
              <span className={`text-[10px] font-extrabold transition-colors ${activeTab === tab.id ? 'text-indigo-300' : 'text-white/40'}`}>
                {tab.label}
              </span>
            </div>
          ))}
        </div> */}
      </div>

      {/* ════════════════════════════════
              DESKTOP  (>= md)
              Dark deep-space background so
              every vivid card pops boldly.
      ════════════════════════════════ */}
      <div className="hidden md:block min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="w-full mx-auto py-7 px-8 pb-16">

          {/* Profile bar */}
          <div className="bg-gradient-to-r from-[#1e1b4b] via-[#3730a3] to-[#5b21b6] rounded-2xl py-5 px-8 flex items-center gap-5 mb-6 shadow-xl shadow-indigo-500/30 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute right-20 -bottom-16 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
            {user.thumbnails ? (
              <img src={user.thumbnails.url} alt="Profile" className="w-14 h-14 rounded-full object-cover border-2 border-white/40 z-10" />
            ) : (
              <div className="w-14 h-14 rounded-full z-10 bg-gradient-to-br from-purple-300 to-purple-700 flex items-center justify-center text-xl font-black text-white border-2 border-white/30 ring-4 ring-purple-400/25">
                {getInitials(user.name)}
              </div>
            )}
            <div className="z-10">
              <div className="text-xs text-white/50 font-semibold tracking-wider uppercase mb-1">{greeting.emoji} {greeting.text}</div>
              <div className="text-2xl font-black text-white tracking-tight leading-tight">{user.name.split(' ')[0]} Jii 👋</div>
              <div className="text-xs text-white/40 mt-1 capitalize">{user.role} · Active session</div>
            </div>
            <div className="ml-auto flex gap-3 items-center z-10">
              <button
                onClick={() => alert('Notifications coming soon!')}
                className="bg-white/15 border border-white/20 rounded-xl w-11 h-11 flex items-center justify-center cursor-pointer text-amber-200 hover:-rotate-12 hover:scale-110 transition-transform duration-200"
              >
                <FaBell className="text-lg" />
              </button>
              <button
                onClick={() => navigate('/teacher-profile')}
                className="text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full py-2.5 px-6 shadow-md shadow-indigo-500/40 hover:opacity-85 hover:scale-105 transition-all"
              >
                View Profile →
              </button>
            </div>
          </div>

          {/* Stats (admin only) */}
          {isAdmin && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              <DesktopStatCard icon={FaUserGraduate} gradient="from-cyan-500 to-indigo-600" label="Total students" value={totalStudents ?? '—'} sub="Enrolled this session" delay={0} />
              <DesktopStatCard icon={FaMoneyCheckAlt} gradient="from-emerald-500 to-teal-600" label="Fees collected" value="₹1.4L" sub="This month" delay={90} />
              <DesktopStatCard icon={FaClipboardList} gradient="from-amber-500 to-red-500" label="Today's attendance" value="91%" sub="221 of 248 present" delay={180} />
            </div>
          )}

          {/* ── STUDENT DATA ── */}
          <DesktopSection title="Student Data" emoji="🎓">
            {isAdminOrAcc && <DesktopNavCard icon={FaMoneyCheckAlt} label="Fees Submit" sub="Record payments" gradient="from-emerald-400 to-green-600" onClick={() => navigate('/student-fee-submit')} />}
            {isAdminOrAcc && <DesktopNavCard icon={FaHistory} label="Fees History" sub="Past transactions" gradient="from-blue-400 to-indigo-600" onClick={() => navigate('/student-fee-history')} />}
            <DesktopNavCard icon={FaClipboardList} label="Attendance" sub="Mark & review" gradient="from-violet-500 to-purple-700" onClick={() => navigate('/student-attendence')} />
            {isAdmin && <DesktopNavCard icon={FaUserGraduate} label="Student Data Input" sub="Add records" gradient="from-orange-400 to-amber-600" onClick={() => navigate('/student-data-input')} />}
            {isAdmin && <DesktopNavCard icon={FaSearch} label="Search Student" sub="Find by name/ID" gradient="from-slate-400 to-gray-600" onClick={() => navigate('/student-data')} />}
            {isAdmin && <DesktopNavCard icon={FaUserTie} label="Registration" sub="Enrol new student" gradient="from-teal-400 to-emerald-700" onClick={() => navigate('/student-register')} />}
            {isAdminOrAcc && <DesktopNavCard icon={FaBookReader} label="Book Sale" sub="Sell & track" gradient="from-pink-400 to-rose-600" onClick={() => navigate('/book-sale-data')} />}
            {isAdminOrAcc && <DesktopNavCard icon={FaHistory} label="Book Sale History" sub="Past sales log" gradient="from-rose-400 to-red-600" onClick={() => navigate('/book-sale-history')} />}
            {isAdmin && <DesktopNavCard icon={FaBook} label="Book Price Form" sub="Set pricing" gradient="from-purple-400 to-violet-700" onClick={() => navigate('/book-form')} />}
            {isAdminOrAcc && <DesktopNavCard icon={GiRupee} label="Book Price" sub="View / update" gradient="from-red-400 to-orange-600" onClick={() => navigate('/book-price')} />}
            {isAdminOrAcc && <DesktopNavCard icon={IoMdTime} label="Timetable" sub="Schedule classes" gradient="from-sky-400 to-cyan-600" onClick={() => navigate('/set-timetable')} />}
            {isAdminOrAcc && <DesktopNavCard icon={LuBookOpenCheck} label="Student Test" sub="Coming soon" gradient="from-gray-500 to-slate-700" onClick={() => navigate('/set-student-test')} />}
            {isAdminOrAcc && <DesktopNavCard icon={FcBarChart} label="Student Results" sub="Submit & view" gradient="from-green-500 to-emerald-700" onClick={() => navigate('/student-result-submission')} />}
            { isAdminOrAcc && <DesktopNavCard icon={FaPersonCircleQuestion} label="Question View" sub="View & edit" gradient="from-emerald-700 to-green-700" onClick={() => navigate('/question-history')} /> }
          </DesktopSection>

          <RainbowDivider />

          {/* ── TEACHER DATA ── */}
          <DesktopSection title="Teacher Data" emoji="👩‍🏫">
            <DesktopNavCard icon={FaClipboardList} label="Teacher Attendance" sub="Daily roll" gradient="from-fuchsia-400 to-purple-700" onClick={() => navigate('/teacher-attendenc')} />
            {isAdminOrAcc && <DesktopNavCard icon={GiTeacher} label="Teacher Payment" sub="Process salary" gradient="from-blue-500 to-indigo-700" onClick={() => navigate('/teacher-payment')} />}
            {isAdminOrAcc && <DesktopNavCard icon={MdOutlineManageHistory} label="Paid History" sub="Salary log" gradient="from-lime-400 to-green-600" onClick={() => navigate('/spend-history')} />}
            {isAdmin && <DesktopNavCard icon={FaUserTie} label="Teacher Registration" sub="Add new teacher" gradient="from-yellow-400 to-orange-500" onClick={() => navigate('/teacher-registration')} />}
            {isAdmin && <DesktopNavCard icon={FaUserTie} label="Teacher Data" sub="View & edit" gradient="from-cyan-400 to-teal-600" onClick={() => navigate('/teacher-data')} />}
            {isAdminOrAcc && <DesktopNavCard icon={FaPersonCircleQuestion} label="Question Paper" sub="View & edit" gradient="from-emerald-500 to-green-700" onClick={() => navigate('/set-student-question-paper')} />}
          </DesktopSection>

          <RainbowDivider />

          {/* ── SPEND DATA ── */}
          {isAdminOrAcc && (
            <>
              <DesktopSection title="Spend Data" emoji="💰">
                <DesktopNavCard icon={FaRupeeSign} label="Spend" sub="Log an expense" gradient="from-green-400 to-emerald-700" onClick={() => navigate('/total-spend')} />
                <DesktopNavCard icon={MdOutlineManageHistory} label="Spend History" sub="All expenses" gradient="from-teal-400 to-cyan-700" onClick={() => navigate('/spend-history')} />
              </DesktopSection>
              <RainbowDivider />
            </>
          )}

          {/* Bottom row */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr] gap-4">
            <div className="bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-xl p-4 flex items-center gap-3 border border-purple-400/20 cursor-pointer hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-1 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <VscFeedback className="text-white text-xl" />
              </div>
              <div>
                <div className="text-sm font-black text-white">Feedback</div>
                <div className="text-xs text-white/70 mt-0.5">Share your thoughts</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-700 rounded-xl p-4 flex items-center gap-3 border border-blue-400/20 cursor-pointer hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all group">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaUserGraduate className="text-white text-xl" />
              </div>
              <div>
                <div className="text-sm font-black text-white">Request Center</div>
                <div className="text-xs text-white/70 mt-0.5">Raise or track requests</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-rose-600 to-red-800 rounded-xl p-4 flex items-start gap-3 border-l-4 border-l-amber-400 border border-rose-400/20 cursor-pointer hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-1 transition-all">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center animate-bounce shrink-0">
                <FaExclamationCircle className="text-amber-300 text-xl" />
              </div>
              <div>
                <div className="text-sm font-black text-white mb-1.5">📢 Important Message</div>
                <div className="text-sm text-white/80 leading-relaxed">{importantMessage}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </TeacherLayout>
  );
};

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */

const RainbowDivider = () => (
  <div className="h-px rounded-full bg-gradient-to-r from-indigo-400 via-pink-400 to-emerald-400 my-6 opacity-30" />
);

const MobileSectionHeader = ({ emoji, title, accentFrom }) => (
  <div className="flex items-center gap-2 mt-7 mb-3 pl-0.5">
    <span className="text-xl">{emoji}</span>
    <span className="text-base font-black text-indigo-950 tracking-tight">{title}</span>
    <div className={`flex-1 h-0.5 rounded-full bg-gradient-to-r from-${accentFrom}-400/30 to-transparent`} />
  </div>
);

const DesktopSection = ({ title, emoji, children }) => (
  <div className="mb-7">
    <div className="flex items-center gap-2.5 mb-4">
      <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-lg border border-indigo-100">{emoji}</div>
      <span className="text-base font-black text-gray-800 tracking-tight">{title}</span>
      <div className="flex-1 h-px rounded-full bg-gradient-to-r from-indigo-300/40 to-transparent ml-1" />
    </div>
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
      {children}
    </div>
  </div>
);

const MobileCard = ({ icon: Icon, label, bg, onClick, delay = 0, badge }) => (
  <div
    className={`bg-gradient-to-br ${bg} rounded-2xl p-3.5 flex flex-col items-start gap-2.5 cursor-pointer relative overflow-hidden active:opacity-80 active:scale-95 transition-all`}
    style={{ animationDelay: `${delay}ms` }}
    onClick={onClick}
  >
    <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-white/15 pointer-events-none" />
    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
      <Icon className="text-white text-xl" />
    </div>
    <div className="text-xs font-extrabold text-white leading-tight break-words">{label}</div>
    {badge && (
      <div className="absolute top-2 right-2 bg-rose-500 text-white text-[8px] font-black py-0.5 px-1.5 rounded-full">
        {badge}
      </div>
    )}
  </div>
);

/**
 * Desktop navigation card
 * Each card receives a unique vivid `gradient` (e.g. "from-emerald-400 to-green-600").
 * White text + icon on a coloured card on a dark background = maximum contrast & vibrancy.
 */
const DesktopNavCard = ({ icon: Icon, label, sub, gradient, onClick, disabled }) => (
  <div
    className={`
      relative overflow-hidden rounded-2xl p-4 flex flex-col gap-3
      bg-gradient-to-br ${gradient}
      border border-white/10
      ${disabled
        ? 'opacity-35 cursor-not-allowed pointer-events-none'
        : 'cursor-pointer hover:-translate-y-2 hover:scale-[1.04] active:scale-95 hover:shadow-2xl transition-all duration-300 group'
      }
    `}
    onClick={disabled ? undefined : onClick}
  >
    {/* Frosted shine on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-2xl" />
    {/* Decorative blob */}
    <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />

    <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-200 shadow-sm">
      <Icon className="text-white text-lg" />
    </div>
    <div className="z-10">
      <div className="text-sm font-bold text-white leading-tight">{label}</div>
      {sub && <div className="text-[11px] text-white/65 mt-1">{sub}</div>}
    </div>
  </div>
);

const DesktopStatCard = ({ icon: Icon, gradient, label, value, sub, delay = 0 }) => (
  <div
    className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden shadow-lg`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10 pointer-events-none" />
    <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center z-10 shadow-md">
      <Icon className="text-white text-2xl" />
    </div>
    <div className="z-10">
      <div className="text-[11px] text-white/70 font-semibold uppercase tracking-wide mb-0.5">{label}</div>
      <div className="text-3xl font-black text-white leading-tight tracking-tight">{value}</div>
      {sub && <div className="text-[11px] text-white/60 mt-1">{sub}</div>}
    </div>
  </div>
);

export default TeacherHomePage;
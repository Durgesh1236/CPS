import React from 'react';
import {
  FaMoneyCheckAlt, FaHistory, FaExclamationCircle, FaUserTie,
  FaClipboardList, FaUserGraduate, FaSearch, FaRupeeSign,
  FaBell, FaBook, FaImages, FaComments, FaPaperPlane, FaTimes,
  FaHeadset, FaCopy, FaRobot, FaCheckCircle
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
import FestivalWish from '../Components/FestivalWish';

const importantMessage = "Staff meeting scheduled for 28th August at 2:00 PM in the conference hall.";

/* ─────────────────────────────────────────────────────────── */
const TeacherHomePage = () => {
  const navigate = useNavigate();
  const { user, getStudentCount } = UserData();
  const [totalStudents, setTotalStudents] = React.useState(null);
  // const [activeTab, setActiveTab] = React.useState('home');

  const getGreeting = () => {
    const h = new Date().getHours();
    console.log(h);
    if (h < 12 && h >= 6) return { text: 'Good Morning', emoji: '🌅' };
    if (h < 18 && h >= 12) return { text: 'Good Afternoon', emoji: '☀️' };
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
  console.log(greeting)
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
              <div className="text-xs py-2 text-white/50 font-bold tracking-wider uppercase mb-1">
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

        <FestivalWish className="mx-4 mt-4" />

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
            {isAdminOrAcc && <MobileCard icon={FaMoneyCheckAlt} label="Fees Submit" bg="from-emerald-500 to-teal-700" delay={0} onClick={() => navigate('/student-fee-submit')} />}
            {isAdminOrAcc && <MobileCard icon={FaHistory} label="Fees History" bg="from-blue-500 to-indigo-700" delay={40} onClick={() => navigate('/student-fee-history')} />}
            {isAdminOrAcc && <MobileCard icon={FaClipboardList} label="Attendance" bg="from-fuchsia-500 to-purple-700" delay={80} onClick={() => navigate('/take-student-attendence')} />}
            {isAdminOrAcc && <MobileCard icon={FaUserGraduate} label="Student Data" bg="from-amber-500 to-yellow-700" delay={120} onClick={() => navigate('/student-data-input')} />}
            {isAdminOrAcc && <MobileCard icon={FaSearch} label="Search Student" bg="from-cyan-500 to-sky-700" delay={160} onClick={() => navigate('/student-data')} />}
            {isAdmin && <MobileCard icon={FaUserTie} label="Register" bg="from-lime-500 to-green-700" delay={200} onClick={() => navigate('/student-register')} />}
            {isAdminOrAcc && <MobileCard icon={FaBookReader} label="Book Sale" bg="from-pink-500 to-fuchsia-700" delay={240} onClick={() => navigate('/book-sale-data')} />}
            {isAdminOrAcc && <MobileCard icon={FaHistory} label="Sale History" bg="from-rose-500 to-red-700" delay={280} onClick={() => navigate('/book-sale-history')} />}
            {isAdmin && <MobileCard icon={FaBook} label="Book Form" bg="from-violet-500 to-indigo-700" delay={320} onClick={() => navigate('/book-form')} />}
            {isAdminOrAcc && <MobileCard icon={GiRupee} label="Book Price" bg="from-orange-500 to-red-700" delay={360} onClick={() => navigate('/book-price')} />}
            {isAdminOrAcc && <MobileCard icon={IoMdTime} label="Timetable" bg="from-teal-500 to-cyan-700" delay={400} onClick={() => navigate('/set-timetable')} />}
            {isAdminOrAcc && <MobileCard icon={LuBookOpenCheck} label="Student Test" bg="from-slate-500 to-gray-700" delay={440} onClick={() => navigate('/set-student-test')}/>}
            {<MobileCard icon={FcBarChart} label="Results" bg="from-green-500 to-emerald-700" delay={480} onClick={() => navigate('/student-result-submission')} />}
            {isAdminOrAcc && <MobileCard icon={FcBarChart} label="Test Results" bg="from-cyan-500 to-blue-700" delay={500} onClick={() => navigate('/student-test-results')} />}
            {<MobileCard icon={FaPersonCircleQuestion} label="Question Paper" bg="from-indigo-500 to-violet-700" delay={480} onClick={() => navigate('/set-student-question-paper')} />}
            {<MobileCard icon={FaBook} label="Question History" bg="from-red-500 to-orange-700" delay={480} onClick={() => navigate('/question-history')} />}
            {isAdminOrAcc && <MobileCard icon={FaImages} label="School Photos" bg="from-sky-500 to-blue-700" delay={520} onClick={() => navigate('/school-photo-upload')} />}
          </div>
        </div>

        {/* ── TEACHER DATA ── */}
        <div className="px-4">
          <MobileSectionHeader emoji="👩‍🏫" title="Teacher Data" accentFrom="purple" />
          <div className="grid grid-cols-3 gap-2.5">
            <MobileCard icon={FaClipboardList} label="Attendance" bg="from-purple-500 to-violet-700" delay={0} onClick={() => navigate('/teacher-attendance')} />
            {isAdminOrAcc && <MobileCard icon={MdOutlineManageHistory} label="History" bg="from-cyan-500 to-blue-700" delay={40} onClick={() => navigate('/teacher-attendance-history')} />}
            {isAdminOrAcc && <MobileCard icon={GiTeacher} label="Payment" bg="from-blue-600 to-cyan-700" delay={50} onClick={() => navigate('/teacher-payment')} />}
            {isAdminOrAcc && <MobileCard icon={MdOutlineManageHistory} label="Pay History" bg="from-lime-600 to-emerald-700" delay={100} onClick={() => navigate('/spend-history')} />}
            {isAdmin && <MobileCard icon={FaUserTie} label="Reg Teacher" bg="from-amber-600 to-orange-700" delay={150} onClick={() => navigate('/teacher-registration')} />}
            {isAdmin && <MobileCard icon={FaUserTie} label="Teacher Data" bg="from-cyan-600 to-teal-700" delay={200} onClick={() => navigate('/teacher-data')} />}
              {<MobileCard icon={FaPersonCircleQuestion} label="Question Paper" bg="from-emerald-600 to-green-800" delay={480} onClick={() => navigate('/set-student-question-paper')} />}
          </div>
        </div>

        {/* ── SPEND DATA ── */}
        {isAdminOrAcc && (
          <div className="px-4">
            <MobileSectionHeader emoji="💰" title="Spend Data" accentFrom="emerald" />
            <div className="grid grid-cols-3 gap-2.5">
              <MobileCard icon={FaRupeeSign} label="Log Spend" bg="from-green-600 to-lime-700" delay={0} onClick={() => navigate('/total-spend')} />
              <MobileCard icon={MdOutlineManageHistory} label="Spend History" bg="from-teal-600 to-sky-700" delay={60} onClick={() => navigate('/spend-history')} />
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
      </div>

      {/* ════════════════════════════════
              DESKTOP  (>= md)
      ════════════════════════════════ */}
      <div className="hidden md:block min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="mx-auto max-w-[1800px] px-4 pb-16 pt-24 sm:px-6 xl:px-8">
          <div className="min-w-0 py-1">

          <section
            id="dashboard-overview"
            className="relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 px-6 py-7 shadow-xl shadow-indigo-950/15 sm:px-8 sm:py-8"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-violet-400/15 blur-2xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-2xl" />
            <div className="relative z-10 flex flex-wrap items-center gap-5">
              {user.thumbnails?.url ? (
                <img
                  src={user.thumbnails.url}
                  alt={`${user.name}'s profile`}
                  className="h-16 w-16 rounded-2xl border-2 border-white/30 object-cover shadow-lg ring-4 ring-white/10 sm:h-20 sm:w-20"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-white/30 bg-gradient-to-br from-violet-400 to-indigo-600 text-xl font-black text-white shadow-lg ring-4 ring-white/10 sm:h-20 sm:w-20 sm:text-2xl">
                  {getInitials(user.name)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-indigo-200">
                  {greeting.emoji} {greeting.text}
                </div>
                <h1 className="truncate text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Welcome, {user.name.split(' ')[0]}!
                </h1>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold capitalize text-indigo-100">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                  {user.role} workspace
                </div>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <button
                  aria-label="View notifications"
                  onClick={() => document.getElementById('dashboard-notifications')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-amber-200 transition hover:scale-105 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
                >
                  <FaBell className="text-lg" />
                </button>
                <button
                  onClick={() => navigate('/teacher-profile')}
                  className="rounded-xl border border-white/20 bg-white px-4 py-2.5 text-sm font-bold text-indigo-950 shadow-md transition hover:-translate-y-0.5 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white/60 sm:px-5"
                >
                  View profile
                </button>
              </div>
            </div>
          </section>

          <div className={`mb-7 grid gap-4 ${isAdmin ? 'lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]' : ''}`}>
            <FestivalWish className="h-full" />
            {isAdmin && (
              <article className="relative isolate flex min-h-40 items-center gap-5 overflow-hidden rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm sm:p-6">
                <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-indigo-50" />
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                  <FaUserGraduate className="text-2xl" aria-hidden="true" />
                </div>
                <div className="relative min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-500">School community</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">Total students</p>
                  <p className="mt-1 text-4xl font-black tracking-tight text-slate-900">
                    {totalStudents ?? '—'}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">Enrolled this session</p>
                </div>
              </article>
            )}
          </div>

          <TeacherDashboardUpdates />

          </div>
        </div>
      </div>
      <TeacherHelpAssistant />
    </TeacherLayout>
  );
};

const getTeacherHelpReply = (question) => {
  const text = question.toLowerCase();

  if (/fee|payment|receipt/.test(text)) {
    return 'For student fees, open Fees Submit to record a payment or Fees History to review past transactions. Teacher salary payments are under Teacher Data.';
  }
  if (/attendance|present|absent|roll/.test(text)) {
    return 'Use Attendance to mark student attendance. Teacher attendance and its history are available in the Teacher Data section.';
  }
  if (/student|search|record|admission/.test(text)) {
    return 'Use Search Student to find a record, or Student Data Input to add records. Available options depend on your account role.';
  }
  if (/timetable|schedule|class time/.test(text)) {
    return 'Open Timetable in the Student Data section to schedule classes.';
  }
  if (/salary|teacher payment|pay/.test(text)) {
    return 'Teacher payments and payment history are available in Teacher Data for accounts with access.';
  }
  if (/book|price|sale/.test(text)) {
    return 'Book Sale and Book Sale History are in Student Data. Book Price is available there too.';
  }
  if (/question|test|result|exam/.test(text)) {
    return 'Use Question Paper to manage question papers, Student Test to set a test, and Student Results or Test Results to review results.';
  }
  if (/profile|account|password|login/.test(text)) {
    return 'Open View Profile in the dashboard header to review your teacher profile. If you cannot sign in or update your account, send a help-desk query.';
  }

  return 'I can help with fees, attendance, student records, timetables, teacher payments, books, tests, results, and profile navigation. For anything else, switch to Help Desk and prepare a query for your school administrator.';
};

const TeacherHelpAssistant = () => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('chat');
  const [messages, setMessages] = React.useState([
    {
      from: 'assistant',
      text: 'Hi! Ask me how to find or use a CPS dashboard feature. I use built-in help topics and do not connect to a live AI service.'
    }
  ]);
  const [chatInput, setChatInput] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [preparedQuery, setPreparedQuery] = React.useState('');
  const [copyStatus, setCopyStatus] = React.useState('');
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, open, activeTab]);

  const sendMessage = (event) => {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question) return;

    setMessages((current) => [
      ...current,
      { from: 'user', text: question },
      { from: 'assistant', text: getTeacherHelpReply(question) }
    ]);
    setChatInput('');
  };

  const prepareQuery = (event) => {
    event.preventDefault();
    const trimmedSubject = subject.trim();
    const trimmedDetails = details.trim();
    if (!trimmedSubject || !trimmedDetails) return;

    setPreparedQuery(`CPS Teacher Help Desk Query\nSubject: ${trimmedSubject}\n\n${trimmedDetails}`);
    setCopyStatus('');
  };

  const copyQuery = async () => {
    try {
      await navigator.clipboard.writeText(preparedQuery);
      setCopyStatus('Copied. Share it with your school administrator; it has not been sent automatically.');
    } catch {
      setCopyStatus('Clipboard access is unavailable. Select and copy the query text below; it has not been sent automatically.');
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-[60] md:bottom-6 md:right-6">
      {open && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="teacher-help-title"
          className="mb-3 flex h-[min(70vh,34rem)] w-[min(92vw,24rem)] flex-col overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-2xl"
        >
          <header className="bg-gradient-to-r from-indigo-950 via-indigo-800 to-violet-700 p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 id="teacher-help-title" className="flex items-center gap-2 text-base font-black">
                  <FaRobot aria-hidden="true" />
                  CPS Help Assistant
                </h2>
                <p className="mt-1 text-xs text-white/75">Dashboard help and query preparation</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close help assistant"
                className="rounded-lg cursor-pointer p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>
            <div className="mt-3 flex rounded-lg bg-white/10 p-1" role="tablist" aria-label="Help assistant">
              {[
                { id: 'chat', label: 'Ask a question', icon: FaComments },
                { id: 'helpdesk', label: 'Help desk', icon: FaHeadset }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  id={`teacher-help-tab-${id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === id}
                  aria-controls={`teacher-help-panel-${id}`}
                  onClick={() => setActiveTab(id)}
                  className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-md px-2 py-2 text-xs font-bold transition ${
                    activeTab === id ? 'bg-white text-indigo-950 shadow' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Icon aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </header>

          {activeTab === 'chat' ? (
            <div
              id="teacher-help-panel-chat"
              role="tabpanel"
              aria-labelledby="teacher-help-tab-chat"
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">
                <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
                  Built-in dashboard help only. This is not a live AI service and may not know the answer to every question.
                </p>
                {messages.map((message, index) => (
                  <div
                    key={`${message.from}-${index}`}
                    className={`max-w-[90%] whitespace-pre-wrap rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
                      message.from === 'user'
                        ? 'ml-auto rounded-br-sm bg-indigo-700 text-white'
                        : 'mr-auto rounded-bl-sm border border-slate-200 bg-white text-slate-800 shadow-sm'
                    }`}
                  >
                    {message.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-100 bg-white p-3">
                <label className="sr-only" htmlFor="teacher-help-chat-input">Ask a dashboard question</label>
                <input
                  id="teacher-help-chat-input"
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                  maxLength={500}
                  placeholder="Ask about dashboard features..."
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  aria-label="Send question"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-700 text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FaPaperPlane aria-hidden="true" />
                </button>
              </form>
            </div>
          ) : (
            <div
              id="teacher-help-panel-helpdesk"
              role="tabpanel"
              aria-labelledby="teacher-help-tab-helpdesk"
              className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4"
            >
              <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
                No support inbox is connected. Prepare and copy your query here, then share it with your school administrator. Avoid including sensitive student information.
              </p>
              <form onSubmit={prepareQuery} className="space-y-3">
                <div>
                  <label htmlFor="teacher-help-subject" className="mb-1 block text-xs font-bold text-slate-700">Subject</label>
                  <input
                    id="teacher-help-subject"
                    required
                    maxLength={120}
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="What do you need help with?"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label htmlFor="teacher-help-details" className="mb-1 block text-xs font-bold text-slate-700">Query details</label>
                  <textarea
                    id="teacher-help-details"
                    required
                    maxLength={2000}
                    rows={4}
                    value={details}
                    onChange={(event) => setDetails(event.target.value)}
                    placeholder="Describe the issue or question..."
                    className="w-full resize-y rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-800"
                >
                  Prepare query
                </button>
              </form>
              {preparedQuery && (
                <div className="mt-4">
                  <label htmlFor="teacher-help-prepared-query" className="mb-1 block text-xs font-bold text-slate-700">Your query (not sent)</label>
                  <textarea
                    id="teacher-help-prepared-query"
                    readOnly
                    rows={5}
                    value={preparedQuery}
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700"
                  />
                  <button
                    type="button"
                    onClick={copyQuery}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 px-4 py-2.5 text-sm font-bold text-indigo-800 transition hover:bg-indigo-50"
                  >
                    <FaCopy aria-hidden="true" />
                    Copy query
                  </button>
                  {copyStatus && <p role="status" className="mt-2 text-xs leading-relaxed text-slate-600">{copyStatus}</p>}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? 'Close help assistant' : 'Open help assistant'}
        aria-expanded={open}
        className="ml-auto flex cursor-pointer h-18 w-18 items-center justify-center rounded-full bg-gradient-to-br from-indigo-700 to-violet-700 text-white shadow-lg shadow-indigo-900/30 transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        {open ? <FaTimes aria-hidden="true" /> : <FaComments className="text-xl" aria-hidden="true" />}
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */

const MobileSectionHeader = ({ emoji, title, accentFrom }) => (
  <div className="flex items-center gap-2 mt-7 mb-3 pl-0.5">
    <span className="text-xl">{emoji}</span>
    <span className="text-base font-black text-indigo-950 tracking-tight">{title}</span>
    <div className={`flex-1 h-0.5 rounded-full bg-gradient-to-r from-${accentFrom}-400/30 to-transparent`} />
  </div>
);

const TeacherDashboardUpdates = () => {
  const [notifications, setNotifications] = React.useState([
    { id: 1, title: 'Staff meeting', message: 'Staff meeting today at 2:00 PM in the conference hall.', time: 'Today · 9:15 AM' },
    { id: 2, title: 'Homework reminder', message: 'Please remind students to bring their completed assignments.', time: 'Yesterday' }
  ]);
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [audience, setAudience] = React.useState('All students');
  const [status, setStatus] = React.useState('');
  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const addPreviewNotification = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedMessage = message.trim();
    if (!trimmedTitle || !trimmedMessage) return;

    setNotifications((current) => [
      { id: Date.now(), title: trimmedTitle, message: `${audience}: ${trimmedMessage}`, time: 'Just now' },
      ...current
    ]);
    setTitle('');
    setMessage('');
    setStatus('Preview added to this dashboard only. It was not sent to students.');
  };

  return (
    <section aria-label="Today's updates" className="mb-7 grid gap-4 lg:grid-cols-3">
      <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Today · {today}</p>
            <h2 className="mt-1 text-lg font-black text-slate-900">Teacher attendance</h2>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <FaCheckCircle aria-hidden="true" />
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-xl bg-emerald-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <div>
            <p className="text-sm font-bold text-emerald-900">Present today</p>
            <p className="mt-0.5 text-xs text-emerald-800/70">Sample status · not synced</p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate-500">This is a frontend preview; attendance is not recorded or submitted.</p>
      </article>

      <article id="dashboard-notifications" className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Updates</p>
            <h2 className="mt-1 text-lg font-black text-slate-900">Notifications</h2>
          </div>
          <FaBell className="text-amber-500" aria-hidden="true" />
        </div>
        <div className="max-h-48 space-y-3 overflow-y-auto pr-1">
          {notifications.map((notification) => (
            <div key={notification.id} className="border-l-2 border-amber-300 pl-3">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-bold text-slate-800">{notification.title}</p>
                <span className="shrink-0 text-[10px] text-slate-400">{notification.time}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{notification.message}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-slate-400">Demo notifications shown locally on this page.</p>
      </article>

      <article className="rounded-2xl border border-indigo-100 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-500">Frontend preview only</p>
          <h2 className="mt-1 text-lg font-black text-slate-900">Send student notification</h2>
        </div>
        <form onSubmit={addPreviewNotification} className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">Send to</span>
            <select
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            >
              <option>All students</option>
              <option>Nursery</option>
              <option>Class 9</option>
              <option>Class 8</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">Title</span>
            <input
              required
              maxLength={80}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Notification title"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-600">Message</span>
            <textarea
              required
              maxLength={300}
              rows={2}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a short message..."
              className="w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </label>
          <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-800">
            <FaPaperPlane aria-hidden="true" />
            Add preview notification
          </button>
          {status && <p role="status" className="text-xs leading-relaxed text-emerald-700">{status}</p>}
        </form>
      </article>
    </section>
  );
};

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

export default TeacherHomePage;
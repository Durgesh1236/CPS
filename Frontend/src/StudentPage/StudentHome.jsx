import React, { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaBell,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaClipboardList,
  FaCommentDots,
  FaFileAlt,
  FaHistory,
  FaQuestionCircle,
  FaRupeeSign,
  FaUserGraduate,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LayoutStu from '../Components/LayoutStu';
import { StudentData } from '../context/Student';

/* ---------- data ---------- */

// tone = [icon colour, tile background, border/hover ring]
const TONES = {
  indigo: ['text-indigo-600', 'bg-indigo-50', 'ring-indigo-200'],
  sky: ['text-sky-600', 'bg-sky-50', 'ring-sky-200'],
  emerald: ['text-emerald-600', 'bg-emerald-50', 'ring-emerald-200'],
  rose: ['text-rose-600', 'bg-rose-50', 'ring-rose-200'],
  amber: ['text-amber-600', 'bg-amber-50', 'ring-amber-200'],
  violet: ['text-violet-600', 'bg-violet-50', 'ring-violet-200'],
};

const SECTIONS = [
  {
    title: 'Academics',
    hint: 'Daily school work',
    items: [
      { label: 'Attendance', detail: 'Check your daily record', icon: FaClipboardList, route: '/student-attendance', tone: 'indigo' },
      { label: 'Timetable', detail: 'Plan your school day', icon: FaCalendarAlt, tone: 'sky' },
      { label: 'Results', detail: 'Review your progress', icon: FaCheckCircle, route: '/student-result', tone: 'emerald' },
      { label: 'Student test', detail: 'Take an assigned test', icon: FaQuestionCircle, route: '/student-test', tone: 'violet' },
    ],
  },
  {
    title: 'Fees',
    hint: 'Dues and receipts',
    items: [
      { label: 'Pay fees', detail: 'View current dues', icon: FaRupeeSign, route: '/fee-submit', tone: 'emerald' },
      { label: 'Fee history', detail: 'See previous receipts', icon: FaHistory, route: '/student-fee-receipt', tone: 'amber' },
    ],
  },
  {
    title: 'School',
    hint: 'Updates and forms',
    items: [
      { label: 'Notifications', detail: 'Important school updates', icon: FaBell, tone: 'rose' },
      { label: 'Registration', detail: 'Forms and applications', icon: FaFileAlt, tone: 'sky' },
    ],
  },
];

const QUICK = ['Attendance', 'Student test', 'Pay fees', 'Fee history'];
const ALL_ITEMS = SECTIONS.flatMap((s) => s.items);

/* ---------- component ---------- */

const StudentHomePage = () => {
  const navigate = useNavigate();
  const { studentData } = StudentData();
  const [toast, setToast] = useState('');

  const name = studentData?.studentName || 'Student';
  const firstName = name.trim().split(/\s+/)[0];
  const ledgerId = studentData?.ledgerId || 'Student ID';
  const studentClass = studentData?.studentClass || 'Not assigned';
  const initial = firstName.charAt(0).toUpperCase();

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const open = (item) => {
    if (item.route) navigate(item.route);
    else setToast(`${item.label} is coming soon`);
  };

  const quickItems = QUICK.map((l) => ALL_ITEMS.find((i) => i.label === l));

  return (
    <LayoutStu>
      <main className="mt-15 bg-[#F1F4FA] pb-14 text-slate-900 antialiased">
        {/* =====================================================
            MOBILE  (below md): app-style, single column
        ===================================================== */}
        <div className="md:hidden">
          {/* profile header */}
          

          {/* floating ID card */}
          <section className="mt-20 px-4">
            <div className="rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(27,37,89,0.12)]">
              <div className="mb-3 rounded-xl bg-[#F5F7FF] p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Student name</p>
                <p className="mt-1 text-base font-extrabold text-[#1B2559]">{name}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="min-w-0 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Student ID</p>
                  <p className="mt-0.5 break-all font-mono text-sm font-bold">CPS / {ledgerId}</p>
                </div>
                <div className="min-w-0 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Class</p>
                  <p className="mt-0.5 break-words text-sm font-bold">{studentClass}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/student-profile')}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1B2559] py-3 text-sm font-bold text-white active:scale-[0.98]"
              >
                View profile <FaArrowRight className="text-xs" />
              </button>
            </div>
          </section>

          {/* quick access: horizontal swipe */}
          <section className="mt-6">
            <h2 className="mb-3 px-5 text-base font-extrabold">Quick access</h2>
            <div className="flex snap-x gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {quickItems.map((item) => {
                const [text, bg] = TONES[item.tone];
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => open(item)}
                    className="flex w-[104px] shrink-0 snap-start flex-col items-center gap-2 rounded-2xl bg-white px-2 py-4 shadow-sm active:scale-95"
                  >
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ${text}`}>
                      <Icon className="text-xl" />
                    </span>
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* grouped lists */}
          <div className="mt-6 space-y-6 px-4">
            {SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="mb-2 px-1 text-base font-extrabold">{section.title}</h2>
                <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white shadow-sm">
                  {section.items.map((item) => {
                    const [text, bg] = TONES[item.tone];
                    const Icon = item.icon;
                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => open(item)}
                          className="flex w-full items-center gap-3 p-3.5 text-left active:bg-slate-50"
                        >
                          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} ${text}`}>
                            <Icon />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-bold">{item.label}</span>
                            <span className="block truncate text-xs text-slate-500">{item.detail}</span>
                          </span>
                          <FaChevronRight className="text-xs text-slate-300" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}

            <button
              type="button"
              onClick={() => setToast('Feedback is coming soon')}
              className="flex w-full items-center gap-3 rounded-2xl bg-[#1B2559] p-4 text-left text-white active:scale-[0.99]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <FaCommentDots />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-bold">Share your feedback</span>
                <span className="block text-xs text-white/60">Help us improve the portal</span>
              </span>
              <FaArrowRight className="text-sm text-[#FFC93C]" />
            </button>
          </div>
        </div>

        {/* =====================================================
            TABLET + LAPTOP (md and up): profile rail + service grid
        ===================================================== */}
        <div className="mx-auto hidden w-full gap-6 px-6 pt-8 md:grid md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] lg:gap-8 lg:px-10">
          {/* left rail */}
          <aside className="space-y-5 md:sticky md:top-24 md:self-start">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-[#1B2559] to-[#2B3490] text-white shadow-[0_20px_50px_rgba(27,37,89,0.25)]">
              <div className="relative p-6 text-center">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-[#FFC93C]" />
                <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFC93C] text-[#1B2559] lg:h-24 lg:w-24">
                  <FaUserGraduate className="text-4xl lg:text-5xl" />
                </span>
                <h2 className="mt-4 text-xl font-extrabold leading-tight">{name}</h2>
                <p className="mt-1 font-mono text-sm text-white/60">CPS / {ledgerId}</p>
              </div>
              <dl className="grid grid-cols-2 border-t border-white/10 text-center">
                <div className="border-r border-white/10 p-4">
                  <dt className="text-xs text-white/50">Class</dt>
                  <dd className="mt-1 font-bold">{studentClass}</dd>
                </div>
                <div className="p-4">
                  <dt className="text-xs text-white/50">Status</dt>
                  <dd className="mt-1 font-bold text-[#FFC93C]">Active</dd>
                </div>
              </dl>
              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => navigate('/student-profile')}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-[#1B2559] transition hover:bg-[#FFC93C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC93C]"
                >
                  View profile <FaArrowRight className="text-xs" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setToast('Feedback is coming soon')}
              className="group flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-md"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FaCommentDots />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-bold">Share your feedback</span>
                <span className="block text-xs text-slate-500">Help us improve the portal</span>
              </span>
              <FaChevronRight className="text-xs text-slate-300 transition group-hover:translate-x-1" />
            </button>
          </aside>

          {/* main column */}
          <div className="min-w-0 space-y-8">
            <header className="flex flex-col gap-1">
              <h1 className="text-3xl font-black tracking-tight lg:text-4xl">Welcome back, {firstName}</h1>
              <p className="text-slate-500">Everything for your school day, in one place.</p>
            </header>

            {/* quick access */}
            <section>
              <h2 className="mb-3 text-lg font-extrabold">Quick access</h2>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {quickItems.map((item) => {
                  const [text, bg] = TONES[item.tone];
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => open(item)}
                      className="group flex items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-indigo-500"
                    >
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${text}`}>
                        <Icon className="text-lg" />
                      </span>
                      <span className="text-sm font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* all services */}
            {SECTIONS.map((section) => (
              <section key={section.title}>
                <div className="mb-3 flex items-baseline gap-3">
                  <h2 className="text-lg font-extrabold">{section.title}</h2>
                  <span className="text-sm text-slate-400">{section.hint}</span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {section.items.map((item) => {
                    const [text, bg, ring] = TONES[item.tone];
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => open(item)}
                        className={`group relative flex min-h-[140px] flex-col justify-between rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-2 focus-visible:outline-2 focus-visible:outline-indigo-500 ${ring}`}
                      >
                        <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${text}`}>
                          <Icon className="text-xl" />
                        </span>
                        <span>
                          <span className="block font-extrabold">{item.label}</span>
                          <span className="mt-0.5 block text-sm text-slate-500">{item.detail}</span>
                        </span>
                        <FaArrowRight className={`absolute right-5 top-5 text-sm opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 ${text}`} />
                      </button>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* toast (replaces alert) */}
        <div
          role="status"
          aria-live="polite"
          className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 transition-all duration-300 ${
            toast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <span className="rounded-full bg-[#1B2559] px-5 py-3 text-sm font-semibold text-white shadow-xl">{toast}</span>
        </div>
      </main>
    </LayoutStu>
  );
};

export default StudentHomePage;
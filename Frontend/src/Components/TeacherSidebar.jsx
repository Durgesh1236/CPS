import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaRupeeSign, FaTimes, FaUserGraduate } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { GiTeacher } from 'react-icons/gi';
import { UserData } from '../context/User';

const TeacherSidebar = ({ onClose }) => {
  const [moduleSearch, setModuleSearch] = React.useState('');
  const [expandedGroup, setExpandedGroup] = React.useState('');
  const navigate = useNavigate();
  const { user } = UserData();
  const isAdmin = user.role === 'admin';
  const isAdminOrAcc = isAdmin || user.role === 'accountent';
  const groups = [
    {
      id: 'student-data',
      title: 'Student Data',
      icon: FaUserGraduate,
      visible: isAdminOrAcc,
      links: [
        ['Fees Submit', '/student-fee-submit'], ['Fees History', '/student-fee-history'],
        ['Attendance', '/take-student-attendence'], ['Student Data Input', '/student-data-input'],
        ['Search Student', '/student-data'], ['Registration', '/student-register', isAdmin],
        ['Book Sale', '/book-sale-data'], ['Book Sale History', '/book-sale-history'],
        ['Book Price Form', '/book-form', isAdmin], ['Book Price', '/book-price'],
        ['Timetable', '/set-timetable'], ['Student Test', '/set-student-test'],
        ['Student Results', '/student-result-submission'], ['Test Results', '/student-test-results'],
        ['Question View', '/question-history'], ['School Photos', '/school-photo-upload']
      ]
    },
    {
      id: 'teacher-data',
      title: 'Teacher Data',
      icon: GiTeacher,
      visible: isAdminOrAcc,
      links: [
        ['Teacher Attendance', '/teacher-attendance'],
        ['Attendance History', '/teacher-attendance-history'],
        ['Teacher Payment', '/teacher-payment'],
        ['Teacher Registration', '/teacher-registration', isAdmin],
        ['Teacher Data', '/teacher-data', isAdmin],
        ['Question Paper', '/set-student-question-paper']
      ]
    },
    {
      id: 'spend-data',
      title: 'Spend Data',
      icon: FaRupeeSign,
      visible: isAdminOrAcc,
      links: [['Spend', '/total-spend'], ['Spend History', '/spend-history']]
    }
  ];
  const normalizedQuery = moduleSearch.trim().toLowerCase();
  const navigateTo = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close dashboard sidebar"
        onClick={onClose}
        className="fixed inset-x-0 bottom-0 top-[72px] z-[40] cursor-default bg-slate-950/35"
      />
      <aside className="fixed bottom-0 left-0 top-[72px] z-[45] flex w-[min(20rem,86vw)] flex-col border-r border-indigo-950/20 bg-gradient-to-b from-[#11133b] via-[#1e1b4b] to-[#312e81] p-5 text-white shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-300">Teacher workspace</p>
            <h2 className="mt-1 text-lg font-black tracking-tight text-white">Dashboard menu</h2>
            <p className="mt-1 text-xs leading-relaxed text-indigo-100/70">Choose a data group to view its pages.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close dashboard sidebar" className="cursor-pointer rounded-lg p-2 text-indigo-100 transition hover:bg-white/10 md:hidden">
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <label htmlFor="teacher-sidebar-search" className="sr-only">Search dashboard shortcuts</label>
        <div className="relative mb-5">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
          <input
            id="teacher-sidebar-search"
            type="search"
            value={moduleSearch}
            onChange={(event) => setModuleSearch(event.target.value)}
            placeholder="Search shortcuts..."
            className="w-full rounded-xl border border-white/15 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-4 focus:ring-cyan-300/20"
          />
        </div>

        <nav aria-label="Dashboard sections" className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => navigateTo('/teacher-home')}
            className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-3 py-3 text-left text-sm font-semibold text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-cyan-300"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-300/15 text-cyan-200">⌂</span>
            Overview
          </button>
          {groups.filter((group) => group.visible).map((group) => {
            const Icon = group.icon;
            const filteredLinks = group.links.filter(([label, , allowed = true]) =>
              allowed && label.toLowerCase().includes(normalizedQuery)
            );
            if (normalizedQuery && !filteredLinks.length) return null;
            const expanded = expandedGroup === group.id || Boolean(normalizedQuery);

            return (
              <div key={group.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setExpandedGroup(expanded ? '' : group.id)}
                  className="flex w-full cursor-pointer items-center gap-3 px-3 py-3 text-left text-sm font-bold text-indigo-50 transition hover:bg-white/10"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-300/15 text-cyan-200"><Icon aria-hidden="true" /></span>
                  <span className="flex-1">{group.title}</span>
                  <FaChevronDown className={`text-xs text-indigo-200 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {expanded && (
                  <div className="space-y-1 border-t border-white/10 bg-black/10 p-2">
                    {filteredLinks.map(([label, path]) => (
                      <button
                        key={`${label}-${path}`}
                        type="button"
                        onClick={() => navigateTo(path)}
                        className="w-full cursor-pointer rounded-lg px-3 py-2 text-left text-xs font-medium text-indigo-100/80 transition hover:bg-cyan-300/15 hover:text-white"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="mt-4 shrink-0 rounded-xl border border-cyan-200/15 bg-gradient-to-r from-cyan-300/10 to-violet-300/10 p-3">
          <p className="text-xs font-bold text-cyan-100">Quick tip</p>
          <p className="mt-1 text-[11px] leading-relaxed text-indigo-100/70">Search by tool name, such as “fees”, “attendance” or “results”.</p>
        </div>
        <div className="mt-4 shrink-0 border-t border-white/15 pt-4 text-center">
          <p className="text-base font-black tracking-wide">
            <span className="text-sky-300">Central</span>{' '}
            <span className="text-amber-300">Public</span>{' '}
            <span className="text-white">School</span>
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-200/60">Learning together</p>
        </div>
      </aside>
    </>
  );
};

export default TeacherSidebar;

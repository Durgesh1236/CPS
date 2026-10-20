import { useMemo, useState } from 'react'
import {
  FaArrowRight,
  FaBars,
  FaBell,
  FaBookOpen,
  FaCalendarCheck,
  FaChartLine,
  FaChevronDown,
  FaCircleCheck,
  FaClock,
  FaGraduationCap,
  FaMagnifyingGlass,
  FaMoneyBillWave,
  FaPlus,
  FaUserGraduate,
  FaUsers,
  FaXmark,
} from 'react-icons/fa6'

const navigation = [
  { label: 'Overview', icon: FaChartLine },
  { label: 'Students', icon: FaUserGraduate },
  { label: 'Attendance', icon: FaCalendarCheck },
  { label: 'Fees', icon: FaMoneyBillWave },
  { label: 'Examinations', icon: FaBookOpen },
  { label: 'Staff', icon: FaUsers },
]

const students = [
  { name: 'Aarav Kumar', id: 'CPS-2401', grade: 'Class 8-A', attendance: 'Present', fee: 'Paid', initials: 'AK', color: 'bg-violet-100 text-violet-700' },
  { name: 'Ananya Singh', id: 'CPS-2388', grade: 'Class 7-B', attendance: 'Present', fee: 'Pending', initials: 'AS', color: 'bg-rose-100 text-rose-700' },
  { name: 'Vivaan Sharma', id: 'CPS-2362', grade: 'Class 6-A', attendance: 'Absent', fee: 'Paid', initials: 'VS', color: 'bg-amber-100 text-amber-700' },
  { name: 'Diya Kumari', id: 'CPS-2327', grade: 'Class 5-C', attendance: 'Present', fee: 'Paid', initials: 'DK', color: 'bg-sky-100 text-sky-700' },
  { name: 'Aditya Jha', id: 'CPS-2294', grade: 'Class 4-A', attendance: 'Present', fee: 'Pending', initials: 'AJ', color: 'bg-emerald-100 text-emerald-700' },
]

const cardData = [
  { title: 'Total students', value: '1,248', change: '+8.2%', icon: FaUserGraduate, style: 'bg-blue-50 text-blue-700' },
  { title: 'Present today', value: '1,186', change: '95.0%', icon: FaCalendarCheck, style: 'bg-emerald-50 text-emerald-700' },
  { title: 'Fees collected', value: '₹8.4L', change: '+12.5%', icon: FaMoneyBillWave, style: 'bg-amber-50 text-amber-700' },
  { title: 'Teaching staff', value: '64', change: '4 departments', icon: FaUsers, style: 'bg-violet-50 text-violet-700' },
]

const activities = [
  { title: 'Fee payment received', detail: 'Aarav Kumar · Class 8-A', time: '10:42 AM', icon: FaMoneyBillWave, style: 'bg-emerald-50 text-emerald-700' },
  { title: 'Attendance recorded', detail: 'Class 6 · 38 students', time: '10:18 AM', icon: FaCalendarCheck, style: 'bg-blue-50 text-blue-700' },
  { title: 'New student enrolled', detail: 'Meera Das · Class 3-B', time: '09:56 AM', icon: FaUserGraduate, style: 'bg-violet-50 text-violet-700' },
]

function DemoPage() {
  const [activePage, setActivePage] = useState('Overview')
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const filteredStudents = useMemo(
    () => students.filter((student) =>
      `${student.name} ${student.id} ${student.grade}`.toLowerCase().includes(search.toLowerCase()),
    ),
    [search],
  )

  const showDemoNotice = (action) => {
    setNotice(`${action} is a preview action. No information is saved or sent.`)
    window.setTimeout(() => setNotice(''), 3500)
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] font-sans text-slate-800">
      <div className="flex min-h-screen">
        {menuOpen && (
          <button
            className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          />
        )}
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-white">
              <FaGraduationCap size={21} />
            </div>
            <div>
              <p className="font-bold tracking-tight text-slate-900">SchoolDesk</p>
              <p className="text-xs text-slate-500">School management</p>
            </div>
            <button className="ml-auto text-slate-400 lg:hidden" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <FaXmark />
            </button>
          </div>

          <div className="px-4 pt-6">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <FaGraduationCap />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">Central Public School</p>
                <p className="text-xs text-slate-500">2026–27 session</p>
              </div>
              <FaChevronDown className="text-xs text-slate-400" />
            </div>
          </div>

          <nav className="mt-7 flex-1 px-4" aria-label="Demo dashboard">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Management</p>
            <div className="mt-3 space-y-1">
              {navigation.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  onClick={() => { setActivePage(label); setMenuOpen(false) }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${activePage === label ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  <Icon className="w-4" />
                  {label}
                  {label === 'Fees' && <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">12</span>}
                </button>
              ))}
            </div>
          </nav>

          <div className="m-4 rounded-xl bg-slate-900 p-4 text-white">
            <p className="text-sm font-semibold">Your school, in sync.</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">Keep students, staff, attendance and fees organized in one place.</p>
            <button onClick={() => showDemoNotice('Contacting the team')} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-blue-300 hover:text-white">
              Talk to our team <FaArrowRight />
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8">
            <div className="flex items-center gap-3">
              <button className="text-slate-600 lg:hidden" aria-label="Open navigation menu" onClick={() => setMenuOpen(true)}>
                <FaBars />
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-900">{activePage}</h1>
                <p className="hidden text-xs text-slate-500 sm:block">Central Public School <span className="mx-1">/</span> {activePage}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="hidden rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800 sm:inline-flex">DEMO · SAMPLE DATA</span>
              <button className="relative text-slate-500" aria-label="Notifications">
                <FaBell />
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>
              <div className="flex items-center gap-2 border-l border-slate-200 pl-3 sm:pl-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-800">AD</div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">School Admin</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
                <FaChevronDown className="hidden text-xs text-slate-400 sm:block" />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1440px] p-4 sm:p-8">
            <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm text-slate-500">Tuesday, 20 October 2026</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Good morning, Admin <span aria-hidden="true">👋</span></h2>
                <p className="mt-1 text-sm text-slate-500">Here&apos;s what&apos;s happening at your school today.</p>
              </div>
              <button onClick={() => showDemoNotice('Adding a student')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800">
                <FaPlus /> Add student
              </button>
            </div>

            <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-900">
              <FaCircleCheck className="mt-0.5 shrink-0 text-blue-700" />
              <p><span className="font-semibold">Safe interactive preview.</span> This demo uses fictional sample data. Buttons and changes are simulated locally and never reach your school database.</p>
            </div>

            {activePage === 'Overview' ? (
              <>
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="School overview">
                  {cardData.map(({ title, value, change, icon: Icon, style }) => (
                    <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${style}`}><Icon /></span>
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">{change}</span>
                      </div>
                      <p className="mt-4 text-sm text-slate-500">{title}</p>
                      <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">{value}</p>
                    </article>
                  ))}
                </section>

                <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
                  <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900">Attendance overview</h3>
                        <p className="mt-1 text-xs text-slate-500">Student attendance this week</p>
                      </div>
                      <button onClick={() => setActivePage('Attendance')} className="text-sm font-semibold text-blue-700 hover:text-blue-900">View attendance</button>
                    </div>
                    <div className="mt-7 flex h-48 items-end justify-around gap-3 border-b border-slate-100 px-2">
                      {[
                        { day: 'Mon', value: 82 },
                        { day: 'Tue', value: 94 },
                        { day: 'Wed', value: 88 },
                        { day: 'Thu', value: 97 },
                        { day: 'Fri', value: 91 },
                        { day: 'Sat', value: 72 },
                      ].map(({ day, value }) => (
                        <div key={day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                          <span className="text-[10px] font-medium text-slate-500">{value}%</span>
                          <div className="w-full max-w-12 rounded-t-md bg-blue-600 transition hover:bg-blue-700" style={{ height: `${value}%` }} />
                          <span className="pb-2 text-xs text-slate-500">{day}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500"><span className="h-2.5 w-2.5 rounded-sm bg-blue-600" /> Attendance rate</div>
                  </article>

                  <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900">Recent activity</h3>
                        <p className="mt-1 text-xs text-slate-500">Latest school updates</p>
                      </div>
                      <FaClock className="text-slate-400" />
                    </div>
                    <div className="mt-5 divide-y divide-slate-100">
                      {activities.map(({ title, detail, time, icon: Icon, style }) => (
                        <div key={title} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style}`}><Icon className="text-sm" /></span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-800">{title}</p>
                            <p className="mt-0.5 truncate text-xs text-slate-500">{detail}</p>
                          </div>
                          <span className="whitespace-nowrap text-[10px] text-slate-400">{time}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                </section>

                <StudentTable
                  filteredStudents={students}
                  search={search}
                  setSearch={setSearch}
                  onViewAll={() => setActivePage('Students')}
                />
              </>
            ) : activePage === 'Students' ? (
              <StudentTable filteredStudents={filteredStudents} search={search} setSearch={setSearch} onViewAll={() => showDemoNotice('Exporting the student list')} />
            ) : (
              <section className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><FaGraduationCap size={24} /></span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{activePage} workspace</h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">Explore how {activePage.toLowerCase()} management fits into one connected school dashboard. This preview contains fictional sample information only.</p>
                <button onClick={() => showDemoNotice(`Opening ${activePage.toLowerCase()} details`)} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">
                  Explore {activePage.toLowerCase()} <FaArrowRight />
                </button>
              </section>
            )}
          </div>
        </main>
      </div>

      {notice && (
        <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-3 text-center text-sm text-white shadow-lg">
          {notice}
        </div>
      )}
    </div>
  )
}

function StudentTable({ filteredStudents, search, setSearch, onViewAll }) {
  return (
    <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-bold text-slate-900">Student directory</h3>
          <p className="mt-1 text-xs text-slate-500">Recent student records · sample data</p>
        </div>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
          <FaMagnifyingGlass className="text-xs text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search students..."
            aria-label="Search students"
            className="w-full text-sm outline-none sm:w-48"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Student</th>
              <th className="px-5 py-3 font-semibold">Student ID</th>
              <th className="px-5 py-3 font-semibold">Class</th>
              <th className="px-5 py-3 font-semibold">Attendance</th>
              <th className="px-5 py-3 font-semibold">Fee status</th>
              <th className="px-5 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length ? filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50/70">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${student.color}`}>{student.initials}</span>
                    <span className="font-semibold text-slate-800">{student.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-slate-500">{student.id}</td>
                <td className="px-5 py-3.5 text-slate-600">{student.grade}</td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${student.attendance === 'Present' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>{student.attendance}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${student.fee === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>{student.fee}</span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button onClick={onViewAll} className="text-xs font-semibold text-blue-700 hover:text-blue-900">View</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" className="px-5 py-10 text-center text-sm text-slate-500">No sample students match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
        Showing {filteredStudents.length} fictional student records
        <button onClick={onViewAll} className="font-semibold text-blue-700 hover:text-blue-900">View all students</button>
      </div>
    </section>
  )
}

export default DemoPage

import { useEffect, useMemo, useState } from "react";
import { FaCalendarAlt, FaChevronLeft, FaClipboardCheck, FaFilter, FaRedo, FaSearch, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";

const getToday = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
};

const formatDate = (date) => new Date(date).toLocaleDateString(undefined, {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const formatTime = (date) => date
  ? new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  : "-";

const statusStyles = {
  present: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  absent: "bg-rose-100 text-rose-700 ring-rose-200",
  late: "bg-amber-100 text-amber-700 ring-amber-200",
};

const TeacherAttendanceHistory = () => {
  const navigate = useNavigate();
  const { user, teacherAttendanceRecords, getTeacherAttendance, teacherAttendanceLoading } = UserData();
  const isAdmin = user?.role === "admin";
  const records = teacherAttendanceRecords;
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const loading = teacherAttendanceLoading;

  const loadAttendance = async (date = selectedDate) => {
    await getTeacherAttendance(date);
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return records.filter((record) => {
      const name = record.teacherId?.name?.toLowerCase() || "";
      const email = record.teacherId?.email?.toLowerCase() || "";
      const matchesSearch = !query || name.includes(query) || email.includes(query);
      const matchesStatus = statusFilter === "all" || record.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  const totals = useMemo(() => ({
    total: filteredRecords.length,
    present: filteredRecords.filter((record) => record.status === "present").length,
    late: filteredRecords.filter((record) => record.status === "late").length,
    absent: filteredRecords.filter((record) => record.status === "absent").length,
  }), [filteredRecords]);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    loadAttendance(date);
  };

  const clearDate = () => {
    setSelectedDate("");
    loadAttendance("");
  };

  return (
    <TeacherLayout>
      <main className="min-h-screen bg-[#f4f7fb] px-3 pb-12 pt-24 sm:px-6">
        <div className="mx-auto w-full">
          <button
            type="button"
            onClick={() => navigate("/teacher-attendance")}
            className="mb-4 inline-flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-500 transition hover:text-indigo-700"
          >
            <FaChevronLeft /> Back to attendance marking
          </button>

          <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-5 py-7 text-white shadow-xl sm:px-8 sm:py-9">
            <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[24px] border-indigo-500/20" />
            <div className="absolute -bottom-24 right-24 h-48 w-48 rounded-full border-[18px] border-cyan-400/10" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                  <FaClipboardCheck /> Attendance records
                </p>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Teacher attendance history</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                  {isAdmin
                    ? "Review every teacher record by date, see marked times, and quickly find any teacher."
                    : "Review your attendance by date and see exactly when it was marked."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => loadAttendance()}
                className="inline-flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white ring-1 ring-white/20 transition hover:bg-white/20"
              >
                <FaRedo /> Refresh records
              </button>
            </div>
          </section>

          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
              <label className="flex-1 text-sm font-bold text-slate-700">
                Attendance date
                <span className="relative mt-2 block">
                  <FaCalendarAlt className="pointer-events-none absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-full rounded-xl cursor-pointer border border-slate-300 px-4 py-3 pl-10 font-normal text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </span>
              </label>
              <label className="flex-1 text-sm font-bold text-slate-700">
                Status
                <span className="relative mt-2 block">
                  <FaFilter className="pointer-events-none absolute left-3 top-3.5 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="w-full appearance-none rounded-xl cursor-pointer border border-slate-300 bg-white px-4 py-3 pl-10 font-normal text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="all">All statuses</option>
                    <option value="present">Present</option>
                    <option value="late">Late</option>
                    <option value="absent">Absent</option>
                  </select>
                </span>
              </label>
              {isAdmin && <label className="flex-[1.4] text-sm font-bold text-slate-700">
                Search teacher
                <span className="relative mt-2 block">
                  <FaSearch className="pointer-events-none absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Name or email"
                    className="w-full rounded-xl cursor-pointer border border-slate-300 px-4 py-3 pl-10 font-normal text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </span>
              </label>}
              {isAdmin && <button
                type="button"
                onClick={clearDate}
                disabled={!selectedDate}
                className="rounded-xl cursor-pointer border border-slate-300 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Show all dates
              </button>}
            </div>
          </section>

          <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ["Records", totals.total, "bg-indigo-600", "text-indigo-100"],
              ["Present", totals.present, "bg-emerald-600", "text-emerald-100"],
              ["Late", totals.late, "bg-amber-500", "text-amber-100"],
              ["Absent", totals.absent, "bg-rose-600", "text-rose-100"],
            ].map(([label, value, background, muted]) => (
              <div key={label} className={`${background} rounded-2xl p-4 text-white shadow-sm sm:p-5`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${muted}`}>{label}</p>
                <p className="mt-2 text-3xl font-black">{value}</p>
              </div>
            ))}
          </section>

          <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-slate-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h2 className="text-lg font-black text-slate-900">Attendance log</h2>
                <p className="text-sm text-slate-500">{selectedDate ? `Showing ${formatDate(selectedDate)}` : "Showing all recorded dates"}</p>
              </div>
              <span className="text-sm font-semibold text-slate-400">{filteredRecords.length} matching record{filteredRecords.length === 1 ? "" : "s"}</span>
            </div>

            {loading ? (
              <div className="px-6 py-16 text-center text-sm font-semibold text-slate-500">Loading attendance records...</div>
            ) : filteredRecords.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <FaUserTie className="mx-auto text-4xl text-slate-300" />
                <p className="mt-4 font-bold text-slate-700">No attendance records found</p>
                <p className="mt-1 text-sm text-slate-500">Try another date, status, or search term.</p>
              </div>
            ) : (
              <>
                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[680px] text-left">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-6 py-4">Teacher</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Marked at</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRecords.map((record) => (
                        <tr key={record._id} className="border-t border-slate-100 transition hover:bg-indigo-50/40">
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-800">{record.teacherId?.name || "Unknown teacher"}</p>
                            <p className="text-xs text-slate-500">{record.teacherId?.email || "-"}</p>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600">{formatDate(record.date)}</td>
                          <td className="px-6 py-4 text-sm text-slate-600">{formatTime(record.markedAt || record.updatedAt)}</td>
                          <td className="px-6 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-black capitalize ring-1 ${statusStyles[record.status] || "bg-slate-100 text-slate-600 ring-slate-200"}`}>{record.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="divide-y divide-slate-100 md:hidden">
                  {filteredRecords.map((record) => (
                    <article key={record._id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700"><FaUserTie /></span>
                          <div className="min-w-0">
                            <p className="truncate font-bold text-slate-800">{record.teacherId?.name || "Unknown teacher"}</p>
                            <p className="truncate text-xs text-slate-500">{record.teacherId?.email || "-"}</p>
                          </div>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black capitalize ring-1 ${statusStyles[record.status] || "bg-slate-100 text-slate-600 ring-slate-200"}`}>{record.status}</span>
                      </div>
                      <div className="mt-4 flex justify-between text-xs font-semibold text-slate-500">
                        <span>{formatDate(record.date)}</span>
                        <span>Marked {formatTime(record.markedAt || record.updatedAt)}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </TeacherLayout>
  );
};

export default TeacherAttendanceHistory;

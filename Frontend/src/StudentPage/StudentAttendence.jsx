import { useEffect, useState } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaClipboardCheck, FaBook, FaTimesCircle } from 'react-icons/fa';
import LayoutStu from '../Components/LayoutStu';
import { StudentData } from '../context/Student';
import './StudentAttendence.css';

const StudentAttendence = () => {
  const { studentData, getStudentAttendance } = StudentData();
  const [attendance, setAttendance] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!studentData?.ledgerId || !selectedDate) return;

    const fetchAttendance = async () => {
      setLoading(true);
      setErrorMessage('');
      setAttendance(null);

      try {
        const result = await getStudentAttendance(studentData.ledgerId, selectedDate);
        setAttendance(result);
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Unable to load attendance');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [selectedDate, studentData?.ledgerId]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const selectedAttendance = attendance;
  const subjects = selectedAttendance?.subjects || [];
  const presentCount = subjects.filter(subject => subject.status === 'present').length;
  const absentCount = subjects.length - presentCount;
  const formattedDate = new Date(`${selectedDate}T00:00:00`).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const statusContent = (status, compact = false) => {
    const isPresent = status === 'present';
    return (
      <span className={`inline-flex items-center gap-2 font-bold ${isPresent ? 'text-emerald-700' : 'text-rose-600'}`}>
        <span className={`flex items-center justify-center rounded-full ${compact ? 'h-9 w-9 text-sm' : 'h-8 w-8 text-xs'} ${isPresent ? 'bg-emerald-100' : 'bg-rose-100'}`}>
          {isPresent ? <FaCheckCircle /> : <FaTimesCircle />}
        </span>
        <span>{compact ? (isPresent ? 'P' : 'A') : (isPresent ? 'Present' : 'Absent')}</span>
      </span>
    );
  };

  return (
    <LayoutStu>
      <div className="min-h-screen bg-[#F7F4EC] px-3 pb-8 pt-20 sm:px-6 lg:px-5">
        <div className="mx-auto w-full">
          <section className="overflow-hidden rounded-3xl bg-[#182036] text-white shadow-[0_16px_40px_rgba(24,32,54,0.2)]">
            <div className="flex flex-col gap-6 p-5 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#F4A73C]/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#F4A73C]">
                  <FaClipboardCheck />
                  Daily record
                </div>
                <h1 className="text-2xl font-black tracking-tight sm:text-4xl">Student attendance</h1>
                <p className="mt-2 text-sm text-white/60">Check your subject-wise attendance for any previous date.</p>
              </div>

              <label className="flex w-full flex-col gap-2 text-xs font-bold uppercase tracking-wider text-white/60 lg:max-w-xs">
                Choose date
                <span className="relative">
                  <FaCalendarAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#F4A73C]" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    max={new Date().toISOString().slice(0, 10)}
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 pl-11 text-sm font-semibold normal-case tracking-normal text-white outline-none transition focus:border-[#F4A73C] focus:ring-2 focus:ring-[#F4A73C]/30"
                  />
                </span>
              </label>
            </div>
          </section>

          <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E7E0CF] bg-white p-4 shadow-sm sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8B8578]">Selected date</p>
              <p className="mt-2 text-sm font-bold text-[#2B2B2B] sm:text-base">{formattedDate}</p>
            </div>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Present</p>
              <p className="mt-2 text-2xl font-black text-emerald-800">{presentCount}</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 shadow-sm sm:col-span-1 sm:p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-700">Absent</p>
              <p className="mt-2 text-2xl font-black text-rose-800">{absentCount}</p>
            </div>
          </section>

          <section className="mt-4 rounded-3xl border border-[#E7E0CF] bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#F4A73C]">Subject record</p>
                <h2 className="mt-1 text-xl font-black text-[#2B2B2B] sm:text-2xl">Attendance details</h2>
              </div>
              <span className="rounded-full bg-[#FBF7EE] px-3 py-1.5 text-xs font-bold text-[#8B8578]">{subjects.length} subjects</span>
            </div>

            {loading ? (
              <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl bg-[#FBF7EE] text-center text-sm font-semibold text-[#8B8578]">
                <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#E7E0CF] border-t-[#F4A73C]" />
                Loading attendance...
              </div>
            ) : selectedAttendance ? (
              <>
                <div className="hidden overflow-hidden rounded-2xl border border-[#EEE8DA] md:block">
                  <table className="w-full text-left">
                    <thead className="bg-[#182036] text-xs uppercase tracking-wider text-white/70">
                      <tr>
                        <th className="px-5 py-4">Subject</th>
                        <th className="px-5 py-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, index) => (
                        <tr key={`${subject.subject}-${index}`} className="border-t border-[#EEE8DA] transition hover:bg-[#FBF7EE]">
                          <td className="px-5 py-4">
                            <span className="flex items-center gap-3 font-bold text-[#2B2B2B]">
                              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6F1FB] text-[#185FA5]"><FaBook /></span>
                              {subject.subject}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-right">{statusContent(subject.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-3 md:hidden">
                  {subjects.map((subject, index) => (
                    <div key={`${subject.subject}-${index}`} className="flex items-center justify-between gap-3 rounded-2xl border border-[#EEE8DA] bg-[#FBF7EE] p-3.5">
                      <span className="flex min-w-0 items-center gap-3 font-bold text-[#2B2B2B]">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F1FB] text-[#185FA5]"><FaBook /></span>
                        <span className="truncate">{subject.subject}</span>
                      </span>
                      {statusContent(subject.status, true)}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl bg-[#FBF7EE] px-5 text-center">
                <FaCalendarAlt className="text-3xl text-[#F4A73C]" />
                <p className="mt-3 font-bold text-[#2B2B2B]">{errorMessage || 'No attendance recorded for selected date'}</p>
                <p className="mt-1 text-sm text-[#8B8578]">Try selecting another date.</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </LayoutStu>
  );
};

export default StudentAttendence;
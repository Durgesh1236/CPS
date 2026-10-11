import { useMemo, useRef, useState } from "react";
import { FaUserTie, FaIdBadge, FaEnvelope } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/LayoutStu";
import { StudentData } from "../context/Student";

const resultDatabase = {
  '2025-2026': {
    firstTerm: { Math: 78, English: 82, Science: 75, Hindi: 80, Social: 77 },
    secondTerm: { Math: 85, English: 88, Science: 80, Hindi: 84, Social: 81 },
    finalTerm: { Math: 92, English: 90, Science: 89, Hindi: 91, Social: 88 },
  },
  '2026-2027': {
    firstTerm: { Math: 80, English: 84, Science: 79, Hindi: 86, Social: 82 },
    secondTerm: { Math: 88, English: 90, Science: 84, Hindi: 87, Social: 85 },
    finalTerm: { Math: 94, English: 92, Science: 91, Hindi: 93, Social: 90 },
  },
};

const examOptions = [
  { value: 'firstTerm', label: '1st Term' },
  { value: 'secondTerm', label: '2nd Term' },
  { value: 'finalTerm', label: 'Final Term' },
];

const yearOptions = ['2025-2026', '2026-2027'];

const getGrade = (score) => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};


const StudentProfile = () => {
  const navigate = useNavigate();
  const { studentData, StudentImage } = StudentData();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState('finalTerm');
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImage(file ? URL.createObjectURL(file) : null);
  };

  const handleUploadImage = (id) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    StudentImage(id, formData);
    setImageFile(null);
  };

  const handleCancelImage = () => {
    setImageFile(null);
  };

  const currentMarks = useMemo(() => {
    const marks = resultDatabase[selectedYear]?.[selectedTerm] || resultDatabase['2025-2026'].finalTerm;
    const subjects = Object.keys(marks);
    const total = subjects.reduce((sum, subject) => sum + marks[subject], 0);
    const maxMarks = subjects.length * 100;
    const percentage = (total / maxMarks) * 100;
    return { marks, subjects, total, maxMarks, percentage, average: total / subjects.length };
  }, [selectedTerm, selectedYear]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#f3f6fb] px-3 py-5 sm:px-4 lg:px-6">
        <div className="mx-auto max-w-6xl space-y-5">
          <div className="w-full rounded-[28px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-4 md:p-6">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/teacher-home')}
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-2xl font-extrabold shadow-xl hover:from-blue-600 hover:to-green-600 transition flex items-center gap-3 border-2 border-white text-lg drop-shadow-lg"
                style={{ zIndex: 10 }}
              >
                <FaArrowLeft className="text-xl" /> Back to Home
              </button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              <div className="flex flex-col items-center rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 md:p-6">
                <div className="relative mb-4 h-32 w-32 cursor-pointer group md:h-36 md:w-36" onClick={handleImageClick} title="Click to change profile image">
                  <img
                    src={image || "https://randomuser.me/api/portraits/men/32.jpg"}
                    alt="Student"
                    className="h-full w-full rounded-full border-4 border-blue-400 object-cover shadow-xl group-hover:opacity-80 transition"
                    style={{ cursor: "pointer" }}
                  />
                  <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
                  <span className="absolute bottom-2 right-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 px-3 py-1 text-[10px] font-bold text-white shadow-lg">Active</span>
                  <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 text-sm font-bold text-white opacity-0 transition group-hover:opacity-100">Click to change</span>
                </div>

                {imageFile && (
                  <div className="mb-4 flex w-full gap-3">
                    <button type="button" onClick={() => handleUploadImage(studentData?._id)} className="flex-1 rounded-xl bg-blue-500 px-3 py-2 text-sm font-bold text-white shadow-md transition hover:bg-blue-600">
                      Upload Image
                    </button>
                    <button type="button" onClick={handleCancelImage} className="rounded-xl bg-red-500 px-3 py-2 text-sm font-bold text-white shadow-md transition hover:bg-red-600">
                      Cancel
                    </button>
                  </div>
                )}

                <div className="w-full space-y-4">
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Student ID</p>
                    <p className="mt-1 text-base font-extrabold text-blue-900">{studentData?.ledgerId || 'N/A'}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Name</p>
                    <p className="mt-1 text-base font-extrabold text-slate-800">{studentData?.studentName || 'Student'}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.15em] text-slate-500">Class</p>
                    <p className="mt-1 text-base font-extrabold text-green-700">{studentData?.studentClass || 'Not assigned'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                      <FaIdBadge />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Profile details</p>
                      <h2 className="text-xl font-black text-slate-800">Student overview</h2>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-blue-700">
                        <FaIdBadge className="text-sm" />
                        <span className="text-sm font-bold">Student ID</span>
                      </div>
                      <p className="mt-2 text-lg font-black text-slate-800">{studentData?.ledgerId || 'N/A'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-green-700">
                        <FaEnvelope className="text-sm" />
                        <span className="text-sm font-bold">Class</span>
                      </div>
                      <p className="mt-2 text-lg font-black text-slate-800">{studentData?.studentClass || 'Not assigned'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                      <div className="flex items-center gap-2 text-gray-800">
                        <FaUserTie className="text-sm" />
                        <span className="text-sm font-bold">Full name</span>
                      </div>
                      <p className="mt-2 text-lg font-black text-slate-800">{studentData?.studentName || 'Student'}</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:p-5">
                  <div className="mb-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Result dashboard</p>
                    <h3 className="mt-2 text-2xl font-black text-slate-800">Check academic result</h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                      Student name
                      <input type="text" value={studentData?.studentName || 'Student'} readOnly className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none" />
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                      Select exam type
                      <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100">
                        {examOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </label>

                    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                      Academic year
                      <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100">
                        {yearOptions.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-5 flex justify-center md:justify-start">
                    <button type="submit" className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#1B2559] via-[#2B3490] to-[#4B4FE0] px-6 py-3 text-base font-bold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.01] active:scale-[0.99]">
                      View result
                    </button>
                  </div>
                </form>

                {isSubmitted && (
                  <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:p-5">
                    <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Academic report</p>
                        <h3 className="mt-2 text-2xl font-black text-slate-800">{studentData?.studentName || 'Student'}</h3>
                        <p className="mt-1 text-sm text-slate-500">{examOptions.find((item) => item.value === selectedTerm)?.label} • {selectedYear}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 sm:min-w-[220px]">
                        <div className="rounded-2xl bg-indigo-50 p-3 text-center">
                          <p className="text-xs uppercase tracking-wide text-indigo-500">Total</p>
                          <p className="mt-1 text-xl font-black text-indigo-700">{currentMarks.total}</p>
                        </div>
                        <div className="rounded-2xl bg-emerald-50 p-3 text-center">
                          <p className="text-xs uppercase tracking-wide text-emerald-500">Avg</p>
                          <p className="mt-1 text-xl font-black text-emerald-700">{currentMarks.average.toFixed(1)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-emerald-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Result</p>
                          <p className="mt-2 text-3xl font-black text-slate-800">{currentMarks.percentage.toFixed(1)}%</p>
                        </div>
                        <div className="rounded-xl bg-white px-3 py-2 text-right shadow-sm">
                          <p className="text-xs text-slate-500">Status</p>
                          <p className={`text-lg font-black ${currentMarks.percentage >= 40 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {currentMarks.percentage >= 40 ? 'Pass' : 'Fail'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 overflow-x-auto">
                      <table className="min-w-full overflow-hidden rounded-2xl border border-slate-200 text-left">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700">
                            <th className="px-4 py-3 text-sm font-bold">Subject</th>
                            <th className="px-4 py-3 text-sm font-bold">Marks</th>
                            <th className="px-4 py-3 text-sm font-bold">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentMarks.subjects.map((subject) => {
                            const value = currentMarks.marks[subject];
                            return (
                              <tr key={subject} className="border-t border-slate-200 hover:bg-slate-50">
                                <td className="px-4 py-3 font-semibold text-slate-700">{subject}</td>
                                <td className="px-4 py-3 font-bold text-indigo-700">{value}</td>
                                <td className="px-4 py-3">
                                  <span className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                                    {getGrade(value)}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;

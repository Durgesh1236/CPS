import React, { useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import LayoutStu from '../Components/LayoutStu';
import { assets } from '../assets/assets';

const student = {
  rollNumber: '2026001',
  ledgerId: 'L-2026001',
  className: 'Class 8-A',
  name: 'Aman Sharma',
  fatherName: 'Rajesh Sharma',
  motherName: 'Sunita Sharma',
  mobile: '9876543210',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
};

const resultDatabase = {
  '2025-2026': {
    firstTerm: {
      Math: 78,
      English: 82,
      Science: 75,
      Hindi: 80,
      Social: 77,
    },
    secondTerm: {
      Math: 85,
      English: 88,
      Science: 80,
      Hindi: 84,
      Social: 81,
    },
    finalTerm: {
      Math: 92,
      English: 90,
      Science: 89,
      Hindi: 91,
      Social: 88,
    },
  },
  '2026-2027': {
    firstTerm: {
      Math: 80,
      English: 84,
      Science: 79,
      Hindi: 86,
      Social: 82,
    },
    secondTerm: {
      Math: 88,
      English: 90,
      Science: 84,
      Hindi: 87,
      Social: 85,
    },
    finalTerm: {
      Math: 94,
      English: 92,
      Science: 91,
      Hindi: 93,
      Social: 90,
    },
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

export default function StudentResult() {
  const [selectedTerm, setSelectedTerm] = useState('finalTerm');
  const [selectedYear, setSelectedYear] = useState('2025-2026');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const schoolName = 'Central Public School';
    const termLabel = examOptions.find((item) => item.value === selectedTerm)?.label || 'Result';
    const logoX = 42;
    const logoY = 36;
    const logoW = 52;
    const logoH = 52;

    doc.setFillColor(27, 37, 89);
    doc.rect(0, 0, pageWidth, 88, 'F');

    try {
      doc.addImage(assets.logo, 'PNG', logoX, logoY, logoW, logoH);
    } catch (error) {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(logoX, logoY, logoW, logoH, 10, 10, 'F');
      doc.setTextColor(27, 37, 89);
      doc.setFontSize(14);
      doc.text('CPS', logoX + 12, logoY + 30);
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(schoolName, 110, 54);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Academic Result Marksheet', 110, 72);

    const contentX = 42;
    let contentY = 124;

    doc.setFillColor(243, 244, 246);
    doc.roundedRect(contentX, contentY - 12, pageWidth - 84, 128, 10, 10, 'F');

    doc.setTextColor(44, 62, 80);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Student Information', contentX + 16, contentY + 6);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    const infoLeft = [
      ['Student Name', student.name],
      ['Ledger ID', student.ledgerId],
      ['Class', student.className],
    ];

    const infoRight = [
      ['Term Exam', termLabel],
      ['Academic Year', selectedYear],
      ['Status', currentMarks.percentage >= 40 ? 'Pass' : 'Needs Improvement'],
    ];

    infoLeft.forEach(([label, value], index) => {
      const y = contentY + 22 + index * 18;
      doc.setTextColor(100, 116, 139);
      doc.text(`${label}:`, contentX + 16, y);
      doc.setTextColor(15, 23, 42);
      doc.text(String(value), contentX + 120, y);
    });

    infoRight.forEach(([label, value], index) => {
      const y = contentY + 22 + index * 18;
      doc.setTextColor(100, 116, 139);
      doc.text(`${label}:`, contentX + 290, y);
      doc.setTextColor(15, 23, 42);
      doc.text(String(value), contentX + 350, y);
    });

    contentY = 286;
    doc.setDrawColor(203, 213, 225);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(contentX, contentY, pageWidth - 84, 220, 10, 10, 'FD');

    doc.setTextColor(44, 62, 80);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Subject-wise Result', contentX + 18, contentY + 20);

    doc.setDrawColor(148, 163, 184);
    doc.line(contentX + 18, contentY + 30, pageWidth - 60, contentY + 30);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Subject', contentX + 22, contentY + 52);
    doc.text('Marks', contentX + 290, contentY + 52);
    doc.text('Grade', contentX + 360, contentY + 52);

    doc.setFont('helvetica', 'normal');
    currentMarks.subjects.forEach((subject, index) => {
      const value = currentMarks.marks[subject];
      const rowY = contentY + 74 + index * 20;
      doc.text(subject, contentX + 22, rowY);
      doc.text(String(value), contentX + 290, rowY);
      doc.text(getGrade(value), contentX + 360, rowY);
      doc.line(contentX + 18, rowY + 6, pageWidth - 60, rowY + 6);
    });

    const bottomY = contentY + 194;
    doc.setFont('helvetica', 'bold');
    doc.text('Overall Percentage', contentX + 22, bottomY);
    doc.setFont('helvetica', 'normal');
    doc.text(`${currentMarks.percentage.toFixed(1)}%`, contentX + 160, bottomY);
    doc.text('Result Status', contentX + 260, bottomY);
    doc.text(currentMarks.percentage >= 40 ? 'Pass' : 'Needs Improvement', contentX + 360, bottomY);

    doc.save(`${student.name.replace(/\s+/g, '_')}_${selectedYear}_${termLabel}_marksheet.pdf`);
  };

  return (
    <LayoutStu>
      <div className="bg-[radial-gradient(circle_at_top,_#eef4ff_0%,_#f8fafc_30%,_#eef2ff_100%)] px-1 py-6 sm:px-6 lg:px-2">
        <div className="mx-auto w-full mt-13">
          <div className="overflow-hidden rounded-[10px] bg-gradient-to-br from-[#1B2559] via-[#2B3490] to-[#4B4FE0] p-5 text-white shadow-[0_25px_80px_rgba(27,37,89,0.25)] sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={student.image}
                  alt="Student"
                  className="h-16 w-16 rounded-full border-4 border-white/30 object-cover shadow-lg sm:h-20 sm:w-20"
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">Student profile</p>
                  <h1 className="mt-1 text-2xl font-black sm:text-3xl">{student.name}</h1>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm sm:text-base">
                <div className="rounded-2xl bg-white/10 px-3 py-2 backdrop-blur-sm">
                    <p className="text-white/70">Ledger ID</p>
                    <p className="mt-1 font-bold">{student.ledgerId}</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <p className="text-white/70">Mobile</p>
                  <p className="mt-1 font-bold">{student.mobile}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 text-sm text-white/80 sm:mt-6">
            <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6"
          >
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">Result dashboard</p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-800">View your academic result</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Select exam type
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                >
                  {examOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Academic year
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 flex justify-center md:justify-start">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#1B2559] via-[#2B3490] to-[#4B4FE0] px-6 py-3 text-base font-bold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.01] active:scale-[0.99]"
              >
                View result
              </button>
            </div>
          </form>
            </div>
          </div>

          {/* <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6"
          >
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-600">Result dashboard</p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-800">View your academic result</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Select exam type
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                >
                  {examOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                Academic year
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                >
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-6 flex justify-center md:justify-start">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#1B2559] via-[#2B3490] to-[#4B4FE0] px-6 py-3 text-base font-bold text-white shadow-lg shadow-indigo-200 transition hover:scale-[1.01] active:scale-[0.99]"
              >
                View result
              </button>
            </div>
          </form> */}

          {isSubmitted && (
            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6">
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Academic report</p>
                  <h3 className="mt-2 text-2xl font-black text-slate-800">
                    {examOptions.find((item) => item.value === selectedTerm)?.label} • {selectedYear}
                  </h3>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
                    <div className="rounded-2xl bg-indigo-50 p-3 text-center">
                      <p className="text-xs uppercase tracking-wide text-indigo-500">Total</p>
                      <p className="mt-1 text-xl font-black text-indigo-700">{currentMarks.total}</p>
                    </div>
                    <div className="rounded-2xl bg-emerald-50 p-3 text-center">
                      <p className="text-xs uppercase tracking-wide text-emerald-500">Avg</p>
                      <p className="mt-1 text-xl font-black text-emerald-700">{currentMarks.average.toFixed(1)}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-200 transition hover:scale-[1.01] active:scale-[0.99]"
                  >
                    Download Marksheet PDF
                  </button>
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

              <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-indigo-50 to-violet-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Overall performance</p>
                  <p className="text-2xl font-black text-slate-800">{currentMarks.percentage.toFixed(1)}%</p>
                </div>

                <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <p className="text-sm text-slate-500">Status</p>
                  <p className={`mt-1 text-lg font-black ${currentMarks.percentage >= 40 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {currentMarks.percentage >= 40 ? 'Pass' : 'Needs Improvement'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutStu>
  );
}

import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaBook } from 'react-icons/fa';
import LayoutStu from '../Components/LayoutStu';
import './StudentAttendence.css';
const dummyAttendance = [
  { date: '2026-03-01', subjects: [
    { subject: 'Mathematics', status: 'present' },
    { subject: 'Science', status: 'absent' },
    { subject: 'English', status: 'present' },
  ] },
  { date: '2026-03-02', subjects: [
    { subject: 'Mathematics', status: 'present' },
    { subject: 'Science', status: 'present' },
    { subject: 'English', status: 'absent' },
  ] },
];

const StudentAttendence = () => {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    setAttendance(dummyAttendance);
    if (dummyAttendance.length > 0) {
      setSelectedDate(dummyAttendance[0].date);
    }
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const selectedAttendance = attendance.find(a => a.date === selectedDate);

  return (
    <LayoutStu>
    <div className="h-max-screen md:h-full lg:h-full mt-15 md:mt-0 lg:mt-0 bg-gray-100 p-2 sm:p-4 md:p-8 flex flex-col">
      <div className="w-full mx-auto bg-white rounded-3xl shadow-2xl p-4 sm:p-8 mt-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-3">
          <FaCalendarAlt className="text-blue-400" />Attendance
        </h2>
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
          <label className="font-semibold text-gray-700">Select Date:</label>
          <select
            className="rounded-xl border border-blue-200 px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none shadow w-full md:w-auto"
            value={selectedDate}
            onChange={handleDateChange}
          >
            {attendance.map(a => (
              <option key={a.date} value={a.date}>{a.date}</option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-xl shadow text-sm md:text-base">
            <thead>
              <tr className="bg-blue-100">
                <th className="py-3 px-6 text-left font-semibold text-blue-700 flex items-center gap-2 whitespace-nowrap"><FaBook className="text-blue-400" /> Subject</th>
                <th className="py-3 px-6 text-center font-semibold text-blue-700 whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody>
              {selectedAttendance && selectedAttendance.subjects.map((subject, idx) => (
                <tr key={idx} className="border-b hover:bg-blue-50 transition animate-fadein">
                  <td className="py-3 px-6 text-gray-800 font-medium flex items-center gap-2 whitespace-nowrap"><FaBook className="text-blue-300" /> {subject.subject}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">
                    {subject.status === 'present' ? (
                      <span className="flex items-center justify-center gap-2 text-green-600 font-semibold">
                        <FaCheckCircle className="text-xl" /> Present
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 text-red-500 font-semibold">
                        <FaTimesCircle className="text-xl" /> Absent
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {selectedAttendance && selectedAttendance.subjects.length === 0 && (
                <tr>
                  <td colSpan={2} className="py-6 text-center text-gray-400">No records found for this date.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </LayoutStu>
  );
};

export default StudentAttendence;

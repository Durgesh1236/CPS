import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaBook } from 'react-icons/fa';
import LayoutStu from '../Components/LayoutStu';
import './StudentAttendence.css';

const dummyAttendance = [
  {
    date: '2026-03-16',
    subjects: [
      { subject: 'Mathematics', status: 'present' },
      { subject: 'Science', status: 'absent' },
      { subject: 'English', status: 'present' },
    ],
    teacher: [
      { subject: 'Mathematics', name: 'Mr. Smith' },
      { subject: 'Science', name: 'Ms. Johnson' },
      { subject: 'English', name: 'Mrs. Lee' },
    ]
  },
  {
    date: '2026-03-02',
    subjects: [
      { subject: 'Mathematics', status: 'present', teacher: 'Mr. Smith' },
      { subject: 'Science', status: 'present', teacher: 'Ms. Johnson' },
      { subject: 'English', status: 'absent', teacher: 'Mrs. Lee' },
    ]
  },
];

const StudentAttendence = () => {

  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    setAttendance(dummyAttendance);

    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const selectedAttendance = attendance.find(a => a.date === selectedDate);

  return (
    <LayoutStu>

      <div className="h-full bg-gradient-to-br from-blue-100 via-white to-blue-200">
        <div className="w-full mt-10 lg:mt-14.5 mx-auto bg-white shadow-2xl rounded-3xl p-8 transition hover:shadow-blue-200">
          <h2 className="text-2xl font-bold md:text-2xl lg:text-2xl text-blue-700 flex items-center gap-3 mb-6">
            <FaCalendarAlt className="text-blue-500 text-md md:text-2xl lg:text-2xl" />
            Student Attendance
          </h2>
          {/* Date Picker */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
            <label className="font-semibold text-gray-700">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="border border-blue-300 px-4 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />

          </div>

          {/* Attendance Table */}
          <div className="overflow-x-auto">
            <table className="w-full rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-3 px-6 text-left flex items-center gap-2">
                    <FaBook />
                    Subject
                  </th>
                  <th className="py-3 px-6 text-center">
                    Status
                  </th>

                  <th className="py-3 px-6 text-center">
                    Teacher Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedAttendance ? (
                  selectedAttendance.subjects.map((subject, idx) => (
                    <tr
                      key={idx}
                      className="border-b hover:bg-blue-50 transition"
                    >
                      <td className="py-3 px-6 flex items-center gap-2">
                        <FaBook className="text-blue-400" />
                        {subject.subject}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {subject.status === 'present' ? (
                          <span className="text-green-600 font-semibold flex items-center justify-center gap-2">
                            <FaCheckCircle />
                            Present
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold flex items-center justify-center gap-2">
                            <FaTimesCircle />
                            Absent
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {/* Show teacher name for each subject */}
                        {subject.teacher ? subject.teacher : (() => {
                          // For 2026-03-16, teacher info is in selectedAttendance.teacher array
                          if (selectedAttendance.teacher && Array.isArray(selectedAttendance.teacher)) {
                            const teacherObj = selectedAttendance.teacher.find(t => t.subject === subject.subject);
                            return teacherObj ? teacherObj.name : 'N/A';
                          }
                          return 'N/A';
                        })()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-8 text-center text-gray-400 text-lg">
                      ❌ Data not found for selected date
                    </td>
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
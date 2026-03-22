import React, { useState } from "react";
import LayoutStu from "../Components/LayoutStu";
import { FaBook, FaClock, FaUser } from "react-icons/fa";

const timetableData = {
  Monday: [
    { subject: "Mathematics", teacher: "Mr. Sharma", start: "09:00", end: "09:40" },
    { subject: "Science", teacher: "Mrs. Singh", start: "09:40", end: "10:20" },
    { subject: "English", teacher: "Mr. Verma", start: "10:20", end: "11:00" },
  ],
  Tuesday: [
    { subject: "Hindi", teacher: "Mrs. Gupta", start: "09:00", end: "09:40" },
    { subject: "Mathematics", teacher: "Mr. Sharma", start: "09:40", end: "10:20" },
    { subject: "Computer", teacher: "Mr. Khan", start: "10:20", end: "11:00" },
  ],
  Wednesday: [
    { subject: "Science", teacher: "Mrs. Singh", start: "09:00", end: "09:40" },
    { subject: "English", teacher: "Mr. Verma", start: "09:40", end: "10:20" },
    { subject: "Computer", teacher: "Mr. Khan", start: "10:20", end: "11:00" },
  ],
  Thursday: [
    { subject: "Mathematics", teacher: "Mr. Sharma", start: "09:00", end: "09:40" },
    { subject: "Science", teacher: "Mrs. Singh", start: "09:40", end: "10:20" },
    { subject: "Hindi", teacher: "Mrs. Gupta", start: "10:20", end: "11:00" },
  ],
  Friday: [
    { subject: "English", teacher: "Mr. Verma", start: "09:00", end: "09:40" },
    { subject: "Computer", teacher: "Mr. Khan", start: "09:40", end: "10:20" },
    { subject: "Mathematics", teacher: "Mr. Sharma", start: "10:20", end: "11:00" },
  ],
  Saturday: [
    { subject: "Sports", teacher: "Mr. Yadav", start: "09:00", end: "09:40" },
    { subject: "Art", teacher: "Mrs. Kumari", start: "09:40", end: "10:20" },
  ],
};

const StudentTimetable = () => {

  const [day, setDay] = useState("Monday");

  return (
    <LayoutStu>

      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100">

        <div className="w-full mt-14 md:mt-15 lg:mt-15 mx-auto bg-white rounded-2xl shadow-2xl p-4 md:p-8">

          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6">
            📅 Student Timetable
          </h2>

          {/* Day Selector */}

          <div className="flex gap-2 md:gap-3 flex-wrap mb-6">

            {Object.keys(timetableData).map((d) => (

              <button
                key={d}
                onClick={() => setDay(d)}
                className={`px-3 md:px-4 py-2 rounded-xl text-sm md:text-base font-medium transition
                ${day === d
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 hover:bg-blue-200"
                  }`}
              >
                {d}
              </button>

            ))}

          </div>

          {/* ---------------- MOBILE VIEW ---------------- */}

          <div className="md:hidden space-y-4">

            {timetableData[day].map((item, index) => (

              <div
                key={index}
                className="bg-blue-50 p-4 rounded-xl shadow hover:shadow-md transition"
              >

                <div className="flex items-center gap-2 font-semibold text-blue-700">
                  <FaBook />
                  {item.subject}
                </div>

                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <FaUser />
                  {item.teacher}
                </div>

                <div className="flex items-center gap-2 text-gray-600 mt-1">
                  <FaClock />
                  {item.start} - {item.end}
                </div>

              </div>

            ))}

          </div>

          {/* ---------------- DESKTOP VIEW ---------------- */}

          <div className="hidden md:block overflow-x-auto">

            <table className="w-full text-sm md:text-base border-collapse">

              <thead>

                <tr className="bg-blue-500 text-white">

                  <th className="py-3 px-6 text-left">Subject</th>
                  <th className="py-3 px-6 text-left">Teacher</th>
                  <th className="py-3 px-6 text-center">Start</th>
                  <th className="py-3 px-6 text-center">End</th>

                </tr>

              </thead>

              <tbody>

                {timetableData[day].map((item, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-blue-50 transition"
                  >

                    <td className="py-3 px-6">
                      <span className="inline-flex items-center gap-2">
                        <FaBook className="text-blue-400" />
                        {item.subject}
                      </span>
                    </td>

                    <td className="py-3 px-6">
                      <span className="inline-flex items-center gap-2">
                        <FaUser className="text-green-500" />
                        {item.teacher}
                      </span>
                    </td>

                    <td className="py-3 px-6 text-center">
                      {item.start}
                    </td>

                    <td className="py-3 px-6 text-center">
                      {item.end}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </LayoutStu>
  );
};

export default StudentTimetable;
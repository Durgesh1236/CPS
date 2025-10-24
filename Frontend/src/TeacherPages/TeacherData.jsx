import React from "react";
import { FaUserTie, FaEnvelope, FaIdBadge, FaPhone, FaUserCheck } from "react-icons/fa";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";

// Dummy data for demonstration
// const teacherList = [
//   { teacherId: "T001", name: "Rakesh Sharma", email: "rakesh@school.com", mobile: "9876543210", role: "Teacher" },
//   { teacherId: "T002", name: "Priya Singh", email: "priya@school.com", mobile: "9123456789", role: "Accountent" },
//   { teacherId: "T003", name: "Amit Verma", email: "amit@school.com", mobile: "9988776655", role: "Teacher" },
// ];

const TeacherData = () => {
  const { teacherList } = UserData();
  return (
    <TeacherLayout>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-start pt-24 px-2">
  <div className="w-full bg-white shadow-2xl rounded-2xl p-2 sm:p-4 md:p-8 border-4 border-blue-300">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-green-500 to-blue-700 flex items-center justify-center gap-3 drop-shadow-lg">
          <FaUserCheck className="text-blue-500 animate-bounce" /> Teacher Data
        </h2>
        <div className="overflow-x-auto w-full">
          <table className="w-full min-w-[600px] divide-y divide-blue-200 rounded-xl overflow-hidden text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="bg-gradient-to-r from-blue-100 via-green-100 to-blue-100">
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-700">S.No</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-700">Teacher ID</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-700">Mobile No</th>
                <th className="px-4 py-3 text-left text-sm font-bold text-blue-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {teacherList.map((teacher, idx) => (
                <tr key={teacher.teacherId} className="hover:bg-blue-50 transition-all duration-200">
                  <td className="px-2 py-3 font-semibold text-gray-700">{idx + 1}</td>
                  <td className="px-2 py-3 text-blue-600 font-bold"><FaIdBadge className="inline mr-1" />CPS00{idx + 1}</td>
                  <td className="px-2 py-3 text-gray-800 font-bold"><FaUserTie className="inline mr-1" />{teacher.name}</td>
                  <td className="px-2 py-3 text-green-700"><FaEnvelope className="inline mr-1" />{teacher.email}</td>
                  <td className="px-2 py-3 text-purple-700"><FaPhone className="inline mr-1" />{teacher.mobileNo}</td>
                  <td className="px-2 py-3 font-semibold text-yellow-700">{teacher.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </TeacherLayout>
  );
};

export default TeacherData;

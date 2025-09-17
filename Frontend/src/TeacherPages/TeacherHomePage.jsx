import React from 'react';
import { FaMoneyCheckAlt, FaHistory, FaExclamationCircle, FaUserTie, FaClipboardList } from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';

const importantMessage = "Staff meeting scheduled for 28th August at 2:00 PM in the conference hall.";

const TeacherHomePage = () => {
  const navigate = useNavigate();
  const { user } = UserData()
    
  return (
    <TeacherLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex flex-col items-center p-4 w-full pt-20">
        {/* Teacher Info Box */}
        <div className="w-full mb-8">
          <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 w-full">
            <div className="flex items-center gap-4">
              <FaUserTie className="text-5xl text-blue-600" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Welcome,</h2>
                <span className="text-xl md:text-2xl font-semibold text-yellow-600">{user.name}</span>
              </div>
            </div>
            <div
              className="flex-1 flex cursor-pointer justify-end"
              onClick={() => navigate("/teacher-profile")}>
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold shadow">
                Teacher Profile
              </span>
            </div>
          </div>
        </div>
        {/* Main Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
          {/* Student Fees Submit */}
          {(user.role === 'accountent' || user.role === 'admin') &&
            <div
              onClick={() => navigate("/student-fee-submit")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <FaMoneyCheckAlt className="text-4xl text-green-600" />
              <span className="text-xl font-semibold text-gray-800">Student Fees Submit</span>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition">View Details</button>
            </div>
          }
          {/* Student Fees History */}
          {(user.role === 'accountent' || user.role === 'admin') &&
            <div
              onClick={() => navigate("/student-fee-history")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <FaHistory className="text-4xl text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">Student Fees History</span>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition">View History</button>
            </div>
          }
          {/* Teacher Attendance */}
          <div
            // onClick={() => navigate("/teacher-attendance")}
            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
          >
            <FaClipboardList className="text-4xl text-purple-600" />
            <span className="text-xl font-semibold text-gray-800">Teacher Attendance</span>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition">View Attendance</button>
          </div>
          {/* Teacher Registration */}
          {
            user.role === 'admin' &&

            <div
              onClick={() => navigate("/teacher-registration")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <FaUserTie className="text-4xl text-orange-500" />
              <span className="text-xl font-semibold text-gray-800">Teacher Registration</span>
              <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">Register Now</button>
            </div>
          }
          {/* Teacher Data */}
          { user.role === 'admin' &&
          <div
            onClick={() => navigate("/teacher-data")}
            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full border-2 border-blue-300"
          >
            <FaUserTie className="text-4xl text-blue-700 animate-pulse" />
            <span className="text-xl font-bold text-blue-700">Teacher Data</span>
            <button className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-bold hover:from-blue-600 hover:to-green-600 transition">View Teacher Data</button>
          </div>
}
        </div>
        {/* Important Message - now on next line */}
        <div className="w-full mt-8">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 w-full">
            <FaExclamationCircle className="text-4xl text-red-600" />
            <span className="text-xl font-semibold text-gray-800">Important Message</span>
            <p className="text-gray-700 text-center mt-2">{importantMessage}</p>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherHomePage;

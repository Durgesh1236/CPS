import React from 'react';
import { FaHistory, FaExclamationCircle, FaUserTie, FaClipboardList, FaUserGraduate, FaSearch, FaCalendarAlt, FaRupeeSign, FaFileAlt, FaBell, FaQuestionCircle, FaHandPaper } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdEventNote } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { VscFeedback } from "react-icons/vsc";
import LayoutStu from '../Components/LayoutStu';

const importantMessage = "Staff meeting scheduled for 28th August at 2:00 PM in the conference hall.";

const StudentHomePage = () => {
  const navigate = useNavigate();

  return (
    <LayoutStu>
      {/* Mobile View - ONLY DESIGN ADDED */}
      <div className="md:hidden min-h-screen p-2 pt-18">
        {/* Search Bar */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 shadow-sm"
            placeholder="Search modules..."
          />
        </div>

        {/* Welcome Message */}
        <div className="mb-3 flex bg-blue-300 rounded-2xl shadow-lg p-5 text-white">
          <h1 className="text-2xl mr-2 flex font-bold text-gray-900 mb-1">Hey, <span className='ml-2 mr-2'>Durgesh</span>
            <span className='text-3xl'> <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/263a_fe0f/512.gif" alt="☺" width="40" height="40"></img> </span></h1>
          {/* <p className="text-gray-600 text-sm">Welcome back to your dashboard</p> */}
        </div>

        {/* spend form Section */}
        <div className="mb-6 mt-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div onClick={() => navigate("/student-attendance")} className="bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-3xl h-28 p-2 flex flex-col items-center justify-center text-center border border-yellow-300">
              <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
                <FaClipboardList className="text-2xl text-yellow-600" />
              </div>
              <span className="font-bold text-gray-800 text-xs">Attendance</span>
            </div>
            <div onClick={() => alert("Timetable functionality coming soon!")} className="bg-gradient-to-br from-purple-200 to-purple-400 rounded-3xl h-28 p-2 flex flex-col items-center justify-center text-center border border-purple-300">
              <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
                <FaCalendarAlt className="text-2xl text-purple-700" />
              </div>
              <span className="font-bold text-gray-800 text-xs">Timetable</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div onClick={() => alert("Fees Submit functionality coming soon!")} className="bg-gradient-to-br from-green-200 to-green-400 rounded-3xl p-2 h-28 flex flex-col items-center justify-center text-center border border-green-300">
              <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
                <FaRupeeSign className="text-2xl text-green-700" />
              </div>
              <span className="font-bold text-gray-800 text-xs">Fees</span>
            </div>
            <div onClick={() => alert("Holidays functionality coming soon!")} className="bg-gradient-to-br from-pink-200 to-pink-400 rounded-3xl p-2 h-28 flex flex-col items-center justify-center text-center border border-pink-300">
              <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
                <FaBell className="text-2xl text-pink-600" />
              </div>
              <span className="font-bold text-gray-800 text-xs">Holidays</span>
            </div>
            <div onClick={() => alert("Notifications functionality coming soon!")} className="bg-gradient-to-br from-blue-200 to-blue-400 rounded-3xl p-2 h-28 flex flex-col items-center justify-center text-center border border-blue-300">
              <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
                <FaBell className="text-2xl text-blue-600" />
              </div>
              <span className="font-bold text-gray-800 text-xs">Notification</span>
            </div>
          </div>

          {/* <div className="h-px bg-gray-200 my-6"></div> */}

          <div className="grid bg-white p-5 rounded-2xl grid-cols-3 gap-3">
            <div onClick={() => alert("Registration functionality coming soon!")} className="h-28 bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl p-2 flex flex-col items-center justify-center text-center border border-blue-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaFileAlt className="text-lg text-blue-600" />
              </div>
              <span className="font-bold text-gray-800 text-xs">Registration</span>
            </div>
            <div onClick={() => alert("Seating Plan functionality coming soon!")} className="h-28 bg-gradient-to-br from-green-100 to-green-300 rounded-xl p-2 flex flex-col items-center justify-center text-center border border-green-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <MdEventNote className="text-lg text-green-600" />
              </div>
              <span className="font-bold text-gray-800 text-xs">Seating Plan</span>
            </div>
            <div onClick={() => navigate("/student-result")} className="h-28 bg-gradient-to-br from-pink-100 to-pink-300 rounded-xl p-2 flex flex-col items-center justify-center text-center border border-pink-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaHandPaper className="text-lg text-pink-500" />
              </div>
              <span className="font-bold text-gray-800 text-xs">Result</span>
            </div>
            <div onClick={() => alert("Fees History functionality coming soon!")} className="h-28 bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-xl p-2 flex flex-col items-center justify-center text-center border border-yellow-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaHistory className="text-lg text-yellow-600" />
              </div>
              <span className="font-bold text-gray-800 text-xs">Fees History</span>
            </div>
            <div onClick={() => alert("Student Test functionality coming soon!")} className="bg-gradient-to-br from-purple-100 to-purple-300 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-purple-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaQuestionCircle className="text-lg text-purple-600" />
              </div>
              <span className="font-bold text-gray-700 text-xs">Student Test</span>
            </div>

            <div onClick={() => alert("Admit Card functionality coming soon!")} className="bg-gradient-to-br from-purple-100 to-purple-300 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-purple-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaQuestionCircle className="text-lg text-purple-600" />
              </div>
              <span className="font-bold text-gray-700 text-xs">Admit Card</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* ...removed teacher data input section... */}

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* Bottom Row - Seating Plan & Request Center */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 flex items-center gap-4 border border-gray-200">
            <div className="p-3 rounded-lg bg-white shadow-sm">
              <VscFeedback className="text-xl text-gray-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">FeedBack</h3>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 flex items-center gap-4 border border-blue-200">
            <div className="p-3 rounded-lg bg-white shadow-sm">
              <FaUserGraduate className="text-xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Request Center</h3>
            </div>
          </div>
        </div>

        {/* Important Message - Mobile */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <FaExclamationCircle className="text-white text-xl mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm mb-1">Important Message</h4>
              <p className="text-blue-100 text-sm">{importantMessage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View - Your original code EXACTLY AS IT WAS */}
      <div className="hidden md:block min-h-screen flex-col items-center p-4 w-full pt-20">
        {/* ...removed teacher info box... */}
        {/* Main Boxes */}
        {/* Student Data Section */}
        <div className="mb-8">
          <div className="w-full mb-8">
                    <div className="bg-white rounded-2xl shadow shadow-gray-400 flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 w-full">
                      <div className="flex items-center gap-4">
                        {/* {user.thumbnails ? (
                          <img
                            src={user.thumbnails.url}
                            alt="Teacher Profile"
                            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-blue-300"
                          />
                        ) : */}
                          <FaUserTie className="text-5xl text-blue-600" />
                        {/* } */}
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Welcome,</h2>
                          <span className="text-xl md:text-2xl font-semibold text-yellow-600">Durgesh</span>
                        </div>
                      </div>
                      <div
                        className="flex-1 flex cursor-pointer justify-end"
                        onClick={() => navigate("/student-profile")}>
                        <span className="bg-blue-100 cursor-pointer text-blue-700 px-4 py-2 rounded-full font-semibold shadow">
                          Student Profile
                        </span>
                      </div>
                    </div>
                  </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">Student Data</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* Attendance */}
            <div onClick={() => navigate("/student-attendance")} className="bg-white rounded-xl h-28 shadow shadow-gray-400 p-8 flex flex-row items-center gap-4 cursor-pointer hover:scale-105 transition w-full">
              <FaClipboardList className="text-4xl text-yellow-600" />
              <span className="text-xl font-semibold text-gray-800">Attendance</span>
            </div>
            {/* Timetable */}
            <div onClick={() => alert("Timetable functionality coming soon!")} className="bg-white rounded-xl h-28 shadow shadow-gray-400 p-8 flex flex-row items-center gap-4 cursor-pointer hover:scale-105 transition w-full">
              <FaCalendarAlt className="text-4xl text-purple-700" />
              <span className="text-xl font-semibold text-gray-800">Timetable</span>
            </div>
            {/* Fees */}
            <div onClick={() => alert("Fees functionality coming soon!")} className="bg-white rounded-xl h-28 shadow shadow-gray-400 p-8 flex flex-row items-center gap-4 cursor-pointer hover:scale-105 transition w-full">
              <FaRupeeSign className="text-4xl text-green-700" />
              <span className="text-xl font-semibold text-gray-800">Fees</span>
            </div>
            {/* Holidays */}
            <div onClick={() => alert("Holidays functionality coming soon!")} className="bg-white rounded-xl h-28 shadow shadow-gray-400 p-8 flex flex-row items-center gap-4 cursor-pointer hover:scale-105 transition w-full">
              <FaBell className="text-4xl text-pink-600" />
              <span className="text-xl font-semibold text-gray-800">Holidays</span>
            </div>
            {/* Notification */}
            <div onClick={() => alert("Notification functionality coming soon!")} className="bg-white rounded-xl h-28 shadow shadow-gray-400 p-8 flex flex-row items-center gap-4 cursor-pointer hover:scale-105 transition w-full">
              <FaBell className="text-4xl text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">Notification</span>
            </div>
            {/* Admit Card */}
            <div onClick={() => alert("Admit Card functionality coming soon!")} className="bg-white rounded-xl h-28 shadow shadow-gray-400 p-8 flex flex-row items-center gap-4 cursor-pointer hover:scale-105 transition w-full">
              <FaFileAlt className="text-4xl text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">Admit Card</span>
            </div>
            {/* Seating Plan */}
            <div onClick={() => alert("Seating Plan functionality coming soon!")} className="bg-white rounded-xl h-28 shadow shadow-gray-400 p-8 flex flex-row items-center gap-4 cursor-pointer hover:scale-105 transition w-full">
              <MdEventNote className="text-4xl text-green-600" />
              <span className="text-xl font-semibold text-gray-800">Seating Plan</span>
            </div>
            {/* Result */}
            <div onClick={() => alert("Result functionality coming soon!")} className="bg-white rounded-xl h-28 shadow shadow-gray-400 p-8 flex flex-row items-center gap-4 cursor-pointer hover:scale-105 transition w-full">
              <FaHandPaper className="text-4xl text-pink-500" />
              <span className="text-xl font-semibold text-gray-800">Result</span>
            </div>
            {/* Fees History */}
            <div onClick={() => alert("Fees History functionality coming soon!")} className="bg-white rounded-xl h-28 shadow shadow-gray-400 p-8 flex flex-row items-center gap-4 cursor-pointer hover:scale-105 transition w-full">
              <FaHistory className="text-4xl text-yellow-600" />
              <span className="text-xl font-semibold text-gray-800">Fees History</span>
            </div>
            {/* Student Test */}
            <div onClick={() => alert("Student Test functionality coming soon!")} className="bg-white rounded-xl h-28 shadow shadow-gray-400 p-8 flex flex-row items-center gap-4 cursor-pointer hover:scale-105 transition w-full">
              <FaQuestionCircle className="text-4xl text-purple-600" />
              <span className="text-xl font-semibold text-gray-800">Student Test</span>
            </div>
          </div>
        </div>

        {/* Important Message - now on next line */}
        <div className="w-full mt-8">
          <div className="bg-white rounded-xl shadow shadow-gray-400 p-8 flex flex-col items-center justify-center gap-4 w-full">
            <FaExclamationCircle className="text-4xl text-red-600" />
            <span className="text-xl font-semibold text-gray-800">Important Message</span>
            <p className="text-gray-700 text-center mt-2">{importantMessage}</p>
          </div>
        </div>
      </div>
    </LayoutStu>
  );
};

export default StudentHomePage;
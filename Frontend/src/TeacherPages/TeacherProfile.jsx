import React from "react";
import { FaUserTie, FaIdBadge, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import TeacherLayout from "../Components/TeacherLayout";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";

// Dummy teacher profile data
const teacherProfile = {
  image: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with actual image URL or import
  teacherId: "T001",
};

const TeacherProfile = () => {
  const navigate = useNavigate();
  const {user} = UserData();
  
  return (
    <TeacherLayout>
    <div className="h-full flex flex-col items-center justify-center px-2">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-10 md:p-7 border-4 border-blue-300 flex flex-col items-center animate__animated animate__fadeIn relative">
        <div className="w-full flex justify-end mb-4">
          <button
            type="button"
            onClick={() => navigate('/teacher-home')}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-2xl font-extrabold shadow-xl hover:from-blue-600 hover:to-green-600 transition flex items-center gap-3 border-2 border-white text-lg drop-shadow-lg"
            style={{ zIndex: 10 }}
          >
            <FaArrowLeft className="text-xl" /> Back to Home
          </button>
        </div>
        <div className="relative w-36 h-36 md:w-40 md:h-40 mb-8">
          <img
            src={teacherProfile.image}
            alt="Teacher"
            className="w-full h-full rounded-full object-cover border-4 border-blue-400 shadow-xl"
          />
          <span className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">Active</span>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-2 text-blue-700 font-bold text-lg md:text-xl">
              <FaIdBadge /> Teacher ID:
            </span>
            <span className="text-blue-900 font-extrabold text-lg md:text-xl tracking-wide">{teacherProfile.teacherId}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-2 text-gray-800 font-bold text-lg md:text-xl">
              <FaUserTie /> Name:
            </span>
            <span className="text-gray-900 font-extrabold text-lg md:text-xl tracking-wide">{user.name}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-2 text-green-700 font-bold text-lg md:text-xl">
              <FaEnvelope /> Email:
            </span>
            <span className="text-green-900 font-semibold text-lg md:text-xl">{user.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span className="flex items-center gap-2 text-purple-700 font-bold text-lg md:text-xl">
              <FaPhone /> Mobile:
            </span>
            <span className="text-purple-900 font-semibold text-lg md:text-xl">{user.mobileNo}</span>
          </div>
        </div>
      </div>
    </div>
    </TeacherLayout>
  );
};

export default TeacherProfile;

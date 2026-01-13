import React, { useRef, useState } from "react";
import { FaUserTie, FaIdBadge, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import TeacherLayout from "../Components/TeacherLayout";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/User";

const TeacherProfile = () => {
  const navigate = useNavigate();
  const { user, TeacherImage } = UserData();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
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

  // Handler for uploading the image (to be implemented)
  const handleUploadImage = (id) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    TeacherImage(id, formData);
    setImageFile(null);
  };

  // Handler for canceling the image selection
  const handleCancelImage = () => {
    setImageFile(null);
  };

  return (
    <TeacherLayout>
      <div className="h-full flex flex-col items-center justify-center px-2">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-5 md:p-5 border-4 border-blue-300 flex flex-col items-center animate__animated animate__fadeIn relative">
          <div className="w-full flex justify-end mb-4">
            <button
              type="button"
              onClick={() => navigate('/teacher-home')}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-2xl font-extrabold shadow-xl hover:from-blue-600 hover:to-green-600 transition flex items-center gap-3 border-2 border-white text-lg drop-shadow-lg"
              style={{ zIndex: 10 }}
            >
              <FaArrowLeft className="text-xl" /> Back
            </button>
          </div>
          <div className="relative w-36 h-36 md:w-40 md:h-40 mb-4 cursor-pointer group" onClick={handleImageClick} title="Click to change profile image">
            <img
              src={
                image
                  ? image
                  : user.thumbnails
                    ? user.thumbnails.url
                    : "https://randomuser.me/api/portraits/men/32.jpg"
              }
              alt="Teacher"
              className="w-full h-full rounded-full object-cover border-4 border-blue-400 shadow-xl group-hover:opacity-80 transition"
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <span className="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">Active</span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black bg-opacity-30 rounded-full text-white font-bold text-sm">Click to change</span>
          </div>
          {/* Upload and Cancel buttons */}
          {imageFile && (
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => handleUploadImage(user._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-md transition"
              >
                Upload Image
              </button>
              <button
                type="button"
                onClick={handleCancelImage}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-bold shadow-md transition flex items-center"
                title="Cancel"
              >
                <span className="material-icons" style={{ fontSize: '18px', marginRight: '4px' }}>cancel</span> Cancel
              </button>
            </div>
          )}
          <div className="w-full flex flex-col gap-6">
            <div className="flex flex-row lg:flex-row items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-2 text-blue-700 font-bold text-lg md:text-xl">
                <FaIdBadge /> Teacher ID:
              </span>
              <span className="text-blue-900 font-extrabold text-lg md:text-xl tracking-wide">T001</span>
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-2 text-gray-800 font-bold text-lg md:text-xl">
                <FaUserTie /> Name:
              </span>
              <span className="text-gray-900 font-extrabold text-lg md:text-xl tracking-wide">{user.name}</span>
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-2 text-green-700 font-bold text-lg md:text-xl">
                <FaEnvelope /> Email:
              </span>
              <span className="text-green-900 font-semibold text-sm lg:text-lg md:text-xl">{user.email}</span>
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-4">
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

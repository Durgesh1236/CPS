import { useRef, useState } from "react";
import { FaUserTie, FaIdBadge, FaEnvelope, FaPhone } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/LayoutStu";
import { StudentData } from "../context/Student";



const StudentProfile = () => {
  const navigate = useNavigate();
  const { studentData, StudentImage } = StudentData();
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
    StudentImage(id, formData);
    setImageFile(null);
  };

  // Handler for canceling the image selection
  const handleCancelImage = () => {
    setImageFile(null);
  };
console.log(studentData);

  return (
    <Layout>
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
          <div className="relative w-36 h-36 md:w-40 md:h-40 mb-4 cursor-pointer group" onClick={handleImageClick} title="Click to change profile image">
            <img
              src={
                // image
                //   ? image
                //   : studentData.thumbnails
                //     ? studentData.thumbnails.url
                    // : 
                    "https://randomuser.me/api/portraits/men/32.jpg"
              }
              alt="Student"
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
                onClick={() => handleUploadImage(studentData._id)}
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
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-2 text-blue-700 font-bold text-lg md:text-xl">
                <FaIdBadge /> Student ID:
              </span>
              <span className="text-blue-900 font-extrabold text-lg md:text-xl tracking-wide">{studentData.ledgerId}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-2 text-gray-800 font-bold text-lg md:text-xl">
                <FaUserTie /> Name:
              </span>
              <span className="text-gray-900 font-extrabold text-lg md:text-xl tracking-wide">{studentData.name}</span>
            </div>
            {/* <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-2 text-green-700 font-bold text-lg md:text-xl">
                <FaEnvelope /> Email:
              </span>
              <span className="text-green-900 font-semibold text-lg md:text-xl">{studentData.email}</span>
            </div> */}
            {/* <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span className="flex items-center gap-2 text-purple-700 font-bold text-lg md:text-xl">
                <FaPhone /> Mobile:
              </span>
              <span className="text-purple-900 font-semibold text-lg md:text-xl">{studentData.mobileNo}</span>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentProfile;

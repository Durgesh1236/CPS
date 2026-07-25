import React, { useRef, useState } from "react";
import { FaUserTie, FaIdBadge, FaEnvelope, FaPhone, FaArrowLeft, FaCamera } from "react-icons/fa";
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

  const handleUploadImage = (id) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    TeacherImage(id, formData);
    setImageFile(null);
  };

  const handleCancelImage = () => {
    setImage(null);
    setImageFile(null);
  };

  const fields = [
    { icon: <FaIdBadge />, label: "Teacher ID", value: "T001" },
    { icon: <FaUserTie />, label: "Name", value: user?.name },
    { icon: <FaEnvelope />, label: "Email", value: user?.email },
    { icon: <FaPhone />, label: "Mobile", value: user?.mobileNo },
  ];

  return (
    <TeacherLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .barcode-strip-teal {
          background-image: repeating-linear-gradient(
            90deg,
            #1E2540 0px, #1E2540 2px,
            transparent 2px, transparent 5px,
            #1E2540 5px, #1E2540 6px,
            transparent 6px, transparent 10px,
            #1E2540 10px, #1E2540 13px,
            transparent 13px, transparent 16px
          );
          opacity: 0.85;
        }
      `}</style>

      <div className="font-body h-full w-full flex items-center justify-center bg-[#F3F1EC] px-4 py-4 overflow-y-auto">
        <div className="w-full max-w-4xl">

          <button
            type="button"
            onClick={() => navigate('/teacher-home')}
            className="mb-4 inline-flex items-center gap-2 font-display font-600 text-sm text-[#1E2540] hover:text-[#2F6F5E] transition-colors"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(30,37,64,0.35)] bg-white">

            {/* Photo / credential panel */}
            <div className="relative bg-[#1E2540] px-6 py-8 lg:py-10 flex flex-col items-center text-center">
              <div className="hidden lg:flex flex-col items-center absolute top-6 left-1/2 -translate-x-1/2">
                <div className="w-10 h-3 rounded-full bg-[#0F1428]" />
                <div className="w-4 h-4 rounded-full bg-[#F3F1EC] mt-1 ring-4 ring-[#0F1428]/40" />
              </div>

              <div
                className="relative w-28 h-28 sm:w-32 sm:h-32 mt-2 lg:mt-14 cursor-pointer group"
                onClick={handleImageClick}
                title="Click to change profile image"
              >
                <img
                  src={
                    image
                      ? image
                      : user?.thumbnails
                        ? user.thumbnails.url
                        : "https://randomuser.me/api/portraits/men/32.jpg"
                  }
                  alt="Teacher"
                  className="w-full h-full rounded-full object-cover ring-4 ring-[#2F6F5E] shadow-xl group-hover:opacity-70 transition"
                />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 rounded-full text-white">
                  <FaCamera />
                </span>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {imageFile && (
                <div className="flex gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => handleUploadImage(user._id)}
                    className="bg-[#2F6F5E] hover:bg-[#275c4d] text-white text-xs font-display font-600 px-3 py-1.5 rounded-lg shadow transition"
                  >
                    Save Photo
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelImage}
                    className="bg-white/10 hover:bg-white/20 text-white text-xs font-display font-600 px-3 py-1.5 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <h1 className="font-display font-700 text-white text-xl mt-5">
                {user?.name || "Teacher"}
              </h1>
              <p className="font-display text-[10px] tracking-[0.25em] text-[#5FBFA5] uppercase mt-1">
                Faculty Member
              </p>

              <span className="mt-4 inline-flex items-center gap-1.5 bg-[#2F6F5E]/20 border border-[#2F6F5E] text-[#5FBFA5] text-xs font-display font-600 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5FBFA5]" /> Active
              </span>

              <div className="hidden lg:block w-full mt-auto pt-10">
                <div className="h-1.5 w-full rounded-full bg-[#2F6F5E]" />
                <p className="text-white/50 text-xs pt-4 leading-relaxed">
                  Tap the photo to update your ID picture.
                </p>
              </div>
            </div>

            {/* Detail fields panel */}
            <div className="px-6 sm:px-10 py-8 sm:py-10 lg:py-12">
              <h2 className="font-display font-700 text-2xl sm:text-3xl text-[#1E2540] mb-1">
                Profile Details
              </h2>
              <p className="text-slate-500 text-sm mb-6 sm:mb-8">
                Your credential information on file.
              </p>

              <div className="space-y-5">
                {fields.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 pb-5 border-b border-slate-100 last:border-b-0">
                    <span className="w-9 h-9 shrink-0 rounded-lg bg-[#2F6F5E]/10 text-[#2F6F5E] flex items-center justify-center text-sm">
                      {f.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-display font-600 tracking-wider uppercase text-slate-400">
                        {f.label}
                      </p>
                      <p className="text-[#1E2540] font-display font-600 text-base sm:text-lg break-words">
                        {f.value || "—"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-6 sm:my-8 h-6 barcode-strip-teal rounded-sm" />

              <p className="text-center text-xs text-slate-400">
                Issued for internal campus use only
              </p>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherProfile;
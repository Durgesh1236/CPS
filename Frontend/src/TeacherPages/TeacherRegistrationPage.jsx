import React, { useState } from 'react';
import { FaUserTie, FaEnvelope, FaPhone, FaLock, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';
import { RingLoader } from 'react-spinners';

const initialForm = {
  name: '',
  email: '',
  mobile: '',
  password: '',
  role: 'teacher',
};

const TeacherRegistrationPage = () => {
  const [form, setForm] = useState(initialForm);
  const {registerTeacher, loading} = UserData();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'email' ? value.toLowerCase() : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    registerTeacher(form.name, form.email, form.password, form.mobile, form.role, setForm);
  };

  return (
    <>
    {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <RingLoader
            color="#0e12f9"
            size={70}
            speedMultiplier={1}
          />
        </div>) : (
    <TeacherLayout>
    <div className="flex items-center justify-center px-2 py-2 md:py-2">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-3xl p-10 border-3 border-blue-300 relative animate__animated animate__fadeIn" style={{marginTop: '80px'}}> 
        <h2 className="text-3xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-green-500 to-blue-700 flex items-center justify-center gap-4 drop-shadow-2xl tracking-wide animate__animated animate__fadeInDown">
          <FaUserCheck className="text-blue-500 animate-bounce" /> Teacher Registration
        </h2>
        <button
          type="button"
          onClick={() => window.location.href='/teacher-home'}
          className="absolute cursor-pointer top-2 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:from-yellow-500 hover:to-orange-600 transition flex items-center gap-2 border-2 border-white"
        >
          &#8592; Back
        </button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <div className="w-1/2 transition-transform duration-300 hover:scale-105">
              <label className="flex items-center gap-2 text-gray-700 mb-2 font-semibold" htmlFor="name">
                <FaUserTimes className="text-blue-500" /> Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-gradient-to-r from-blue-50 to-green-50 shadow-md"
                required
              />
            </div>
            <div className="w-1/2 transition-transform duration-300 hover:scale-105">
              <label className="flex items-center gap-2 text-gray-700 mb-2 font-semibold" htmlFor="email">
                <FaEnvelope className="text-blue-500" /> Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-gradient-to-r from-blue-50 to-green-50 shadow-md"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 transition-transform duration-300 hover:scale-105">
              <label className="flex items-center gap-2 text-gray-700 mb-2 font-semibold" htmlFor="mobile">
                <FaPhone className="text-blue-500" /> Mobile Number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-gradient-to-r from-blue-50 to-green-50 shadow-md"
                required
                pattern="[0-9]{10}"
                maxLength={10}
              />
            </div>
            <div className="w-1/2 transition-transform duration-300 hover:scale-105">
              <label className="flex items-center gap-2 text-gray-700 mb-2 font-semibold" htmlFor="password">
                <FaLock className="text-blue-500" /> Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-5 py-4 border-2 border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-gradient-to-r from-blue-50 to-green-50 shadow-md"
                required
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-1/2 transition-transform duration-300 hover:scale-105">
              <label className="flex items-center gap-2 text-gray-700 mb-2 font-semibold" htmlFor="role">
                <FaUserTie className="text-blue-500" /> Role
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-2 py-2 border-2 border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-md bg-gradient-to-r from-blue-50 to-green-50 shadow-md"
                required
              >
                <option value="teacher">Teacher</option>
                <option value="accountent">Accountent</option>
              </select>
            </div>
            {/* <div className="w-1/2"></div> */}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r cursor-pointer from-green-400 to-blue-600 text-white py-4 rounded-2xl font-extrabold text-xl shadow-xl hover:from-green-500 hover:to-blue-700 transition transform hover:scale-105 tracking-wide border-2 border-blue-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    </TeacherLayout> 
  )}
     </>
  );
};

export default TeacherRegistrationPage;

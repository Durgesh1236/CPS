import React, { useState } from 'react';
import Layout from '../Components/Layout';

const tabOptions = [
  { label: 'Student Login', value: 'student' },
  { label: 'Teacher Login', value: 'teacher' },
  { label: 'Admin Login', value: 'admin' },
  { label: 'Admission Login', value: 'admission' },
];

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [studentId, setStudentId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [adminId, setAdminId] = useState('');
  const [admissionId, setAdmissionId] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      alert('You must agree to the terms and conditions.');
      return;
    }
    let id;
    switch (activeTab) {
      case 'student':
        id = studentId;
        break;
      case 'teacher':
        id = teacherId;
        break;
      case 'admin':
        id = adminId;
        break;
      case 'admission':
        id = admissionId;
        break;
      default:
        id = '';
    }
    alert(`${tabOptions.find(t => t.value === activeTab).label}:\nID: ${id}\nPassword: ${password}`);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh] px-2">
        <div className="w-full max-w-sm bg-white shadow-2xl rounded px-0 pt-0 pb-8">
          {/* Tabs */}
          <div className="flex border-b">
            {tabOptions.map(tab => (
              <button
                key={tab.value}
                className={`flex-1 py-3 text-sm font-semibold transition ${
                  activeTab === tab.value
                    ? 'border-b-2 border-blue-500 text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setActiveTab(tab.value);
                  setPassword('');
                  setAgree(false);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-8 pt-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              {tabOptions.find(t => t.value === activeTab).label}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="loginId">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} ID
              </label>
              <input
                id="loginId"
                type="text"
                value={
                  activeTab === 'student'
                    ? studentId
                    : activeTab === 'teacher'
                    ? teacherId
                    : activeTab === 'admin'
                    ? adminId
                    : admissionId
                }
                onChange={e => {
                  if (activeTab === 'student') setStudentId(e.target.value);
                  else if (activeTab === 'teacher') setTeacherId(e.target.value);
                  else if (activeTab === 'admin') setAdminId(e.target.value);
                  else setAdmissionId(e.target.value);
                }}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-6 flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mr-2"
                required
              />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I agree to the <a href="#" className="text-blue-500 underline">terms and conditions</a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};
export default LoginPage;
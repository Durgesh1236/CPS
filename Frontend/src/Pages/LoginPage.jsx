import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';
import { StudentData } from '../context/Student';

const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();
  const { StudentLogin } = StudentData();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    StudentLogin(studentId, password, navigate);
    setStudentId('');
    setPassword('');
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[80vh] px-2">
        <div className="w-full max-w-sm bg-white shadow-2xl rounded px-0 pt-0 pb-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="px-8 pt-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Student Login
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="loginId">
                Student ID
              </label>
              <input
                id="loginId"
                type="text"
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
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
              className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Login
            </button>
          </form>
          <div className="mt-8 flex flex-col gap-3 px-8">
            <button
              className="w-full cursor-pointer bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition font-semibold"
              onClick={() => navigate('/teacher-login')}
            >
              Teacher Login
            </button>
            {/* <button
              className="w-full cursor-pointer bg-gray-700 text-white py-2 rounded hover:bg-gray-900 transition font-semibold"
              onClick={() => navigate('/admin-login')}
            >
              Admin Login
            </button> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
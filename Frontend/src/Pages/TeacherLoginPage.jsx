import React, { useState } from 'react';
import { UserData } from '../context/User';
import Layout from '../Components/Layout';
import { useNavigate } from 'react-router-dom';

const TeacherLoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const {loginTeacher} = UserData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      alert('You must agree to the terms and conditions.');
      return;
    }
    loginTeacher(email, password, navigate);
  };

  return (
    <Layout>
    <div className="flex items-center justify-center min-h-[80vh] px-2">
      <div className="w-full max-w-md bg-white shadow-lg rounded p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Teacher Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">Teacher ID</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value.toLowerCase())}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        <button
            type="submit"
            className="w-full cursor-pointer mt-2 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition"
            onClick={() => navigate("/login")}
          >
            Student Login
          </button>
      </div>
    </div>
    </Layout>
  );
};

export default TeacherLoginPage;

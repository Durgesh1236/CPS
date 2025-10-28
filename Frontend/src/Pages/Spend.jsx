import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';
import TeacherLayout from '../Components/TeacherLayout';


const Spend = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [total, setTotal] = useState('');
  const { spendForm } = UserData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    spendForm(name, date, total, setName, setTotal, setDate);
  };

  return (
    <TeacherLayout>
      <div className="pt-20 p-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-50 to-white rounded-2xl shadow-lg p-8 border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Submit Total Spend (Daily)</h1>
                <p className="text-sm text-gray-500">Record the day's total expense for accounting.</p>
              </div>
              <button onClick={() => navigate('/teacher-home')} className="text-sm px-3 py-2 cursor-pointer bg-white border rounded-lg shadow hover:scale-105 transition flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name of person" className="mt-1 block w-full p-3 border rounded-lg shadow-sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Spend (INR)</label>
                  <input type="number" step="0.01" value={total} onChange={e => setTotal(e.target.value)} className="mt-1 block w-full p-3 border rounded-lg" required />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <button type="button" onClick={() => { setName(''); setTotal(''); setDate(new Date().toISOString().slice(0,10)); }} className="px-4 py-2 bg-gray-100 cursor-pointer border rounded text-sm">Reset</button>
                  <button type="submit" className="px-6 py-3 bg-indigo-600 cursor-pointer text-white rounded-lg shadow hover:bg-indigo-700">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default Spend;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';
import TeacherLayout from '../Components/TeacherLayout';


const Spend = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [total, setTotal] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { spendForm } = UserData();
   
  const handleSubmit = async (e) => {
    e.preventDefault();
    await spendForm(name, date, total, paymentMethod, setName, setTotal, setDate);
    setPaymentMethod('');
  };

  return (
    <TeacherLayout>
      <div className="h-full pt-10 px-2 sm:px-6 bg-gradient-to-br from-indigo-100 via-blue-50 to-pink-100 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl p-6 sm:p-10 border border-indigo-100 ring-1 ring-indigo-50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">Submit Total Spend (Daily)</h1>
                <p className="text-sm text-gray-500">Record the day's total expense for accounting.</p>
              </div>
              <button onClick={() => navigate('/teacher-home')} className="text-xs cursor-pointer sm:text-sm px-3 py-2 bg-white border border-gray-200 rounded-lg shadow hover:scale-105 hover:bg-indigo-50 transition flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-indigo-700 mb-1">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name of person" className="mt-1 block w-full p-3 border-2 border-indigo-100 rounded-xl shadow focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-indigo-700 mb-1">Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full p-3 border-2 border-indigo-100 rounded-xl shadow focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-indigo-700 mb-1">Total Spend (INR)</label>
                  <input type="number" step="0.01" value={total} onChange={e => setTotal(e.target.value)} className="mt-1 block w-full p-3 border-2 border-indigo-100 rounded-xl shadow focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-indigo-700 mb-1">Payment Method</label>
                  <select value={paymentMethod}
                   onChange={e => setPaymentMethod(e.target.value)} 
                   className="mt-1 block w-full p-3 border-2 border-indigo-100 rounded-xl shadow focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                   required >
                    <option value="">Select payment method</option>
                    <option value="Cash">Cash</option>
                    <option value="Account">Account</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-3">
                  <button type="button" onClick={() => { setName(''); setTotal(''); setDate(new Date().toISOString().slice(0, 10)); setPaymentMethod('Cash'); }} className="px-4 py-2 cursor-pointer bg-gray-100 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-200 transition">Reset</button>
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl cursor-pointer font-bold shadow-lg hover:from-indigo-600 hover:to-pink-600 transition">
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

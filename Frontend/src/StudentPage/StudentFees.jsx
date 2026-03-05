import React, { useState } from 'react';
import LayoutStu from '../Components/LayoutStu';

// Dummy student data for demonstration
const student = {
  rollNumber: '2026001',
  name: 'Aman Sharma',
  fatherName: 'Rajesh Sharma',
  motherName: 'Sunita Sharma',
  mobile: '9876543210',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  totalFee: 25000,
  paidHistory: [
    { date: '2026-01-10', amount: 10000 },
    { date: '2026-02-15', amount: 5000 },
  ],
};

export default function StudentFees() {
  const [payAmount, setPayAmount] = useState('');

  const handlePaytmClick = () => {
    // Replace with actual Paytm payment integration
    window.open('https://paytm.com/', '_blank');
  };

  const totalPaid = student.paidHistory.reduce((sum, entry) => sum + entry.amount, 0);
  const remainingFee = student.totalFee - totalPaid;

  return (
    <LayoutStu>
      <div className="min-h-screen mt-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center py-8 px-1">
        {/* Student Detail Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 mb-4 flex flex-col items-center animate-fade-in">
          <img src={student.image} alt="Student" className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-lg mb-4" />
          <h2 className="text-2xl font-bold text-blue-700 mb-2">{student.name}</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full text-gray-700 text-sm mb-2">
            <div><span className="font-semibold text-purple-600">Roll No:</span> {student.rollNumber}</div>
            <div><span className="font-semibold text-pink-600">Mobile:</span> {student.mobile}</div>
            <div><span className="font-semibold text-blue-600">Father:</span> {student.fatherName}</div>
            <div><span className="font-semibold text-green-600">Mother:</span> {student.motherName}</div>
          </div>
        </div>

        {/* Fee History Section */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 mb-4 animate-fade-in">
          <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">Fee History</h3>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Tution Fee:</span>
              <span className="font-bold text-blue-700">₹{student.totalFee}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Exam Fee:</span>
              <span className="font-bold text-green-700">₹{totalPaid}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">Total Fees:</span>
              <span className="font-bold text-red-700">₹{remainingFee}</span>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-semibold text-blue-600 mb-2">Payment History:</h4>
            <ul className="space-y-2">
              {student.paidHistory.map((entry, idx) => (
                <li key={idx} className="flex justify-between items-center bg-blue-50 rounded-lg shadow p-2">
                  <span className="text-gray-700">{entry.date}</span>
                  <span className="font-bold text-green-600">₹{entry.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Fee Payment Section */}
        <div className="w-full max-w-md bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 rounded-2xl shadow-xl p-6 animate-fade-in">
          <h3 className="text-lg font-bold text-green-700 mb-4 text-center">Pay Fee</h3>
          <div className="flex flex-col gap-4 items-center">
            <input
              type="number"
              min="1"
              max={remainingFee}
              value={payAmount}
              onChange={e => setPayAmount(e.target.value)}
              placeholder="Enter amount to pay"
              className="w-full px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-lg shadow"
            />
            <button
              onClick={handlePaytmClick}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-2 rounded-lg shadow hover:scale-105 transition-transform duration-200"
              disabled={!payAmount || payAmount < 1 || payAmount > remainingFee}
            >
              Pay with Paytm
            </button>
          </div>
        </div>
      </div>
    </LayoutStu>
  );
}

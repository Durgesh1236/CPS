import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';
import { useEffect } from 'react';


const StudentFeeHistory = () => {
  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const { getAllFeesSubmit, FeesSubmitList } = UserData();
  const navigate = useNavigate();

  const getTodayInputDate = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  };

  const [filterDate, setFilterDate] = useState(getTodayInputDate());
  // useEffect(() => {
  //   getAllFeesSubmit();
  // }, [])

  const safeList = Array.isArray(FeesSubmitList) ? FeesSubmitList : [];
  const filteredHistory = safeList.filter(item => {
    const matchesSearch = item.ledgerId?.toLowerCase().includes(search.toLowerCase()) ||
      item.studentName?.toLowerCase().includes(search.toLowerCase());
    let matchesDate = true;
    if (filterDate) {
      const [yyyy, mm, dd] = filterDate.split('-');
      const formattedDate = `${dd}-${mm}-${yyyy}`;
      matchesDate = item.date === formattedDate;
    }
    return matchesSearch && matchesDate;
  });

  // calculate total submitFees for the currently selected filterDate (defaults to today)
  const totalForDate = safeList.reduce((sum, item) => {
    if (!filterDate) return sum;
    const [yyyy, mm, dd] = filterDate.split('-');
    const formattedDate = `${dd}-${mm}-${yyyy}`;
    if (item.date === formattedDate) {
      return sum + (Number(item.submitFees) || 0);
    }
    return sum;
  }, 0);

  const formatCurrency = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(v);

  return (
    <TeacherLayout>
      <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-start w-full pt-20">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 w-full text-left">Student Fee History</h2>
        <div className="w-full max-w-2xl mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search by Ledger ID or Name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
          />
          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
          />
          <button
            className="bg-gray-500 cursor-pointer text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-600 transition w-full md:w-auto"
            onClick={() => navigate('/teacher-home')}
          >
            Home
          </button>
        </div>
        {/* Total for selected date */}
        <div className="w-full max-w-2xl mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total submitted on</div>
              <div className="text-lg font-bold text-gray-800">{filterDate ? (() => { const [y,m,d]=filterDate.split('-'); return `${d}-${m}-${y}` })() : '—'}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Amount</div>
              <div className="text-2xl font-extrabold text-green-600">{formatCurrency(totalForDate)}</div>
            </div>
          </div>
        </div>
        {/* Table Heading */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg">
            <thead>
              <tr className="bg-blue-100 text-blue-700">
                <th className="py-2 px-4 text-left">Image</th>
                <th className="py-2 px-4 text-left">Student Name</th>
                <th className="py-2 px-4 text-left">Class</th>
                <th className="py-2 px-4 text-left">Ledger ID</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Back Dues</th>
                <th className="py-2 px-4 text-left">Submit Fees</th>
                <th className="py-2 px-4 text-left">Dues</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2 px-4">
                      <img
                        src={item.receiptImage.url}
                        alt="Fee Receipt"
                        className="w-12 h-12 object-cover rounded-lg cursor-pointer border-2 border-blue-500"
                        onClick={() => setSelectedImage(item.receiptImage.url)}
                      />
                    </td>
                    <td className="py-2 px-4 font-bold text-gray-800">{item.studentName}</td>
                    <td className="py-2 px-4 text-gray-500">{item.studentClass}</td>
                    <td className="py-2 px-4 text-gray-500">{item.ledgerId}</td>
                    <td className="py-2 px-4 text-gray-500">{item.date}</td>
                    <td className="py-2 px-4 text-blue-700 font-semibold">₹{item.backDues}</td>
                    <td className="py-2 px-4 text-green-700 font-semibold">₹{item.submitFees}</td>
                    <td className={`py-2 px-4 font-semibold ${item.dues === 0 ? 'text-green-800' : 'text-red-700'}`}>₹{item.dues}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-12 text-center">
                    <span className="text-lg font-semibold text-gray-500">Data not found</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Fullscreen Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative cursor-pointer">
              <img src={selectedImage} alt="Full Receipt" className="max-w-full max-h-[80vh] rounded-xl shadow-2xl" />
              <button
                className="absolute cursor-pointer top-2 right-2 bg-white text-red-600 rounded-full p-2 shadow-lg text-xl font-bold"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
};

export default StudentFeeHistory; 
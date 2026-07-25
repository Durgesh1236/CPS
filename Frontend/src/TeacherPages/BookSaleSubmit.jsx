import React, { useState } from 'react';
import { FaRupeeSign, FaUser, FaIdBadge, FaBook, FaArrowLeft } from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

export const BookSaleSubmit = () => {

  const [ledgerId, setLedgerId] = useState('');
  const [studentName, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [totalamount, setTotalAmount] = useState('');
  const [submitAmount, setSubmitAmount] = useState('');
  const [dues, setDues] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const { BookSaleData, bookPrice } = UserData();

  React.useEffect(() => {
    const back = parseFloat(totalamount) || 0;
    const submit = parseFloat(submitAmount) || 0;
    const due = Math.max(back - submit, 0);
    setDues(due);
  }, [totalamount, submitAmount]);

  const handleSubmit = e => {
    e.preventDefault();
    const today = new Date();
    const date =
      String(today.getDate()).padStart(2, '0') + '-' +
      String(today.getMonth() + 1).padStart(2, '0') + '-' +
      today.getFullYear();

    BookSaleData(
      ledgerId,
      studentName,
      studentClass,
      totalamount,
      submitAmount,
      dues,
      date,
      paymentMethod
    );
    setLedgerId('');
    setName('');
    setStudentClass('');
    setTotalAmount('');
    setSubmitAmount('');
    setDues('');
    setPaymentMethod('');
  };

  const isPaid = dues === 0 && totalamount !== '';

  return (
    <TeacherLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono-num { font-family: 'Space Mono', monospace; }
        .perforation {
          background-image: radial-gradient(circle, #F3F1EC 3px, transparent 3px);
          background-size: 14px 14px;
          background-position: center;
        }
      `}</style>

      <div className="font-body h-full w-full flex items-start sm:items-center justify-center bg-[#F3F1EC] px-4 py-6 overflow-y-auto">
        <div className="w-full">

          <button
            type="button"
            onClick={() => window.location.href = '/teacher-home'}
            className="mb-4 inline-flex items-center gap-2 font-display font-600 text-sm text-[#1E2540] hover:text-[#2F6F5E] transition-colors"
          >
            <FaArrowLeft /> Back
          </button>

          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(30,37,64,0.35)] bg-white">

            {/* Receipt header / amount summary */}
            <div className="bg-[#1E2540] px-6 sm:px-10 py-6 sm:py-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-[10px] sm:text-xs tracking-[0.25em] text-[#5FBFA5] uppercase mb-1">
                    Book Ledger
                  </p>
                  <h1 className="font-display font-700 text-white text-xl sm:text-2xl leading-tight">
                    Fee Submission
                  </h1>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-[10px] tracking-wider text-white/50 uppercase mb-1">
                    {isPaid ? 'Settled' : 'Dues'}
                  </p>
                  <p className={`font-mono-num font-700 text-2xl sm:text-3xl ${isPaid ? 'text-[#5FBFA5]' : 'text-[#E8B04B]'}`}>
                    ₹{dues || '0'}
                  </p>
                </div>
              </div>
            </div>

            {/* perforated tear line */}
            <div className="h-4 bg-[#1E2540] perforation" />

            <form onSubmit={handleSubmit} className="px-6 sm:px-10 py-8 sm:py-10 space-y-5">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-display font-600 tracking-wider uppercase text-slate-500 mb-1.5">
                    <FaIdBadge className="text-[#2F6F5E]" /> Ledger ID
                  </label>
                  <input
                    type="text"
                    value={ledgerId}
                    onChange={(e) => setLedgerId(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-[#1E2540] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30 focus:border-[#2F6F5E] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-display font-600 tracking-wider uppercase text-slate-500 mb-1.5">
                    <FaUser className="text-[#2F6F5E]" /> Student Name
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-[#1E2540] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30 focus:border-[#2F6F5E] transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-display font-600 tracking-wider uppercase text-slate-500 mb-1.5">
                    <FaBook className="text-[#2F6F5E]" /> Class
                  </label>
                  <select
                    value={studentClass}
                    onChange={(e) => {
                      const selectedClass = e.target.value;
                      setStudentClass(selectedClass);
                      const found = bookPrice?.find(
                        (item) => item.studentClass === selectedClass
                      );
                      setTotalAmount(found ? found.totalPayable : '');
                    }}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-[#1E2540] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30 focus:border-[#2F6F5E] transition-colors"
                    required
                  >
                    <option value="">Select class</option>
                    <option value="P.Nur">P.Nur</option>
                    <option value="Nur">Nur</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-display font-600 tracking-wider uppercase text-slate-500 mb-1.5">
                    <FaRupeeSign className="text-[#2F6F5E]" /> Book Amount
                  </label>
                  <input
                    type="number"
                    value={totalamount}
                    readOnly
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-100 font-mono-num font-700 text-[#1E2540]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-display font-600 tracking-wider uppercase text-slate-500 mb-1.5">
                    <FaRupeeSign className="text-[#2F6F5E]" /> Submit Fees
                  </label>
                  <input
                    type="number"
                    value={submitAmount}
                    onChange={(e) => setSubmitAmount(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 font-mono-num text-[#1E2540] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30 focus:border-[#2F6F5E] transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-display font-600 tracking-wider uppercase text-slate-500 mb-1.5">
                    Dues
                  </label>
                  <input
                    type="number"
                    value={dues}
                    readOnly
                    className={`w-full px-3 py-2.5 border rounded-lg font-mono-num font-700 ${
                      isPaid
                        ? 'bg-[#2F6F5E]/10 border-[#2F6F5E]/30 text-[#2F6F5E]'
                        : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-display font-600 tracking-wider uppercase text-slate-500 mb-1.5">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-[#1E2540] focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30 focus:border-[#2F6F5E] transition-colors"
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="cash">Cash</option>
                  <option value="account">Account</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-[#1E2540] text-white font-display font-600 py-3 rounded-lg hover:bg-[#2A3357] active:scale-[0.99] transition-all shadow-lg shadow-[#1E2540]/20"
              >
                Submit Fees
              </button>
            </form>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};
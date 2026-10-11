import React, { useState } from 'react';
import LayoutStu from '../Components/LayoutStu';

const formatAmount = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

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
      <div className="min-h-screen bg-[#f6f3ec] bg-[radial-gradient(#ded8ca_0.65px,transparent_0.65px)] bg-[length:18px_18px] px-3 pb-8 pt-[96px] text-[#182036] sm:px-6 sm:pt-[104px] lg:px-9 lg:pb-12 xl:px-[54px]">
        <div className="mx-auto w-full">
          <header className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
            <div className="min-w-0">
              <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[1.7px] text-[#94703b]">Student portal / account</p>
              <h1 className="text-[28px] font-black leading-tight sm:text-4xl">Fees & payments</h1>
              <p className="mt-2 text-sm text-[#72766f] sm:text-base">Your fee overview and recent payment activity.</p>
            </div>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#e7c98e] bg-[#f8eacb] text-xl text-[#825c1c] sm:h-14 sm:w-14 sm:rounded-2xl" aria-hidden="true">₹</span>
          </header>

          <section className="mb-5 overflow-hidden rounded-lg border border-[#e7e2d7] bg-[#182036] shadow-[0_12px_30px_rgba(24,32,54,0.12)] sm:mb-6">
            <div className="grid gap-5 p-5 sm:p-7 md:grid-cols-[1fr_auto] md:items-center md:p-8">
              <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                <img src={student.image} alt={student.name} className="h-14 w-14 shrink-0 rounded-xl border-2 border-[#f4a73c] object-cover sm:h-[68px] sm:w-[68px]" />
                <div className="min-w-0 text-white">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[1.5px] text-[#f4a73c]">Student fee account</p>
                  <h2 className="truncate text-xl font-extrabold sm:text-2xl">{student.name}</h2>
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">Roll number {student.rollNumber}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-white md:min-w-[340px] md:border-l md:border-t-0 md:pl-7 md:pt-0">
                <div><span className="block text-[10px] font-bold uppercase tracking-wider text-white/45">Father</span><strong className="mt-1 block truncate text-sm sm:text-base">{student.fatherName}</strong></div>
                <div><span className="block text-[10px] font-bold uppercase tracking-wider text-white/45">Mobile</span><strong className="mt-1 block truncate text-sm sm:text-base">{student.mobile}</strong></div>
              </div>
            </div>
          </section>

          <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 sm:mb-6" aria-label="Fee summary">
            <article className="rounded-lg border border-[#e7e2d7] bg-[#fffefa] p-4 shadow-[0_5px_18px_rgba(24,32,54,0.04)] sm:p-5">
              <span className="text-xs font-semibold text-[#72766f]">Total fee</span>
              <strong className="mt-2 block text-2xl font-black text-[#182036] sm:text-[28px]">{formatAmount(student.totalFee)}</strong>
              <span className="mt-1 block text-[11px] text-[#898b84]">Current fee amount</span>
            </article>
            <article className="rounded-lg border border-[#e7e2d7] bg-[#fffefa] p-4 shadow-[0_5px_18px_rgba(24,32,54,0.04)] sm:p-5">
              <span className="text-xs font-semibold text-[#72766f]">Paid so far</span>
              <strong className="mt-2 block text-2xl font-black text-[#247653] sm:text-[28px]">{formatAmount(totalPaid)}</strong>
              <span className="mt-1 block text-[11px] text-[#898b84]">Across recorded payments</span>
            </article>
            <article className="rounded-lg border border-[#e7e2d7] bg-[#fffefa] p-4 shadow-[0_5px_18px_rgba(24,32,54,0.04)] sm:p-5">
              <span className="text-xs font-semibold text-[#72766f]">Balance remaining</span>
              <strong className="mt-2 block text-2xl font-black text-[#9a641c] sm:text-[28px]">{formatAmount(remainingFee)}</strong>
              <span className="mt-1 block text-[11px] text-[#898b84]">Amount yet to be paid</span>
            </article>
          </section>

          <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:gap-6">
            <section className="min-w-0 overflow-hidden rounded-lg border border-[#e7e2d7] bg-[#fffefa] shadow-[0_10px_28px_rgba(24,32,54,0.05)]" aria-label="Payment history">
              <div className="border-b border-[#e7e2d7] px-5 py-4 sm:px-6 sm:py-5">
                <h2 className="m-0 text-lg font-extrabold">Payment history</h2>
                <p className="mb-0 mt-1 text-xs text-[#72766f]">A record of your previous fee payments</p>
              </div>
              <ul className="m-0 divide-y divide-[#efede7] p-0">
                {student.paidHistory.map((entry, idx) => (
                  <li key={idx} className="flex min-w-0 items-center gap-3 px-5 py-4 sm:px-6">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-[#e7f3eb] text-sm font-bold text-[#247653]">✓</span>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-[#182036]">Fee payment</span>
                      <span className="mt-1 block text-xs text-[#72766f]">{entry.date}</span>
                    </div>
                    <strong className="shrink-0 text-sm font-extrabold text-[#247653] sm:text-base">{formatAmount(entry.amount)}</strong>
                  </li>
                ))}
              </ul>
            </section>

            <section className="overflow-hidden rounded-lg border border-[#e7e2d7] bg-[#fffefa] shadow-[0_10px_28px_rgba(24,32,54,0.05)]" aria-label="Pay fee">
              <div className="bg-[#182036] px-5 py-5 text-white sm:px-6">
                <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[1.5px] text-[#f4a73c]">Secure payment</p>
                <h2 className="m-0 text-lg font-extrabold">Pay your fee</h2>
                <p className="mb-0 mt-1 text-xs text-white/60">Choose an amount up to your remaining balance.</p>
              </div>
              <div className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between gap-3 rounded-md bg-[#f8f6f0] px-4 py-3">
                  <span className="text-xs font-semibold text-[#72766f]">Balance remaining</span>
                  <strong className="text-sm font-extrabold text-[#9a641c]">{formatAmount(remainingFee)}</strong>
                </div>
                <label htmlFor="pay-amount" className="mb-2 block text-xs font-bold text-[#434949]">Payment amount</label>
                <div className="flex h-12 items-center gap-2 rounded-md border border-[#dedbd2] bg-white px-3 transition focus-within:border-[#b98939] focus-within:ring-2 focus-within:ring-[#efaa432e]">
                  <span className="text-lg font-bold text-[#8a6b38]">₹</span>
                  <input
                    id="pay-amount"
                    type="number"
                    min="1"
                    max={remainingFee}
                    value={payAmount}
                    onChange={e => setPayAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="h-full w-full min-w-0 border-0 bg-transparent text-base font-semibold text-[#182036] outline-none placeholder:font-normal placeholder:text-[#9a9b95]"
                  />
                </div>
                <button
                  onClick={handlePaytmClick}
                  className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#f4a73c] px-4 py-3 text-sm font-extrabold text-[#182036] transition hover:bg-[#e99a2d] focus:outline-none focus:ring-2 focus:ring-[#182036] focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#e4e1d8] disabled:text-[#96958e]"
                  disabled={!payAmount || payAmount < 1 || payAmount > remainingFee}
                >
                  Pay with Paytm <span aria-hidden="true">→</span>
                </button>
                <p className="mb-0 mt-3 text-center text-[10px] leading-relaxed text-[#898b84]">You’ll continue to Paytm to complete your payment.</p>
              </div>
            </section>
          </div>
          <p className="mb-0 mt-6 text-center text-xs text-[#74776f]">For fee questions, contact the school office.</p>
        </div>
      </div>
    </LayoutStu>
  );
}

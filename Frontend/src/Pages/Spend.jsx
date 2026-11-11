import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';
import TeacherLayout from '../Components/TeacherLayout';
import { FaArrowLeft, FaCalendarAlt, FaCheckCircle, FaCreditCard, FaRupeeSign, FaWallet } from 'react-icons/fa';

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
      <main className="min-h-[calc(100vh-4rem)] bg-slate-100 px-3 pb-24 pt-20 sm:px-6 sm:pb-24 md:pb-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-11 lg:py-12">
              <div aria-hidden="true" className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[32px] border-white/5" />
              <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-indigo-400/10 blur-2xl" />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => navigate('/teacher-home')}
                  className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  <FaArrowLeft aria-hidden="true" />
                  Back to dashboard
                </button>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-400/20 text-2xl text-indigo-200 ring-1 ring-inset ring-white/15">
                  <FaWallet aria-hidden="true" />
                </div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-indigo-200">
                  Daily accounting
                </p>
                <h1 className="max-w-md text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  Record your daily spend
                </h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-indigo-100/75 sm:text-base">
                  Log the day's expenses to keep school accounting clear and up to date.
                </p>
                <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                  <FaCheckCircle className="shrink-0 text-emerald-300" aria-hidden="true" />
                  <span className="text-sm font-medium text-indigo-50/90">
                    Add the total amount and payment details
                  </span>
                </div>
              </div>
            </section>

            <section className="px-5 py-7 sm:px-9 sm:py-10 lg:px-11 lg:py-12">
              <div className="mb-7">
                <p className="text-sm font-bold text-indigo-600">EXPENSE ENTRY</p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Submit total spend
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter the daily total and choose how it was paid.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="spend-name" className="mb-2 block text-sm font-semibold text-slate-700">
                    Name <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="spend-name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Name of person"
                    autoComplete="name"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label htmlFor="spend-date" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FaCalendarAlt className="text-indigo-500" aria-hidden="true" />
                      Date
                    </label>
                    <input
                      id="spend-date"
                      type="date"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="spend-total" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FaRupeeSign className="text-indigo-500" aria-hidden="true" />
                      Total spend (INR)
                    </label>
                    <input
                      id="spend-total"
                      type="number"
                      step="0.01"
                      inputMode="decimal"
                      value={total}
                      onChange={(event) => setTotal(event.target.value)}
                      placeholder="Enter amount"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="spend-method" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <FaCreditCard className="text-indigo-500" aria-hidden="true" />
                    Payment method
                  </label>
                  <select
                    id="spend-method"
                    value={paymentMethod}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    required
                  >
                    <option value="">Select payment method</option>
                    <option value="Cash">Cash</option>
                    <option value="Account">Account</option>
                  </select>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setName('');
                      setTotal('');
                      setDate(new Date().toISOString().slice(0, 10));
                      setPaymentMethod('Cash');
                    }}
                    className="min-h-12 cursor-pointer rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 sm:min-w-28"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:translate-y-px sm:min-w-40"
                  >
                    <FaCheckCircle aria-hidden="true" />
                    Submit spend
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>
    </TeacherLayout>
  );
};

export default Spend;

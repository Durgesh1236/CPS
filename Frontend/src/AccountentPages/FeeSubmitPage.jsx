import React, { useEffect, useState } from 'react';
import { FaRupeeSign, FaUser, FaIdBadge, FaBook, FaFileUpload } from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

const fieldClassName =
  'mt-2 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100';

export const FeeSubmitPage = () => {
  const [ledgerId, setLedgerId] = useState('');
  const [studentName, setName] = useState('');
  const [stuclass, setStuClass] = useState('');
  const [backDues, setBackDues] = useState('');
  const [submitFees, setSubmitFees] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [dues, setDues] = useState(0);
  const [file, setFile] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const { FeesSubmit } = UserData();

  const fileChangeHandler = (e) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    setImagePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  useEffect(() => {
    const back = parseFloat(backDues) || 0;
    const submit = parseFloat(submitFees) || 0;
    setDues(Math.max(back - submit, 0));
  }, [backDues, submitFees]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const date =
      String(today.getDate()).padStart(2, '0') + '-' +
      String(today.getMonth() + 1).padStart(2, '0') + '-' +
      today.getFullYear();
    const formData = new FormData();
    formData.append('ledgerId', ledgerId);
    formData.append('studentName', studentName);
    formData.append('studentClass', stuclass);
    formData.append('backDues', backDues);
    formData.append('submitFees', submitFees);
    formData.append('dues', dues);
    formData.append('date', date);
    formData.append('file', file);
    formData.append('paymentMethod', paymentMethod || '');
    FeesSubmit(formData, setImagePreview);
  };

  return (
    <TeacherLayout>
      <div className="min-h-full bg-slate-100 px-3 pb-6 pt-20 sm:px-6 sm:pb-10 sm:pt-24">
        <div className="mx-auto w-full">
          <header className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-5 py-7 text-white shadow-lg shadow-indigo-900/10 sm:mb-8 sm:px-8 sm:py-9">
            <div className="flex items-start gap-4 sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl shadow-inner sm:h-14 sm:w-14 sm:text-2xl">
                <FaRupeeSign aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-indigo-200">
                  Accounts · Fee desk
                </p>
                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  Student fee submission
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-indigo-100 sm:text-base">
                  Record a student payment and attach its receipt in a few steps.
                </p>
              </div>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
            <div className="space-y-8 p-5 sm:space-y-9 sm:p-8 lg:p-10">
              <section aria-labelledby="student-details-heading">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-sm font-extrabold text-indigo-600">01</span>
                  <div>
                    <h2 id="student-details-heading" className="font-bold text-slate-900">Student details</h2>
                    <p className="text-sm text-slate-500">Identify the student receiving the payment.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="ledgerId">
                      <FaIdBadge aria-hidden="true" className="text-indigo-500" /> Ledger ID
                    </label>
                    <input
                      id="ledgerId"
                      name="ledgerId"
                      type="text"
                      value={ledgerId}
                      onChange={(e) => setLedgerId(e.target.value)}
                      className={fieldClassName}
                      placeholder="Enter ledger ID"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="studentName">
                      <FaUser aria-hidden="true" className="text-indigo-500" /> Student name
                    </label>
                    <input
                      id="studentName"
                      name="studentName"
                      type="text"
                      value={studentName}
                      onChange={(e) => setName(e.target.value)}
                      className={fieldClassName}
                      placeholder="Enter full name"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="studentClass">
                      <FaBook aria-hidden="true" className="text-indigo-500" /> Class
                    </label>
                    <select
                      id="studentClass"
                      name="studentClass"
                      value={stuclass}
                      onChange={(e) => setStuClass(e.target.value)}
                      className={fieldClassName}
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
                </div>
              </section>

              <section aria-labelledby="payment-details-heading" className="border-t border-slate-100 pt-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-sm font-extrabold text-emerald-600">02</span>
                  <div>
                    <h2 id="payment-details-heading" className="font-bold text-slate-900">Payment details</h2>
                    <p className="text-sm text-slate-500">Enter the dues and payment being collected.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="backDues">
                      <FaRupeeSign aria-hidden="true" className="text-emerald-600" /> Previous dues
                    </label>
                    <input
                      id="backDues"
                      name="backDues"
                      type="number"
                      min="0"
                      step="0.01"
                      value={backDues}
                      onChange={(e) => setBackDues(e.target.value)}
                      className={fieldClassName}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="submitFees">
                      <FaRupeeSign aria-hidden="true" className="text-emerald-600" /> Fee collected
                    </label>
                    <input
                      id="submitFees"
                      name="submitFees"
                      type="number"
                      min="0"
                      step="0.01"
                      value={submitFees}
                      onChange={(e) => setSubmitFees(e.target.value)}
                      className={fieldClassName}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700" htmlFor="dues">
                      Remaining dues
                    </label>
                    <div className="relative">
                      <FaRupeeSign aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        id="dues"
                        name="dues"
                        type="number"
                        value={dues}
                        readOnly
                        className={`mt-2 w-full min-w-0 rounded-xl border px-4 py-3 pl-10 text-base font-bold outline-none ${
                          dues === 0
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border-amber-200 bg-amber-50 text-amber-800'
                        }`}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500">Calculated from previous dues minus the amount collected.</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-slate-700" htmlFor="paymentMethod">Payment method</label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className={fieldClassName}
                      required
                    >
                      <option value="">Select payment method</option>
                      <option value="cash">Cash</option>
                      <option value="account">Account</option>
                    </select>
                  </div>
                </div>
              </section>

              <section aria-labelledby="receipt-heading" className="border-t border-slate-100 pt-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-sm font-extrabold text-violet-600">03</span>
                  <div>
                    <h2 id="receipt-heading" className="font-bold text-slate-900">Receipt image</h2>
                    <p className="text-sm text-slate-500">Attach a photo of the fee receipt (optional).</p>
                  </div>
                </div>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-center transition hover:border-indigo-300 hover:bg-indigo-50/50">
                  <FaFileUpload aria-hidden="true" className="mb-3 text-2xl text-indigo-500" />
                  <span className="text-sm font-semibold text-slate-700">Choose a receipt image</span>
                  <span className="mt-1 text-xs text-slate-500">Image files only · Use your camera on mobile</span>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    capture="environment"
                    onChange={fileChangeHandler}
                    className="sr-only"
                  />
                </label>
                {file && <p className="mt-2 break-all text-center text-xs text-slate-500">{file.name}</p>}
                {imagePreview && (
                  <div className="mt-5 flex flex-col items-center">
                    <img
                      src={imagePreview}
                      alt="Fee receipt preview"
                      className="max-h-64 max-w-full rounded-xl border border-slate-200 object-contain shadow-sm"
                    />
                    <span className="mt-2 text-xs font-medium text-slate-500">Receipt preview</span>
                  </div>
                )}
              </section>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-100 bg-slate-50/80 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
              <p className="text-center text-xs leading-relaxed text-slate-500 sm:text-left">
                Please check the student and payment details before submitting.
              </p>
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:scale-[0.99] sm:w-auto"
              >
                Submit fee payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </TeacherLayout>
  );
};

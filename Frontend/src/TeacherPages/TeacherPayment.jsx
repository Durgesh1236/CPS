import { useState } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaCreditCard, FaMobileAlt, FaRupeeSign, FaUserTie } from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

const fieldClassName =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100';

const TeacherPayment = () => {
  const { teacherList, TeacherPayment: submitPayment, teacherPaymentList, getTeacherPaymentList, loading } = UserData();
  const [formData, setFormData] = useState({
    teacherId: '',
    mobileNumber: '',
    month: '',
    paymentDate: '',
    amount: '',
    paymentMethod: '',
  });
  
  const handleChange = (event) => {
    setFormData((previousForm) => ({
      ...previousForm,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await submitPayment({
      teacherId: formData.teacherId,
      mobileNumber: formData.mobileNumber,
      submitMonth: formData.month,
      submitedDate: formData.paymentDate,
      teacherPaid: Number(formData.amount),
      paymentMethod: formData.paymentMethod,
    });
    if (success) {
      setFormData({
        teacherId: '',
        mobileNumber: '',
        month: '',
        paymentDate: '',
        amount: '',
        paymentMethod: '',
      });
    }
  };

  return (
    <TeacherLayout>
      <main className="h-full bg-slate-100 px-3 pb-24 pt-20 sm:px-6 sm:pb-24 md:pb-10">
        <div className="mx-auto w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-11 lg:py-12">
              <div aria-hidden="true" className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[32px] border-white/5" />
              <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-indigo-400/10 blur-2xl" />

              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-400/20 text-2xl text-indigo-200 ring-1 ring-inset ring-white/15">
                  <FaCreditCard aria-hidden="true" />
                </div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-indigo-200">
                  Staff payroll
                </p>
                <h1 className="max-w-md text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  Record a teacher payment
                </h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-indigo-100/75 sm:text-base">
                  Enter the payment details below to keep staff salary records organized.
                </p>
                <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3">
                  <FaCheckCircle className="shrink-0 text-emerald-300" aria-hidden="true" />
                  <span className="text-sm font-medium text-indigo-50/90">
                    Review details before submitting
                  </span>
                </div>
              </div>
            </section>

            <section className="px-5 py-7 sm:px-9 sm:py-10 lg:px-11 lg:py-12">
              <div className="mb-7">
                <p className="text-sm font-bold text-indigo-600">PAYMENT DETAILS</p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Teacher payment
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Complete each field to record a staff payment.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="min-w-0">
                    <label htmlFor="teacherId" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FaUserTie className="text-indigo-500" aria-hidden="true" />
                      Teacher
                    </label>
                    <select
                      id="teacherId"
                      name="teacherId"
                      value={formData.teacherId}
                      onChange={handleChange}
                      className={fieldClassName}
                      required
                    >
                      <option value="">Select a teacher</option>
                      {teacherList.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>
                          {teacher.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="mobileNumber" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FaMobileAlt className="text-indigo-500" aria-hidden="true" />
                      Mobile number
                    </label>
                    <input
                      id="mobileNumber"
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      maxLength="10"
                      placeholder="Enter mobile number"
                      className={fieldClassName}
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="month" className="mb-2 block text-sm font-semibold text-slate-700">
                      Payment month
                    </label>
                    <select
                      id="month"
                      name="month"
                      value={formData.month}
                      onChange={handleChange}
                      className={fieldClassName}
                      required
                    >
                      <option value="">Select month</option>
                      {[
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December',
                      ].map((month) => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="paymentDate" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FaCalendarAlt className="text-indigo-500" aria-hidden="true" />
                      Payment date
                    </label>
                    <input
                      id="paymentDate"
                      type="date"
                      name="paymentDate"
                      value={formData.paymentDate}
                      onChange={handleChange}
                      className={fieldClassName}
                      required
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="paymentMethod" className="mb-2 block text-sm font-semibold text-slate-700">
                      Payment method
                    </label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className={fieldClassName}
                      required
                    >
                      <option value="">Select payment method</option>
                      <option value="Account">Account</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="amount" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FaRupeeSign className="text-indigo-500" aria-hidden="true" />
                      Amount
                    </label>
                    <input
                      id="amount"
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Enter payment amount"
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      className={fieldClassName}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || teacherList.length === 0}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:translate-y-px"
                >
                  <FaCreditCard aria-hidden="true" />
                  {loading ? 'Saving…' : 'Submit payment'}
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </TeacherLayout>
  );
};

export default TeacherPayment;

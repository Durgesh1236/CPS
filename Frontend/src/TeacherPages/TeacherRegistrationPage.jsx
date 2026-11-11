import React, { useState } from 'react';
import {
  FaArrowLeft,
  FaCheckCircle,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUser,
  FaUserCheck,
  FaUserTie,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

const initialForm = {
  name: '',
  email: '',
  mobile: '',
  password: '',
  role: 'teacher',
};

const inputClassName =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100';

const TeacherRegistrationPage = () => {
  const [form, setForm] = useState(initialForm);
  const { registerTeacher, loading } = UserData();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({
      ...previousForm,
      [name]: name === 'email' ? value.toLowerCase() : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerTeacher(form.name, form.email, form.password, form.mobile, form.role, setForm);
  };

  return (
    <TeacherLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-slate-100 px-3 pb-24 pt-20 sm:px-6 sm:pb-24 md:pb-10">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900 px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-11 lg:py-12">
              <div aria-hidden="true" className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[32px] border-white/5" />
              <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-indigo-400/10 blur-2xl" />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => navigate('/teacher-home')}
                  className="mb-9 inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/20"
                >
                  <FaArrowLeft aria-hidden="true" />
                  Back to dashboard
                </button>

                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-400/20 text-2xl text-indigo-200 ring-1 ring-inset ring-white/15">
                  <FaUserCheck aria-hidden="true" />
                </div>
                <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-indigo-200">
                  Central Public School
                </p>
                <h1 className="max-w-md text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                  Add a new member to your team
                </h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-indigo-100/75 sm:text-base">
                  Create a staff account with secure access to the school dashboard.
                  Enter their details to get started.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-indigo-50/90">
                    <FaCheckCircle className="shrink-0 text-emerald-300" aria-hidden="true" />
                    Quick and secure account setup
                  </div>
                  <div className="flex items-center gap-3 text-sm text-indigo-50/90">
                    <FaCheckCircle className="shrink-0 text-emerald-300" aria-hidden="true" />
                    Role-based access for your staff
                  </div>
                </div>
              </div>
            </section>

            <section className="px-5 py-7 sm:px-9 sm:py-10 lg:px-11 lg:py-12">
              <div className="mb-7">
                <p className="text-sm font-bold text-indigo-600">STAFF ACCOUNT</p>
                <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Teacher registration
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Complete the form below. All fields are required.
                </p>
              </div>

              {loading ? (
                <div
                  className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-2xl bg-slate-50"
                  role="status"
                  aria-live="polite"
                >
                  <RingLoader color="#4f46e5" size={58} />
                  <p className="text-sm font-medium text-slate-600">Creating staff account…</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label htmlFor="name" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <FaUser className="text-indigo-500" aria-hidden="true" />
                        Full name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Enter full name"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClassName}
                        required
                      />
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="email" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <FaEnvelope className="text-indigo-500" aria-hidden="true" />
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@school.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClassName}
                        required
                      />
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="mobile" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <FaPhone className="text-indigo-500" aria-hidden="true" />
                        Mobile number
                      </label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        placeholder="10-digit mobile number"
                        value={form.mobile}
                        onChange={handleChange}
                        className={inputClassName}
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                        title="Enter a 10-digit mobile number"
                      />
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="password" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <FaLock className="text-indigo-500" aria-hidden="true" />
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Create a password"
                        value={form.password}
                        onChange={handleChange}
                        className={inputClassName}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="role" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <FaUserTie className="text-indigo-500" aria-hidden="true" />
                      Staff role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className={inputClassName}
                      required
                    >
                      <option value="teacher">Teacher</option>
                      <option value="accountent">Accountent</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="flex min-h-12 w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 active:translate-y-px"
                  >
                    Create staff account
                  </button>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherRegistrationPage;

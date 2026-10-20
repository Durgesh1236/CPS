import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';
import { StudentData } from '../context/Student';
import { useMathChallenge } from '../hooks/useMathChallenge';

const LoginPage = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const mathChallenge = useMathChallenge();
  const navigate = useNavigate();
  const { StudentLogin } = StudentData();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mathChallenge.verify()) return;
    StudentLogin(studentId, password, navigate);
    setStudentId('');
    setPassword('');
  };

  return (
    <Layout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .barcode-strip {
          background-image: repeating-linear-gradient(
            90deg,
            #1E2540 0px, #1E2540 2px,
            transparent 2px, transparent 5px,
            #1E2540 5px, #1E2540 6px,
            transparent 6px, transparent 10px,
            #1E2540 10px, #1E2540 13px,
            transparent 13px, transparent 16px
          );
          opacity: 0.85;
        }
      `}</style>

      <div className="font-body flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-[#F3F1EC] px-3 sm:px-4">
  <div className="my-0 grid max-h-full w-full max-w-4xl grid-cols-1 overflow-y-auto rounded-2xl bg-white shadow-[0_20px_60px_-15px_rgba(30,37,64,0.35)] sm:rounded-3xl lg:grid-cols-[0.85fr_1.15fr]">
          {/* Badge / branding panel */}
          <div className="relative bg-[#1E2540] px-6 py-6 lg:py-10 flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 lg:gap-8">
            {/* punch hole + clip, desktop only */}
            <div className="hidden lg:flex flex-col items-center absolute top-6 left-1/2 -translate-x-1/2">
              <div className="w-10 h-3 rounded-full bg-[#0F1428]" />
              <div className="w-4 h-4 rounded-full bg-[#F3F1EC] mt-1 ring-4 ring-[#0F1428]/40" />
            </div>

            <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:mt-16 lg:gap-6 w-full">
              <div className="w-11 h-11 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full bg-[#D9A441] flex items-center justify-center font-display font-800 text-[#1E2540] text-lg lg:text-2xl ring-4 ring-white/10 shrink-0">
                ID
              </div>
              <div>
                <p className="font-display text-[10px] sm:text-xs tracking-[0.25em] text-[#D9A441] uppercase mb-1">
                  Campus Access
                </p>
                <h1 className="font-display font-700 text-white text-xl sm:text-2xl lg:text-3xl leading-tight">
                  Student Portal
                </h1>
              </div>
            </div>

            <p className="hidden lg:block text-white/60 text-sm leading-relaxed lg:mt-auto lg:pt-10">
              Sign in with your Student ID to view grades, attendance and course materials.
            </p>
          </div>

          {/* Form panel */}
          <div className="px-5 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-7">
            <div className="mb-4 sm:mb-5">
              <h2 className="font-display font-700 text-2xl sm:text-3xl text-[#1E2540]">
                Welcome back
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Enter your credentials to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label
                  htmlFor="loginId"
                  className="block text-[11px] font-display font-600 tracking-wider uppercase text-slate-500 mb-1.5"
                >
                  Student ID
                </label>
                <input
                  id="loginId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. STU-20451"
                  className="w-full px-0 py-2.5 bg-transparent border-0 border-b-2 border-slate-200 text-[#1E2540] placeholder:text-slate-300 focus:outline-none focus:border-[#D9A441] transition-colors"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-[11px] font-display font-600 tracking-wider uppercase text-slate-500 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-0 py-2.5 pr-10 bg-transparent border-0 border-b-2 border-slate-200 text-[#1E2540] placeholder:text-slate-300 focus:outline-none focus:border-[#D9A441] transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-[#1E2540] transition-colors"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="studentCaptchaAnswer"
                  className="block text-[11px] font-display font-600 tracking-wider uppercase text-slate-500 mb-1.5"
                >
                  Hexadecimal verification
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-lg border border-[#E8C46A] bg-[#FFF8E7] px-3 py-2 font-semibold text-[#1E2540]" aria-live="polite">
                    Enter <span className="ml-1 font-mono tracking-widest">{mathChallenge.code}</span>
                  </span>
                  <input
                    id="studentCaptchaAnswer"
                    type="text"
                    autoComplete="off"
                    spellCheck="false"
                    maxLength={4}
                    value={mathChallenge.answer}
                    onChange={(e) => mathChallenge.updateAnswer(e.target.value)}
                    aria-describedby={mathChallenge.error ? 'studentCaptchaError' : undefined}
                    aria-invalid={Boolean(mathChallenge.error)}
                    placeholder="Enter code"
                    className="w-32 rounded-lg border border-[#E8C46A] bg-white px-3 py-2 font-mono uppercase tracking-widest text-[#1E2540] outline-none transition focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={mathChallenge.refresh}
                    className="text-sm font-semibold text-[#1E2540] underline underline-offset-2 hover:text-[#D9A441]"
                  >
                    New code
                  </button>
                </div>
                {mathChallenge.error && (
                  <p id="studentCaptchaError" role="alert" className="mt-2 text-sm text-red-600">
                    {mathChallenge.error}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                  className="mt-0.5 w-4 h-4 accent-[#D9A441] shrink-0"
                  required
                />
                <label htmlFor="terms" className="text-xs sm:text-sm text-slate-500 leading-snug">
                  I agree to the{' '}
                  <a href="#" className="text-[#1E2540] font-600 underline decoration-[#D9A441] decoration-2 underline-offset-2">
                    terms and conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-[#1E2540] text-white font-display font-600 py-3 rounded-lg hover:bg-[#2A3357] active:scale-[0.99] transition-all shadow-lg shadow-[#1E2540]/20"
              >
                Sign In
              </button>
            </form>

            {/* barcode divider */}
            <div className="my-3 h-4 barcode-strip rounded-sm sm:my-4" />

            <button
              onClick={() => navigate('/teacher-login')}
              className="w-full cursor-pointer flex items-center justify-center gap-2 border-2 border-[#D9A441] text-[#1E2540] font-display font-600 text-sm py-2 rounded-lg hover:bg-[#D9A441]/10 transition-colors"
            >
              Continue as Teacher
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
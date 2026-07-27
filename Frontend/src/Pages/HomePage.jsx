import { useEffect, useRef, useState } from 'react';
import Layout from '../Components/Layout';
import { assets } from '../assets/assets';
import ContactUs from './ContactUs';
import { FcReddit } from "react-icons/fc";

// ---- Content -----------------------------------------------------------

const images = [assets.cps1, assets.cps2, assets.cps4, assets.cps3];

const teacherImages = [assets.cps1, assets.cps2, assets.cps3, assets.cps4];

const totalStudents = 600;
const totalTeachers = 25;
const foundedYear = 2009;

const director = {
  name: 'Mr. Pawan Kumar Jha Pankaj',
  contact: '+91 9801496128',
  role: 'Director',
  message: 'Every child who walks through our gates carries a spark. Our job is simply to protect it, and let it grow.',
  image: assets.director,
};

const principal = {
  name: 'Mrs. Shadhana Kumari',
  contact: '+91 9006664115',
  role: 'Principal',
  message: 'We measure success not in marksheets alone, but in the kindness and confidence our students carry with them.',
  image: assets.principal,
};

// WhatsApp number is derived from the director's contact — update here if it should be a different line.
const whatsappNumber = director.contact.replace(/[^0-9]/g, '');
const whatsappMessage = "Hi! I'd like to know more about admissions at Central Public School.";
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

// Monthly fee structure shown by the chat assistant — update the numbers here if fees change.
const feeStructure = [
  { classes: 'Play Group / Nursery to UKG', fee: 500 },
  { classes: 'Class 1 to Class 8', fee: 550 },
];

const schoolDescription = `Established in 2009, Central Public School is a trusted name in quality education, offering classes from Nursery to Class 8. We are more than just a school — we are a nurturing family where every child is valued, encouraged, and guided to achieve their full potential.
Our safe and welcoming campus, experienced faculty, and student-focused environment make learning a joyful journey. Along with strong academics, we focus on character-building, creativity, discipline, and values that prepare your child not just for exams, but for life.
Join us in shaping bright futures with love, care, and excellence — because your child's growth is our greatest reward.`;

const features = [
  { title: 'Experienced Faculty', desc: 'Caring, qualified teachers who know every child by name.', icon: 'cap' },
  { title: 'Safe & Secure Campus', desc: 'A watched, well-kept campus and trained support staff.', icon: 'shield' },
  { title: 'Smart Classrooms', desc: 'Interactive, tech-enabled learning beyond the textbook.', icon: 'monitor' },
  { title: 'Value-Based Education', desc: 'Character, discipline and empathy taught alongside academics.', icon: 'heart' },
  { title: 'Sports & Activities', desc: 'Games, art and co-curricular activities for all-round growth.', icon: 'ball' },
  { title: 'Individual Attention', desc: 'Small class sizes, so no child is ever left behind.', icon: 'users' },
];

const academicStages = [
  { stage: 'Pre-Primary', classes: 'Nursery – UKG', desc: 'Play-based learning that builds curiosity and confidence.' },
  { stage: 'Primary', classes: 'Class 1 – 5', desc: 'Strong foundations in language, mathematics and science.' },
  { stage: 'Middle', classes: 'Class 6 – 8', desc: 'Deeper subject learning, critical thinking and life skills.' },
];

// ---- Small helpers -------------------------------------------------------

// Reveals a section with a gentle rise-and-fade as it scrolls into view.
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const Reveal = ({ children, className = '', delay = 0, as: Tag = 'div' }) => {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`cps-reveal ${visible ? 'cps-reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

const FeatureIcon = ({ name }) => {
  const common = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'cap':
      return (
        <svg {...common}><path d="M12 3 2 8l10 5 10-5-10-5Z" /><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" /></svg>
      );
    case 'shield':
      return (
        <svg {...common}><path d="M12 3 4 6v6c0 4.5 3.4 7.7 8 9 4.6-1.3 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></svg>
      );
    case 'monitor':
      return (
        <svg {...common}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>
      );
    case 'heart':
      return (
        <svg {...common}><path d="M12 20s-7-4.4-9.5-9C.9 7.4 3 4 6.5 4 9 4 11 6 12 7.5 13 6 15 4 17.5 4 21 4 23.1 7.4 21.5 11 19 15.6 12 20 12 20Z" /></svg>
      );
    case 'ball':
      return (
        <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18M5.5 5.5c3 3 10 3 13 0M5.5 18.5c3-3 10-3 13 0" /></svg>
      );
    case 'users':
      return (
        <svg {...common}><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" /><circle cx="17.5" cy="9.5" r="2.3" /><path d="M22 20c0-2.6-2-4.8-4.7-5.6" /></svg>
      );
    default:
      return null;
  }
};

// Collects student name, parent name and mobile number, then answers common
// admission questions. Anything it can't answer directly hands off to
// WhatsApp with all the collected context pre-filled, so no reply is lost.
const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState('name'); // name -> parent -> mobile -> menu
  const [form, setForm] = useState({ studentName: '', parentName: '', mobile: '' });
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! 👋 I'm the CPS admission assistant. Let's start with your child's name." },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, open]);

  const buildWaLink = (query, latestForm) => {
    const f = latestForm || form;
    const msg = `Hi, I'm ${f.parentName || 'a parent'} (parent of ${f.studentName || 'my child'}). Mobile: ${f.mobile || '-'}. Query: ${query}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const respond = (query, latestForm) => {
    const q = query.toLowerCase();
    let reply;
    let needsCta = false;
    if (q.includes('fee')) {
      reply = `Here's our fee structure:\n${feeStructure.map((f) => `• ${f.classes}: ₹${f.fee} per month`).join('\n')}\n\nThis is indicative — please confirm with the school office for the current session.`;
    } else if (q.includes('admission') || q.includes('admit')) {
      reply = `Admissions for 2026–27 are open, Nursery to Class 8! I'll pass your details to our admissions team — tap below to confirm on WhatsApp.`;
      needsCta = true;
    } else if (q.includes('contact') || q.includes('number') || q.includes('phone') || q.includes('call')) {
      reply = `You can reach us directly:\nDirector — ${director.contact}\nPrincipal — ${principal.contact}\n\nOr tap below to message us on WhatsApp.`;
      needsCta = true;
    } else if (q.includes('time') || q.includes('timing')) {
      reply = `For exact school timings, it's best to confirm with our office — tap below to chat on WhatsApp.`;
      needsCta = true;
    } else {
      reply = `Thanks! I've noted your question. Let's continue on WhatsApp so our team can help you directly.`;
      needsCta = true;
    }
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: reply, link: needsCta ? buildWaLink(query, latestForm) : null }]);
    }, 400);
  };

  const handleSend = (raw) => {
    const text = (raw ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');

    if (stage === 'name') {
      setForm((f) => ({ ...f, studentName: text }));
      setStage('parent');
      setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: "Nice to meet you! And what's the parent's or guardian's name?" }]), 300);
      return;
    }
    if (stage === 'parent') {
      setForm((f) => ({ ...f, parentName: text }));
      setStage('mobile');
      setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: `Thanks, ${text}. Could you share a 10-digit mobile number so our team can reach you?` }]), 300);
      return;
    }
    if (stage === 'mobile') {
      const digits = text.replace(/[^0-9]/g, '');
      if (digits.length < 10) {
        setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: "That doesn't look like a valid mobile number — could you enter a 10-digit number?" }]), 300);
        return;
      }
      const updatedForm = { ...form, mobile: digits };
      setForm(updatedForm);
      setStage('menu');
      setTimeout(() => setMessages((m) => [...m, { from: 'bot', text: 'Got it! How can I help — new admission, fee structure, or our contact number? You can also just type your question below.' }]), 300);
      return;
    }
    respond(text, form);
  };

  const quickReplies = ['Fee Structure', 'New Admission', 'Contact Number'];

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat assistant' : 'Chat with CPS admission assistant'}
        className="cps-chat-fab w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        style={{ background: 'var(--cps-ink)' }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        ) : (
          <FcReddit size={30} />
        )}
      </button>

      {open && (
        <div className="cps-chat-panel">
          <div className="cps-chat-header">
            <span className="cps-display font-bold block">CPS Admission Assistant</span>
            <span className="text-xs text-white/80">Ask about admissions, fees or timings</span>
          </div>
          <div className="cps-chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`cps-chat-msg ${m.from === 'bot' ? 'cps-chat-bot' : 'cps-chat-user'}`}>
                <div>
                  {m.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
                {m.link && (
                  <a href={m.link} target="_blank" rel="noopener noreferrer" className="cps-chat-wa-btn">
                    Continue on WhatsApp
                  </a>
                )}
              </div>
            ))}
            {stage === 'menu' && (
              <div className="cps-chat-quickreplies">
                {quickReplies.map((qr) => (
                  <button key={qr} onClick={() => handleSend(qr)} className="cps-chat-chip">
                    {qr}
                  </button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form
            className="cps-chat-input-row"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                stage === 'name'
                  ? "Child's name..."
                  : stage === 'parent'
                  ? "Parent's name..."
                  : stage === 'mobile'
                  ? '10-digit mobile number...'
                  : 'Type your question...'
              }
              className="cps-chat-input"
            />
            <button type="submit" className="cps-chat-send" aria-label="Send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M3 12 21 3l-4 18-6-7-8-2Z" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

// ---- Page ----------------------------------------------------------------

const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const [teacherCurrent, setTeacherCurrent] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const studentInterval = useRef();
  const teacherInterval = useRef();
  const yearsInterval = useRef();

  const yearsOfLegacy = new Date().getFullYear() - foundedYear;

  // Image carousel auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Teacher celebration carousel auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setTeacherCurrent((prev) => (prev + 1) % teacherImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Animated student count
  useEffect(() => {
    studentInterval.current = setInterval(() => {
      setStudentCount((prev) => {
        if (prev < totalStudents) return prev + 10;
        clearInterval(studentInterval.current);
        return totalStudents;
      });
    }, 20);
    return () => clearInterval(studentInterval.current);
  }, []);

  // Animated teacher count
  useEffect(() => {
    teacherInterval.current = setInterval(() => {
      setTeacherCount((prev) => {
        if (prev < totalTeachers) return prev + 1;
        clearInterval(teacherInterval.current);
        return totalTeachers;
      });
    }, 40);
    return () => clearInterval(teacherInterval.current);
  }, []);

  // Animated years-of-legacy count
  useEffect(() => {
    yearsInterval.current = setInterval(() => {
      setYearsCount((prev) => {
        if (prev < yearsOfLegacy) return prev + 1;
        clearInterval(yearsInterval.current);
        return yearsOfLegacy;
      });
    }, 90);
    return () => clearInterval(yearsInterval.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="cps-home w-full min-h-screen flex flex-col" style={{ background: 'var(--cps-cream)' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

          .cps-home {
            --cps-ink: #1B2A4A;
            --cps-marigold: #F5A623;
            --cps-leaf: #2F9E44;
            --cps-cream: #FBF6EC;
            --cps-coral: #E85B45;
            --cps-slate: #3D4451;
            font-family: 'Inter', system-ui, sans-serif;
            color: var(--cps-slate);
            overflow-x: hidden;
          }
          .cps-home .cps-display {
            font-family: 'Baloo 2', 'Inter', sans-serif;
          }

          /* Scroll reveal */
          .cps-reveal {
            opacity: 0;
            transform: translateY(26px);
            transition: opacity 0.7s ease, transform 0.7s ease;
          }
          .cps-reveal-in {
            opacity: 1;
            transform: translateY(0);
          }

          /* Admission banner */
          .cps-admission-banner {
            background: linear-gradient(90deg, var(--cps-coral), var(--cps-marigold));
            color: #fff;
          }
          .cps-badge-pulse {
            animation: cps-pulse 2.2s ease-in-out infinite;
          }
          @keyframes cps-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.06); }
          }

          /* Floating doodles in hero */
          .cps-doodle {
            position: absolute;
            color: rgba(255,255,255,0.85);
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
          }
          .cps-doodle-1 { animation: cps-float-a 6s ease-in-out infinite; }
          .cps-doodle-2 { animation: cps-float-b 7s ease-in-out infinite; }
          .cps-doodle-3 { animation: cps-float-c 5.5s ease-in-out infinite; }
          .cps-doodle-4 { animation: cps-float-a 8s ease-in-out infinite; }
          @keyframes cps-float-a {
            0%, 100% { transform: translateY(0) rotate(-4deg); }
            50% { transform: translateY(-16px) rotate(4deg); }
          }
          @keyframes cps-float-b {
            0%, 100% { transform: translateY(0) rotate(3deg); }
            50% { transform: translateY(14px) rotate(-5deg); }
          }
          @keyframes cps-float-c {
            0%, 100% { transform: translate(0,0) rotate(0deg); }
            50% { transform: translate(-10px,-10px) rotate(-6deg); }
          }

          /* Floating WhatsApp button */
          .cps-whatsapp-fab {
            position: fixed;
            right: 18px;
            bottom: 18px;
            z-index: 50;
          }
          .cps-whatsapp-ring {
            position: absolute;
            inset: 0;
            border-radius: 9999px;
            background: #25D366;
            animation: cps-ring 2.4s ease-out infinite;
          }
          @keyframes cps-ring {
            0% { transform: scale(1); opacity: 0.55; }
            100% { transform: scale(1.8); opacity: 0; }
          }

          /* Notebook-style divider */
          .cps-notebook-line {
            border-top: 2px dashed rgba(27,42,74,0.15);
          }

          /* Academic path connector */
          .cps-path-dot {
            width: 14px; height: 14px; border-radius: 9999px;
            background: var(--cps-marigold);
            border: 3px solid var(--cps-cream);
            box-shadow: 0 0 0 2px var(--cps-marigold);
          }

          /* Chat assistant */
          .cps-chat-fab {
            position: fixed;
            left: 18px;
            bottom: 18px;
            z-index: 50;
          }
          .cps-chat-panel {
            position: fixed;
            left: 18px;
            bottom: 90px;
            z-index: 50;
            width: min(340px, 90vw);
            max-height: min(480px, 70vh);
            background: #fff;
            border-radius: 18px;
            box-shadow: 0 12px 32px rgba(27,42,74,0.25);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform-origin: bottom left;
            animation: cps-chat-in 0.22s ease;
          }
          @keyframes cps-chat-in {
            from { opacity: 0; transform: scale(0.9) translateY(8px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .cps-chat-header {
            background: var(--cps-ink);
            color: #fff;
            padding: 12px 16px;
          }
          .cps-chat-body {
            flex: 1;
            overflow-y: auto;
            padding: 14px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: var(--cps-cream);
          }
          .cps-chat-msg {
            max-width: 85%;
            padding: 8px 12px;
            border-radius: 12px;
            font-size: 0.85rem;
            line-height: 1.4;
          }
          .cps-chat-bot {
            align-self: flex-start;
            background: #fff;
            color: var(--cps-slate);
            border-bottom-left-radius: 2px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          }
          .cps-chat-user {
            align-self: flex-end;
            background: var(--cps-ink);
            color: #fff;
            border-bottom-right-radius: 2px;
          }
          .cps-chat-wa-btn {
            display: inline-block;
            margin-top: 8px;
            background: #25D366;
            color: #fff;
            font-weight: 700;
            font-size: 0.78rem;
            padding: 6px 12px;
            border-radius: 9999px;
          }
          .cps-chat-quickreplies {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
          }
          .cps-chat-chip {
            background: #fff;
            border: 1px solid rgba(27,42,74,0.2);
            color: var(--cps-ink);
            font-size: 0.78rem;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 9999px;
          }
          .cps-chat-chip:hover {
            background: rgba(245,166,35,0.15);
          }
          .cps-chat-input-row {
            display: flex;
            gap: 8px;
            padding: 10px;
            border-top: 1px solid rgba(27,42,74,0.1);
            background: #fff;
          }
          .cps-chat-input {
            flex: 1;
            border: 1px solid rgba(27,42,74,0.2);
            border-radius: 9999px;
            padding: 8px 14px;
            font-size: 0.85rem;
            outline: none;
          }
          .cps-chat-input:focus {
            border-color: var(--cps-marigold);
          }
          .cps-chat-send {
            width: 36px;
            height: 36px;
            border-radius: 9999px;
            background: var(--cps-coral);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          @media (prefers-reduced-motion: reduce) {
            .cps-reveal, .cps-doodle, .cps-badge-pulse, .cps-whatsapp-ring, .cps-chat-panel {
              animation: none !important;
              transition: none !important;
              opacity: 1 !important;
              transform: none !important;
            }
            .cps-whatsapp-ring { display: none; }
          }
        `}</style>

        {/* ===================== Admission Banner ===================== */}
        <div className="cps-admission-banner w-full">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-3 text-center">
            <span className="cps-badge-pulse cps-display bg-white/20 border border-white/40 rounded-full px-3 py-1 text-xs sm:text-sm font-bold tracking-wide uppercase">
              Admissions Open
            </span>
            <p className="font-semibold text-sm sm:text-base">
              Session 2026–27 &middot; Nursery to Class 8 &middot; Seats filling fast
            </p>
            <a
              href="#cps-contact"
              className="ml-1 bg-white text-[var(--cps-coral)] font-bold text-sm px-4 py-1.5 rounded-full shadow hover:scale-105 transition-transform"
            >
              Enquire Now
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] text-white font-bold text-sm px-4 py-1.5 rounded-full shadow hover:scale-105 transition-transform"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.2 1.6 2.5 4 3.5.6.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* ===================== Hero ===================== */}
        <div className="relative w-full max-w-6xl mx-auto mt-6 px-4">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={images[current]}
              alt={`Central Public School campus ${current + 1}`}
              className="w-full h-[320px] sm:h-[420px] md:h-[520px] object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--cps-ink)]/80 via-[var(--cps-ink)]/10 to-transparent" />

            {/* Floating doodles */}
            <svg className="cps-doodle cps-doodle-1" style={{ top: '12%', left: '8%', width: 34, height: 34 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 20l1-4L18 11l3 3-5 5-4 1Z" /><path d="m16 8 3 3" /></svg>
            <svg className="cps-doodle cps-doodle-2" style={{ top: '18%', right: '10%', width: 30, height: 30 }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.6 5.9 20.6l1.4-6.8-5.1-4.7 6.9-.8L12 2Z" /></svg>
            <svg className="cps-doodle cps-doodle-3" style={{ bottom: '14%', left: '14%', width: 32, height: 32 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5c4-2 8-2 8 0v14c0-2-4-2-8 0V5Z" /><path d="M20 5c-4-2-8-2-8 0v14c0-2 4-2 8 0V5Z" /></svg>
            <svg className="cps-doodle cps-doodle-4" style={{ bottom: '20%', right: '12%', width: 28, height: 28 }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 4 3 6 3 9h8c0-3 3-5 3-9a7 7 0 0 0-7-7Z" opacity="0.9" /></svg>

            {/* Hero copy */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white">
              <span className="cps-display inline-block bg-[var(--cps-marigold)] text-[var(--cps-ink)] text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-3">
                Since {foundedYear}
              </span>
              <h1 className="cps-display text-2xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
                Where Every Child's Story Begins
              </h1>
              <p className="mt-2 text-sm sm:text-base text-white/90 max-w-xl">
                Nursery to Class 8 &middot; A safe, joyful campus your child will love coming to every day.
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-2 py-3">
            {images.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show slide ${idx + 1}`}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all ${current === idx ? 'w-6 bg-[var(--cps-coral)]' : 'w-2 bg-[var(--cps-ink)]/20'}`}
              />
            ))}
          </div>
        </div>

        {/* ===================== Stats ===================== */}
        <Reveal className="w-full max-w-6xl mx-auto px-4 my-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center border-t-4 border-[var(--cps-ink)]">
              <span className="cps-display text-3xl sm:text-4xl font-bold text-[var(--cps-ink)]">{studentCount}+</span>
              <span className="text-sm text-slate-500 mt-1">Happy Students</span>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center border-t-4 border-[var(--cps-leaf)]">
              <span className="cps-display text-3xl sm:text-4xl font-bold text-[var(--cps-leaf)]">{teacherCount}+</span>
              <span className="text-sm text-slate-500 mt-1">Dedicated Teachers</span>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center border-t-4 border-[var(--cps-marigold)]">
              <span className="cps-display text-3xl sm:text-4xl font-bold text-[var(--cps-marigold)]">{yearsCount}+</span>
              <span className="text-sm text-slate-500 mt-1">Years of Legacy</span>
            </div>
            <div className="bg-white rounded-xl shadow p-5 flex flex-col items-center text-center border-t-4 border-[var(--cps-coral)]">
              <span className="cps-display text-2xl sm:text-3xl font-bold text-[var(--cps-coral)]">Nur – 8</span>
              <span className="text-sm text-slate-500 mt-1">Classes Offered</span>
            </div>
          </div>
        </Reveal>

        {/* ===================== About ===================== */}
        <Reveal className="w-full max-w-6xl mx-auto my-8 px-4">
          <div className="flex flex-col md:flex-row items-stretch bg-white rounded-2xl shadow-lg overflow-hidden">
            <img src={assets.cps3} alt="Central Public School" className="w-full md:w-2/5 h-56 md:h-auto object-cover" />
            <div className="p-6 md:p-8">
              <span className="text-xs font-bold tracking-widest uppercase text-[var(--cps-coral)]">About Us</span>
              <h2 className="cps-display text-2xl sm:text-3xl font-bold mt-1 mb-3 text-[var(--cps-ink)]">
                About Central Public School
              </h2>
              {schoolDescription.split('\n').map((para, i) => (
                <p key={i} className="text-slate-600 leading-relaxed mb-3 text-sm sm:text-base">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ===================== Why Choose Us ===================== */}
        <div className="w-full max-w-6xl mx-auto px-4 my-10">
          <Reveal className="text-center mb-8">
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--cps-coral)]">Why Families Choose Us</span>
            <h2 className="cps-display text-2xl sm:text-3xl font-bold text-[var(--cps-ink)] mt-1">
              A Campus Built Around Your Child
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80} className="bg-white rounded-xl shadow p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-3 text-[var(--cps-ink)]" style={{ background: 'rgba(245,166,35,0.15)' }}>
                  <FeatureIcon name={f.icon} />
                </div>
                <h3 className="cps-display font-bold text-[var(--cps-ink)] mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ===================== Academic Journey ===================== */}
        <div className="w-full max-w-6xl mx-auto px-4 my-10">
          <Reveal className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--cps-coral)]">Academic Journey</span>
            <h2 className="cps-display text-2xl sm:text-3xl font-bold text-[var(--cps-ink)] mt-1">
              From First Steps to Strong Foundations
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {academicStages.map((s, i) => (
              <Reveal key={s.stage} delay={i * 120} className="bg-white rounded-xl shadow p-6 relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="cps-path-dot" />
                  <span className="cps-display font-bold text-[var(--cps-ink)]">{s.stage}</span>
                </div>
                <p className="text-sm font-semibold text-[var(--cps-coral)] mb-2">{s.classes}</p>
                <p className="text-sm text-slate-500">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ===================== Leadership ===================== */}
        <div className="w-full max-w-6xl mx-auto px-4 my-10">
          <Reveal className="text-center mb-8">
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--cps-coral)]">Leadership</span>
            <h2 className="cps-display text-2xl sm:text-3xl font-bold text-[var(--cps-ink)] mt-1">
              A Word From Our Leadership
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[director, principal].map((p, i) => (
              <Reveal key={p.name} delay={i * 100} className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
                <img src={p.image} alt={p.role} className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-[var(--cps-marigold)]/40" />
                <span className="cps-display text-lg font-bold text-[var(--cps-ink)]">{p.name}</span>
                <span className="text-sm text-[var(--cps-coral)] font-semibold mb-3">{p.role}</span>
                <p className="text-slate-600 text-sm italic leading-relaxed">&ldquo;{p.message}&rdquo;</p>
                <span className="text-[var(--cps-ink)] text-sm font-semibold mt-3">{p.contact}</span>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ===================== Celebrations Carousel ===================== */}
        <div className="w-full max-w-6xl mx-auto px-4 my-10">
          <Reveal className="text-center mb-6">
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--cps-coral)]">Life at CPS</span>
            <h2 className="cps-display text-2xl sm:text-3xl font-bold text-[var(--cps-ink)] mt-1">
              Moments We Cherish
            </h2>
          </Reveal>
          <Reveal className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={teacherImages[teacherCurrent]}
              alt={`School celebration ${teacherCurrent + 1}`}
              className="w-full h-[260px] sm:h-[360px] object-cover transition-all duration-700"
            />
            <div className="flex justify-center gap-2 py-3 bg-white">
              {teacherImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 w-2 rounded-full ${teacherCurrent === idx ? 'bg-[var(--cps-leaf)]' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* ===================== Contact ===================== */}
        <div id="cps-contact" className="cps-notebook-line pt-2">
          <ContactUs />
        </div>

        {/* ===================== Footer ===================== */}
        <footer className="w-full py-6 text-center text-white mt-auto" style={{ background: 'var(--cps-ink)' }}>
          <p className="cps-display font-bold">Central Public School</p>
          <p className="text-sm text-white/70 mt-1">Nursery to Class 8 &middot; Admissions Open for 2026–27</p>
          <p className="text-xs text-white/50 mt-3">&copy; {new Date().getFullYear()} Central Public School. All rights reserved.</p>
        </footer>

        {/* Persistent WhatsApp contact button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="cps-whatsapp-fab w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <span className="cps-whatsapp-ring" aria-hidden="true" />
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white" className="relative"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.2.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.2 1.6 2.5 4 3.5.6.2 1 .4 1.3.5.6.2 1.1.2 1.5.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.4-.3Z"/></svg>
        </a>

        {/* Chat assistant: collects student/parent/mobile, then answers admission, fee and contact questions */}
        <ChatBot />
      </div>
    </Layout>
  );
};

export default HomePage;
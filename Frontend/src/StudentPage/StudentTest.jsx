import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  FaCalculator, FaFlask, FaBookOpen, FaLaptopCode, FaGlobeAmericas, FaLanguage,
  FaClock, FaChevronLeft, FaChevronRight, FaCheckCircle, FaRegCircle,
  FaArrowLeft, FaExclamationTriangle, FaTrophy, FaRedo
} from 'react-icons/fa';
import LayoutStu from '../Components/LayoutStu';

// ---- Mock data. Swap this for a real API call when wiring up the backend. ----
const SUBJECTS = [
  {
    id: "math", name: "Mathematics", icon: FaCalculator, accent: "amber",
    durationMin: 20,
    questions: [
      { q: "What is the value of 12 × 8?", options: ["96", "88", "108", "84"], correct: 0 },
      { q: "Solve for x: 2x + 6 = 18", options: ["4", "6", "8", "12"], correct: 1 },
      { q: "What is the square root of 144?", options: ["11", "10", "12", "14"], correct: 2 },
      { q: "What is the perimeter of a square with side 7 cm?", options: ["28 cm", "49 cm", "21 cm", "14 cm"], correct: 0 },
      { q: "Which of these is a prime number?", options: ["21", "27", "31", "33"], correct: 2 },
    ],
  },
  {
    id: "science", name: "Science", icon: FaFlask, accent: "sage",
    durationMin: 20,
    questions: [
      { q: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], correct: 2 },
      { q: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Cytoplasm"], correct: 1 },
      { q: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], correct: 2 },
      { q: "Water is made up of hydrogen and which other element?", options: ["Oxygen", "Nitrogen", "Carbon", "Helium"], correct: 0 },
      { q: "Which organ pumps blood through the body?", options: ["Lungs", "Liver", "Heart", "Kidney"], correct: 2 },
    ],
  },
  {
    id: "english", name: "English", icon: FaBookOpen, accent: "coral",
    durationMin: 15,
    questions: [
      { q: "Choose the correct synonym for 'Happy'.", options: ["Sad", "Joyful", "Angry", "Tired"], correct: 1 },
      { q: "Identify the noun in: 'The dog ran fast.'", options: ["ran", "fast", "dog", "the"], correct: 2 },
      { q: "What is the past tense of 'go'?", options: ["Goes", "Gone", "Went", "Going"], correct: 2 },
      { q: "Choose the correctly spelled word.", options: ["Recieve", "Receive", "Receeve", "Receve"], correct: 1 },
      { q: "Which word is an adjective in: 'A bright red car.'", options: ["car", "bright", "a", "red car"], correct: 1 },
    ],
  },
  {
    id: "cs", name: "Computer Science", icon: FaLaptopCode, accent: "steel",
    durationMin: 25,
    questions: [
      { q: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Unified"], correct: 1 },
      { q: "Which language runs in a web browser?", options: ["Python", "Java", "JavaScript", "C++"], correct: 2 },
      { q: "What does HTML stand for?", options: ["Hyper Trainer Markup Language", "HyperText Markup Language", "Hyper Text Markdown Language", "None of these"], correct: 1 },
      { q: "Which of these is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correct: 2 },
      { q: "1 byte is equal to how many bits?", options: ["4", "8", "16", "2"], correct: 1 },
    ],
  },
  {
    id: "social", name: "Social Studies", icon: FaGlobeAmericas, accent: "violet",
    durationMin: 15,
    questions: [
      { q: "Who is known as the Father of the Nation in India?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "B.R. Ambedkar"], correct: 1 },
      { q: "Which is the largest continent by area?", options: ["Africa", "Asia", "Europe", "Antarctica"], correct: 1 },
      { q: "In which year did India gain independence?", options: ["1945", "1950", "1947", "1930"], correct: 2 },
      { q: "Which river is known as the Ganga of the South?", options: ["Godavari", "Krishna", "Kaveri", "Narmada"], correct: 0 },
      { q: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"], correct: 1 },
    ],
  },
  {
    id: "hindi", name: "Hindi", icon: FaLanguage, accent: "pink",
    durationMin: 15,
    questions: [
      { q: "'पुस्तक' का पर्यायवाची शब्द चुनें।", options: ["किताब", "कलम", "मेज़", "कुर्सी"], correct: 0 },
      { q: "'सूरज' का विलोम शब्द क्या है?", options: ["चाँद", "आकाश", "तारा", "बादल"], correct: 0 },
      { q: "'मैं जाता हूँ' किस काल का वाक्य है?", options: ["भूतकाल", "वर्तमान काल", "भविष्य काल", "इनमें से कोई नहीं"], correct: 1 },
      { q: "'गाय' शब्द किस लिंग का है?", options: ["पुल्लिंग", "स्त्रीलिंग", "नपुंसकलिंग", "कोई नहीं"], correct: 1 },
      { q: "हिंदी वर्णमाला में कुल कितने स्वर हैं?", options: ["10", "11", "13", "9"], correct: 1 },
    ],
  },
];

const ACCENTS = {
  amber: { bg: "bg-amber-50", ring: "border-amber-200", icon: "text-amber-600", chip: "bg-amber-100 text-amber-800", solid: "bg-[#F4A73C]", solidText: "text-[#5F4A1A]" },
  sage: { bg: "bg-emerald-50", ring: "border-emerald-200", icon: "text-emerald-700", chip: "bg-emerald-100 text-emerald-800", solid: "bg-emerald-500", solidText: "text-white" },
  coral: { bg: "bg-orange-50", ring: "border-orange-200", icon: "text-orange-600", chip: "bg-orange-100 text-orange-800", solid: "bg-[#E2593B]", solidText: "text-white" },
  steel: { bg: "bg-sky-50", ring: "border-sky-200", icon: "text-sky-700", chip: "bg-sky-100 text-sky-800", solid: "bg-[#4C6FA5]", solidText: "text-white" },
  violet: { bg: "bg-violet-50", ring: "border-violet-200", icon: "text-violet-700", chip: "bg-violet-100 text-violet-800", solid: "bg-violet-500", solidText: "text-white" },
  pink: { bg: "bg-rose-50", ring: "border-rose-200", icon: "text-rose-600", chip: "bg-rose-100 text-rose-800", solid: "bg-rose-500", solidText: "text-white" },
};

const formatTime = (totalSeconds) => {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const StudentTestPage = () => {
  const [stage, setStage] = useState("list"); // list | test | result
  const [activeSubject, setActiveSubject] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const timerRef = useRef(null);

  const startTest = (subject) => {
    setActiveSubject(subject);
    setAnswers({});
    setCurrentQ(0);
    setSecondsLeft(subject.durationMin * 60);
    setStage("test");
  };

  useEffect(() => {
    if (stage !== "test") return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage, activeSubject]);

  const totalQuestions = activeSubject ? activeSubject.questions.length : 0;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;

  const selectOption = (qIndex, optIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const finishTest = () => {
    clearInterval(timerRef.current);
    setShowConfirm(false);
    setStage("result");
  };

  const score = useMemo(() => {
    if (!activeSubject) return 0;
    return activeSubject.questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0
    );
  }, [answers, activeSubject]);

  const backToList = () => {
    clearInterval(timerRef.current);
    setStage("list");
    setActiveSubject(null);
  };

  const timeCritical = secondsLeft <= 60 && secondsLeft > 0;

  // ---------------- SUBJECT LIST ----------------
  if (stage === "list") {
    return (
      <LayoutStu>
        <div className="min-h-screen w-full pt-16 md:pt-20 pb-10 px-3 sm:px-6 lg:px-10 bg-[#FBF7EE]">
          <div className="w-full mx-auto">
            <div className="mb-6 lg:mb-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#B9803A] font-semibold mb-1">Assessments</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2A44]">Student test</h1>
              <p className="text-sm text-[#8B8578] mt-1">Pick a subject to begin. Each test is timed, so keep an eye on the clock.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SUBJECTS.map((subject) => {
                const a = ACCENTS[subject.accent];
                const Icon = subject.icon;
                return (
                  <div
                    key={subject.id}
                    className={`flex flex-col justify-between p-5 rounded-2xl bg-white border ${a.ring} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all`}
                  >
                    <div className="flex items-center gap-4 mb-5">
                      <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${a.bg}`}>
                        <Icon className={`text-xl ${a.icon}`} />
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#2B2B2B] text-base">{subject.name}</h3>
                        <p className="text-xs text-[#8B8578] mt-0.5">{subject.questions.length} questions</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md ${a.chip}`}>
                        <FaClock className="text-[10px]" />
                        {subject.durationMin} min
                      </span>
                      <button
                        onClick={() => startTest(subject)}
                        className={`inline-flex items-center gap-2 ${a.solid} ${a.solidText} text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition`}
                      >
                        Start test
                        <FaChevronRight className="text-xs" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </LayoutStu>
    );
  }

  // ---------------- RESULT ----------------
  if (stage === "result") {
    const a = ACCENTS[activeSubject.accent];
    const pct = Math.round((score / totalQuestions) * 100);
    return (
      <LayoutStu>
        <div className="min-h-screen w-full pt-16 md:pt-20 pb-10 px-3 sm:px-6 lg:px-10 bg-[#FBF7EE] flex items-start justify-center">
          <div className="max-w-xl w-full mt-4">
            <div className="bg-white rounded-3xl border border-[#E7E0CF] shadow-sm p-6 sm:p-8 text-center">
              <div className={`w-16 h-16 rounded-2xl ${a.bg} flex items-center justify-center mx-auto mb-4`}>
                <FaTrophy className={`text-2xl ${a.icon}`} />
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#B9803A] font-semibold mb-1">{activeSubject.name}</p>
              <h2 className="text-2xl font-bold text-[#1F2A44] mb-1">Test submitted</h2>
              <p className="text-sm text-[#8B8578] mb-6">Here's how you did.</p>

              <div className="flex items-center justify-center gap-8 mb-6">
                <div>
                  <p className="text-3xl font-bold text-[#1F2A44]">{score}/{totalQuestions}</p>
                  <p className="text-xs text-[#8B8578] mt-1">Correct answers</p>
                </div>
                <div className="w-px h-10 bg-[#E7E0CF]" />
                <div>
                  <p className="text-3xl font-bold text-[#1F2A44]">{pct}%</p>
                  <p className="text-xs text-[#8B8578] mt-1">Score</p>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-[#F1EFE8] overflow-hidden mb-8">
                <div className={`h-full ${a.solid}`} style={{ width: `${pct}%` }} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => startTest(activeSubject)}
                  className="inline-flex items-center justify-center gap-2 border border-[#E7E0CF] text-[#2B2B2B] text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#F1EFE8] transition"
                >
                  <FaRedo className="text-xs" />
                  Retake test
                </button>
                <button
                  onClick={backToList}
                  className="inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition"
                >
                  <FaArrowLeft className="text-xs" />
                  Back to subjects
                </button>
              </div>
            </div>
          </div>
        </div>
      </LayoutStu>
    );
  }

  // ---------------- TEST IN PROGRESS ----------------
  const a = ACCENTS[activeSubject.accent];
  const question = activeSubject.questions[currentQ];
  const Icon = activeSubject.icon;

  return (
    <LayoutStu>
      <div className="min-h-screen w-full bg-[#FBF7EE] pt-16 md:pt-20 pb-28 lg:pb-10 px-3 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">

          {/* Header bar: subject + timer */}
          <div className="flex items-center justify-between gap-3 mb-5 lg:mb-8">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={backToList}
                aria-label="Back to subjects"
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white border border-[#E7E0CF] text-[#2B2B2B] hover:bg-[#F1EFE8] transition flex-shrink-0"
              >
                <FaArrowLeft className="text-xs" />
              </button>
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center ${a.bg} flex-shrink-0`}>
                <Icon className={`text-base ${a.icon}`} />
              </span>
              <div className="min-w-0">
                <h1 className="font-bold text-[#1F2A44] text-base sm:text-lg truncate">{activeSubject.name}</h1>
                <p className="text-xs text-[#8B8578]">Question {currentQ + 1} of {totalQuestions}</p>
              </div>
            </div>

            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-mono text-sm font-semibold flex-shrink-0 ${
              timeCritical ? "bg-[#FCEBEB] text-[#A32D2D] animate-pulse" : "bg-[#1F2A44] text-white"
            }`}>
              <FaClock className="text-xs" />
              {formatTime(secondsLeft)}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 rounded-full bg-[#F1EFE8] overflow-hidden mb-6 lg:mb-8">
            <div
              className={`h-full ${a.solid} transition-all`}
              style={{ width: `${((currentQ + 1) / totalQuestions) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6 lg:gap-8">

            {/* Question card */}
            <div className="bg-white rounded-3xl border border-[#E7E0CF] shadow-sm p-5 sm:p-8">
              <span className={`inline-block text-[11px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-md mb-4 ${a.chip}`}>
                Question {currentQ + 1}
              </span>
              <p className="text-lg sm:text-xl font-semibold text-[#1F2A44] leading-relaxed mb-6">
                {question.q}
              </p>

              <div className="space-y-3">
                {question.options.map((opt, i) => {
                  const selected = answers[currentQ] === i;
                  const letter = String.fromCharCode(65 + i);
                  return (
                    <button
                      key={i}
                      onClick={() => selectOption(currentQ, i)}
                      className={`w-full flex items-center gap-3 text-left p-4 rounded-2xl border transition-all ${
                        selected
                          ? `${a.bg} ${a.ring} border-2`
                          : "bg-white border-[#E7E0CF] hover:bg-[#FBF7EE]"
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        selected ? `${a.solid} ${a.solidText}` : "bg-[#F1EFE8] text-[#5F5E5A]"
                      }`}>
                        {letter}
                      </span>
                      <span className="text-sm sm:text-base text-[#2B2B2B]">{opt}</span>
                      {selected && <FaCheckCircle className={`ml-auto text-sm ${a.icon}`} />}
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next — desktop inline, mobile also visible above sticky bar */}
              <div className="hidden lg:flex items-center justify-between mt-8">
                <button
                  onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
                  disabled={currentQ === 0}
                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full border border-[#E7E0CF] text-[#2B2B2B] hover:bg-[#F1EFE8] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft className="text-xs" />
                  Previous
                </button>
                {currentQ === totalQuestions - 1 ? (
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full bg-[#1F2A44] text-white hover:opacity-90 transition"
                  >
                    Submit test
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentQ((q) => Math.min(totalQuestions - 1, q + 1))}
                    className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full ${a.solid} ${a.solidText} hover:opacity-90 transition`}
                  >
                    Next
                    <FaChevronRight className="text-xs" />
                  </button>
                )}
              </div>
            </div>

            {/* Question palette — sidebar on desktop, horizontal strip on mobile */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-2xl border border-[#E7E0CF] p-4 sm:p-5">
                <p className="text-xs font-semibold text-[#5F5E5A] uppercase tracking-wide mb-3">
                  {answeredCount} of {totalQuestions} answered
                </p>
                <div className="grid grid-cols-6 lg:grid-cols-5 gap-2">
                  {activeSubject.questions.map((_, i) => {
                    const isAnswered = answers[i] !== undefined;
                    const isCurrent = i === currentQ;
                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentQ(i)}
                        className={`aspect-square rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${
                          isCurrent
                            ? `${a.solid} ${a.solidText} ring-2 ring-offset-2 ring-[#1F2A44]/20`
                            : isAnswered
                            ? `${a.bg} ${a.icon} border ${a.ring}`
                            : "bg-[#F1EFE8] text-[#8B8578]"
                        }`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky bottom action bar — mobile & tablet */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7E0CF] px-4 py-3 flex items-center gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
          <button
            onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
            disabled={currentQ === 0}
            aria-label="Previous question"
            className="w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center border border-[#E7E0CF] text-[#2B2B2B] disabled:opacity-40"
          >
            <FaChevronLeft className="text-sm" />
          </button>

          {currentQ === totalQuestions - 1 ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-full bg-[#1F2A44] text-white"
            >
              Submit test
            </button>
          ) : (
            <button
              onClick={() => setCurrentQ((q) => Math.min(totalQuestions - 1, q + 1))}
              className={`flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-full ${a.solid} ${a.solidText}`}
            >
              Next question
              <FaChevronRight className="text-xs" />
            </button>
          )}
        </div>
      </div>

      {/* Submit confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F2A44]/40 p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-[#FCEBEB] flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-lg text-[#A32D2D]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F2A44] mb-1">Submit test?</h3>
            <p className="text-sm text-[#8B8578] mb-6">
              {unansweredCount > 0
                ? `You have ${unansweredCount} unanswered question${unansweredCount > 1 ? "s" : ""}. You can't change answers after submitting.`
                : "All questions answered. You can't change answers after submitting."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 text-sm font-semibold py-2.5 rounded-full border border-[#E7E0CF] text-[#2B2B2B] hover:bg-[#F1EFE8] transition"
              >
                Keep reviewing
              </button>
              <button
                onClick={finishTest}
                className="flex-1 text-sm font-semibold py-2.5 rounded-full bg-[#1F2A44] text-white hover:opacity-90 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </LayoutStu>
  );
};

export default StudentTestPage;
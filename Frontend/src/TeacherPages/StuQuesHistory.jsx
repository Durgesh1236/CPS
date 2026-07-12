import React, { useState, useMemo } from 'react';
import {
  FaChalkboardTeacher, FaSearch, FaLayerGroup, FaBook, FaCheckCircle,
  FaChevronDown, FaEye, FaEyeSlash, FaInbox, FaClipboardList, FaCalendarAlt
} from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

// ---- Mock question bank. Swap for a real API call (e.g. GET /questions?class=&subject=) ----
// const QUESTION_BANK = [
//   { id: 1, class: "Class 10", subject: "Mathematics", chapter: "Quadratic Equations", difficulty: "Medium", date: "2026-06-12",
//     text: "What are the roots of the equation x² - 5x + 6 = 0?", options: ["2, 3", "1, 6", "-2, -3", "2, -3"], correct: 0 },
//   { id: 2, class: "Class 10", subject: "Mathematics", chapter: "Trigonometry", difficulty: "Hard", date: "2026-06-15",
//     text: "If sin θ = 3/5, what is the value of cos θ?", options: ["4/5", "3/4", "5/4", "1/5"], correct: 0 },
//   { id: 3, class: "Class 10", subject: "Mathematics", chapter: "Real Numbers", difficulty: "Easy", date: "2026-06-02",
//     text: "What is the HCF of 18 and 24?", options: ["6", "4", "8", "12"], correct: 0 },
//   { id: 4, class: "Class 10", subject: "Mathematics", chapter: "Polynomials", difficulty: "Medium", date: "2026-05-28",
//     text: "How many zeroes does a quadratic polynomial have at most?", options: ["1", "2", "3", "0"], correct: 1 },
//   { id: 5, class: "Class 10", subject: "Mathematics", chapter: "Circles", difficulty: "Easy", date: "2026-05-20",
//     text: "A tangent to a circle touches it in how many points?", options: ["1", "2", "3", "Infinite"], correct: 0 },

//   { id: 6, class: "Class 10", subject: "Science", chapter: "Light", difficulty: "Medium", date: "2026-06-10",
//     text: "What is the power of a lens with focal length 0.5 m?", options: ["2 D", "0.5 D", "5 D", "1 D"], correct: 0 },
//   { id: 7, class: "Class 10", subject: "Science", chapter: "Life Processes", difficulty: "Easy", date: "2026-06-08",
//     text: "Which organ is primarily responsible for filtering blood?", options: ["Liver", "Kidney", "Heart", "Lungs"], correct: 1 },
//   { id: 8, class: "Class 10", subject: "Science", chapter: "Chemical Reactions", difficulty: "Medium", date: "2026-05-30",
//     text: "What type of reaction is photosynthesis?", options: ["Combination", "Decomposition", "Displacement", "Redox"], correct: 0 },
//   { id: 9, class: "Class 10", subject: "Science", chapter: "Electricity", difficulty: "Hard", date: "2026-05-18",
//     text: "What is the resistance of a wire with V = 10V and I = 2A?", options: ["5 Ω", "20 Ω", "0.2 Ω", "12 Ω"], correct: 0 },

//   { id: 10, class: "Class 9", subject: "English", chapter: "Grammar", difficulty: "Easy", date: "2026-06-05",
//     text: "Choose the correctly punctuated sentence.", options: ["Its raining today", "It's raining today.", "Its raining today.", "It' raining today"], correct: 1 },
//   { id: 11, class: "Class 9", subject: "English", chapter: "Literature", difficulty: "Medium", date: "2026-06-01",
//     text: "Who wrote the poem 'The Road Not Taken'?", options: ["Robert Frost", "William Wordsworth", "John Keats", "Walt Whitman"], correct: 0 },
//   { id: 12, class: "Class 9", subject: "English", chapter: "Grammar", difficulty: "Easy", date: "2026-05-22",
//     text: "Identify the correct plural of 'child'.", options: ["Childs", "Childes", "Children", "Childrens"], correct: 2 },

//   { id: 13, class: "Class 8", subject: "Social Studies", chapter: "The Indian Constitution", difficulty: "Medium", date: "2026-06-09",
//     text: "How many fundamental rights are guaranteed by the Indian Constitution?", options: ["5", "6", "7", "8"], correct: 1 },
//   { id: 14, class: "Class 8", subject: "Social Studies", chapter: "Resources", difficulty: "Easy", date: "2026-06-03",
//     text: "Which of these is a renewable resource?", options: ["Coal", "Petroleum", "Solar energy", "Natural gas"], correct: 2 },
//   { id: 15, class: "Class 8", subject: "Social Studies", chapter: "Trade and Globalisation", difficulty: "Hard", date: "2026-05-25",
//     text: "What term describes the interconnection of world economies?", options: ["Colonisation", "Globalisation", "Industrialisation", "Urbanisation"], correct: 1 },

//   { id: 16, class: "Class 10", subject: "Computer Science", chapter: "Networking", difficulty: "Medium", date: "2026-06-11",
//     text: "What does IP stand for in IP address?", options: ["Internet Process", "Internet Protocol", "Internal Protocol", "Interconnect Process"], correct: 1 },
//   { id: 17, class: "Class 10", subject: "Computer Science", chapter: "Databases", difficulty: "Easy", date: "2026-06-04",
//     text: "Which of these is used to retrieve data in SQL?", options: ["INSERT", "SELECT", "DELETE", "UPDATE"], correct: 1 },
//   { id: 18, class: "Class 10", subject: "Computer Science", chapter: "Python Basics", difficulty: "Easy", date: "2026-05-29",
//     text: "Which keyword is used to define a function in Python?", options: ["func", "def", "function", "lambda"], correct: 1 },

//   { id: 19, class: "Class 7", subject: "Hindi", chapter: "व्याकरण", difficulty: "Easy", date: "2026-06-06",
//     text: "'सुंदर' शब्द किस प्रकार का शब्द है?", options: ["संज्ञा", "विशेषण", "क्रिया", "सर्वनाम"], correct: 1 },
//   { id: 20, class: "Class 7", subject: "Hindi", chapter: "व्याकरण", difficulty: "Medium", date: "2026-05-27",
//     text: "'वीरता' शब्द में कौन सा प्रत्यय है?", options: ["ता", "आई", "पन", "त्व"], correct: 0 },
// ];

const CLASSES = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
const SUBJECTS = ["Mathematics", "Science", "English", "Social Studies", "Computer Science", "Hindi"];

const DIFFICULTY_STYLE = {
  Easy: "bg-emerald-100 text-emerald-800",
  Medium: "bg-amber-100 text-amber-800",
  Hard: "bg-orange-100 text-orange-800",
};

const StuQuesHistory = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({ class: "", subject: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [revealed, setRevealed] = useState({});
  const { questionList } = UserData();
  const canSearch = selectedClass !== "" && selectedSubject !== "";

  const handleSearch = () => {
    if (!canSearch) return;
    setAppliedFilters({ class: selectedClass, subject: selectedSubject });
    setSearchTerm("");
    setRevealed({});
    setSubmitted(true);
  };

  const baseResults = useMemo(() => {
    if (!submitted) return [];
    return QUESTION_BANK.filter(
      (q) => q.class === appliedFilters.class && q.subject === appliedFilters.subject
    );
  }, [submitted, appliedFilters]);

  const results = useMemo(() => {
    if (!searchTerm.trim()) return baseResults;
    const term = searchTerm.toLowerCase();
    return baseResults.filter(
      (q) => q.text.toLowerCase().includes(term) || q.chapter.toLowerCase().includes(term)
    );
  }, [baseResults, searchTerm]);

  const toggleReveal = (id) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <TeacherLayout>
        {/* bg-[#FBF7EE] */}
      <div className="min-h-screen w-full pt-16 md:pt-20 pb-10 px-3 sm:px-6 lg:px-10">
        <div className="w-full mx-auto">

          <div className="mb-6 lg:mb-8 flex items-center gap-3">
            <span className="w-11 h-11 rounded-xl bg-[#1F2A44] flex items-center justify-center flex-shrink-0">
              <FaChalkboardTeacher className="text-lg text-[#F4A73C]" />
            </span>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#B9803A] font-semibold mb-0.5">Question bank</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2A44]">Question history</h1>
            </div>
          </div>

          {/* Filter card */}
          <div className="bg-white rounded-2xl border border-[#E7E0CF] shadow-sm p-5 sm:p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wide mb-2">
                  <FaLayerGroup className="text-[10px]" />
                  Class
                </label>
                <div className="relative">
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full appearance-none bg-[#FBF7EE] border border-[#E7E0CF] rounded-xl px-4 py-3 text-sm text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F4A73C]/40 focus:border-[#F4A73C]"
                  >
                    <option value="">Select class</option>
                    {CLASSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8B8578] pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[#5F5E5A] uppercase tracking-wide mb-2">
                  <FaBook className="text-[10px]" />
                  Subject
                </label>
                <div className="relative">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full appearance-none bg-[#FBF7EE] border border-[#E7E0CF] rounded-xl px-4 py-3 text-sm text-[#2B2B2B] focus:outline-none focus:ring-2 focus:ring-[#F4A73C]/40 focus:border-[#F4A73C]"
                  >
                    <option value="">Select subject</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8B8578] pointer-events-none" />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={!canSearch}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#1F2A44] text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaSearch className="text-xs" />
                  Search questions
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {submitted && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-100 text-amber-800">
                    <FaLayerGroup className="text-[10px]" />
                    {appliedFilters.class}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-sky-100 text-sky-800">
                    <FaBook className="text-[10px]" />
                    {appliedFilters.subject}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F1EFE8] text-[#5F5E5A]">
                    <FaClipboardList className="text-[10px]" />
                    {results.length} question{results.length !== 1 ? "s" : ""}
                  </span>
                </div>

                <div className="relative sm:ml-auto w-full sm:w-64">
                  <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-[#8B8578]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search within results..."
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E7E0CF] rounded-xl text-sm text-[#2B2B2B] placeholder-[#8B8578] focus:outline-none focus:ring-2 focus:ring-[#F4A73C]/40 focus:border-[#F4A73C]"
                  />
                </div>
              </div>

              {results.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E7E0CF] p-10 flex flex-col items-center text-center">
                  <span className="w-14 h-14 rounded-2xl bg-[#F1EFE8] flex items-center justify-center mb-4">
                    <FaInbox className="text-xl text-[#8B8578]" />
                  </span>
                  <h3 className="font-semibold text-[#2B2B2B] text-base mb-1">No questions found</h3>
                  <p className="text-sm text-[#8B8578] max-w-xs">
                    {baseResults.length === 0
                      ? `There's no question history yet for ${appliedFilters.class} · ${appliedFilters.subject}.`
                      : "Nothing matches your search. Try a different keyword."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((q, idx) => {
                    const isRevealed = !!revealed[q.id];
                    return (
                      <div key={q.id} className="bg-white rounded-2xl border border-[#E7E0CF] shadow-sm p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                          <span className="w-8 h-8 rounded-lg bg-[#F1EFE8] flex items-center justify-center text-xs font-bold text-[#5F5E5A] flex-shrink-0">
                            {idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${DIFFICULTY_STYLE[q.difficulty]}`}>
                                {q.difficulty}
                              </span>
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F1EFE8] text-[#5F5E5A]">
                                {q.chapter}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[11px] text-[#8B8578] ml-auto">
                                <FaCalendarAlt className="text-[10px]" />
                                {q.date}
                              </span>
                            </div>

                            <p className="text-sm sm:text-base font-semibold text-[#1F2A44] leading-relaxed mb-3">
                              {q.text}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                              {q.options.map((opt, i) => {
                                const isCorrect = i === q.correct;
                                const highlight = isRevealed && isCorrect;
                                return (
                                  <div
                                    key={i}
                                    className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg border ${
                                      highlight
                                        ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-semibold"
                                        : "bg-[#FBF7EE] border-[#E7E0CF] text-[#2B2B2B]"
                                    }`}
                                  >
                                    <span className="w-5 h-5 rounded-full bg-white border border-[#E7E0CF] flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                                      {String.fromCharCode(65 + i)}
                                    </span>
                                    <span className="truncate">{opt}</span>
                                    {highlight && <FaCheckCircle className="ml-auto text-emerald-600 text-xs flex-shrink-0" />}
                                  </div>
                                );
                              })}
                            </div>

                            <button
                              onClick={() => toggleReveal(q.id)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4C6FA5] hover:text-[#1F2A44] transition"
                            >
                              {isRevealed ? <FaEyeSlash className="text-[10px]" /> : <FaEye className="text-[10px]" />}
                              {isRevealed ? "Hide answer" : "Show answer"}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {!submitted && (
            <div className="bg-white rounded-2xl border border-dashed border-[#E7E0CF] p-10 flex flex-col items-center text-center">
              <span className="w-14 h-14 rounded-2xl bg-[#F1EFE8] flex items-center justify-center mb-4">
                <FaClipboardList className="text-xl text-[#8B8578]" />
              </span>
              <h3 className="font-semibold text-[#2B2B2B] text-base mb-1">Pick a class and subject</h3>
              <p className="text-sm text-[#8B8578] max-w-xs">
                Choose both filters above and select "Search questions" to view the question history.
              </p>
            </div>
          )}

        </div>
      </div>
    </TeacherLayout>
  );
};

export default StuQuesHistory;
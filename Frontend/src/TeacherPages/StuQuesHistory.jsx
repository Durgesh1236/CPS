import React, { useState } from 'react';
import {
  FaChalkboardTeacher, FaSearch, FaLayerGroup, FaBook, FaCheckCircle,
  FaChevronDown, FaEye, FaEyeSlash, FaInbox, FaClipboardList, FaCalendarAlt
} from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

const CLASSES = ["1", "2", "3", "Class 9", "Class 10", "Class 11", "Class 12"];
const SUBJECTS = ["G.K", "Science", "English", "Social Studies", "Computer Science", "Hindi"];

const StuQuesHistory = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [submitted, setSubmitted] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState({ class: "", subject: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [revealed, setRevealed] = useState({});
  const { questionList, getallquestions } = UserData();
  const canSearch = selectedClass !== "" && selectedSubject !== "";

  const handleSearch = async () => {
    if (!canSearch) return;

    await getallquestions(selectedClass, selectedSubject);

    setAppliedFilters({
      class: selectedClass,
      subject: selectedSubject,
    });

    setSearchTerm("");
    setRevealed({});
    setSubmitted(true);
  };

  // questionList may be a single doc { _id, class, subject, createdAt, question: [...] }
  // or an array of such docs. Normalize to an array of docs first.
  const docs = Array.isArray(questionList)
    ? questionList
    : questionList
    ? [questionList]
    : [];

  // Flatten straight into a display list, no separate normalization step.
  const allQuestions = docs.flatMap((doc) =>
    (doc.question || []).map((q) => ({
      ...q,
      subject: doc.subject,
      date: doc.createdAt,
    }))
  );
console.log(allQuestions);

  const results = submitted
    ? allQuestions.filter((q) => {
        if (!searchTerm.trim()) return true;
        const term = searchTerm.toLowerCase();
        return (
          (q.questionText || "").toLowerCase().includes(term) ||
          (q.subject || "").toLowerCase().includes(term)
        );
      })
    : allQuestions;

  const toggleReveal = (id) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };
   console.log(results);
   
  return (
    <TeacherLayout>
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
                    {appliedFilters.className}
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
                    {allQuestions.length === 0
                      ? `There's no question history yet for ${appliedFilters.class} · ${appliedFilters.subject}.`
                      : "Nothing matches your search. Try a different keyword."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((q, idx) => {
                    const isRevealed = !!revealed[q._id];
                    const correctIndex = (q.options || []).findIndex(
                      (opt) => opt === q.correctAnswer
                    );
                    return (
                      <div key={q._id} className="bg-white rounded-2xl border border-[#E7E0CF] shadow-sm p-5 sm:p-6">
                        <div className="flex items-start gap-4">
                          <span className="w-8 h-8 rounded-lg bg-[#F1EFE8] flex items-center justify-center text-xs font-bold text-[#5F5E5A] flex-shrink-0">
                            {idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {q.subject && (
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#F1EFE8] text-[#5F5E5A]">
                                  {q.subject}
                                </span>
                              )}
                              {q.date && (
                                <span className="inline-flex items-center gap-1 text-[11px] text-[#8B8578] ml-auto">
                                  <FaCalendarAlt className="text-[10px]" />
                                  {new Date(q.date).toLocaleDateString()}
                                </span>
                              )}
                            </div>

                            <p className="text-sm sm:text-base font-semibold text-[#1F2A44] leading-relaxed mb-3">
                              {q.questionText}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                              {(q.options || []).map((opt, i) => {
                                const isCorrect = i === correctIndex;
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
                              onClick={() => toggleReveal(q._id)}
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
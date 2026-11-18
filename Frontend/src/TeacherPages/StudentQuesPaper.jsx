import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";
import { toast } from "react-toastify";

const currentYear = new Date().getFullYear();
const ACADEMIC_YEARS = Array.from(
  { length: 8 },
  (_, index) => `${currentYear - index}-${currentYear - index + 1}`
);
const EXAM_TERMS = [
  { value: "firstTerm", label: "1st Term Exam" },
  { value: "secondTerm", label: "2nd Term Exam" },
  { value: "finalTerm", label: "Final Term Exam" },
];
const QUESTION_TYPES = [
  { value: "fillInBlanks", label: "Fill in the blanks" },
  { value: "matchFollowing", label: "Match the following" },
  { value: "trueFalse", label: "True / False" },
  { value: "answerFollowing", label: "Answer the following" },
];

const createQuestion = (questionType = "answerFollowing") => ({
  question: "",
  marks: "",
  questionType,
  matchPairs: [{ left: "", right: "" }],
});

const getQuestionTypeLabel = (questionType) =>
  QUESTION_TYPES.find((type) => type.value === questionType)?.label || "Answer the following";

const getQuestionGroups = (questions) => {
  let number = 0;
  const questionTypes = [...new Set(questions.map((question) => question.questionType))];

  return questionTypes.map((questionType) => {
    const groupedQuestions = questions.flatMap((question, index) =>
      question.questionType === questionType
        ? [{ question, index, number: ++number }]
        : []
    );

    return {
      value: questionType,
      label: getQuestionTypeLabel(questionType),
      totalMarks: groupedQuestions.reduce(
        (total, { question }) => total + (Number(question.marks) || 0),
        0
      ),
      questions: groupedQuestions,
    };
  });
};

const StudentQuesPaper = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [paper, setPaper] = useState({
    schoolName: "",
    className: "",
    subject: "",
    academicYear: "",
    examTerm: "",
    examTime: "", 
    totalMarks: "",
  });

  const [questions, setQuestions] = useState([createQuestion()]);

  // Handle Input Change
  const handleChange = (e) => {
    setPaper({
      ...paper,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Question Change
  const handleQuestionChange = (
    index,
    field,
    value
  ) => {
    setQuestions((current) =>
      current.map((question, questionIndex) =>
        questionIndex === index
          ? { ...question, [field]: value }
          : question
      )
    );
  };

  const handleMatchPairChange = (questionIndex, pairIndex, field, value) => {
    setQuestions((current) =>
      current.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              matchPairs: question.matchPairs.map((pair, indexInPairs) =>
                indexInPairs === pairIndex ? { ...pair, [field]: value } : pair
              ),
            }
          : question
      )
    );
  };

  const addMatchPair = (questionIndex) => {
    setQuestions((current) =>
      current.map((question, index) =>
        index === questionIndex
          ? { ...question, matchPairs: [...question.matchPairs, { left: "", right: "" }] }
          : question
      )
    );
  };

  const removeMatchPair = (questionIndex, pairIndex) => {
    setQuestions((current) =>
      current.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              matchPairs: question.matchPairs.filter((_, pairIndexInList) => pairIndexInList !== pairIndex),
            }
          : question
      )
    );
  };

  // Add Question
  const addQuestion = (questionType = "answerFollowing") => {
    setQuestions((current) => [...current, createQuestion(questionType)]);
  };

  // Remove Question
  const removeQuestion = (index) => {
    if (questions.length === 1) {
      alert(
        "At least one question is required"
      );
      return;
    }

    const updated = questions.filter(
      (_, i) => i !== index
    );

    setQuestions(updated);
  };

  const generatePdf = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const addLine = (text, options = {}) => {
      const fontSize = options.fontSize || 11;
      const lineHeight = fontSize * 0.45 + 2;
      pdf.setFontSize(fontSize);
      if (options.bold) pdf.setFont("helvetica", "bold");
      else pdf.setFont("helvetica", "normal");
      const lines = pdf.splitTextToSize(text, contentWidth);
      if (y + lines.length * lineHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(lines, options.center ? pageWidth / 2 : margin, y, options.center ? { align: "center" } : {});
      y += lines.length * lineHeight + (options.gap ?? 2);
    };

    const addTwoColumnLine = (leftText, rightText, options = {}) => {
      const fontSize = options.fontSize || 11;
      const lineHeight = fontSize * 0.45 + 2;
      const columnGap = 8;
      const columnWidth = (contentWidth - columnGap) / 2;
      pdf.setFontSize(fontSize);
      pdf.setFont("helvetica", options.bold ? "bold" : "normal");
      const leftLines = pdf.splitTextToSize(leftText, columnWidth);
      const rightLines = pdf.splitTextToSize(rightText, columnWidth);
      const lineCount = Math.max(leftLines.length, rightLines.length);
      if (y + lineCount * lineHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(leftLines, margin, y);
      pdf.text(rightLines, pageWidth - margin, y, { align: "right" });
      y += lineCount * lineHeight + (options.gap ?? 2);
    };

    const addSectionHeading = (group) => {
      const fontSize = 11;
      const lineHeight = fontSize * 0.45 + 2;
      const marksText = `[${group.totalMarks} Marks]`;
      pdf.setFontSize(fontSize);
      pdf.setFont("helvetica", "bold");
      const titleWidth = contentWidth - pdf.getTextWidth(marksText) - 4;
      const lines = pdf.splitTextToSize(group.label, titleWidth);
      if (y + lines.length * lineHeight > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(lines, margin, y);
      pdf.text(marksText, pageWidth - margin, y, { align: "right" });
      y += lines.length * lineHeight + 1;
    };

    const addQuestionPrompt = (text, number) => {
      const fontSize = 11;
      const lineHeight = fontSize * 0.45 + 2;
      pdf.setFontSize(fontSize);
      pdf.setFont("helvetica", "normal");
      const lines = pdf.splitTextToSize(`Q${number}. ${text}`, contentWidth);

      lines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(line, margin, y);
        y += lineHeight;
      });
      y += 6;
    };

    addLine(paper.schoolName, { fontSize: 18, bold: true, center: true, gap: 5 });
    addLine(
      `Academic Year: ${paper.academicYear}  |  ${EXAM_TERMS.find((term) => term.value === paper.examTerm)?.label || ""}`,
      { fontSize: 12, bold: true, center: true }
    );
    addTwoColumnLine(`Class: ${paper.className}`, `Subject: ${paper.subject}`);
    addTwoColumnLine(`Time: ${paper.examTime}`, `Total Marks: ${paper.totalMarks}`, { gap: 5 });
    pdf.setDrawColor(120);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 8;

    getQuestionGroups(questions).forEach((group) => {
      addSectionHeading(group);
      group.questions.forEach(({ question, number }) => {
        if (question.question.trim()) {
          addQuestionPrompt(question.question, number);
        }
        if (question.questionType === "matchFollowing") {
          addLine("Column A:", { bold: true, gap: 1 });
          question.matchPairs.forEach((pair, pairIndex) => {
            addLine(`${pairIndex + 1}. ${pair.left}`);
          });
          addLine("Column B:", { bold: true, gap: 1 });
          [...question.matchPairs].reverse().forEach((pair, pairIndex) => {
            addLine(`${String.fromCharCode(65 + pairIndex)}. ${pair.right}`);
          });
        } else if (question.questionType === "trueFalse") {
          addLine("[ ] True       [ ] False");
        }
      });
    });

    return pdf.output("blob");
  };

  // Submit Function
  const { QuestionPaperSubmit } = UserData();
  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Validation
    if (
      !paper.schoolName ||
      !paper.className ||
      !paper.subject ||
      !paper.academicYear ||
      !paper.examTerm ||
      !paper.examTime ||
      !paper.totalMarks ||
      Number(paper.totalMarks) <= 0
    ) {
      toast.warning(
        "Please fill all paper details"
      );
      return;
    }

    const emptyQuestion = questions.some((question) =>
      !question.question.trim() ||
      !question.marks ||
      Number(question.marks) <= 0 ||
      (question.questionType === "matchFollowing" &&
        (!question.matchPairs.length ||
          question.matchPairs.some((pair) => !pair.left.trim() || !pair.right.trim())))
    );

    if (emptyQuestion) {
      alert(
        "Please complete each question and marks. Match-the-following questions need both items in every pair."
      );
      return;
    }
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      const pdf = generatePdf();
      formData.append(
        "file",
        pdf,
        `question-paper-${paper.academicYear}-${paper.examTerm}.pdf`
      );
      formData.append("academicYear", paper.academicYear);
      formData.append("examTerm", paper.examTerm);
      // const { data } = await axios.post("/api/user/question-paper-upload", formData);

      // if (!data.success) {
      //   throw new Error(data.message || "Unable to save question paper");
      // }

      await QuestionPaperSubmit(formData);
      // alert("Question paper saved successfully!");

      // Reset Form
      setPaper({
        schoolName: "",
        className: "",
        subject: "",
        academicYear: "",
        examTerm: "",
        examTime: "",
        totalMarks: "",
      });

      setQuestions([
        createQuestion(),
      ]);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.message ||
            "Unable to save question paper"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TeacherLayout>
      <div className="h-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-2 md:p-3">
        <div className="w-full my-14 mx-auto grid lg:grid-cols-2 gap-8">

          {/* Left Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">

            <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
              Create Question Paper
            </h1>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="schoolName"
                placeholder="School Name"
                value={paper.schoolName}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <input
                type="text"
                name="className"
                placeholder="Class"
                value={paper.className}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={paper.subject}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl"
              />

              <select
                name="academicYear"
                value={paper.academicYear}
                onChange={handleChange}
                className="border border-gray-300 bg-white p-3 rounded-xl"
              >
                <option value="">Select academic year</option>
                {ACADEMIC_YEARS.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <select
                name="examTerm"
                value={paper.examTerm}
                onChange={handleChange}
                className="border border-gray-300 bg-white p-3 rounded-xl"
              >
                <option value="">Select exam term</option>
                {EXAM_TERMS.map((term) => (
                  <option key={term.value} value={term.value}>{term.label}</option>
                ))}
              </select>

              <input
                type="text"
                name="examTime"
                placeholder="Exam Time"
                value={paper.examTime}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl"
              />

              <input
                type="number"
                name="totalMarks"
                placeholder="Total Marks"
                value={paper.totalMarks}
                onChange={handleChange}
                className="border border-gray-300 p-3 rounded-xl md:col-span-2"
              />
            </div>

            {/* Questions */}
            <h2 className="text-2xl font-semibold mt-8 mb-5">
              Add Questions
            </h2>

            <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {QUESTION_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => addQuestion(type.value)}
                  className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-100"
                >
                  <FaPlus className="mr-2 inline" aria-hidden="true" />
                  {type.label}
                </button>
              ))}
            </div>

            {getQuestionGroups(questions).map((group) => (
              <section key={group.value} className="mb-6 rounded-2xl border border-slate-200 p-4">
                <div className="mb-4 flex items-center justify-between gap-4 text-sm font-bold uppercase tracking-wide text-indigo-700">
                  <h3>{group.label}</h3>
                  <span className="whitespace-nowrap">[{group.totalMarks} Marks]</span>
                </div>
                {group.questions.map(({ question: q, index, number }) => (
                <div
                  key={index}
                  className="bg-slate-100 rounded-2xl p-4 mb-4 shadow-sm"
                >
                  <p className="mb-3 text-sm font-bold text-slate-700">Q{number}</p>
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex-1 text-sm font-semibold text-slate-700">
                      Question type
                      <select
                        value={q.questionType}
                        onChange={(event) => handleQuestionChange(index, "questionType", event.target.value)}
                        className="mt-1 w-full rounded-xl border border-gray-300 bg-white p-3"
                      >
                        {QUESTION_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </label>

                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="inline-flex items-center gap-2 self-end rounded-xl bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                    >
                      <FaTrash aria-hidden="true" />
                      Delete question
                    </button>
                  </div>

                  <textarea
                    placeholder={
                      q.questionType === "fillInBlanks"
                        ? "Write the sentence and use ______ for each blank"
                        : q.questionType === "matchFollowing"
                          ? "Instructions (for example: Match Column A with Column B)"
                          : q.questionType === "trueFalse"
                            ? "Write a statement for students to mark True or False"
                            : "Write the question students should answer"
                    }
                    rows="3"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "question",
                        e.target.value
                      )
                    }
                    className="w-full border rounded-xl p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  {q.questionType === "matchFollowing" && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3">
                      <div className="mb-2 grid grid-cols-[1fr_1fr_auto] gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                        <span>Column A</span>
                        <span>Column B</span>
                        <span className="sr-only">Remove pair</span>
                      </div>
                      {q.matchPairs.map((pair, pairIndex) => (
                        <div key={pairIndex} className="mb-2 grid grid-cols-[1fr_1fr_auto] gap-2">
                          <input
                            type="text"
                            value={pair.left}
                            onChange={(event) => handleMatchPairChange(index, pairIndex, "left", event.target.value)}
                            placeholder={`Item ${pairIndex + 1}`}
                            className="min-w-0 rounded-lg border border-slate-300 p-2 text-sm"
                          />
                          <input
                            type="text"
                            value={pair.right}
                            onChange={(event) => handleMatchPairChange(index, pairIndex, "right", event.target.value)}
                            placeholder={`Match ${pairIndex + 1}`}
                            className="min-w-0 rounded-lg border border-slate-300 p-2 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeMatchPair(index, pairIndex)}
                            disabled={q.matchPairs.length === 1}
                            aria-label={`Remove matching pair ${pairIndex + 1}`}
                            className="rounded-lg px-2 text-red-600 hover:bg-red-50 disabled:opacity-40"
                          >
                            <FaTrash aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addMatchPair(index)}
                        className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                      >
                        <FaPlus aria-hidden="true" /> Add matching pair
                      </button>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <input
                      type="number"
                      placeholder="Marks"
                      min="1"
                      value={q.marks}
                      onChange={(e) =>
                        handleQuestionChange(
                          index,
                          "marks",
                          e.target.value
                        )
                      }
                      className="border p-2 rounded-xl w-28"
                    />
                  </div>
                </div>
                ))}
                <button
                  type="button"
                  onClick={() => addQuestion(group.value)}
                  className="inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-800 transition hover:bg-indigo-100"
                >
                  <FaPlus aria-hidden="true" /> Add another question
                </button>
              </section>
            ))}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl text-lg font-bold shadow-xl transition-all flex justify-center items-center gap-3 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* Right Preview */}
          <div
            className="bg-white rounded-3xl shadow-2xl p-8"
          >
            <div className="border-b-2 border-gray-300 pb-5 text-center">

              <h1 className="text-3xl font-bold uppercase">
                {paper.schoolName ||
                  "School Name"}
              </h1>

              <div className="mt-4 space-y-2">
                <h2 className="text-lg">
                  Class:{" "}
                  {paper.className ||
                    "___"}
                </h2>

                <h2 className="text-lg">
                  Subject:{" "}
                  {paper.subject ||
                    "___"}
                </h2>
                <h2 className="text-lg">
                  Academic Year: {paper.academicYear || "___"} ·{" "}
                  {EXAM_TERMS.find((term) => term.value === paper.examTerm)?.label || "Exam Term"}
                </h2>
              </div>

              <div className="flex justify-between mt-5 font-medium text-gray-700">
                <span>
                  Time:{" "}
                  {paper.examTime ||
                    "___"}
                </span>

                <span>
                  Marks:{" "}
                  {paper.totalMarks ||
                    "___"}
                </span>
              </div>
            </div>

            {/* Question Preview */}
            <div className="mt-8">
              {getQuestionGroups(questions).map((group) => (
                <section key={group.value} className="mb-6">
                  <div className="mb-2 flex items-center justify-between gap-4 text-xs font-bold uppercase tracking-wide text-indigo-700">
                    <p>{group.label}</p>
                    <p className="whitespace-nowrap">[{group.totalMarks} Marks]</p>
                  </div>
                  {group.questions.map(({ question: q, number }) => (
                    <div key={number} className="mb-6">
                      <p className="font-medium text-lg">
                        Q{number}. {q.question || "Question goes here"}
                      </p>

                      {q.questionType === "trueFalse" && (
                        <p className="mt-2 text-sm text-gray-600">[ ] True | [ ] False</p>
                      )}
                      {q.questionType === "matchFollowing" && (
                        <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="mb-1 font-semibold">Column A</p>
                            {q.matchPairs.map((pair, pairIndex) => (
                              <p key={pairIndex} className="py-1">{pairIndex + 1}. {pair.left || "Item"}</p>
                            ))}
                          </div>
                          <div>
                            <p className="mb-1 font-semibold">Column B</p>
                            {[...q.matchPairs].reverse().map((pair, pairIndex) => (
                              <p key={pairIndex} className="py-1">{String.fromCharCode(65 + pairIndex)}. {pair.right || "Match"}</p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default StudentQuesPaper;
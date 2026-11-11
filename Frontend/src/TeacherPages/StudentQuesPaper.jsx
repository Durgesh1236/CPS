import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {
  FaPlus,
  FaTrash,
  FaFilePdf,
} from "react-icons/fa";
import TeacherLayout from "../Components/TeacherLayout";

const StudentQuesPaper = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [paper, setPaper] = useState({
    schoolName: "",
    className: "",
    subject: "",
    examTime: "", 
    totalMarks: "",
  });

  const [questions, setQuestions] = useState([
    {
      question: "",
      marks: "",
    },
  ]);

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
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  // Add Question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        marks: "",
      },
    ]);
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

  // Build a text-based PDF so generation does not depend on browser CSS rendering.
  const generatePDF = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 18;
    const contentWidth = pageWidth - margin * 2;
    const lineHeight = 6;
    let y = margin;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    const schoolLines = pdf.splitTextToSize(paper.schoolName, contentWidth);
    pdf.text(schoolLines, pageWidth / 2, y, { align: "center" });
    y += schoolLines.length * 8 + 4;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Class: ${paper.className}`, margin, y);
    pdf.text(`Subject: ${paper.subject}`, margin, y + 7);
    pdf.text(`Time: ${paper.examTime}`, pageWidth - margin, y, { align: "right" });
    pdf.text(`Total Marks: ${paper.totalMarks}`, pageWidth - margin, y + 7, { align: "right" });
    y += 14;
    pdf.line(margin, y, pageWidth - margin, y);
    y += 10;

    pdf.setFontSize(11);
    questions.forEach((question, index) => {
      const questionLines = pdf.splitTextToSize(
        `Q${index + 1}. ${question.question}`,
        contentWidth
      );

      questionLines.forEach((line) => {
        if (y + lineHeight > pageHeight - margin) {
          pdf.addPage();
          y = margin;
        }

        pdf.text(line, margin, y);
        y += lineHeight;
      });

      if (y + 8 > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }

      pdf.text(`[${question.marks} Marks]`, pageWidth - margin, y, { align: "right" });
      y += 12;
    });

    return pdf;
  };

  // Submit Function
  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Validation
    if (
      !paper.schoolName ||
      !paper.className ||
      !paper.subject ||
      !paper.examTime ||
      !paper.totalMarks ||
      Number(paper.totalMarks) <= 0
    ) {
      alert(
        "Please fill all paper details"
      );
      return;
    }

    const emptyQuestion =
      questions.some(
        (q) =>
          !q.question.trim() ||
          !q.marks ||
          Number(q.marks) <= 0
      );

    if (emptyQuestion) {
      alert(
        "Please fill all questions and marks"
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const pdf = generatePDF();
      const { data } = await axios.post("/api/user/question-paper-upload", {
        ...paper,
        totalMarks: Number(paper.totalMarks),
        questions: questions.map((question) => ({
          ...question,
          marks: Number(question.marks),
        })),
      });

      if (!data.success) {
        throw new Error(data.message || "Unable to save question paper");
      }

      pdf.save("question-paper.pdf");
      alert(
        "Question paper saved and PDF downloaded successfully!"
      );

      // Reset Form
      setPaper({
        schoolName: "",
        className: "",
        subject: "",
        examTime: "",
        totalMarks: "",
      });

      setQuestions([
        {
          question: "",
          marks: "",
        },
      ]);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to save question paper or generate PDF"
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

            {questions.map(
              (q, index) => (
                <div
                  key={index}
                  className="bg-slate-100 rounded-2xl p-4 mb-4 shadow-sm"
                >
                  <textarea
                    placeholder={`Question ${
                      index + 1
                    }`}
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

                  <div className="flex justify-between items-center mt-4">

                    <input
                      type="number"
                      placeholder="Marks"
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

                    <button
                      onClick={() =>
                        removeQuestion(
                          index
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              )
            )}

            {/* Add Question Button */}
            <button
              onClick={addQuestion}
              className="bg-gradient-to-r from-green-500 to-emerald-700 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
            >
              <FaPlus />
              Add Question
            </button>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-4 rounded-2xl text-lg font-bold shadow-xl hover:scale-105 transition-all flex justify-center items-center gap-3"
            >
              <FaFilePdf />
              {isSubmitting ? "Submitting..." : "Submit & Download PDF"}
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
              {questions.map(
                (q, index) => (
                  <div
                    key={index}
                    className="mb-6"
                  >
                    <p className="font-medium text-lg">
                      Q{index + 1}.{" "}
                      {q.question ||
                        "Question goes here"}
                    </p>

                    <p className="text-right text-sm text-gray-500 mt-2">
                      [
                      {q.marks || 0}
                      Marks]
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default StudentQuesPaper;
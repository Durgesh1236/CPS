import React, { useState } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";

const SetStudentTest = () => {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [questionCount, setQuestionCount] = useState("");
  const [questions, setQuestions] = useState([]);
  const [uploadedQuestions, setUploadedQuestions] = useState([]);

  const { studentTestQuestion } = UserData();
  // console.log(uploadedQuestions);
  const generateQuestions = (count) => {
    const newQuestions = Array.from({ length: count }, () => ({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
    }));

    setQuestions(newQuestions);
  };
  const classes = [
    "P.Nursery",
    "Nursery",
    "LKG",
    "UKG",
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
  ];
  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!className || !subject) {
      alert("Please Enter Class Name and Subject");
      return;
    }

    for (let q of questions) {
      if (
        !q.question ||
        !q.option1 ||
        !q.option2 ||
        !q.option3 ||
        !q.option4 ||
        !q.correctAnswer
      ) {
        alert("Please fill all questions properly");
        return;
      }
    }

    const data = questions.map((q) => ({
      className,
      subject,
      ...q,
    }));

    setUploadedQuestions([...uploadedQuestions, ...data]);

    // alert("Questions Uploaded Successfully");
    studentTestQuestion(className, subject, questions);
    setClassName("");
    setSubject("");
    setQuestionCount("");
    setQuestions([]);
  };

  const optionLabels = ["A", "B", "C", "D"];

  const optionColors = [
    {
      bg: "bg-blue-500",
      light: "bg-blue-50 border-blue-200 text-blue-700",
    },
    {
      bg: "bg-purple-500",
      light: "bg-purple-50 border-purple-200 text-purple-700",
    },
    {
      bg: "bg-pink-500",
      light: "bg-pink-50 border-pink-200 text-pink-700",
    },
    {
      bg: "bg-orange-500",
      light: "bg-orange-50 border-orange-200 text-orange-700",
    },
  ];

  const completedCount = questions.filter(
    (q) =>
      q.question &&
      q.option1 &&
      q.option2 &&
      q.option3 &&
      q.option4 &&
      q.correctAnswer
  ).length;

  return (
    <TeacherLayout>
      <div className="h-full bg-gray-50 p-4 md:p-8">
        <div className="w-full my-10 mx-auto">

          {/* Hero Header */}
          <div className="relative overflow-hidden rounded-3xl mb-8 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 p-8 md:p-10 shadow-xl">
            <div className="relative z-10">
              <h1 className="text-3xl md:text-4xl font-black text-white">
                Create Student Test
              </h1>
              <p className="text-blue-100 mt-2">
                Upload MCQ Questions
              </p>
            </div>
          </div>

          {/* Setup Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
            <h2 className="text-gray-800 font-bold text-lg mb-6">
              Test Setup
            </h2>

            <div className="grid md:grid-cols-3 gap-5">

              {/* Class Name */}
              {/* <div>
                <label className="text-gray-600 text-sm font-semibold mb-2 block">
                  Class Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Class 10 - A"
                  className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-violet-500"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </div> */}

              {/* Class Name */}
              <div>
                <label className="text-gray-600 text-sm font-semibold mb-2 block">
                  Class Name
                </label>

                <select
                  className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-violet-500"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                >
                  <option value="">Select Class</option>

                  {classes.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div>
                <label className="text-gray-600 text-sm font-semibold mb-2 block">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mathematics"
                  className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-violet-500"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Question Count */}
              <div>
                <label className="text-gray-600 text-sm font-semibold mb-2 block">
                  Number of Questions
                </label>

                <select
                  className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl focus:outline-none focus:border-violet-500"
                  value={questionCount}
                  onChange={(e) => {
                    const count = Number(e.target.value);
                    setQuestionCount(count);
                    generateQuestions(count);
                  }}
                >
                  <option value="">Select count...</option>

                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} Question{num > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Questions */}
          {questions.length > 0 && (
            <div className="space-y-5 mb-6">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-6 border shadow-sm"
                >
                  <h2 className="font-bold text-lg mb-4">
                    Question {index + 1}
                  </h2>

                  <textarea
                    rows="3"
                    placeholder="Type your question here..."
                    className="w-full bg-gray-50 border-2 border-gray-200 p-4 rounded-2xl mb-5"
                    value={q.question}
                    onChange={(e) =>
                      handleChange(index, "question", e.target.value)
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                    {[1, 2, 3, 4].map((num, i) => (
                      <input
                        key={num}
                        type="text"
                        placeholder={`Option ${optionLabels[i]}`}
                        className="w-full bg-gray-50 border-2 border-gray-200 p-3 rounded-2xl"
                        value={q[`option${num}`]}
                        onChange={(e) =>
                          handleChange(
                            index,
                            `option${num}`,
                            e.target.value
                          )
                        }
                      />
                    ))}
                  </div>

                  <select
                    className="w-full border-2 border-gray-200 p-3 rounded-2xl"
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "correctAnswer",
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select Correct Answer
                    </option>

                    {[1, 2, 3, 4].map((num) => (
                      <option
                        key={num}
                        value={q[`option${num}`]}
                      >
                        {q[`option${num}`] || `Option ${num}`}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 text-white font-black text-lg rounded-2xl"
              >
                Upload Questions
              </button>
            </div>
          )}

          {/* Uploaded Questions */}
          {uploadedQuestions.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {uploadedQuestions.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-3xl p-6"
                >
                  <p className="text-violet-600 font-bold">
                    {item.className}
                  </p>

                  <p className="text-blue-500 text-sm mb-2">
                    {item.subject}
                  </p>

                  <p className="font-semibold">
                    Q{index + 1}. {item.question}
                  </p>

                  <p className="text-green-600 mt-3">
                    Correct Answer: {item.correctAnswer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default SetStudentTest;
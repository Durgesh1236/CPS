import React, { useState, useEffect } from "react";
import { FaArrowRight, FaBookOpen, FaCheckCircle, FaGraduationCap, FaIdCard, FaUserGraduate } from "react-icons/fa";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";

const StuResultSub = () => {
  const [ledgerId, setLedgerId] = useState("");
  const [className, setClassName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const { results } = UserData();
  // Auto Fetch Student Name
  useEffect(() => {
    const student = results.find(
      (s) =>
        s.ledgerId === ledgerId &&
        s.studentClass === className
    );
    if (student) {
      setStudentName(student.studentName);
    } else {
      setStudentName("");
    }
  }, [ledgerId, className, results]);

  // Create Subject Inputs
  const handleSubjectCount = (count) => {
    const newSubjects = Array.from({ length: count }, () => ({
      subjectName: "",
      totalNumber: "",
      viva: "",
      theory: "",
      totalMarks: 0,
    }));

    setSubjects(newSubjects);
  };

  // Handle Subject Changes
  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];

    updatedSubjects[index][field] = value;

    const viva = parseInt(updatedSubjects[index].viva) || 0;
    const theory = parseInt(updatedSubjects[index].theory) || 0;

    updatedSubjects[index].totalMarks = viva + theory;

    setSubjects(updatedSubjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const resultData = {
      ledgerId,
      className,
      studentName,
      subjects,
    };

    console.log(resultData);
    alert("Student Result Submitted Successfully!");
  };

  return (
    <TeacherLayout>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-violet-50 px-3 pb-6 pt-15 sm:px-6 sm:pb-10 sm:pt-24">
        <div className="mx-auto w-full">
          <header className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-violet-900 px-5 py-7 text-white shadow-xl shadow-indigo-950/15 sm:mb-8 sm:px-8 sm:py-9">
            <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-violet-400/20 blur-2xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-1/3 h-48 w-48 rounded-full bg-cyan-400/10 blur-2xl" />
            <div className="relative flex items-center gap-4 sm:gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-200 sm:h-16 sm:w-16">
                <FaGraduationCap className="text-3xl sm:text-4xl" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Academic records</p>
                <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Submit student result</h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-indigo-100/75">
                  Enter the student details and marks for each subject. Subject totals are calculated automatically.
                </p>
              </div>
            </div>
          </header>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <FaIdCard aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-900">Student information</h2>
                  <p className="text-xs text-slate-500">Enter ledger ID and class to find the student.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Ledger ID" htmlFor="result-ledger-id">
                  <input
                    id="result-ledger-id"
                    type="text"
                    value={ledgerId}
                    onChange={(e) => setLedgerId(e.target.value)}
                    placeholder="e.g. CPS-1024"
                    className={inputClassName}
                  />
                </FormField>
                <FormField label="Class" htmlFor="result-class">
                  <select
                    id="result-class"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    className={inputClassName}
                  >
                    <option value="">Select class</option>
                    {["Nursery", "LKG", "UKG", ...Array.from({ length: 8 }, (_, index) => `Class ${index + 1}`)].map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Student name" htmlFor="result-student-name">
                  <div className="relative">
                    <FaUserGraduate className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                    <input
                      id="result-student-name"
                      type="text"
                      value={studentName}
                      readOnly
                      placeholder="Student name will appear here"
                      className={`${inputClassName} bg-slate-50 pl-10 text-slate-600`}
                    />
                  </div>
                </FormField>
                <FormField label="Number of subjects" htmlFor="result-subject-count">
                  <select
                    id="result-subject-count"
                    value={subjects.length || ""}
                    className={inputClassName}
                    onChange={(e) => handleSubjectCount(Number(e.target.value))}
                  >
                    <option value="">Choose subjects</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>{num} subject{num > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </FormField>
              </div>
            </section>

            {subjects.length > 0 && (
              <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-7">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                      <FaBookOpen aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-bold text-slate-900">Subject marks</h2>
                      <p className="text-xs text-slate-500">Enter marks for each subject below.</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                    {subjects.length} subject{subjects.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {subjects.map((subject, index) => (
                    <article
                      key={index}
                      className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/60 p-4 sm:p-5"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white shadow-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-bold text-slate-900">Subject {index + 1}</h3>
                          <p className="text-xs text-slate-500">Marks breakdown</p>
                        </div>
                        <div className="ml-auto text-right">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</p>
                          <p className="text-lg font-black text-indigo-700">{subject.totalMarks}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <FormField label="Subject name" htmlFor={`subject-name-${index}`} className="col-span-2">
                          <input
                            id={`subject-name-${index}`}
                            type="text"
                            placeholder="e.g. Mathematics"
                            className={inputClassName}
                            value={subject.subjectName}
                            onChange={(e) => handleSubjectChange(index, "subjectName", e.target.value)}
                          />
                        </FormField>
                        <FormField label="Maximum marks" htmlFor={`subject-total-${index}`}>
                          <input
                            id={`subject-total-${index}`}
                            type="number"
                            min="0"
                            placeholder="100"
                            className={inputClassName}
                            value={subject.totalNumber}
                            onChange={(e) => handleSubjectChange(index, "totalNumber", e.target.value)}
                          />
                        </FormField>
                        <FormField label="Viva marks" htmlFor={`subject-viva-${index}`}>
                          <input
                            id={`subject-viva-${index}`}
                            type="number"
                            min="0"
                            placeholder="0"
                            className={inputClassName}
                            value={subject.viva}
                            onChange={(e) => handleSubjectChange(index, "viva", e.target.value)}
                          />
                        </FormField>
                        <FormField label="Theory marks" htmlFor={`subject-theory-${index}`}>
                          <input
                            id={`subject-theory-${index}`}
                            type="number"
                            min="0"
                            placeholder="0"
                            className={inputClassName}
                            value={subject.theory}
                            onChange={(e) => handleSubjectChange(index, "theory", e.target.value)}
                          />
                        </FormField>
                        <div className="col-span-2 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-xs text-emerald-800">
                          <FaCheckCircle aria-hidden="true" />
                          Total marks update automatically from viva and theory.
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:rounded-3xl sm:px-7 sm:py-5">
              <p className="text-center text-xs text-slate-500 sm:text-left">
                Review the student details and marks before submitting.
              </p>
              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-700 to-violet-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-700/20 transition hover:-translate-y-0.5 hover:from-indigo-800 hover:to-violet-800 focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:w-auto"
              >
                Submit result
                <FaArrowRight aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </main>
    </TeacherLayout>
  );
};

const inputClassName = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

const FormField = ({ label, htmlFor, className = "", children }) => (
  <div className={className}>
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold text-slate-600">
      {label}
    </label>
    {children}
  </div>
);

export default StuResultSub;
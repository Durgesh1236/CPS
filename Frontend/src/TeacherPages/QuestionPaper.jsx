import { useState } from "react";
import {
  FaCalendarAlt,
  FaChevronDown,
  FaEye,
  FaFileAlt,
  FaPrint,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";

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
const getExamLabel = (examTerm) =>
  EXAM_TERMS.find((term) => term.value === examTerm)?.label || examTerm;

const formatDate = (date) => {
  if (!date) return "Date not available";
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "Date not available"
    : parsedDate.toLocaleDateString();
};

const QuestionPaper = () => {
  const { user, getQuestionPapers, deleteQuestionPaper, getQuestionPaperPdfUrl } = UserData();
  const [academicYear, setAcademicYear] = useState("");
  const [examTerm, setExamTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [questionPapers, setQuestionPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [viewPaper, setViewPaper] = useState(null);

  const getPdfUrl = (paper) => getQuestionPaperPdfUrl(paper._id);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!academicYear || !examTerm || isLoading) return;

    setIsLoading(true);
    setLoadError("");
    setAppliedFilters({ academicYear, examTerm });

    try {
      const data = await getQuestionPapers(academicYear, examTerm);
      if (!data.success) {
        throw new Error(data.message || "Unable to load question papers");
      }
      setQuestionPapers(data.questionPapers || []);
      setViewPaper(null);
    } catch (error) {
      setQuestionPapers([]);
      setLoadError(error.response?.data?.message || error.message || "Unable to load question papers");
      toast.error(error.response?.data?.message || "Unable to load question papers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (paper) => {
    if (deletingId || !window.confirm("Delete this question paper? This action cannot be undone.")) {
      return;
    }

    setDeletingId(paper._id);
    try {
      const data = await deleteQuestionPaper(paper._id);
      if (!data.success) {
        throw new Error(data.message || "Unable to delete question paper");
      }
      setQuestionPapers((current) => current.filter((item) => item._id !== paper._id));
      setViewPaper((current) => (current?._id === paper._id ? null : current));
      toast.success(data.message || "Question paper deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Unable to delete question paper");
    } finally {
      setDeletingId("");
    }
  };

  const handlePrint = (paper) => {
    const printWindow = window.open(getPdfUrl(paper), "_blank");
    if (!printWindow) {
      toast.error("Allow pop-ups to open and print the question paper");
      return;
    }
    printWindow.opener = null;
  };

  const canDeletePaper = (paper) => {
    const ownerId = paper.teacherId?._id || paper.teacherId;
    return (
      user?.role === "admin" ||
      user?.role === "accountent" ||
      ownerId?.toString() === user?._id?.toString()
    );
  };

  return (
    <>
      <TeacherLayout>
        <main className="min-h-screen bg-slate-50 px-3 pb-12 pt-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <header className="mb-7 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-indigo-800 p-6 text-white shadow-xl sm:p-8">
              <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
                <FaFileAlt aria-hidden="true" /> Teacher workspace
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Question paper history</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                Select an academic year and term to find saved papers. View, print, or delete a paper from the results.
              </p>
            </header>

            <form
              onSubmit={handleSubmit}
              className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_1fr_auto] sm:items-end sm:p-5"
            >
              <label className="text-sm font-bold text-slate-700">
                Academic year
                <span className="relative mt-2 block">
                  <FaCalendarAlt className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={academicYear}
                    onChange={(event) => setAcademicYear(event.target.value)}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-10 font-normal text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="">Select year</option>
                    {ACADEMIC_YEARS.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                </span>
              </label>

              <label className="text-sm font-bold text-slate-700">
                Term exam
                <span className="relative mt-2 block">
                  <FaFileAlt className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={examTerm}
                    onChange={(event) => setExamTerm(event.target.value)}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-10 font-normal text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  >
                    <option value="">Select exam</option>
                    {EXAM_TERMS.map((term) => (
                      <option key={term.value} value={term.value}>{term.label}</option>
                    ))}
                  </select>
                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                </span>
              </label>

              <button
                type="submit"
                disabled={!academicYear || !examTerm || isLoading}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FaFileAlt aria-hidden="true" />
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </form>

            {isLoading && (
              <p className="mt-8 text-center text-sm font-semibold text-slate-500" role="status">
                Loading question papers...
              </p>
            )}

            {!isLoading && appliedFilters && (
              <section className="mt-7" aria-live="polite">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">Saved question papers</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {appliedFilters.academicYear} · {getExamLabel(appliedFilters.examTerm)}
                    </p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-bold text-indigo-700">
                    {questionPapers.length} paper{questionPapers.length === 1 ? "" : "s"}
                  </span>
                </div>

                {loadError ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-medium text-rose-700">
                    {loadError}
                  </div>
                ) : questionPapers.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                    <FaFileAlt className="mx-auto text-3xl text-slate-300" aria-hidden="true" />
                    <h3 className="mt-3 font-bold text-slate-800">No question papers found</h3>
                    <p className="mt-1 text-sm text-slate-500">There are no saved papers for this year and term.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questionPapers.map((paper) => {
                      const isOwnerAllowedToDelete = canDeletePaper(paper);
                      return (
                        <article key={paper._id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                            <div className="min-w-0">
                              <h3 className="truncate text-lg font-extrabold text-slate-900">
                                Question paper
                              </h3>
                              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                                <span>{paper.academicYear}</span>
                                <span>{getExamLabel(paper.examTerm)}</span>
                              </div>
                              <p className="mt-1 text-xs text-slate-400">
                                Stored PDF · {formatDate(paper.createdAt)}
                              </p>
                            </div>

                            <div className="flex shrink-0 flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => handlePrint(paper)}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-900"
                              >
                                <FaPrint aria-hidden="true" /> Print
                              </button>
                              <button
                                type="button"
                                onClick={() => setViewPaper(paper)}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
                              >
                                <FaEye aria-hidden="true" />
                                View
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(paper)}
                                disabled={!isOwnerAllowedToDelete || deletingId === paper._id}
                                title={isOwnerAllowedToDelete ? "Delete question paper" : "Only the creator or an administrator can delete this paper"}
                                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-45"
                              >
                                <FaTrash aria-hidden="true" />
                                {deletingId === paper._id ? "Deleting..." : "Delete"}
                              </button>
                            </div>
                          </div>

                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {!appliedFilters && !isLoading && (
              <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                <FaCalendarAlt className="mx-auto text-3xl text-slate-300" aria-hidden="true" />
                <h2 className="mt-3 font-bold text-slate-800">Choose a year and exam term</h2>
                <p className="mt-1 text-sm text-slate-500">Submit the filters to view the matching question papers.</p>
              </div>
            )}
          </div>
        </main>
      </TeacherLayout>

      {viewPaper && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 p-3 sm:p-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-label="Question paper PDF preview"
            className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3">
              <div>
                <h2 className="font-bold text-slate-900">Question paper PDF</h2>
                <p className="text-sm text-slate-500">
                  {viewPaper.academicYear} · {getExamLabel(viewPaper.examTerm)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewPaper(null)}
                aria-label="Close PDF preview"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </header>
            <iframe
              title="Question paper PDF"
              src={getPdfUrl(viewPaper)}
              className="min-h-0 flex-1"
            />
          </section>
        </div>
      )}
    </>
  );
};

export default QuestionPaper;
import React, { useState } from 'react';
import { FaCheckCircle, FaSearch, FaTimesCircle, FaMinusCircle } from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

const CLASSES = ["P.Nur", "Nur", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8"];
const SUBJECTS = ["G.K", "Math", "English", "Social Studies", "Computer Science", "Hindi"];

const StudentTestResults = () => {
  const [className, setClassName] = useState('');
  const [subject, setSubject] = useState('');
  const { getStudentTestSubmissions, submissions } = UserData();
  const searchResults = async () => {
    await getStudentTestSubmissions(className, subject);
  };

  return (
    <TeacherLayout>
      <div className="min-h-screen w-full pt-16 md:pt-20 pb-10 px-3 sm:px-6 lg:px-10 bg-[#FBF7EE]">
        <div className="w-full mx-auto">
          <div className="mb-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#B9803A] font-semibold mb-1">Assessments</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2A44]">Student test results</h1>
            <p className="text-sm text-[#8B8578] mt-1">See each student's correct and wrong answers.</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E7E0CF] shadow-sm p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <label className="text-xs font-semibold text-[#5F5E5A]">
              Class
              <select value={className} onChange={(event) => setClassName(event.target.value)} className="mt-2 w-full bg-[#FBF7EE] border border-[#E7E0CF] rounded-xl px-4 py-3 text-sm font-normal text-[#2B2B2B]">
                <option value="">All classes</option>
                {CLASSES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="text-xs font-semibold text-[#5F5E5A]">
              Subject
              <select value={subject} onChange={(event) => setSubject(event.target.value)} className="mt-2 w-full bg-[#FBF7EE] border border-[#E7E0CF] rounded-xl px-4 py-3 text-sm font-normal text-[#2B2B2B]">
                <option value="">All subjects</option>
                {SUBJECTS.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <button onClick={searchResults} className="inline-flex cursor-pointer items-center justify-center gap-2 bg-[#1F2A44] text-white text-sm font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition">
              <FaSearch className="text-xs" />
              Load results
            </button>
          </div>

          {submissions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#E7E0CF] p-10 text-center text-sm text-[#8B8578]">No students have submitted a test for these filters.</div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-2xl border border-[#E7E0CF] shadow-sm">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-[#F1EFE8] text-[#5F5E5A]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Student</th>
                    <th className="px-4 py-3 font-semibold">Class</th>
                    <th className="px-4 py-3 font-semibold">Subject</th>
                    <th className="px-4 py-3 font-semibold text-emerald-700">Correct</th>
                    <th className="px-4 py-3 font-semibold text-red-700">Wrong</th>
                    <th className="px-4 py-3 font-semibold">Unanswered</th>
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions?.map((submission) => (
                    <tr key={submission._id} className="border-t border-[#E7E0CF] text-[#2B2B2B]">
                      <td className="px-4 py-4 font-semibold">{submission.studentName}<span className="block text-xs font-normal text-[#8B8578]">{submission.ledgerId}</span></td>
                      <td className="px-4 py-4">{submission.studentClass}</td>
                      <td className="px-4 py-4">{submission.subject}</td>
                      <td className="px-4 py-4 text-emerald-700 font-semibold"><FaCheckCircle className="inline mr-1" />{submission.correctAnswers}/{submission.totalQuestions}</td>
                      <td className="px-4 py-4 text-red-700 font-semibold"><FaTimesCircle className="inline mr-1" />{submission.wrongAnswers}</td>
                      <td className="px-4 py-4 text-[#8B8578]"><FaMinusCircle className="inline mr-1" />{submission.unanswered}</td>
                      <td className="px-4 py-4 text-[#8B8578]">{new Date(submission.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default StudentTestResults;

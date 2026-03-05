import React from 'react';
import LayoutStu from '../Components/LayoutStu';

// Dummy student data for demonstration
const student = {
  rollNumber: '2026001',
  name: 'Aman Sharma',
  fatherName: 'Rajesh Sharma',
  motherName: 'Sunita Sharma',
  mobile: '9876543210',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
  results: {
    firstTerm: {
      Math: 78,
      English: 82,
      Science: 75,
      Hindi: 80,
      Social: 77,
    },
    secondTerm: {
      Math: 85,
      English: 88,
      Science: 80,
      Hindi: 84,
      Social: 81,
    },
    finalExam: {
      Math: 92,
      English: 90,
      Science: 89,
      Hindi: 91,
      Social: 88,
    },
  },
};

const subjects = Object.keys(student.results.finalExam);

const getGrade = (score) => {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

const totalFirstTerm = subjects.reduce((sum, subject) => sum + student.results.firstTerm[subject], 0);
const totalSecondTerm = subjects.reduce((sum, subject) => sum + student.results.secondTerm[subject], 0);
const totalFinalMarks = subjects.reduce((sum, subject) => sum + student.results.finalExam[subject], 0);
const maxMarks = subjects.length * 100;

export default function StudentResult() {
  return (
    <LayoutStu>
    <div className="min-h-screen  bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center py-8 px-1">
      {/* Student Detail Card */}
      <div className="w-full bg-white rounded-2xl shadow-2xl p-6 mb-2 mt-6 flex flex-col animate-fade-in">
        <img src={student.image} alt="Student" className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-lg mb-4" />
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{student.name}</h2>
        <div className="grid grid-cols-0 md:grid-cols-2 lg:grid-cols-2 w-full text-gray-700 text-xl mb-2">
          <div><span className="font-semibold text-purple-600">Roll No:</span> {student.rollNumber}</div>
          <div><span className="font-semibold text-pink-600">Mobile:</span> {student.mobile}</div>
          <div><span className="font-semibold text-blue-600">Father:</span> {student.fatherName}</div>
          <div><span className="font-semibold text-green-600">Mother:</span> {student.motherName}</div>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full bg-white rounded-2xl shadow-xl p-6 mb-3 animate-fade-in">
        <h3 className="text-xl font-bold text-purple-700 mb-4 text-center">Exam Results</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-center border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-blue-200 rounded-lg text-blue-800">Subject</th>
                <th className="px-4 py-2 bg-purple-200 rounded-lg text-purple-800">1st Term</th>
                <th className="px-4 py-2 bg-pink-200 rounded-lg text-pink-800">2nd Term</th>
                <th className="px-4 py-2 bg-green-200 rounded-lg text-green-800">Final Exam</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-2 font-semibold text-gray-700">{subject}</td>
                  <td className="px-4 py-2 text-blue-600 font-medium">{student.results.firstTerm[subject]}</td>
                  <td className="px-4 py-2 text-pink-600 font-medium">{student.results.secondTerm[subject]}</td>
                  <td className="px-4 py-2 text-green-600 font-bold bg-green-50 rounded-lg shadow">{student.results.finalExam[subject]}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                <td className="px-4 py-2 font-bold text-gray-800">Total</td>
                <td className="px-4 py-2 font-bold text-blue-700">{totalFirstTerm} / {maxMarks}</td>
                <td className="px-4 py-2 font-bold text-pink-700">{totalSecondTerm} / {maxMarks}</td>
                <td className="px-4 py-2 font-bold text-green-700">{totalFinalMarks} / {maxMarks}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Only Final Exam Result Section */}
      <div className="w-full bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 rounded-2xl shadow-xl p-6 animate-fade-in">
        <h3 className="text-lg font-bold text-green-700 mb-4 text-center">Final Exam Result</h3>
        <table className="min-w-full text-center border-separate border-spacing-y-2">
          <thead>
            <tr>
              <th className="px-4 py-2 bg-blue-200 rounded-lg text-blue-800">Subject</th>
              <th className="px-4 py-2 bg-green-200 rounded-lg text-green-800">Marks</th>
              <th className="px-4 py-2 bg-purple-200 rounded-lg text-purple-800">Grade</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject} className="hover:bg-blue-50 transition">
                <td className="px-4 py-2 font-semibold text-gray-700">{subject}</td>
                <td className="px-4 py-2 text-green-600 font-bold bg-green-50 rounded-lg shadow">{student.results.finalExam[subject]}</td>
                <td className="px-4 py-2 text-purple-600 font-bold">{getGrade(student.results.finalExam[subject])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center mt-2">
          <span className="font-bold text-xl text-blue-700 bg-white rounded-lg shadow px-4 py-2">Total: {totalFinalMarks} / {maxMarks}</span>
        </div>
      </div>
    </div>
    </LayoutStu>
  );
}

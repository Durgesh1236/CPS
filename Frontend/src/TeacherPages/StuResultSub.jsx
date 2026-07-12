import React, { useState, useEffect } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";

const StuResultSub = () => {
  const [ledgerId, setLedgerId] = useState("");
  const [className, setClassName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [subjectCount, setSubjectCount] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const {results} = UserData();
  // Auto Fetch Student Name
  useEffect(() => {
    const student = results.find(
      (s) =>
        s.ledgerId === ledgerId && 
        s.studentClass === className
    );
    console.log(results);
    if (student) {
      setStudentName(student.studentName);
    } else {
      setStudentName("");
    }
  }, [ledgerId, className]);

  // Create Subject Inputs
  const handleSubjectCount = (count) => {
    setSubjectCount(count);

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
    <div className="h-full bg-gradient-to-r bg-white shadow-2xl flex justify-center items-center p-2">
      <div className="rounded-3xl p-4 w-full">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          Student Result Form
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Student Details */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="font-semibold text-gray-700">
                Ledger ID
              </label>
              <input
                type="text"
                value={ledgerId}
                onChange={(e) => setLedgerId(e.target.value)}
                placeholder="Enter Ledger ID"
                className="w-full border p-3 rounded-xl mt-2 outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Class Name
              </label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Enter Class Name"
                className="w-full border p-3 rounded-xl mt-2 outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Auto Fetch Student Name */}
          <div className="mb-6">
            <label className="font-semibold text-gray-700">
              Student Name
            </label>
            <input
              type="text"
              value={studentName}
              readOnly
              placeholder="Student Name Auto Fetch"
              className="w-full border bg-gray-100 p-3 rounded-xl mt-2"
            />
          </div>

          {/* Subject Count */}
          <div className="mb-8">
            <label className="font-semibold text-gray-700">
              Select Number of Subjects
            </label>
            <select
              className="w-full border p-3 rounded-xl mt-2 outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => handleSubjectCount(Number(e.target.value))}
            >
              <option value="">Choose Subjects</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Subject Fields */}
          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="border rounded-2xl p-5 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md"
              >
                <h2 className="text-xl font-semibold text-indigo-600 mb-4">
                  Subject {index + 1}
                </h2>

                <div className="grid md:grid-cols-5 gap-4">
                  <input
                    type="text"
                    placeholder="Subject Name"
                    className="border p-3 rounded-xl"
                    value={subject.subjectName}
                    onChange={(e) =>
                      handleSubjectChange(
                        index,
                        "subjectName",
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="number"
                    placeholder="Total Number"
                    className="border p-3 rounded-xl"
                    value={subject.totalNumber}
                    onChange={(e) =>
                      handleSubjectChange(
                        index,
                        "totalNumber",
                        e.target.value
                      )
                    }
                  />

                  <input
                    type="number"
                    placeholder="Viva Marks"
                    className="border p-3 rounded-xl"
                    value={subject.viva}
                    onChange={(e) =>
                      handleSubjectChange(index, "viva", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    placeholder="Theory Marks"
                    className="border p-3 rounded-xl"
                    value={subject.theory}
                    onChange={(e) =>
                      handleSubjectChange(index, "theory", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    placeholder="Total Marks"
                    className="border bg-gray-100 p-3 rounded-xl"
                    value={subject.totalMarks}
                    readOnly
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-3 rounded-xl text-lg font-semibold shadow-lg transition duration-300"
            >
              Submit Result
            </button>
          </div>
        </form>
      </div>
    </div>
    </TeacherLayout>
  );
};

export default StuResultSub;
import React, { useState } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { QRCodeCanvas } from "qrcode.react";

const teachersData = [
  { id: 1, name: "Amit Sharma" },
  { id: 2, name: "Priya Verma" },
  { id: 3, name: "Rahul Singh" },
  { id: 4, name: "Sneha Gupta" },
  { id: 5, name: "Vikas Kumar" },
];

const TeacherAttendence = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [attendance, setAttendance] = useState({});
  const [showQR, setShowQR] = useState(false);

  // Handle attendance status
  const handleStatusChange = (teacherId, status) => {
    setAttendance({
      ...attendance,
      [teacherId]: status,
    });
  };

  // Submit attendance
  const handleSubmit = () => {
    const finalData = teachersData.map((teacher) => ({
      teacherId: teacher.id,
      teacherName: teacher.name,
      date: selectedDate,
      status: attendance[teacher.id] || "Absent",
    }));

    console.log(finalData);

    alert("Attendance Submitted Successfully");

    // Hide QR after submit
    setShowQR(false);

    // Reset attendance
    setAttendance({});
  };

  // Generate QR
  const handleGenerateQR = () => {
    if (!selectedDate) {
      alert("Please select date first");
      return;
    }

    setShowQR(true);
  };

  // Close QR
  const handleCloseQR = () => {
    setShowQR(false);
  };

  return (
    <TeacherLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 md:p-4">
        <div className="w-full mx-auto">

          {/* Header */}
          <div className="bg-white mt-14 rounded-3xl shadow-xl p-6 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Teacher Attendance
            </h1>

            <p className="text-gray-500 mt-2">
              Manage daily teacher attendance easily
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* QR Code Section */}
            <div className="order-1 lg:order-2 bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center">

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Attendance QR
              </h2>

              {showQR ? (
                <>
                  <div className="bg-gray-100 p-4 rounded-2xl shadow-inner">
                    <QRCodeCanvas
                      value={`Teacher Attendance - ${selectedDate}`}
                      size={220}
                    />
                  </div>

                  <p className="mt-4 text-gray-600 text-center">
                    Scan this QR code for attendance verification
                  </p>

                  <div className="mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm">
                    Date: {selectedDate}
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={handleCloseQR}
                    className="mt-5 bg-red-500 cursor-pointer hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition duration-300"
                  >
                    Close QR
                  </button>
                </>
              ) : (
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">📱</div>

                  <p>Select date and generate QR code</p>
                </div>
              )}
            </div>

            {/* Attendance Section */}
            <div className="order-2 lg:order-1 lg:col-span-2 bg-white rounded-3xl shadow-xl p-6">

              {/* Date Selection */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Select Attendance Date
                  </label>

                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border border-gray-300 rounded-xl px-4 py-3 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleGenerateQR}
                  className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold"
                >
                  Generate QR Code
                </button>
              </div>

              {/* Attendance Table */}
              {selectedDate ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[700px]">

                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

                        <th className="p-4 text-left rounded-l-xl">
                          S.No
                        </th>

                        <th className="p-4 text-left">
                          Teacher Name
                        </th>

                        <th className="p-4 text-left">
                          Present Date
                        </th>

                        <th className="p-4 text-center rounded-r-xl">
                          Attendance
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {teachersData.map((teacher, index) => (
                        <tr
                          key={teacher.id}
                          className="border-b hover:bg-blue-50 transition duration-200"
                        >
                          <td className="p-4 font-medium">
                            {index + 1}
                          </td>

                          <td className="p-4 font-semibold text-gray-700">
                            {teacher.name}
                          </td>

                          <td className="p-4 text-gray-600">
                            {selectedDate}
                          </td>

                          <td className="p-4">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-3">

                              {/* Present */}
                              <label className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-xl cursor-pointer hover:bg-green-200">

                                <input
                                  type="radio"
                                  name={`attendance-${teacher.id}`}
                                  checked={
                                    attendance[teacher.id] === "Present"
                                  }
                                  onChange={() =>
                                    handleStatusChange(
                                      teacher.id,
                                      "Present"
                                    )
                                  }
                                />

                                <span className="text-green-700 font-medium">
                                  Present
                                </span>
                              </label>

                              {/* Absent */}
                              <label className="flex cursor-pointer items-center gap-2 bg-red-100 px-4 py-2 rounded-xl hover:bg-red-200">

                                <input
                                  type="radio"
                                  name={`attendance-${teacher.id}`}
                                  checked={
                                    attendance[teacher.id] === "Absent"
                                  }
                                  onChange={() =>
                                    handleStatusChange(
                                      teacher.id,
                                      "Absent"
                                    )
                                  }
                                />

                                <span className="text-red-700 font-medium">
                                  Absent
                                </span>
                              </label>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-2xl p-6 text-center font-semibold text-lg">
                  Please select date for attendance
                </div>
              )}

              {/* Submit Button */}
              {selectedDate && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-8 py-3 rounded-2xl shadow-lg font-semibold transition duration-300"
                  >
                    Submit Attendance
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherAttendence;
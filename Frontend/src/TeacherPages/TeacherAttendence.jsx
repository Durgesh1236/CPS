import React, { useEffect, useRef, useState } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { QRCodeCanvas } from "qrcode.react";
import { Html5Qrcode } from "html5-qrcode";
import { UserData } from "../context/User";
import { toast } from "react-toastify";

const getToday = () => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
};

const TeacherAttendence = () => {
  const { user, teacherList, submitTeacherAttendance, scanTeacherAttendance, loading } = UserData();
  const isAdmin = user?.role === "admin";
  const today = getToday();
  const [selectedDate, setSelectedDate] = useState(today);
  const [attendance, setAttendance] = useState({});
  const [showQR, setShowQR] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scanError, setScanError] = useState("");
  const [scanSuccess, setScanSuccess] = useState("");
  const scannerRef = useRef(null);
  const scanLockedRef = useRef(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!showScanner) return undefined;

    const scanner = new Html5Qrcode("teacher-attendance-reader");
    scannerRef.current = scanner;
    scanLockedRef.current = false;
    setScanError("");
    setScanSuccess("");

    scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      async (decodedText) => {
        if (scanLockedRef.current) return;
        scanLockedRef.current = true;

        try {
          const payload = JSON.parse(decodedText);
          if (payload.type !== "teacher-attendance" || payload.date !== today) {
            throw new Error("Scan the attendance QR generated for today.");
          }

          const data = await scanTeacherAttendance(payload.date);
          setAttendance((previous) => ({ ...previous, [user?._id]: "present" }));
          setScanSuccess(data.message || "Attendance marked present.");
          toast.success("Your attendance is marked present");
          try {
            await scanner.stop();
          } catch {
            setScanError("Attendance was marked, but the camera could not be stopped. Close the scanner to continue.");
          }
        } catch (error) {
          scanLockedRef.current = false;
          setScanError(error.response?.data?.message || error.message || "Unable to mark attendance");
          if (!error.response) toast.error("Unable to mark attendance");
        }
      },
      () => undefined,
    ).catch((error) => {
      setScanError(error.message || "Camera access could not be started");
    });

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => undefined);
      }
      scannerRef.current = null;
    };
  }, [showScanner, today, scanTeacherAttendance, user?._id]);

  const handleStatusChange = (teacherId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [teacherId]: status,
    }));
  };

  const handleSubmit = async () => {
    setSubmitError("");
    if (!selectedDate) {
      toast.error("Please select a date before submitting attendance");
      return;
    }

    if (!teacherList.length) {
      toast.error("No teachers available to mark attendance");
      return;
    }

    const finalData = teacherList.map((teacher) => ({
      teacherId: teacher._id,
      teacherName: teacher.name,
      date: selectedDate,
      status: attendance[teacher._id] || "absent",
    }));

    const response = await submitTeacherAttendance(finalData);
    if (response) {
      setShowQR(false);
      setAttendance({});
    } else {
      setSubmitError("Attendance was not submitted. Check the error message and try again.");
    }
  };

  const handleGenerateQR = () => {
    if (!selectedDate) {
      toast.error("Please select date first");
      return;
    }
    setShowQR(true);
  };

  const handleOpenScanner = () => {
    setShowScanner(true);
    setShowQR(false);
  };

  const handleCloseQR = () => {
    setShowQR(false);
  };

  return (
    <TeacherLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 md:p-4">
        <div className="w-full mx-auto">
          <div className="bg-white mt-14 rounded-3xl shadow-xl p-6 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Teacher Attendance
            </h1>
            <p className="text-gray-500 mt-2">
              Manage daily teacher attendance easily
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="order-1 lg:order-2 bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Attendance QR
              </h2>

              {!isAdmin && (showScanner ? (
                <div className="w-full max-w-sm">
                  <div id="teacher-attendance-reader" className="overflow-hidden rounded-2xl" />
                  <p className="mt-4 text-center text-sm text-gray-600">
                    Scan the attendance QR displayed by your administrator.
                  </p>
                  {scanSuccess && (
                    <p className="mt-3 rounded-xl bg-green-100 p-3 text-center text-sm font-semibold text-green-700">
                      {scanSuccess}
                    </p>
                  )}
                  {scanError && (
                    <p role="alert" className="mt-3 rounded-xl bg-red-100 p-3 text-center text-sm font-semibold text-red-700">
                      {scanError}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowScanner(false)}
                    className="mt-5 w-full rounded-xl bg-slate-700 px-6 py-2 font-semibold text-white transition hover:bg-slate-800"
                  >
                    Close scanner
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenScanner}
                  className="mb-5 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700"
                >
                  Scan QR to mark present
                </button>
                ))}

              {isAdmin && (showQR ? (
                <>
                  <div className="bg-gray-100 p-4 rounded-2xl shadow-inner">
                    <QRCodeCanvas
                      value={JSON.stringify({ type: "teacher-attendance", date: selectedDate })}
                      size={220}
                    />
                  </div> 

                  <p className="mt-4 text-gray-600 text-center">
                    Scan this QR code for attendance verification
                  </p>

                  <div className="mt-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm">
                    Date: {selectedDate}
                  </div>

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
              ))}
            </div>

            {isAdmin && <div className="order-2 lg:order-1 lg:col-span-2 bg-white rounded-3xl shadow-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Attendance Date (Today)
                  </label>
                  <input
                    type="date"
                    value={today}
                    min={today}
                    max={today}
                    disabled
                    className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-gray-700 md:w-72"
                  />
                </div>

                <button
                  onClick={handleGenerateQR}
                  className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold"
                >
                  Generate QR Code
                </button>
              </div>

              {selectedDate ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <th className="p-4 text-left rounded-l-xl">S.No</th>
                        <th className="p-4 text-left">Teacher Name</th>
                        <th className="p-4 text-left">Present Date</th>
                        <th className="p-4 text-center rounded-r-xl">Attendance</th>
                      </tr>
                    </thead>

                    <tbody>
                      {teacherList.map((teacher, index) => (
                        <tr
                          key={teacher._id}
                          className="border-b hover:bg-blue-50 transition duration-200"
                        >
                          <td className="p-4 font-medium">{index + 1}</td>
                          <td className="p-4 font-semibold text-gray-700">
                            {teacher.name}
                          </td>
                          <td className="p-4 text-gray-600">{selectedDate}</td>
                          <td className="p-4">
                            <div className="flex flex-row flex-nowrap items-center justify-center gap-2">
                              <label className="flex shrink-0 items-center gap-1 rounded-xl bg-green-100 px-2 py-2 cursor-pointer hover:bg-green-200 sm:gap-2 sm:px-4">
                                <input
                                  type="radio"
                                  name={`attendance-${teacher._id}`}
                                  checked={attendance[teacher._id] === "present"}
                                  onChange={() => handleStatusChange(teacher._id, "present")}
                                />
                                <span className="text-green-700 font-medium">Present</span>
                              </label>

                              <label className="flex shrink-0 cursor-pointer items-center gap-1 rounded-xl bg-red-100 px-2 py-2 hover:bg-red-200 sm:gap-2 sm:px-4">
                                <input
                                  type="radio"
                                  name={`attendance-${teacher._id}`}
                                  checked={attendance[teacher._id] === "absent"}
                                  onChange={() => handleStatusChange(teacher._id, "absent")}
                                />
                                <span className="text-red-700 font-medium">Absent</span>
                              </label>

                              <label className="flex shrink-0 cursor-pointer items-center gap-1 rounded-xl bg-yellow-100 px-2 py-2 hover:bg-yellow-200 sm:gap-2 sm:px-4">
                                <input
                                  type="radio"
                                  name={`attendance-${teacher._id}`}
                                  checked={attendance[teacher._id] === "late"}
                                  onChange={() => handleStatusChange(teacher._id, "late")}
                                />
                                <span className="text-yellow-700 font-medium">Late</span>
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
              {submitError && (
                <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                  {submitError}
                </p>
              )}
            </div>}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherAttendence;
import React from "react";
import LayoutStu from "../Components/LayoutStu";
import { StudentData } from "../context/Student";

const StudentFeeReceipt = () => {
  const { feeshistory } = StudentData();

  console.log(feeshistory);

  return (
    <LayoutStu>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 sm:p-20 lg:p-2">

        {/* Header */}
        <div className="text-center mt-16 mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-purple-700">
            Student Fee Receipt
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Manage and view student fee details
          </p>
        </div>

        {/* Card */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-purple-100">

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-4 text-left">Receipt</th>
                  <th className="px-4 py-4 text-left">Student</th>
                  <th className="px-4 py-4 text-left">Ledger ID</th>
                  <th className="px-4 py-4 text-left">Class</th>
                  <th className="px-4 py-4 text-left">Back Dues</th>
                  <th className="px-4 py-4 text-left">Submitted</th>
                  <th className="px-4 py-4 text-left">Dues</th>
                  <th className="px-4 py-4 text-left">Date</th>
                </tr>
              </thead>

              <tbody>
                {feeshistory?.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-b hover:bg-purple-50 transition duration-300"
                  >
                    <td className="px-4 py-4 font-semibold text-indigo-600">
                      {item.receipt || "N/A"}
                    </td>

                    <td className="px-4 py-4 flex items-center gap-3">
                      {/* <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                        {item.studentName?.charAt(0)}
                      </div> */}
                      {item.studentName}
                    </td>

                    <td className="px-4 py-4">
                      {item.ledgerId}
                    </td>

                    <td className="px-4 py-4">
                      {item.studentClass}
                    </td>

                    <td className="px-4 py-4 text-red-500 font-semibold">
                      ₹{item.backDues || 0}
                    </td>

                    <td className="px-4 py-4 text-green-600 font-semibold">
                      ₹{item.submitFees || 0}
                    </td>

                    <td className="px-4 py-4 text-orange-500 font-semibold">
                      ₹{item.dues || 0}
                    </td>

                    <td className="px-4 py-4 text-blue-500 font-semibold">
                      {item.date || 0}
                    </td>

                    {/* <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          item.dues === 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.dues === 0 ? "Paid" : "Pending"}
                      </span>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden p-2 space-y-2">
            {feeshistory?.map((item, index) => (
              <div
                key={item._id || index}
                className="bg-gradient-to-r from-white to-purple-50 rounded-2xl shadow-md p-2 hover:shadow-xl transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  {/* <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg">
                    {item.studentName?.charAt(0)}
                  </div> */}

                  <div>
                    <h2 className="font-bold text-gray-800">
                      {item.studentName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.studentClass}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-semibold">Receipt:</span>
                    <span>{item.receipt || "N/A"}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold">Ledger ID:</span>
                    <span>{item.ledgerId}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-red-500">
                      Back Dues:
                    </span>
                    <span>₹{item.backDues || 0}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-green-600">
                      Submitted:
                    </span>
                    <span>₹{item.submitFees || 0}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-orange-500">
                      Dues:
                    </span>
                    <span>₹{item.dues || 0}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-semibold text-orange-500">
                      Date:
                    </span>
                    <span>{item.date || N/A}</span>
                  </div>
                </div>

                {/* <div className="mt-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      item.dues === 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.dues === 0 ? "Paid" : "Pending"}
                  </span>
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            For any queries, contact the school office.
          </p>
        </div>
      </div>
    </LayoutStu>
  );
};

export default StudentFeeReceipt;
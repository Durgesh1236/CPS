import React, { useState } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";
import { MdDelete } from "react-icons/md";

const BookSaleHistory = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const { bookSale, Deletebookdata, editBookData } = UserData();

  // ✅ Calculations
  const totalSubmitAmount = bookSale.reduce(
    (sum, row) => sum + (Number(row.submitAmount) || 0),
    0
  );

  const totalDues = bookSale.reduce(
    (sum, row) =>
      sum + ((Number(row.totalamount) || 0) - (Number(row.submitAmount) || 0)),
    0
  );

  // Edit
  const handleEdit = (index, row) => {
    setEditIndex(index);
    setEditRow({ ...row });
  };

  // Save
  const handleSave = (row) => {
    editBookData(
      row._id,
      editRow.ledgerId,
      editRow.studentName,
      editRow.studentClass,
      editRow.paymentMethod,
      editRow.totalamount,
      editRow.submitAmount,
      editRow.dues
    );
    setEditIndex(null);
  };

  // Cancel
  const handleCancel = () => {
    setEditIndex(null);
    setEditRow({});
  };

  return (
    <TeacherLayout>
      <div className="w-full mx-auto mt-20 p-3 md:p-6">

        {/* 🔥 Title */}
        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-6 
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
        text-transparent bg-clip-text">
          📚 Book Sale Dashboard
        </h2>

        {/* 🔥 MOBILE DROPDOWN */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="w-full bg-blue-500 text-white py-2 rounded-xl shadow"
          >
            {showSummary ? "Hide Summary ▲" : "Show Summary ▼"}
          </button>
        </div>

        {/* 🔥 SUMMARY */}
        <div className={`${showSummary ? "block" : "hidden"} md:block`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">

            <div className="bg-green-100 rounded-2xl p-5 text-center shadow">
              <p>Total Submit</p>
              <p className="text-xl font-bold text-green-700">
                ₹ {totalSubmitAmount}
              </p>
            </div>

            <div className="bg-blue-100 rounded-2xl p-5 text-center shadow">
              <p>Total Records</p>
              <p className="text-xl font-bold text-blue-700">
                {bookSale.length}
              </p>
            </div>

            <div className="bg-red-100 rounded-2xl p-5 text-center shadow">
              <p>Total Dues</p>
              <p className="text-xl font-bold text-red-600">
                ₹ {totalDues}
              </p>
            </div>

          </div>
        </div>

        {/* 🔥 TABLE */}
        <div className="rounded-3xl shadow-2xl bg-gradient-to-br 
        from-blue-100 via-white to-purple-100 p-3 md:p-5">

          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full rounded-xl 
            text-xs sm:text-sm md:text-base border-separate border-spacing-y-2">

              {/* HEAD */}
              <thead className="bg-blue-300">
                <tr className="text-blue-900 uppercase font-bold">
                  <th className="px-6 py-4 whitespace-nowrap">S.No</th>
                  <th className="px-6 py-4 whitespace-nowrap">Ledger ID</th>
                  <th className="px-6 py-4 whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Class</th>
                  <th className="px-6 py-4 whitespace-nowrap">Payment</th>
                  <th className="px-6 py-4 whitespace-nowrap">Total</th>
                  <th className="px-6 py-4 whitespace-nowrap">Submit</th>
                  <th className="px-6 py-4 whitespace-nowrap">Dues</th>
                  <th className="px-6 py-4 whitespace-nowrap">Date</th>
                  <th className="px-6 py-4 whitespace-nowrap">By</th>
                  <th className="px-6 py-4 text-center whitespace-nowrap">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {bookSale.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center py-6 text-gray-500">
                      No Data Available
                    </td>
                  </tr>
                ) : (
                  bookSale.map((row, index) => (
                    <tr
                      key={index}
                      className="bg-white shadow-sm hover:shadow-md rounded-lg transition"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.ledgerId}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.studentName}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.studentClass}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.paymentMethod}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-green-700 font-bold">
                        ₹ {row.totalamount}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-green-700 font-bold">
                        ₹ {row.submitAmount}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-red-600">
                        ₹ {row.totalamount - row.submitAmount}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.date}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {row.submitedBy?.name}
                      </td>

                      {/* 🔥 ACTION BUTTONS */}
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {editIndex === index ? (
                          <div className="flex flex-row gap-2 justify-center items-center">

                            {/* Save */}
                            <button
                              onClick={() => handleSave(row)}
                              className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Save
                            </button>

                            {/* Cancel */}
                            <button
                              onClick={handleCancel}
                              className="bg-gray-400 text-white px-2 py-1 rounded text-xs"
                            >
                              Cancel
                            </button>

                            {/* Delete */}
                            <MdDelete
                              className="text-red-500 text-xl cursor-pointer"
                              onClick={() => Deletebookdata(row._id)}
                            />
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEdit(index, row)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                        )}
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </TeacherLayout>
  );
};

export default BookSaleHistory;
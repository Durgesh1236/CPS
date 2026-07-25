import React, { useState } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaBook, FaRupeeSign, FaLayerGroup } from "react-icons/fa";

const BookSaleHistory = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [showSummary, setShowSummary] = useState(true);

  const { bookSale, Deletebookdata, editBookData } = UserData();

  const totalSubmitAmount = bookSale.reduce(
    (sum, row) => sum + (Number(row.submitAmount) || 0),
    0
  );

  const totalDues = bookSale.reduce(
    (sum, row) =>
      sum + ((Number(row.totalamount) || 0) - (Number(row.submitAmount) || 0)),
    0
  );

  const classOptions = ["P.Nur", "Nur", "LKG", "UKG", "1", "2", "3", "4", "5", "6"];

  const handleEdit = (index, row) => {
    setEditIndex(index);
    setEditRow({ ...row });
  };

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

  const handleCancel = () => {
    setEditIndex(null);
    setEditRow({});
  };

  return (
    <TeacherLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono-num { font-family: 'Space Mono', monospace; }
      `}</style>

      <div className="font-body h-full w-full overflow-y-auto bg-[#F3F1EC] px-3 sm:px-6 lg:py-20 py-20 sm:py-8">
        <div className="w-full mx-auto">

          {/* Header */}
          <div className="mb-6">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1E2540]">
              Book Sale Ledger
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {bookSale.length} record{bookSale.length !== 1 ? "s" : ""} on file
            </p>
          </div>

          {/* Mobile summary toggle */}
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="sm:hidden w-full mb-3 bg-[#1E2540] text-white font-display font-semibold py-2.5 rounded-xl"
          >
            {showSummary ? "Hide Summary ▲" : "Show Summary ▼"}
          </button>

          {/* Summary cards */}
          <div className={`${showSummary ? "grid" : "hidden"} sm:grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6`}>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
              <span className="w-11 h-11 shrink-0 rounded-xl bg-[#2F6F5E]/10 text-[#2F6F5E] flex items-center justify-center">
                <FaRupeeSign />
              </span>
              <div>
                <p className="text-[11px] font-display font-semibold tracking-wider uppercase text-slate-400">
                  Total Collected
                </p>
                <p className="font-mono-num font-bold text-xl text-[#2F6F5E]">
                  ₹{totalSubmitAmount}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
              <span className="w-11 h-11 shrink-0 rounded-xl bg-[#1E2540]/10 text-[#1E2540] flex items-center justify-center">
                <FaLayerGroup />
              </span>
              <div>
                <p className="text-[11px] font-display font-semibold tracking-wider uppercase text-slate-400">
                  Total Records
                </p>
                <p className="font-mono-num font-bold text-xl text-[#1E2540]">
                  {bookSale.length}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
              <span className="w-11 h-11 shrink-0 rounded-xl bg-[#E8B04B]/15 text-[#B8801F] flex items-center justify-center">
                <FaBook />
              </span>
              <div>
                <p className="text-[11px] font-display font-semibold tracking-wider uppercase text-slate-400">
                  Total Dues
                </p>
                <p className="font-mono-num font-bold text-xl text-[#B8801F]">
                  ₹{totalDues}
                </p>
              </div>
            </div>
          </div>

          {bookSale.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center text-slate-400">
              No records yet.
            </div>
          ) : (
            <>
              {/* ===== DESKTOP / TABLET TABLE (md and up) ===== */}
              <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#1E2540] text-white font-display uppercase text-[11px] tracking-wider">
                        <th className="px-4 py-3.5 text-left whitespace-nowrap">#</th>
                        <th className="px-4 py-3.5 text-left whitespace-nowrap">Ledger ID</th>
                        <th className="px-4 py-3.5 text-left whitespace-nowrap">Name</th>
                        <th className="px-4 py-3.5 text-left whitespace-nowrap">Class</th>
                        <th className="px-4 py-3.5 text-left whitespace-nowrap">Payment</th>
                        <th className="px-4 py-3.5 text-right whitespace-nowrap">Total</th>
                        <th className="px-4 py-3.5 text-right whitespace-nowrap">Submit</th>
                        <th className="px-4 py-3.5 text-right whitespace-nowrap">Dues</th>
                        <th className="px-4 py-3.5 text-left whitespace-nowrap">Date</th>
                        <th className="px-4 py-3.5 text-left whitespace-nowrap">Submit By</th>
                        <th className="px-4 py-3.5 text-center whitespace-nowrap">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookSale.map((row, index) => {
                        const editing = editIndex === index;
                        const rowDues = row.totalamount - row.submitAmount;
                        return (
                          <tr
                            key={row._id || index}
                            className={`border-b border-slate-100 last:border-b-0 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/60"} hover:bg-[#2F6F5E]/5 transition-colors`}
                          >
                            <td className="px-4 py-3 text-slate-500">{index + 1}</td>

                            <td className="px-4 py-3">
                              {editing ? (
                                <input
                                  type="text"
                                  value={editRow.ledgerId}
                                  onChange={(e) => setEditRow({ ...editRow, ledgerId: e.target.value })}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className="font-mono-num text-[#1E2540]">{row.ledgerId}</span>
                              )}
                            </td>

                            <td className="px-4 py-3">
                              {editing ? (
                                <input
                                  type="text"
                                  value={editRow.studentName}
                                  onChange={(e) => setEditRow({ ...editRow, studentName: e.target.value })}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-28 focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className="font-display font-semibold text-[#1E2540]">{row.studentName}</span>
                              )}
                            </td>

                            <td className="px-4 py-3">
                              {editing ? (
                                <select
                                  value={editRow.studentClass}
                                  onChange={(e) => setEditRow({ ...editRow, studentClass: e.target.value })}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                >
                                  <option value="">Select</option>
                                  {classOptions.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                  ))}
                                </select>
                              ) : (
                                row.studentClass
                              )}
                            </td>

                            <td className="px-4 py-3">
                              {editing ? (
                                <input
                                  type="text"
                                  value={editRow.paymentMethod}
                                  onChange={(e) => setEditRow({ ...editRow, paymentMethod: e.target.value })}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className="capitalize text-slate-600">{row.paymentMethod}</span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-right">
                              {editing ? (
                                <input
                                  type="number"
                                  value={editRow.totalamount}
                                  onChange={(e) => setEditRow({ ...editRow, totalamount: e.target.value })}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-20 text-right focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className="font-mono-num font-semibold text-[#1E2540]">₹{row.totalamount}</span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-right">
                              {editing ? (
                                <input
                                  type="number"
                                  value={editRow.submitAmount}
                                  onChange={(e) => setEditRow({ ...editRow, submitAmount: e.target.value })}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-20 text-right focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className="font-mono-num font-semibold text-[#2F6F5E]">₹{row.submitAmount}</span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-right">
                              {editing ? (
                                <input
                                  type="number"
                                  value={editRow.dues}
                                  onChange={(e) => setEditRow({ ...editRow, dues: e.target.value })}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-20 text-right focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className={`font-mono-num font-semibold ${rowDues === 0 ? "text-[#2F6F5E]" : "text-[#B8801F]"}`}>
                                  ₹{rowDues}
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-3 whitespace-nowrap text-slate-500">{row.date}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-slate-500">{row.submitedBy?.name}</td>

                            <td className="px-4 py-3">
                              {editing ? (
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleSave(row)}
                                    className="bg-[#2F6F5E] text-white px-2.5 py-1 rounded-lg text-xs font-display font-semibold hover:bg-[#275c4d] transition-colors"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancel}
                                    className="bg-slate-200 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-display font-semibold hover:bg-slate-300 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <MdDelete
                                    className="text-red-400 text-lg cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={() => Deletebookdata(row._id)}
                                  />
                                </div>
                              ) : (
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleEdit(index, row)}
                                    className="flex items-center gap-1 bg-[#1E2540]/5 text-[#1E2540] px-2.5 py-1 rounded-lg text-xs font-display font-semibold hover:bg-[#1E2540]/10 transition-colors"
                                  >
                                    <MdEdit /> Edit
                                  </button>
                                  <MdDelete
                                    className="text-red-400 text-lg cursor-pointer hover:text-red-500 transition-colors"
                                    onClick={() => Deletebookdata(row._id)}
                                  />
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ===== MOBILE CARD LIST (below md) ===== */}
              <div className="md:hidden space-y-3 mb-10">
                {bookSale.map((row, index) => {
                  const editing = editIndex === index;
                  const rowDues = row.totalamount - row.submitAmount;
                  return (
                    <div
                      key={row._id || index}
                      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-3 bg-[#1E2540]">
                        <span className="font-mono-num text-[#5FBFA5] text-xs">
                          #{index + 1} · {row.ledgerId}
                        </span>
                        <span className={`font-mono-num font-bold text-sm ${rowDues === 0 ? "text-[#5FBFA5]" : "text-[#E8B04B]"}`}>
                          ₹{rowDues} due
                        </span>
                      </div>

                      <div className="p-4 space-y-3">
                        {editing ? (
                          <>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={editRow.studentName}
                                onChange={(e) => setEditRow({ ...editRow, studentName: e.target.value })}
                                placeholder="Name"
                                className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm col-span-2 focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                              />
                              <select
                                value={editRow.studentClass}
                                onChange={(e) => setEditRow({ ...editRow, studentClass: e.target.value })}
                                className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                              >
                                <option value="">Class</option>
                                {classOptions.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                              <input
                                type="text"
                                value={editRow.paymentMethod}
                                onChange={(e) => setEditRow({ ...editRow, paymentMethod: e.target.value })}
                                placeholder="Payment"
                                className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                              />
                              <input
                                type="number"
                                value={editRow.totalamount}
                                onChange={(e) => setEditRow({ ...editRow, totalamount: e.target.value })}
                                placeholder="Total"
                                className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                              />
                              <input
                                type="number"
                                value={editRow.submitAmount}
                                onChange={(e) => setEditRow({ ...editRow, submitAmount: e.target.value })}
                                placeholder="Submit"
                                className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                              />
                            </div>
                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={() => handleSave(row)}
                                className="flex-1 bg-[#2F6F5E] text-white py-1.5 rounded-lg text-xs font-display font-semibold"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancel}
                                className="flex-1 bg-slate-200 text-slate-600 py-1.5 rounded-lg text-xs font-display font-semibold"
                              >
                                Cancel
                              </button>
                              <MdDelete
                                className="text-red-400 text-xl cursor-pointer self-center"
                                onClick={() => Deletebookdata(row._id)}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <p className="font-display font-bold text-[#1E2540]">{row.studentName}</p>
                              <span className="text-xs text-slate-400">{row.studentClass}</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div>
                                <p className="text-[10px] uppercase text-slate-400">Total</p>
                                <p className="font-mono-num font-semibold text-[#1E2540] text-sm">₹{row.totalamount}</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase text-slate-400">Paid</p>
                                <p className="font-mono-num font-semibold text-[#2F6F5E] text-sm">₹{row.submitAmount}</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase text-slate-400">Method</p>
                                <p className="text-sm capitalize text-slate-600">{row.paymentMethod || "—"}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-100">
                              <span>{row.date}</span>
                              <span>By {row.submitedBy?.name || "—"}</span>
                            </div>

                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={() => handleEdit(index, row)}
                                className="flex-1 flex items-center justify-center gap-1 bg-[#1E2540]/5 text-[#1E2540] py-1.5 rounded-lg text-xs font-display font-semibold"
                              >
                                <MdEdit /> Edit
                              </button>
                              <button
                                onClick={() => Deletebookdata(row._id)}
                                className="flex items-center justify-center px-3 bg-red-50 text-red-500 rounded-lg"
                              >
                                <MdDelete />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </TeacherLayout>
  );
};

export default BookSaleHistory;
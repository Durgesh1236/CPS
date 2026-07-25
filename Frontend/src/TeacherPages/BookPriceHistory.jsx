import React, { useState } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaBook, FaTags, FaCoins } from "react-icons/fa";

const BookPriceHistory = () => {
  const { bookPrice, editBookPrice, deleteBookPrice, user, bookSale } = UserData();

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  const isAdmin = user?.role === "admin";

  const handleEdit = (item, index) => {
    setEditIndex(index);
    setEditData({ ...item });
  };

  const handleChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  const handleSave = () => {
    editBookPrice(
      editData._id,
      editData.studentClass,
      editData.bookTotalPrice,
      editData.diary,
      editData.discount,
      editData.BookQuantity
    );
    setEditIndex(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditData({});
  };

  const handleDelete = (id) => {
    deleteBookPrice(id);
    setEditData({});
  };

  const salesCount = (studentClass) =>
    bookSale.filter((sale) => sale.studentClass === studentClass).length || 0;

  return (
    <TeacherLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap');
        .font-display { font-family: 'Sora', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono-num { font-family: 'Space Mono', monospace; }
      `}</style>

      <div className="font-body h-full w-full overflow-y-auto bg-[#F3F1EC] px-3 sm:px-6 lg:py-18 py-20 sm:py-8">
        <div className="w-full mx-auto">

          {/* Header */}
          <div className="mb-6">
            <p className="font-display text-[10px] sm:text-xs tracking-[0.25em] text-[#2F6F5E] uppercase mb-1">
              Teacher Portal
            </p>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#1E2540]">
              Book Price Register
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {bookPrice?.length || 0} class price{bookPrice?.length !== 1 ? "s" : ""} configured
            </p>
          </div>

          {!bookPrice || bookPrice.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm py-16 text-center text-slate-400">
              No pricing data available.
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
                        <th className="px-4 py-3.5 text-left whitespace-nowrap">Class</th>
                        <th className="px-4 py-3.5 text-right whitespace-nowrap">Total Books</th>
                        <th className="px-4 py-3.5 text-right whitespace-nowrap">Book Price</th>
                        <th className="px-4 py-3.5 text-right whitespace-nowrap">Diary</th>
                        <th className="px-4 py-3.5 text-right whitespace-nowrap">Discount</th>
                        <th className="px-4 py-3.5 text-right whitespace-nowrap">Total</th>
                        <th className="px-4 py-3.5 text-right whitespace-nowrap">Qty</th>
                        <th className="px-4 py-3.5 text-right whitespace-nowrap">Sold</th>
                        {isAdmin && <th className="px-4 py-3.5 text-center whitespace-nowrap">Action</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {bookPrice.map((item, index) => {
                        const editing = editIndex === index;
                        return (
                          <tr
                            key={item._id || index}
                            className={`border-b border-slate-100 last:border-b-0 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/60"} hover:bg-[#2F6F5E]/5 transition-colors`}
                          >
                            <td className="px-4 py-3 text-slate-500">{index + 1}</td>

                            <td className="px-4 py-3">
                              {editing ? (
                                <input
                                  value={editData.studentClass}
                                  onChange={(e) => handleChange(e, "studentClass")}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className="font-display font-semibold text-[#1E2540]">{item.studentClass}</span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-right text-slate-600">{item.TotalBooks || 0}</td>

                            <td className="px-4 py-3 text-right">
                              {editing ? (
                                <input
                                  type="number"
                                  value={editData.bookTotalPrice}
                                  onChange={(e) => handleChange(e, "bookTotalPrice")}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-24 text-right focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className="font-mono-num text-[#1E2540]">₹{item.bookTotalPrice}</span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-right">
                              {editing ? (
                                <input
                                  type="number"
                                  value={editData.diary}
                                  onChange={(e) => handleChange(e, "diary")}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-20 text-right focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className="font-mono-num text-[#1E2540]">₹{item.diary}</span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-right">
                              {editing ? (
                                <input
                                  type="number"
                                  value={editData.discount}
                                  onChange={(e) => handleChange(e, "discount")}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-16 text-right focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className="font-mono-num text-[#B8801F]">₹{item.discount}</span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-right">
                              <span className="font-mono-num font-bold text-[#2F6F5E]">₹{item.totalPayable}</span>
                            </td>

                            <td className="px-4 py-3 text-right">
                              {editing ? (
                                <input
                                  type="number"
                                  value={editData.BookQuantity}
                                  onChange={(e) => handleChange(e, "BookQuantity")}
                                  className="border border-slate-200 rounded-lg px-2 py-1 w-16 text-right focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                                />
                              ) : (
                                <span className="text-slate-600">{item.BookQuantity || 1}</span>
                              )}
                            </td>

                            <td className="px-4 py-3 text-right text-slate-600">{salesCount(item.studentClass)}</td>

                            {isAdmin && (
                              <td className="px-4 py-3">
                                {editing ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <button
                                      onClick={handleSave}
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
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-center gap-2">
                                    <button
                                      onClick={() => handleEdit(item, index)}
                                      className="flex items-center gap-1 bg-[#1E2540]/5 text-[#1E2540] px-2.5 py-1 rounded-lg text-xs font-display font-semibold hover:bg-[#1E2540]/10 transition-colors"
                                    >
                                      <MdEdit /> Edit
                                    </button>
                                    <MdDelete
                                      className="text-red-400 text-lg cursor-pointer hover:text-red-500 transition-colors"
                                      onClick={() => handleDelete(item._id)}
                                    />
                                  </div>
                                )}
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ===== MOBILE CARD LIST (below md) ===== */}
              <div className="md:hidden space-y-3">
                {bookPrice.map((item, index) => {
                  const editing = editIndex === index;
                  return (
                    <div
                      key={item._id || index}
                      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-3 bg-[#1E2540]">
                        <span className="font-mono-num text-[#5FBFA5] text-xs">#{index + 1}</span>
                        <span className="font-mono-num font-bold text-[#5FBFA5] text-sm">
                          ₹{item.totalPayable} total
                        </span>
                      </div>

                      <div className="p-4 space-y-3">
                        {editing ? (
                          <>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                value={editData.studentClass}
                                onChange={(e) => handleChange(e, "studentClass")}
                                placeholder="Class"
                                className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm col-span-2 focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                              />
                              <input
                                type="number"
                                value={editData.bookTotalPrice}
                                onChange={(e) => handleChange(e, "bookTotalPrice")}
                                placeholder="Book price"
                                className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                              />
                              <input
                                type="number"
                                value={editData.diary}
                                onChange={(e) => handleChange(e, "diary")}
                                placeholder="Diary"
                                className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                              />
                              <input
                                type="number"
                                value={editData.discount}
                                onChange={(e) => handleChange(e, "discount")}
                                placeholder="Discount"
                                className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                              />
                              <input
                                type="number"
                                value={editData.BookQuantity}
                                onChange={(e) => handleChange(e, "BookQuantity")}
                                placeholder="Qty"
                                className="border border-slate-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F6F5E]/30"
                              />
                            </div>
                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={handleSave}
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
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <p className="font-display font-bold text-[#1E2540] flex items-center gap-1.5">
                                <FaBook className="text-[#2F6F5E] text-sm" /> Class {item.studentClass}
                              </p>
                              <span className="text-xs text-slate-400">{item.TotalBooks || 0} books</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 text-center">
                              <div>
                                <p className="text-[10px] uppercase text-slate-400">Price</p>
                                <p className="font-mono-num font-semibold text-[#1E2540] text-sm">₹{item.bookTotalPrice}</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase text-slate-400">Diary</p>
                                <p className="font-mono-num font-semibold text-[#1E2540] text-sm">₹{item.diary}</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase text-slate-400">Discount</p>
                                <p className="font-mono-num font-semibold text-[#B8801F] text-sm">₹{item.discount}</p>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-100">
                              <span className="flex items-center gap-1">
                                <FaTags className="text-[10px]" /> Qty {item.BookQuantity || 1}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaCoins className="text-[10px]" /> {salesCount(item.studentClass)} sold
                              </span>
                            </div>

                            {isAdmin && (
                              <div className="flex gap-2 pt-1">
                                <button
                                  onClick={() => handleEdit(item, index)}
                                  className="flex-1 flex items-center justify-center gap-1 bg-[#1E2540]/5 text-[#1E2540] py-1.5 rounded-lg text-xs font-display font-semibold"
                                >
                                  <MdEdit /> Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  className="flex items-center justify-center px-3 bg-red-50 text-red-500 rounded-lg"
                                >
                                  <MdDelete />
                                </button>
                              </div>
                            )}
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

export default BookPriceHistory;
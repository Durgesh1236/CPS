import React, { useState } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";

const BookPriceHistory = () => {
  const { bookPrice, editBookPrice, deleteBookPrice } = UserData();

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({});

  // Handle Edit Click
  const handleEdit = (item, index) => {
    setEditIndex(index);
    setEditData({ ...item });
  };

  // Handle Change
  const handleChange = (e, field) => {
    setEditData({
      ...editData,
      [field]: e.target.value,
    });
  };

  // Save
  const handleSave = () => {
    editBookPrice(editData._id, editData.studentClass, editData.bookTotalPrice, editData.diary, editData.discount, editData.BookQuantity); // your API
    setEditIndex(null);
    setEditData({});
  };
 
  // Cancel
  const handleCancel = () => {
    setEditIndex(null);
  };

  // Delete
  const handleDelete = (id) => {
    deleteBookPrice(id);
    setEditData({})
  };

  return (
    <TeacherLayout>
      <div className="p-3 md:p-8 my-14 bg-gray-100 min-h-screen">
        
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
          📊 Book Price History
        </h2>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
          <table className="min-w-[1000px] w-full text-sm md:text-base">

            {/* Head */}
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <tr>
                <th className="px-6 py-4 text-center">S.No</th>
                <th className="px-6 py-4 text-center">Class</th>
                <th className="px-6 py-4 text-center">Book Price</th>
                <th className="px-6 py-4 text-center">Diary</th>
                <th className="px-6 py-4 text-center">Discount</th>
                <th className="px-6 py-4 text-center">Total</th>
                <th className="px-6 py-4 text-center">Qty</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {bookPrice?.length > 0 ? (
                bookPrice.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">

                    <td className="px-6 py-4 text-center">{index + 1}</td>

                    {/* Class */}
                    <td className="px-6 py-4 text-center">
                      {editIndex === index ? (
                        <input
                          value={editData.studentClass}
                          onChange={(e) => handleChange(e, "studentClass")}
                          className="border p-1 rounded w-20"
                        />
                      ) : (
                        item.studentClass
                      )}
                    </td>

                    {/* Book Price */}
                    <td className="px-6 py-4 text-center">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={editData.bookTotalPrice}
                          onChange={(e) => handleChange(e, "bookTotalPrice")}
                          className="border p-1 rounded w-24"
                        />
                      ) : (
                        `₹ ${item.bookTotalPrice}`
                      )}
                    </td>

                    {/* Diary */}
                    <td className="px-6 py-4 text-center">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={editData.diary}
                          onChange={(e) => handleChange(e, "diary")}
                          className="border p-1 rounded w-20"
                        />
                      ) : (
                        `₹ ${item.diary}`
                      )}
                    </td>

                    {/* Discount */}
                    <td className="px-6 py-4 text-center">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={editData.discount}
                          onChange={(e) => handleChange(e, "discount")}
                          className="border p-1 rounded w-16"
                        />
                      ) : (
                        `${item.discount}%`
                      )}
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 text-center text-green-600 font-bold">
                      ₹ {item.totalPayable}
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4 text-center">
                      {editIndex === index ? (
                        <input
                          type="number"
                          value={editData.BookQuantity}
                          onChange={(e) => handleChange(e, "BookQuantity")}
                          className="border p-1 rounded w-16"
                        />
                      ) : (
                        item.BookQuantity || 1
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-center space-x-2">
                      {editIndex === index ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>

                          <button
                            onClick={handleCancel}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(item, index)}
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-2xl py-6">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default BookPriceHistory;
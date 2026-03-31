import React, { useState, useEffect } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";

const BookForm = () => {
  const [studentClass, setStudentClass] = useState("");
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [diaryPrice, setDiaryPrice] = useState();
  const [finalPrice, setFinalPrice] = useState(0);
  const [BookQuantity, setBookQuantity] = useState();
  const [discountAmount, setDiscountAmount] = useState(0);
  const { BookPriceForm } = UserData();
  const [Totalbooks, setTotalBooks] = useState();

  useEffect(() => {
    const total = Number(price) || 0;
    const disc = Number(discount) || 0;
    const diary = Number(diaryPrice) || 0;

    const discountAmount = (total * disc) / 100;
    const final = total - discountAmount + diary;
    setFinalPrice(final);
    setDiscountAmount(discountAmount);
  }, [price, discount, diaryPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    BookPriceForm(studentClass, Totalbooks, price, diaryPrice, discountAmount, BookQuantity);
    // reset
    setStudentClass("");
    setPrice(0);
    setDiaryPrice(0);
    setDiscount(0);
    setFinalPrice(0);
  };

  return (
    <TeacherLayout>
      <div className="mt-12 flex items-center justify-center bg-gray-100 p-4">
        <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-3xl lg:w-full" onSubmit={handleSubmit}>
          
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            📚 Book Price Form
          </h2>
          {/* Class */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Select Class
          </label>
          <select
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="w-full p-2 mb-4 rounded-lg border outline-none"
            required
          >
            <option value="">Select Class</option>
            <option>P.Nur</option>
            <option>Nur</option>
            <option>LKG</option>
            <option>UKG</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>

          {/* Total Books */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Books
          </label>
          <input
            type="number"
            value={Totalbooks}
            onChange={(e) => setTotalBooks(Number(e.target.value))}
            className="w-full p-2 mb-4 rounded-lg border outline-none"
            required
          />

          {/* Book Price */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Total Book Price (₹)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full p-2 mb-4 rounded-lg border outline-none"
            required
          />

          {/* Diary Price */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Diary Price (₹)
          </label>
          <input
            type="number"
            value={diaryPrice}
            onChange={(e) => setDiaryPrice(Number(e.target.value))}
            className="w-full p-2 mb-4 rounded-lg border outline-none"
            required
          />

          {/* Discount */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Discount (%)
          </label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full p-2 mb-4 rounded-lg border outline-none"
          />

          {/* Quantity */}
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Book Quantity
          </label>
          <input
            type="number"
            value={BookQuantity}
            onChange={(e) => setBookQuantity(Number(e.target.value))}
            className="w-full p-2 mb-4 rounded-lg border outline-none"
          />

          {/* Result Box */}
          <div className="bg-gray-100 p-3 gap-3 flex-none lg:flex md:flex rounded-lg mb-4 text-center">
            <p className="text-gray-700 font-semibold">
              📖 Book Price: ₹{price}
            </p>
            <p className="text-gray-700 font-semibold">
              📓 Diary Price: ₹{diaryPrice}
            </p>
            <p className="text-gray-700 font-semibold">
              💸 Discount: ₹{discountAmount}
            </p>

            <hr className="my-2" />

            <p className="text-lg font-bold text-green-600">
              ✅ Total Payable: ₹{finalPrice}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </TeacherLayout>
  );
};

export default BookForm;
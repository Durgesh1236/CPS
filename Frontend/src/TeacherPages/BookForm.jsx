import React, { useState, useEffect } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";
import { FaBookOpen, FaLayerGroup, FaGraduationCap, FaReceipt } from "react-icons/fa";
import { FaIndianRupeeSign, FaPercent } from "react-icons/fa6";
import { MdOutlineEditNote } from "react-icons/md";

const CLASSES = ["P.Nur", "Nur", "LKG", "UKG", "1", "2", "3", "4", "5", "6"];

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

    const discountAmt = disc;
    const final = total - discountAmt + diary;
    setFinalPrice(final);
    setDiscountAmount(discountAmt);
  }, [price, discount, diaryPrice]);

  const handleSubmit = (e) => {
    e.preventDefault();
    BookPriceForm(
      studentClass,
      Totalbooks,
      price,
      diaryPrice,
      discountAmount,
      BookQuantity
    );
    // reset
    setStudentClass("");
    setPrice(0);
    setDiaryPrice(0);
    setDiscount(0);
    setFinalPrice(0);
  };

  return (
    <TeacherLayout>
      <div
        className="min-h-screen w-full py-10 px-4 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, #F3EEE1 0%, #ECE4D0 100%)",
        }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6">
          {/* LEFT: Ledger-style form */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-[#FFFDF8] rounded-2xl shadow-xl border border-[#E4D9BE] overflow-hidden"
          >
            {/* Header band */}
            <div
              className="px-8 py-6 flex items-center gap-3"
              style={{ background: "#1F2E4A" }}
            >
              <div className="bg-[#E8A33D] p-2.5 rounded-xl shrink-0">
                <FaBookOpen className="w-6 h-6 text-[#1F2E4A]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#FBF7EE] tracking-tight">
                  Book Price Register
                </h2>
                <p className="text-xs text-[#B9C2D6] mt-0.5">
                  Record book &amp; diary charges per class
                </p>
              </div>
            </div>

            <div className="px-8 py-7">
              {/* Ruled-ledger field group */}
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                {/* Class */}
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#6B5F45] mb-1.5">
                    <FaGraduationCap className="w-3.5 h-3.5" />
                    Class
                  </label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#DCD2B8] bg-white text-[#2A2A2A] outline-none focus:ring-2 focus:ring-[#E8A33D] transition"
                    required
                  >
                    <option value="">Select class</option>
                    {CLASSES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Total Books */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#6B5F45] mb-1.5">
                    <FaLayerGroup className="w-3.5 h-3.5" />
                    No. of Books
                  </label>
                  <input
                    type="number"
                    value={Totalbooks}
                    onChange={(e) => setTotalBooks(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#DCD2B8] bg-white outline-none focus:ring-2 focus:ring-[#E8A33D] transition"
                    required
                  />
                </div>

                {/* Book Quantity */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#6B5F45] mb-1.5">
                    <FaLayerGroup className="w-3.5 h-3.5" />
                    Book Quantity
                  </label>
                  <input
                    type="number"
                    value={BookQuantity}
                    onChange={(e) => setBookQuantity(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#DCD2B8] bg-white outline-none focus:ring-2 focus:ring-[#E8A33D] transition"
                  />
                </div>

                {/* Book Price */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#6B5F45] mb-1.5">
                    <FaIndianRupeeSign className="w-3.5 h-3.5" />
                    Total Book Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#DCD2B8] bg-white outline-none focus:ring-2 focus:ring-[#E8A33D] transition"
                    required
                  />
                </div>

                {/* Diary Price */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#6B5F45] mb-1.5">
                    <MdOutlineEditNote className="w-3.5 h-3.5" />
                    Diary Price
                  </label>
                  <input
                    type="number"
                    value={diaryPrice}
                    onChange={(e) => setDiaryPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#DCD2B8] bg-white outline-none focus:ring-2 focus:ring-[#E8A33D] transition"
                    required
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#6B5F45] mb-1.5">
                    <FaPercent className="w-3.5 h-3.5" />
                    Discount
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#DCD2B8] bg-white outline-none focus:ring-2 focus:ring-[#E8A33D] transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-7 w-full py-3 rounded-lg font-semibold text-[#1F2E4A] bg-[#E8A33D] hover:bg-[#D6912E] active:scale-[0.99] transition-all shadow-sm"
              >
                Save Entry
              </button>
            </div>
          </form>

          {/* RIGHT: Receipt-style live summary */}
          <div className="relative">
            <div
              className="bg-white rounded-2xl shadow-xl border border-[#E4D9BE] px-7 py-7 sticky top-8"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(180deg, transparent, transparent 34px, #F0EADA 35px)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <FaReceipt className="w-5 h-5 text-[#1F2E4A]" />
                <h3 className="font-bold text-[#1F2E4A] tracking-tight">
                  Price Slip
                </h3>
              </div>
              <p className="text-xs text-[#8A7F65] mb-5">
                {studentClass ? `Class ${studentClass}` : "No class selected"}
              </p>

              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-[#5B5344]">Books ({Totalbooks || 0})</span>
                  <span className="text-[#1F2E4A] font-semibold">
                    ₹{price || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B5344]">Diary</span>
                  <span className="text-[#1F2E4A] font-semibold">
                    ₹{diaryPrice || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5B5344]">Discount</span>
                  <span className="text-[#B04A3B] font-semibold">
                    − ₹{discountAmount || 0}
                  </span>
                </div>
              </div>

              <div className="my-5 border-t-2 border-dashed border-[#D8CDAF]" />

              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-[#1F2E4A] uppercase tracking-wide">
                  Total Payable
                </span>
                <span className="text-2xl font-bold text-[#2F6B4F]">
                  ₹{finalPrice}
                </span>
              </div>

              {/* torn-edge effect */}
              <div
                className="absolute left-0 right-0 -bottom-2 h-4"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 8px 0, transparent 8px, white 8.5px)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "left top",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default BookForm;
import React, { useState } from 'react';
import { FaRupeeSign, FaUser, FaIdBadge, FaBook, FaFileUpload } from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

const initialForm = {
  ledgerId: '',
  studentName: '',
  studentClass: '',
  backDues: '',
  submitFees: '',
};

export const FeeSubmitPage = () => {
  // const [form, setForm] = useState(initialForm);
  const [ledgerId, setLedgerId] = useState('');
  const [studentName, setName] = useState('');
  const [stuclass, setStuClass] = useState('');
  const [backDues, setBackDues] = useState('');
  const [submitFees, setSubmitFees] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [dues, setDues] = useState('');
  const [file, setFile] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const {FeesSubmit} = UserData();
 
      const fileChangeHandler = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setImagePreview(file ? URL.createObjectURL(file) : null);
      }

  React.useEffect(() => {
    const back = parseFloat(backDues) || 0;
    const submit = parseFloat(submitFees) || 0;
    const due = Math.max(back - submit, 0);
    setDues(due);
  }, [backDues, submitFees]);

  const handleSubmit = e => {
    e.preventDefault();
    const today = new Date();
        const date =
            String(today.getDate()).padStart(2, '0') + '-' +
            String(today.getMonth() + 1).padStart(2, '0') + '-' +
            today.getFullYear();
    const formData = new FormData();
    formData.append('ledgerId',ledgerId);
    formData.append('studentName', studentName);
    formData.append('studentClass', stuclass);
    formData.append('backDues', backDues);
    formData.append('submitFees',submitFees);
    formData.append('dues', dues);
    formData.append('date', date);
    formData.append('file', file); 
    formData.append('paymentMethod', paymentMethod || '');
    FeesSubmit(formData, setImagePreview);
  };

  return (
    <TeacherLayout>
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-2">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 mx-auto border-4 border-blue-300 relative animate__animated animate__fadeIn" style={{ marginTop: '80px' }}>
          <h2 className="text-3xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-green-500 to-blue-700 flex items-center justify-center gap-4 drop-shadow-2xl tracking-wide animate__animated animate__fadeInDown">
            <FaRupeeSign className="text-green-500 animate-bounce" /> Student Fee Submission
          </h2>
          <button
            type="button"
            onClick={() => window.location.href = '/teacher-home'}
            className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:from-yellow-500 hover:to-orange-600 transition flex items-center gap-2 border-2 border-white"
          >
            &#8592; Back
          </button>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className=" text-gray-700 mb-2 font-semibold flex items-center gap-2" htmlFor="ledgerId">
                  <FaIdBadge className="text-blue-500" /> Ledger ID
                </label>
                <input
                  id="ledgerId"
                  name="ledgerId"
                  type="text"
                  value={ledgerId}
                  onChange={(e) => setLedgerId(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="text-gray-700 mb-2 font-semibold flex items-center gap-2" htmlFor="studentName">
                  <FaUser className="text-blue-500" /> Student Name
                </label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  value={studentName}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-gray-700 mb-2 font-semibold flex items-center gap-2" htmlFor="studentClass">
                  <FaBook className="text-blue-500" /> Class
                </label>
                <input
                  id="studentClass"
                  name="studentClass"
                  type="text"
                  value={stuclass}
                  onChange={(e) => setStuClass(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className=" text-gray-700 mb-2 font-semibold flex items-center gap-2" htmlFor="backDues">
                  <FaRupeeSign className="text-green-500" /> Back Dues
                </label>
                <input
                  id="backDues"
                  name="backDues"
                  type="number"
                  min="0"
                  value={backDues}
                  onChange={(e) => setBackDues(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="text-gray-700 mb-2 font-semibold flex items-center gap-2" htmlFor="submitFees">
                  <FaRupeeSign className="text-green-500" /> Submit Fees
                </label>
                <input
                  id="submitFees"
                  name="submitFees"
                  type="number"
                  min="0"
                  value={submitFees}
                  onChange={(e) => setSubmitFees(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2 font-semibold">Dues</label>
                <input
                  type="number"
                  value={dues}
                  readOnly
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-lg bg-gray-50 ${dues === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                />
              </div>
            </div>
            <div className="mt-2">
              <label className="block text-gray-700 mb-2 font-semibold">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg bg-gray-50"
                  required
                >
                  <option value="">Select payment method</option>
                  <option value="cash">Cash</option>
                  <option value="account">Account</option>
                </select>
            </div>
            <div>
              <label className="text-gray-700 mb-2 font-semibold flex items-center gap-2">Upload Fee Receipt Image?</label>
                <input
                type="file"
                name="image"
                accept="image/*"
                capture="environment"
                onChange={fileChangeHandler}
                className="mt-2 w-full border rounded-lg px-4 py-2"
              />
              {imagePreview && (
                <div className="mt-4 flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="Fee Receipt Preview"
                    className="max-h-48 rounded-xl shadow border border-blue-200"
                  />
                  <span className="text-sm text-gray-500 mt-2">Preview</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
            >
              Submit Fees
            </button>
          </form>
        </div>
      </div>
    </TeacherLayout>
  );
}
import React, { useState } from 'react';
import { FaRupeeSign, FaUser, FaIdBadge, FaBook, FaFileUpload } from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';

const initialForm = {
  ledgerId: '',
  studentName: '',
  studentClass: '',
  backDues: '',
  submitFees: '',
  image: null,
};

export const FeeSubmitPage = () => {
  const [form, setForm] = useState(initialForm);
  const [dues, setDues] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [success, setSuccess] = useState(false);

  // Calculate dues automatically
  React.useEffect(() => {
    const back = parseFloat(form.backDues) || 0;
    const submit = parseFloat(form.submitFees) || 0;
    const due = Math.max(back - submit, 0);
    setDues(due);
  }, [form.backDues, form.submitFees]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleImageChoice = (choice) => {
    setShowImageUpload(choice === 'yes');
    if (choice === 'no') setForm(prev => ({ ...prev, image: null }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setForm(initialForm);
    setShowImageUpload(false);
    setDues('');
  };

  return (
    <TeacherLayout>
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 px-2">
  <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-10 mx-auto border-4 border-blue-300 relative animate__animated animate__fadeIn" style={{marginTop: '80px'}}>
          <h2 className="text-3xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-green-500 to-blue-700 flex items-center justify-center gap-4 drop-shadow-2xl tracking-wide animate__animated animate__fadeInDown">
            <FaRupeeSign className="text-green-500 animate-bounce" /> Student Fee Submission
          </h2>
          <button
            type="button"
            onClick={() => window.location.href='/teacher-home'}
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
                  value={form.ledgerId}
                  onChange={handleChange}
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
                  value={form.studentName}
                  onChange={handleChange}
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
                  value={form.studentClass}
                  onChange={handleChange}
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
                  value={form.backDues}
                  onChange={handleChange}
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
                  value={form.submitFees}
                  onChange={handleChange}
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
            <div>
              <label className=" text-gray-700 mb-2 font-semibold flex items-center gap-2">Upload Fee Receipt Image?</label>
              <div className="flex gap-4 mb-2">
                <button
                  type="button"
                  className={`px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${showImageUpload ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleImageChoice('yes')}
                >
                  <FaFileUpload /> Yes
                </button>
                <button
                  type="button"
                  className={`px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${!showImageUpload ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => handleImageChoice('no')}
                >
                  No
                </button>
              </div>
              {showImageUpload && (
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-2 w-full border rounded-lg px-4 py-2"
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
            >
              Submit Fees
            </button>
          </form>
          {success && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-green-100 text-green-700 rounded-xl shadow-lg p-6 text-center font-semibold text-lg">
                Fees submitted successfully!<br />
                School member will contact you shortly.
              </div>
            </div>
          )}
        </div>
      </div>
    </TeacherLayout>
  );
}
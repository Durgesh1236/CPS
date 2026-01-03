import React, { useState } from 'react'
import TeacherLayout from '../Components/TeacherLayout'

const TeacherPayment = () => {
  const [formData, setFormData] = useState({
    teacherName: '',
    month: '',
    paymentDate: '',
    amount: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    alert("Payment submitted successfully!")
  }

  return (
    <TeacherLayout>
      <div className="h-full mt-0 lg:mt-5 flex justify-center items-center">
        <div className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-3xl w-full max-w-xl p-8 border border-blue-100">
          <h1 className="text-xl lg:text-4xl font-extrabold text-blue-700 mb-5 text-center tracking-wide drop-shadow-lg flex items-center justify-center gap-2">
            <span className="text-2xl lg:text-3xl">💳</span> Teacher Payment
          </h1>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Teacher Name */}
            <div>
              <label className="block text-base font-semibold text-blue-700 mb-1">Teacher Name</label>
              <input
                type="text"
                name="teacherName"
                value={formData.teacherName}
                onChange={handleChange}
                placeholder="Enter teacher name"
                className="w-full mt-1 p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/60 text-gray-800 shadow-sm"
                required
              />
            </div>

            {/* Month */}
            <div>
              <label className="block text-base font-semibold text-blue-700 mb-1">Payment Month</label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/60 text-gray-800 shadow-sm"
                required
              >
                <option value="">Select Month</option>
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Payment Date */}
            <div>
              <label className="block text-base font-semibold text-blue-700 mb-1">Payment Date</label>
              <input
                type="date"
                name="paymentDate"
                value={formData.paymentDate}
                onChange={handleChange}
                className="w-full mt-1 p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/60 text-gray-800 shadow-sm"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-base font-semibold text-blue-700 mb-1">Amount (₹)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter payment amount"
                className="w-full mt-1 p-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50/60 text-gray-800 shadow-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 via-green-400 to-blue-500 text-white py-3 rounded-xl font-bold shadow-md hover:from-blue-700 hover:to-green-500 hover:scale-105 transition-all duration-300 text-lg tracking-wide"
            >
              Submit Payment
            </button>

          </form>
        </div>
      </div>
    </TeacherLayout>
  )
}

export default TeacherPayment

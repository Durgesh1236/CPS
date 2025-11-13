import React, { useState } from 'react';
import TeacherLayout from '../Components/TeacherLayout';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaSyncAlt, FaCalendarAlt } from 'react-icons/fa';
import { UserData } from '../context/User';

const classes = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const months = ['April','May','June','July','August','September','October','November','December','January','February','March'];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 4 }, (_, i) => `${currentYear - 2 + i}`); // e.g., currentYear-2 .. currentYear+1

const StudentDataInput = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ledgerId: '',
    year: '',
    studentName: '',
    studentClass: '',
    mobileNo: '',
    fatherName: '',
    motherName: '',
    aadhar: '',
    address: '',
    transport: false,
    months: [],
    monthDetails: {},
  });
  const { loading, StudentDataInput } = UserData();

  // toggles a monthKey like '2025-April'
  const toggleMonth = (monthKey) => {
    setForm(prev => {
      const selected = prev.months.includes(monthKey);
      if (selected) {
        const monthsArr = prev.months.filter(x => x !== monthKey);
        const monthDetails = { ...prev.monthDetails };
        delete monthDetails[monthKey];
        return { ...prev, months: monthsArr, monthDetails };
      } else {
        return { ...prev, months: [...prev.months, monthKey], monthDetails: { ...prev.monthDetails, [monthKey]: { backdues: '', paid: '' } } };
      }
    });
  }

  const handleMonthDetailChange = (month, field, value) => {
    // keep raw string for inputs so user can clear the field (empty string)
    setForm(prev => {
      const prevDetails = prev.monthDetails?.[month] || { backdues: '', paid: '' };
      const next = { ...prev.monthDetails, [month]: { ...prevDetails, [field]: value } };
      return { ...prev, monthDetails: next };
    });
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'transport') {
      setForm(prev => ({ ...prev, transport: checked }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    StudentDataInput( form.ledgerId, form.studentName, form.studentClass, form.mobileNo, form.fatherName, form.motherName, form.aadhar, form.address, form.transport, form.monthDetails, setForm)
  }

  return (
    <TeacherLayout>
      <div className="min-h-screen pt-20 p-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 sm:p-10 ring-1 ring-gray-50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-500">Student Data Input</h1>
                {/* <p className="text-sm text-gray-500 italic">Add new student profile and select months for fees.</p> */}
              </div>
              <button onClick={() => navigate('/teacher-home')} className="text-sm px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">Back</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ledger ID</label>
                  <input name="ledgerId" value={form.ledgerId} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition" placeholder="e.g., LDR-001" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Student Name</label>
                  <input name="studentName" value={form.studentName} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition" placeholder="Full name" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Class</label>
                  <select name="studentClass" value={form.studentClass} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition">
                    <option value="">-- Select class --</option>
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mobile Number</label>
                  <input name="mobileNo" value={form.mobileNo} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition" placeholder="10-digit mobile" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Father's Name</label>
                  <input name="fatherName" value={form.fatherName} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mother's Name</label>
                  <input name="motherName" value={form.motherName} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Aadhar Number</label>
                <input name="aadhar" value={form.aadhar} onChange={handleChange} className="mt-1 p-3 w-full border rounded-lg" placeholder="12-digit Aadhar" />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Address</label>
                <textarea name="address" value={form.address} onChange={handleChange} rows={3} className="mt-1 p-3 w-full border rounded-lg" />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="transport" checked={form.transport} onChange={handleChange} className="w-4 h-4" />
                  <span className="text-sm">Transport required</span>
                </label>
                <div className="ml-auto text-sm text-gray-500">Select months for fee</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Year</label>
                  <select name="year" value={form.year} onChange={(e) => setForm(prev => ({ ...prev, year: e.target.value, months: [], monthDetails: {} }))} className="mt-1 p-3 w-full border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition">
                    <option value="">-- Select year --</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="text-sm text-gray-500">Select months (will appear after selecting year)</div>
              </div>

              {form.year && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {months.map(m => {
                    const monthKey = `${form.year}-${m}`;
                    const selected = form.months.includes(monthKey);
                    return (
                      <label key={monthKey} className={`p-3 border rounded-lg cursor-pointer flex items-center justify-center text-sm font-medium transition ${selected ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg' : 'bg-white border-gray-200 hover:shadow-md'}`}>
                        <input type="checkbox" checked={selected} onChange={() => toggleMonth(monthKey)} className="mr-2" />
                        <FaCalendarAlt className={`mr-2 ${selected ? 'text-white' : 'text-indigo-500'}`} size={14} />
                        <span>{m}</span>
                      </label>
                    )
                  })}
                </div>
              )}

              {/* Month details cards for selected months */}
              {form.months.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Month fee details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {form.months.map(m => (
                      <div key={m} className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-xl p-4 shadow-md hover:shadow-lg transition">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-md font-medium text-indigo-700">
                            <FaCalendarAlt className="text-indigo-600" />
                            <span>{m}</span>
                          </div>
                          <div className="text-sm text-gray-500">Fill amounts (INR)</div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                          <div>
                            <label className="text-xs text-gray-600 block">Backdues</label>
                            <input type="number" min="0" value={form.monthDetails?.[m]?.backdues ?? ''} onChange={(e) => handleMonthDetailChange(m, 'backdues', e.target.value)} className="mt-1 p-2 w-24 border border-gray-200 rounded-md mx-auto text-center bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition" placeholder="0" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 block">Paid</label>
                            <input type="number" min="0" value={form.monthDetails?.[m]?.paid ?? ''} onChange={(e) => handleMonthDetailChange(m, 'paid', e.target.value)} className="mt-1 p-2 w-24 border border-gray-200 rounded-md mx-auto text-center bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition" placeholder="0" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 block">Dues</label>
                            {/* compute dues from current inputs so empty inputs can be cleared */}
                            <input type="number" min="0" value={Math.max(0, Number(form.monthDetails?.[m]?.backdues || 0) - Number(form.monthDetails?.[m]?.paid || 0))} readOnly className="mt-1 p-2 w-24 border border-gray-200 rounded-md mx-auto text-center bg-indigo-50 text-indigo-700 font-semibold" placeholder="0" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* status messages removed as requested; check console for errors */}

              <div className="flex items-center justify-between">
                <button type="button" onClick={() => setForm({ ledgerId: '', studentName: '', studentClass: '', mobileNo: '', fatherName: '', motherName: '', aadhar: '', address: '', transport: false, months: [], monthDetails: {} })} className="px-4 py-2 bg-white border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition flex items-center gap-2">
                  <FaSyncAlt />
                  Reset
                </button>
                <button type="submit" disabled={loading} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg shadow-lg hover:scale-105 transform transition flex items-center gap-2">
                  <FaSave />
                  {loading ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}

export default StudentDataInput;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';

// Simple Total Spend page
// This page displays a total spend amount and a list of recent expenses.
// It attempts to fetch expenses from /api/expenses (if you have an API)
// Otherwise it falls back to sample data.

const sampleExpenses = [
  { id: 1, title: 'Stationary purchase', amount: 1520.5, date: '10-09-2025' },
  { id: 2, title: 'Laboratory equipment', amount: 7520, date: '05-09-2025' },
  { id: 3, title: 'Sports kit', amount: 3200, date: '21-08-2025' },
];

const formatCurrency = (v) => {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(v);
};

const Spend = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [total, setTotal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess('');
    try {
      const payload = { date, total: Number(total) || 0 };
      const res = await fetch('/api/total-spend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Server error');
      }
      setSuccess('Total spend submitted');
      setTotal('');
    } catch (err) {
      setError(err.message || 'Submission failed');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 p-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-50 to-white rounded-2xl shadow-lg p-8 border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Submit Total Spend (Daily)</h1>
                <p className="text-sm text-gray-500">Record the day's total expense for accounting.</p>
              </div>
              <button onClick={() => navigate('/teacher-home')} className="text-sm px-3 py-2 cursor-pointer bg-white border rounded-lg shadow hover:scale-105 transition flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name of person" className="mt-1 block w-full p-3 border rounded-lg shadow-sm" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full p-3 border rounded-lg" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Spend (INR)</label>
                  <input type="number" step="0.01" value={total} onChange={e => setTotal(e.target.value)} className="mt-1 block w-full p-3 border rounded-lg" required />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">{error ? <span className="text-red-600">{error}</span> : success ? <span className="text-green-600">{success}</span> : null}</div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => { setName(''); setTotal(''); setDate(new Date().toISOString().slice(0,10)); setError(null); setSuccess(''); }} className="px-4 py-2 bg-gray-100 cursor-pointer border rounded text-sm">Reset</button>
                  <button type="submit" disabled={loading} className="px-6 py-3 bg-indigo-600 cursor-pointer text-white rounded-lg shadow hover:bg-indigo-700">
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Spend;

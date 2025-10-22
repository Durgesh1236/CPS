import React, { useEffect, useState } from 'react';
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
      <div className="min-h-screen pt-20 p-6 bg-gray-50">
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow p-6">
            <h1 className="text-2xl font-bold mb-2">Submit Total Spend (Daily)</h1>
            <p className="text-sm text-gray-500 mb-4">Enter the total amount spent for a single day.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full p-3 border rounded-lg" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Spend (INR)</label>
                <input type="number" step="0.01" value={total} onChange={e => setTotal(e.target.value)} className="mt-1 block w-full p-3 border rounded-lg" required />
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}
              {success && <div className="text-sm text-green-600">{success}</div>}

              <div className="flex justify-end">
                <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Spend;

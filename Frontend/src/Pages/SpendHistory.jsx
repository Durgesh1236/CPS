import React, { useEffect, useState } from 'react';
import { UserData } from '../context/User';
import TeacherLayout from '../Components/TeacherLayout';

const formatCurrency = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(v);

const toInputDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const prettyDate = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2,'0')}-${String(d.getMonth()+1).padStart(2,'0')}-${d.getFullYear()}`;
}

const SpendHistory = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterDate, setFilterDate] = useState('');
  const { user } = UserData();

  const fetchList = async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/user/get-all-spend');
      if (!res.ok) throw new Error('Failed to load records');
      const data = await res.json();
      setList(Array.isArray(data) ? data.reverse() : []);
    } catch (err) {
      setError(err.message || 'Error fetching spends');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const filtered = list.filter(item => {
    if (!filterDate) return true;
    const itemDate = toInputDate(item.date);
    return itemDate === filterDate;
  });

  const totalFiltered = filtered.reduce((s, i) => s + (Number(i.totalReceived) || 0), 0);

  return (
    <TeacherLayout>
      <div className="min-h-screen pt-20 p-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold">Spend History</h2>
              <p className="text-sm opacity-90 mt-1">Browse recorded daily spends. Use the date filter to view specific days.</p>
              <div className="mt-4 flex flex-wrap gap-3 items-center">
                <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="p-2 rounded bg-white text-sm" />
                <button onClick={() => setFilterDate('')} className="px-3 py-2 bg-white/20 border border-white/30 rounded text-sm">Clear</button>
                <button onClick={fetchList} className="px-3 py-2 bg-white rounded text-sm font-medium">Refresh</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-4 flex flex-col justify-center">
              <div className="text-xs text-gray-500">Filtered total</div>
              <div className="text-lg font-bold">{formatCurrency(totalFiltered)}</div>
              <div className="text-sm text-gray-500">{filtered.length} record(s)</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto divide-y">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Received (INR)</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Submitted By</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {loading && (
                    <tr><td colSpan={5} className="p-6 text-center text-gray-500">Loading...</td></tr>
                  )}
                  {!loading && error && (
                    <tr><td colSpan={5} className="p-6 text-center text-red-600">{error}</td></tr>
                  )}
                  {!loading && !error && filtered.length === 0 && (
                    <tr><td colSpan={5} className="p-6 text-center text-gray-500">No records found.</td></tr>
                  )}
                  {!loading && !error && filtered.map((it) => (
                    <SpendRow key={it._id} it={it} user={user} onUpdate={(updated) => setList(prev => prev.map(p => p._id === updated._id ? updated : p))} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}

const SpendRow = ({ it, user, onUpdate }) => {
  const [updating, setUpdating] = useState(false);

  const markReceived = async () => {
    if (!it._id) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/user/spend/${it._id}/receive`, { method: 'PUT' });
      if (!res.ok) throw new Error('Failed to update');
      const data = await res.json();
      if (data && data.spend) onUpdate(data.spend);
    } catch (err) {
      console.error(err);
      // optionally show error
    } finally {
      setUpdating(false);
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{it.name || '-'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{prettyDate(it.date)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-800">{formatCurrency(it.totalReceived || 0)}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">

        {it.status === 'pending' ? (
          <span className="inline-flex items-center px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800">Pending</span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded text-sm bg-green-100 text-green-800">Received</span>
        )}
        {it.status === 'pending' && (
          // Only admins can mark a spend as received. Accountants and others see status only.
          user?.role === 'admin' ? (
            <button onClick={markReceived} disabled={updating} className="ml-3 px-2 py-1 text-sm bg-blue-600 text-white rounded">{updating ? 'Updating...' : 'Receive'}</button>
          ) : null
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{it.submittedBy?.name || it.UserId || '-'}</td>
    </tr>
  )
}

export default SpendHistory;

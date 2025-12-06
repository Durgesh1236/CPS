import React, { useEffect, useState } from 'react';
import { UserData } from '../context/User';
import TeacherLayout from '../Components/TeacherLayout';
import { MdDeleteForever } from "react-icons/md";

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
  
  const [filterDate, setFilterDate] = useState('');
  const { user, spendlist, loading, spendRecord, setSpendList, editSpendRecord, deleteSpendRecord } = UserData();
   
  const filtered = spendlist.filter(item => {
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
                <button onClick={spendRecord} className="px-3 py-2 bg-white rounded text-sm font-medium">Refresh</button>
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
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Delete</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y">
                  {loading && (
                    <tr><td colSpan={5} className="p-6 text-center text-gray-500">Loading...</td></tr>
                  )}
                  {!loading && filtered.length === 0 && (
                    <tr><td colSpan={5} className="p-6 text-center text-gray-500">No records found.</td></tr>
                  )}
                  {!loading && filtered.map((it) => (
                    <SpendRow
                      key={it._id}
                      it={it}
                      user={user}
                      onUpdate={(updated) => setSpendList(prev => prev.map(p => p._id === updated._id ? updated : p))}
                      editSpendRecord={editSpendRecord}
                      deleteSpendRecord={deleteSpendRecord}
                    />
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


const SpendRow = ({ it, user, onUpdate, editSpendRecord, deleteSpendRecord }) => {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: it.name || '',
    date: toInputDate(it.date),
    totalReceived: it.totalReceived || 0,
  });
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
    } finally {
      setUpdating(false);
    }
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setEditData({
      name: it.name || '',
      date: toInputDate(it.date),
      totalReceived: it.totalReceived || 0,
    });
    setEditing(false);
  };
  const handleSave = async () => {
    setUpdating(true);
    try {
      // Use context API function
      const updated = await editSpendRecord(it._id,
         editData.name,
         editData.date,
        editData.totalReceived
      );
      if (updated) onUpdate(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
        {editing ? (
          <input
            type="text"
            value={editData.name}
            onChange={e => setEditData(ed => ({ ...ed, name: e.target.value }))}
            className="border rounded px-2 py-1 text-sm w-28"
          />
        ) : (
          it.name || '-'
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {editing ? (
          <input
            type="date"
            value={editData.date}
            onChange={e => setEditData(ed => ({ ...ed, date: e.target.value }))}
            className="border rounded px-2 py-1 text-sm"
          />
        ) : (
          prettyDate(it.date)
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-gray-800">
        {editing ? (
          <input
            type="number"
            value={editData.totalReceived}
            onChange={e => setEditData(ed => ({ ...ed, totalReceived: e.target.value }))}
            className="border rounded px-2 py-1 text-sm w-24 text-right"
          />
        ) : (
          formatCurrency(it.totalReceived || 0)
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {it.status === 'pending' ? (
          <span className="inline-flex items-center px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800">Pending</span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded text-sm bg-green-100 text-green-800">Received</span>
        )}
        {it.status === 'pending' && user?.role === 'admin' && (
          <button onClick={markReceived} disabled={updating} className="ml-3 px-2 py-1 text-sm bg-blue-600 text-white rounded">{updating ? 'Updating...' : 'Receive'}</button>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{it.submittedBy?.name || it.UserId || '-'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
        {!editing && (
          <button onClick={handleEdit} className="px-2 py-1 text-sm bg-blue-500 cursor-pointer text-white rounded">Edit</button>
        )}
        {editing && (
          <>
            <button onClick={handleSave} disabled={updating} className="px-2 py-1 text-sm cursor-pointer bg-green-600 text-white rounded">{updating ? 'Saving...' : 'Save'}</button>
            <button onClick={handleCancel} disabled={updating} className="ml-2 px-2 py-1 text-sm bg-red-500 cursor-pointer text-white rounded">Cancel</button>
          </>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
        <button
          onClick={() => deleteSpendRecord(it._id)}
          className="ml-4 text-red-600 hover:text-red-800 text-3xl cursor-pointer flex items-center justify-center"
          title="Delete Record"
        ><MdDeleteForever /></button>
      </td>
    </tr>
  );
};

export default SpendHistory;

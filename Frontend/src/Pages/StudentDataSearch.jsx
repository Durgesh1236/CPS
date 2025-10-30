import React, { useState } from 'react';
import TeacherLayout from '../Components/TeacherLayout';
import { FaSearch, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const monthsOrder = ['April','May','June','July','August','September','October','November','December','January','February','March'];

export default function StudentDataSearch(){
  const [ledgerId, setLedgerId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState({}); // key -> { backdues, paid }

  const search = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (ledgerId) q.set('ledgerId', ledgerId);
      if (name) q.set('name', name);
      const res = await fetch('/api/user/student/search?' + q.toString());
      const body = await res.json();
      setResults(body.students || []);
    } catch (err) {
      console.error('Search failed', err);
    } finally { setLoading(false); }
  }

  const loadStudent = async (ledger) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/student/${encodeURIComponent(ledger)}`);
      const body = await res.json();
      setSelected(body.student || null);
      setEditing({});
    } catch (err) {
      console.error('Load failed', err);
    } finally { setLoading(false); }
  }

  const startEdit = (rec) => {
    const key = `${rec.year}-${rec.month}`;
    setEditing(prev => ({ ...prev, [key]: { backdues: String(rec.backdues || 0), paid: String(rec.paid || 0) } }));
  }

  const cancelEdit = (rec) => {
    const key = `${rec.year}-${rec.month}`;
    setEditing(prev => { const next = { ...prev }; delete next[key]; return next; });
  }

  const saveEdit = async (rec) => {
    const key = `${rec.year}-${rec.month}`;
    const values = editing[key];
    if (!values) return;
    try {
      const body = { year: rec.year, month: rec.month, backdues: Number(values.backdues || 0), paid: Number(values.paid || 0) };
      const res = await fetch(`/api/user/${encodeURIComponent(selected.ledgerId)}/fee`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      });
      const j = await res.json();
      if (j.success) {
        // update local selected
        setSelected(j.student);
        // clear edit
        setEditing(prev => { const next = { ...prev }; delete next[key]; return next; });
      } else {
        console.error('Save failed', j);
      }
    } catch (err) { console.error('Save failed', err); }
  }

  const groupedRecords = () => {
    if (!selected) return {};
    const map = {};
    (selected.feeRecords || []).forEach(r => {
      map[r.year] = map[r.year] || [];
      map[r.year].push(r);
    });
    // sort months within year according to monthsOrder
    for (const y of Object.keys(map)) {
      map[y].sort((a,b) => monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month));
    }
    return map;
  }

  return (
    <TeacherLayout>
      <div className="min-h-screen pt-20 p-6 bg-gradient-to-b from-slate-50 to-white w-full">
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Search Student</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <div>
                <label className="text-xs text-gray-500">Ledger ID</label>
                <input value={ledgerId} onChange={e=>setLedgerId(e.target.value)} className="mt-1 p-2 w-full border rounded" placeholder="Ledger ID" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Student Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 p-2 w-full border rounded" placeholder="Name (partial ok)" />
              </div>
              <div>
                <button onClick={search} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded shadow"><FaSearch /> {loading ? 'Searching...' : 'Search'}</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-1">
              <div className="bg-white rounded-xl p-4 shadow">
                <h3 className="font-semibold mb-2">Results</h3>
                {results.length === 0 && <div className="text-sm text-gray-500">No results</div>}
                <ul>
                  {results.map(s => (
                    <li key={s._id} className="p-2 border-b last:border-b-0 cursor-pointer hover:bg-indigo-50" onClick={() => loadStudent(s.ledgerId)}>
                      <div className="font-medium">{s.studentName}</div>
                      <div className="text-xs text-gray-500">{s.ledgerId} • Class {s.studentClass || '-'}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-span-1 md:col-span-3">
              <div className="bg-white rounded-xl p-6 shadow">
                {!selected && <div className="text-center text-gray-500">Select a student to view details</div>}
                {selected && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xl font-bold">{selected.studentName} <span className="text-sm text-gray-500">({selected.ledgerId})</span></div>
                        <div className="text-sm text-gray-600">Class: {selected.studentClass || '-' } • Mobile: {selected.mobileNo || '-'}</div>
                        <div className="text-sm text-gray-600">Parents: {selected.fatherName || '-'} / {selected.motherName || '-'}</div>
                      </div>
                      <div className="text-right text-sm text-gray-500">Transport: {selected.transport ? 'Yes' : 'No'}</div>
                    </div>

                    {/* fee records grouped by year */}
                    {Object.keys(groupedRecords()).length === 0 && <div className="text-sm text-gray-500">No fee records yet</div>}
                    {Object.entries(groupedRecords()).sort((a,b)=>Number(b[0])-Number(a[0])).map(([year, records]) => (
                      <div key={year} className="mb-4">
                        <div className="text-lg font-semibold mb-2">{year}</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {records.map(r => {
                            const key = `${r.year}-${r.month}`;
                            const isEditing = !!editing[key];
                            return (
                              <div key={key} className="bg-gradient-to-br from-white to-indigo-50 border border-indigo-100 rounded-lg p-3 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2 text-indigo-700 font-medium"><FaCalendarAlt /> {r.month}</div>
                                  <div className="text-xs text-gray-500">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}</div>
                                </div>

                                <div className="space-y-2 text-center">
                                  <div>
                                    <div className="text-xs text-gray-600">Backdues</div>
                                    {!isEditing ? <div className="text-lg font-semibold">₹ {r.backdues || 0}</div>
                                      : <input value={editing[key].backdues} onChange={e=>setEditing(prev=>({ ...prev, [key]: {...prev[key], backdues: e.target.value } }))} className="mt-1 p-2 w-28 text-center border rounded" />}
                                  </div>
                                  <div>
                                    <div className="text-xs text-gray-600">Paid</div>
                                    {!isEditing ? <div className="text-lg font-semibold text-green-600">₹ {r.paid || 0}</div>
                                      : <input value={editing[key].paid} onChange={e=>setEditing(prev=>({ ...prev, [key]: {...prev[key], paid: e.target.value } }))} className="mt-1 p-2 w-28 text-center border rounded" />}
                                  </div>
                                  <div>
                                    <div className="text-xs text-gray-600">Dues</div>
                                    <div className="text-lg font-semibold text-red-600">₹ {r.dues || 0}</div>
                                  </div>
                                </div>

                                <div className="mt-3 flex items-center justify-center gap-3">
                                  {!isEditing ? (
                                    <button onClick={()=>startEdit(r)} className="px-3 py-1 bg-white border rounded flex items-center gap-2"><FaEdit /> Edit</button>
                                  ) : (
                                    <>
                                      <button onClick={()=>saveEdit(r)} className="px-3 py-1 bg-green-600 text-white rounded flex items-center gap-2"><FaSave /> Save</button>
                                      <button onClick={()=>cancelEdit(r)} className="px-3 py-1 bg-white border rounded flex items-center gap-2"><FaTimes /> Cancel</button>
                                    </>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}

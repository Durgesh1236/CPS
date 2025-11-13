import React, { useState, useEffect } from 'react';
import TeacherLayout from '../Components/TeacherLayout';
import { FaSearch, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { UserData } from '../context/User';

const monthsOrder = ['April','May','June','July','August','September','October','November','December','January','February','March'];

export default function StudentDataSearch(){
  const [ledgerId, setLedgerId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const {selected, setSelected, editing, setEditing, SaveEdit, results, setResults} = UserData();
 
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
      setEditing([]);
    } catch (err) {
      console.error('Load failed', err);
    } finally { setLoading(false); }
  }

  useEffect(() => {
    if (!selected) return;
    const years = Array.from(new Set((selected.feeRecords || []).map(r => r.year))).sort((a,b)=>b-a);
    if (years.length > 0) setSelectedYear(years[0]);
    else setSelectedYear(currentYear);
  }, [selected]);

  const startEdit = (rec) => {
    const year = Number(rec.year);
    const month = rec.month;
    // initialize values as empty strings when absent or zero (so UI doesn't show 0)
    const initBack = (rec && Number(rec.backdues)) ? String(rec.backdues) : '';
    const initPaid = (rec && Number(rec.paid)) ? String(rec.paid) : '';
    // avoid duplicate entries
    setEditing(prev => {
      const exists = prev.find(e => e.year === year && e.month === month);
      if (exists) return prev;
      return [...prev, { year, month, backdues: initBack, paid: initPaid }];
    });
  }

  const cancelEdit = (rec) => {
    const year = Number(rec.year);
    const month = rec.month;
    setEditing(prev => prev.filter(e => !(e.year === year && e.month === month)));
  }

  const saveEdit = async (rec) => {
    const year = Number(rec.year);
    const month = rec.month;
    const entry = (editing || []).find(e => e.year === year && e.month === month);
    if (!entry) return;
    try {
      await SaveEdit(selected.ledgerId, year, month, entry.backdues, entry.paid);
      // remove from editing after successful save
      setEditing(prev => prev.filter(e => !(e.year === year && e.month === month)));
      // reload selected from server to get updated records (optional):
      const res = await fetch(`/api/user/student/${encodeURIComponent(selected.ledgerId)}`);
      const body = await res.json();
      setSelected(body.student || null);
    } catch (err) {
      console.error('Save failed', err);
    }
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
              <div className="flex gap-2">
                <button onClick={search} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded shadow"><FaSearch /> {loading ? 'Searching...' : 'Search'}</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="col-span-1 md:col-span-1">
              <div className="bg-white rounded-xl p-4 shadow">
                <h3 className="font-semibold mb-2">Results</h3>
                {results.length === 0 && <div className="text-sm text-gray-500">No results</div>}
                {results.length > 0 && (
                  <div className="mt-2">
                    <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}`}</style>
                    <div className="bg-white rounded-lg shadow p-2 hide-scrollbar" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                      <div className="flex flex-col gap-3">
                        {results.map(s => (
                          <div key={s._id} onClick={() => loadStudent(s.ledgerId)} className="bg-white rounded-md p-3 shadow-sm hover:shadow-md cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-md font-semibold text-gray-800">{s.studentName}</div>
                                <div className="text-xs text-gray-500">Ledger: {s.ledgerId}</div>
                              </div>
                              <div className="text-sm text-gray-500">Class {s.studentClass || '-'}</div>
                            </div>
                            <div className="mt-2 text-sm text-gray-700">
                              <div><strong>Mobile:</strong> {s.mobileNo || '-'}</div>
                              <div className="mt-1"><strong>Parents:</strong> {s.fatherName || '-'} / {s.motherName || '-'}</div>
                              <div className="mt-1"><strong>Address:</strong> {s.address || '-'}</div>
                              <div className="mt-1"><strong>Transport:</strong> {s.transport ? 'Yes' : 'No'}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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

                    {/* Two-column layout: left = student profile, right = month-wise table for selectedYear */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-1 bg-white rounded-lg p-4 shadow">
                        <h4 className="text-lg font-semibold mb-2">Student Details</h4>
                        <div className="text-sm text-gray-700"><strong>Name:</strong> {selected.studentName}</div>
                        <div className="text-sm text-gray-700"><strong>Ledger:</strong> {selected.ledgerId}</div>
                        <div className="text-sm text-gray-700"><strong>Class:</strong> {selected.studentClass || '-'}</div>
                        <div className="text-sm text-gray-700"><strong>Mobile:</strong> {selected.mobileNo || '-'}</div>
                        <div className="text-sm text-gray-700"><strong>Parents:</strong> {selected.fatherName || '-'} / {selected.motherName || '-'}</div>
                        <div className="text-sm text-gray-700"><strong>Address:</strong> {selected.address || '-'}</div>
                        <div className="mt-4">
                          <label className="text-sm text-gray-600">Select Year</label>
                          <select value={selectedYear} onChange={e=>setSelectedYear(Number(e.target.value))} className="w-full mt-1 p-2 border rounded">
                            {/* years available plus currentYear */}
                            {Array.from(new Set([...(selected.feeRecords || []).map(r=>r.year), currentYear])).sort((a,b)=>b-a).map(y => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="md:col-span-2 bg-white rounded-lg p-4 shadow">
                        <h4 className="text-lg font-semibold mb-2">{selectedYear} - Month Fees</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead>
                              <tr className="text-sm text-gray-600">
                                <th className="py-2 px-3">Month</th>
                                <th className="py-2 px-3">Backdues (₹)</th>
                                <th className="py-2 px-3">Paid (₹)</th>
                                <th className="py-2 px-3">Dues (₹)</th>
                                <th className="py-2 px-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {monthsOrder.map(month => {
                                const key = `${selectedYear}-${month}`;
                                const rec = (selected.feeRecords || []).find(r=>r.year === Number(selectedYear) && r.month === month);
                                const editEntry = (editing || []).find(e => e.year === Number(selectedYear) && e.month === month);
                                const isEditing = !!editEntry;
                                const backVal = isEditing ? editEntry.backdues : (rec && Number(rec.backdues) ? String(rec.backdues) : '');
                                const paidVal = isEditing ? editEntry.paid : (rec && Number(rec.paid) ? String(rec.paid) : '');
                                const computedDues = Math.max(0, Number(backVal || 0) - Number(paidVal || 0));
                                return (
                                  <tr key={key} className="border-t">
                                    <td className="py-2 px-3 text-sm font-medium text-indigo-700">{month}</td>
                                    <td className="py-2 px-3">
                                      {isEditing ? (
                                        <input className="w-28 p-1 border rounded text-right" value={editEntry.backdues} onChange={e=>{
                                          const val = e.target.value;
                                          setEditing(prev => prev.map(it => (it.year === editEntry.year && it.month === editEntry.month) ? { ...it, backdues: val } : it));
                                        }} />
                                      ) : (
                                        <div className="text-sm">{rec && Number(rec.backdues) ? `₹ ${rec.backdues}` : '₹ 0'}</div>
                                      )}
                                    </td>
                                    <td className="py-2 px-3">
                                      {isEditing ? (
                                        <input className="w-28 p-1 border rounded text-right" value={editEntry.paid} onChange={e=>{
                                          const val = e.target.value;
                                          setEditing(prev => prev.map(it => (it.year === editEntry.year && it.month === editEntry.month) ? { ...it, paid: val } : it));
                                        }} />
                                      ) : (
                                        <div className="text-sm text-green-600">{rec && Number(rec.paid) ? `₹ ${rec.paid}` : '₹ 0'}</div>
                                      )}
                                    </td>
                                    <td className="py-2 px-3 text-red-600 font-semibold">₹ {computedDues}</td>
                                    <td className="py-2 px-3">
                                      {!isEditing ? (
                                        <div className="flex gap-2">
                                          <button onClick={()=>startEdit(rec ? { year: selectedYear, month, backdues: rec.backdues, paid: rec.paid } : { year: selectedYear, month })} className="px-3 py-1 bg-white border rounded">{rec ? 'Edit' : 'Add'}</button>
                                        </div>
                                      ) : (
                                        <div className="flex gap-2">
                                          <button onClick={()=>saveEdit({ year: selectedYear, month })} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
                                          <button onClick={()=>cancelEdit({ year: selectedYear, month })} className="px-3 py-1 bg-white border rounded">Cancel</button>
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
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

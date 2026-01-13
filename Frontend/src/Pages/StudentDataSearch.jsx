import React, { useState, useEffect } from 'react';
import TeacherLayout from '../Components/TeacherLayout';
import { FaSearch } from 'react-icons/fa';
import { UserData } from '../context/User';
import { FaDeleteLeft } from "react-icons/fa6";

const monthsOrder = [
  'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'
];

export default function StudentDataSearch() {

  const [ledgerId, setLedgerId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const {
    selected, setSelected,
    editing, setEditing,
    SaveEdit,
    results, setResults,
    studentEditDetail, StudentAccountDelete
  } = UserData();

  const [editStudent, setEditStudent] = useState(false);

  const [studentForm, setStudentForm] = useState({
    studentName: "",
    studentClass: "",
    mobileNo: "",
    fatherName: "",
    motherName: "",
    address: "",
    transport: ""
  });

  const search = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (ledgerId) q.set('ledgerId', ledgerId);
      if (name) q.set('name', name);
      const res = await fetch('/api/student/fee/student?' + q.toString());
      const body = await res.json();
      setResults(body.students || []);
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStudent = async (ledger) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/student/fee/student/${encodeURIComponent(ledger)}`);
      const body = await res.json();
      setSelected(body.student || null);
      setEditing([]);
      setEditStudent(false);
    } catch (err) {
      console.error("Load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selected) return;

    setStudentForm({
      studentName: selected.studentName || "",
      studentClass: selected.studentClass || "",
      mobileNo: selected.mobileNo || "",
      fatherName: selected.fatherName || "",
      motherName: selected.motherName || "",
      address: selected.address || "",
      transport: selected.transport ? "Yes" : "No"
    });

    const years = Array.from(
      new Set((selected.feeRecords || []).map(r => r.year))
    ).sort((a, b) => b - a);

    if (years.length > 0) setSelectedYear(years[0]);
    else setSelectedYear(currentYear);

  }, [selected]);

  const saveStudentDetails = async (e) => {
    e.preventDefault();
    studentEditDetail(
      selected.ledgerId,
      studentForm.studentName,
      studentForm.studentClass,
      studentForm.mobileNo,
      studentForm.fatherName,
      studentForm.motherName,
      selected.aadhar,
      studentForm.address,
      studentForm.transport
    )
    setStudentForm('')
  };

  const cancelStudentEdit = () => {
    setEditStudent(false);
    setStudentForm({
      studentName: selected.studentName,
      studentClass: selected.studentClass,
      mobileNo: selected.mobileNo,
      fatherName: selected.fatherName,
      motherName: selected.motherName,
      address: selected.address,
      transport: selected.transport ? "Yes" : "No"
    });
  };

  const startEdit = (rec) => {
    const year = Number(rec.year);
    const month = rec.month;
    const initBack = rec && Number(rec.backdues) ? String(rec.backdues) : '';
    const initPaid = rec && Number(rec.paid) ? String(rec.paid) : '';
    setEditing(prev => {
      const exists = prev.find(e => e.year === year && e.month === month);
      if (exists) return prev;
      return [...prev, { year, month, backdues: initBack, paid: initPaid }];
    });
  };

  const cancelEdit = (rec) => {
    const year = Number(rec.year);
    const month = rec.month;
    setEditing(prev => prev.filter(e => !(e.year === year && e.month === month)));
  };

  const saveEdit = async (rec) => {
    const year = Number(rec.year);
    const month = rec.month;
    const entry = editing.find(e => e.year === year && e.month === month);
    if (!entry) return;

    try {
      await SaveEdit(selected.ledgerId, year, month, entry.backdues, entry.paid);
      setEditing(prev => prev.filter(e => !(e.year === year && e.month === month)));
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <TeacherLayout>
      <div className="min-h-screen pt-20 p-6 bg-gradient-to-b from-slate-50 to-white w-full">

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Search Student</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
            <div>
              <label className="text-xs text-gray-500">Ledger ID</label>
              <input
                value={ledgerId}
                onChange={e => setLedgerId(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                placeholder="Ledger ID"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Student Name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded"
                placeholder="Name (partial ok)"
              />
            </div>

            <button
              onClick={search}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded shadow"
            >
              <FaSearch /> {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Student Results */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl p-4 shadow">

              <h3 className="font-semibold mb-2">Results</h3>

              {results.length === 0 && (
                <div className="text-sm text-gray-500">No results</div>
              )}

              {results.length > 0 && (
                <div
                  className="bg-white rounded-lg shadow p-2 hide-scrollbar"
                  style={{ maxHeight: "60vh", overflowY: "auto" }}
                >
                  <div className="flex flex-col gap-3">
                    {results.map(s => (
                      <div
                        key={s._id}
                        onClick={() => loadStudent(s.ledgerId)}
                        className="bg-white rounded md p-3 shadow-sm hover:shadow-md cursor-pointer"
                      >
                        <div className="flex justify-between">
                          <div>
                            <div className="text-md font-semibold">{s.studentName}</div>
                            <div className="text-xs text-gray-500">
                              Ledger: {s.ledgerId}
                            </div>
                          </div>

                          <div className="text-sm text-gray-500">
                            Class {s.studentClass || "-"}
                          </div>
                        </div>

                        <div className="text-sm text-gray-700 mt-2">
                          <div><strong>Mobile:</strong> {s.mobileNo || "-"}</div>
                          <div className="mt-1">
                            <strong>Parents:</strong> {s.fatherName || "-"} / {s.motherName || "-"}
                          </div>
                          <div className="mt-1"><strong>Address:</strong> {s.address || "-"}</div>
                          <div className="mt-1"><strong>Transport:</strong> {s.transport ? "Yes" : "No"}</div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Student Details + Fee Table */}
          <div className="col-span-3">
            <div className="bg-white rounded-xl p-6 shadow">

              {!selected && (
                <div className="text-center text-gray-500">
                  Select a student to view details
                </div>
              )}

              {selected && (
                <>
                  <div className="flex justify-between mb-6">

                    <div>
                      {/* NAME */}
                      {!editStudent ? (
                        <div className="text-xl font-bold">
                          {selected.studentName}{" "}
                          <span className="text-sm text-gray-500">
                            ({selected.ledgerId})
                          </span>
                        </div>
                      ) : (
                        <input
                          className="border p-1 rounded text-xl font-bold"
                          value={studentForm.studentName}
                          onChange={e =>
                            setStudentForm({
                              ...studentForm,
                              studentName: e.target.value
                            })
                          }
                        />
                      )}

                      {/* CLASS + MOBILE */}
                      {!editStudent ? (
                        <div className="text-sm text-gray-600 mt-1">
                          Class: {selected.studentClass} • Mobile: {selected.mobileNo}
                        </div>
                      ) : (
                        <div className="flex gap-4 mt-2">
                          <input
                            className="border p-1 rounded w-20"
                            value={studentForm.studentClass}
                            onChange={e =>
                              setStudentForm({
                                ...studentForm,
                                studentClass: e.target.value
                              })
                            }
                            placeholder="Class"
                          />

                          <input
                            className="border p-1 rounded w-32"
                            value={studentForm.mobileNo}
                            onChange={e =>
                              setStudentForm({
                                ...studentForm,
                                mobileNo: e.target.value
                              })
                            }
                            placeholder="Mobile"
                          />
                        </div>
                      )}

                      {/* PARENTS */}
                      {!editStudent ? (
                        <div className="text-sm text-gray-600 mt-1">
                          Parents: {selected.fatherName} / {selected.motherName}
                        </div>
                      ) : (
                        <div className="flex gap-4 mt-2">
                          <input
                            className="border p-1 rounded w-32"
                            value={studentForm.fatherName}
                            onChange={e =>
                              setStudentForm({
                                ...studentForm,
                                fatherName: e.target.value
                              })
                            }
                            placeholder="Father"
                          />

                          <input
                            className="border p-1 rounded w-32"
                            value={studentForm.motherName}
                            onChange={e =>
                              setStudentForm({
                                ...studentForm,
                                motherName: e.target.value
                              })
                            }
                            placeholder="Mother"
                          />
                        </div>
                      )}

                      {/* ADDRESS */}
                      {!editStudent ? (
                        <div className="text-sm text-gray-600 mt-1">
                          Address: {selected.address}
                        </div>
                      ) : (
                        <input
                          className="border p-1 rounded w-64 mt-2"
                          value={studentForm.address}
                          onChange={e =>
                            setStudentForm({
                              ...studentForm,
                              address: e.target.value
                            })
                          }
                        />
                      )}
                    </div>

                    {/* RIGHT SIDE — EDIT BUTTONS & TRANSPORT */}
                    <div className="text-right">

                      {/* EDIT → SAVE/CANCEL */}
                      {!editStudent ? (
                        <button
                          onClick={() => setEditStudent(true)}
                          className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded shadow"
                        >
                          Edit
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={saveStudentDetails}
                            className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelStudentEdit}
                            className="px-4 py-2 cursor-pointer border rounded"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() => StudentAccountDelete(selected._id)}
                            className="bg-red-600 cursor-pointer text-white px-3 rounded"
                          >
                            <FaDeleteLeft />
                          </button>
                        </div>
                      )}

                      {/* TRANSPORT */}
                      {!editStudent ? (
                        <div className="text-sm text-gray-500 mt-3">
                          Transport: {selected.transport ? "Yes" : "No"}
                        </div>
                      ) : (
                        <select
                          value={studentForm.transport}
                          onChange={e =>
                            setStudentForm({
                              ...studentForm,
                              transport: e.target.value
                            })
                          }
                          className="mt-3 p-1 border rounded"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 bg-white rounded-lg p-4 shadow">
                      <h4 className="text-lg font-semibold mb-2">
                        Student Details
                      </h4>

                      <div className="text-sm text-gray-700">
                        <strong>Name:</strong> {selected.studentName}
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Ledger:</strong> {selected.ledgerId}
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Class:</strong> {selected.studentClass}
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Mobile:</strong> {selected.mobileNo}
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Parents:</strong> {selected.fatherName} / {selected.motherName}
                      </div>
                      <div className="text-sm text-gray-700">
                        <strong>Address:</strong> {selected.address}
                      </div>

                      <div className="mt-4">
                        <label className="text-sm text-gray-600">
                          Select Year
                        </label>
                        <select
                          value={selectedYear}
                          onChange={e => setSelectedYear(Number(e.target.value))}
                          className="w-full mt-1 p-2 border rounded"
                        >
                          {[...new Set([...(selected.feeRecords || []).map(r => r.year), currentYear])]
                            .sort((a, b) => b - a)
                            .map(y => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                      </div>
                    </div>

                    {/* Fees Month Table */}
                    <div className="md:col-span-2 bg-white rounded-lg p-4 shadow">
                      <h4 className="text-lg font-semibold mb-2">
                        {selectedYear} - Month Fees
                      </h4>

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
                              const rec = (selected.feeRecords || []).find(
                                r => r.year === Number(selectedYear) && r.month === month
                              );

                              const editEntry = editing.find(
                                e => e.year === Number(selectedYear) && e.month === month
                              );

                              const isEditing = !!editEntry;
                              const backVal = isEditing
                                ? editEntry.backdues
                                : rec && rec.backdues ? String(rec.backdues) : "";
                              const paidVal = isEditing
                                ? editEntry.paid
                                : rec && rec.paid ? String(rec.paid) : "";

                              const computedDues =
                                Math.max(0, Number(backVal || 0) - Number(paidVal || 0));

                              return (
                                <tr key={key} className="border-t">
                                  <td className="py-2 px-3 text-sm font-medium text-indigo-700">{month}</td>

                                  {/* BACK DUES */}
                                  <td className="py-2 px-3">
                                    {isEditing ? (
                                      <input
                                        className="w-28 p-1 border rounded text-right"
                                        value={editEntry.backdues}
                                        onChange={e => {
                                          const val = e.target.value;
                                          setEditing(prev =>
                                            prev.map(it =>
                                              it.year === editEntry.year && it.month === editEntry.month
                                                ? { ...it, backdues: val }
                                                : it
                                            )
                                          );
                                        }}
                                      />
                                    ) : (
                                      <div>{rec && rec.backdues ? `₹ ${rec.backdues}` : "₹ 0"}</div>
                                    )}
                                  </td>

                                  {/* PAID */}
                                  <td className="py-2 px-3">
                                    {isEditing ? (
                                      <input
                                        className="w-28 p-1 border rounded text-right"
                                        value={editEntry.paid}
                                        onChange={e => {
                                          const val = e.target.value;
                                          setEditing(prev =>
                                            prev.map(it =>
                                              it.year === editEntry.year && it.month === editEntry.month
                                                ? { ...it, paid: val }
                                                : it
                                            )
                                          );
                                        }}
                                      />
                                    ) : (
                                      <div className="text-green-600">
                                        {rec && rec.paid ? `₹ ${rec.paid}` : "₹ 0"}
                                      </div>
                                    )}
                                  </td>

                                  {/* DUES */}
                                  <td className="py-2 px-3 text-red-600 font-semibold">
                                    ₹ {computedDues}
                                  </td>

                                  {/* ACTIONS */}
                                  <td className="py-2 px-3">
                                    {!isEditing ? (
                                      <button
                                        onClick={() =>
                                          startEdit(
                                            rec
                                              ? {
                                                year: selectedYear,
                                                month,
                                                backdues: rec.backdues,
                                                paid: rec.paid
                                              }
                                              : { year: selectedYear, month }
                                          )
                                        }
                                        className="px-3 py-1 bg-white border rounded"
                                      >
                                        {rec ? "Edit" : "Add"}
                                      </button>
                                    ) : (
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => saveEdit({ year: selectedYear, month })}
                                          className="px-3 py-1 bg-green-600 text-white rounded"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={() => cancelEdit({ year: selectedYear, month })}
                                          className="px-3 py-1 border rounded"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>

                        </table>
                      </div>

                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </TeacherLayout>
  );
}
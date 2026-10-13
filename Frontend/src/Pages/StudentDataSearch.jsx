import { useState, useEffect } from 'react';
import TeacherLayout from '../Components/TeacherLayout';
import { FaSearch, FaFilter, FaTimes, FaUserGraduate, FaIdCard, FaChevronRight } from 'react-icons/fa';
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

  const clearFilters = () => {
    setLedgerId('');
    setName('');
    setResults([]);
    setSelected(null);
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
      aadhar: selected.aadhar || "",
      aapar: selected.aapar || "",
      address: selected.address || "",
      transport: selected.transport ? "Yes" : "No"
    });

    const years = Array.from(
      new Set((selected.feeRecords || []).map(r => r.year))
    ).sort((a, b) => b - a);

    if (years.length > 0) setSelectedYear(years[0]);
    else setSelectedYear(currentYear);

  }, [selected, currentYear]);

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
    setEditStudent(false);
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
      <div className="min-h-screen w-full bg-[#f4f7fb] px-3 py-5 pb-24 sm:px-6 sm:py-8 lg:px-8">

        {/* Search Section */}
        <form
          onSubmit={e => { e.preventDefault(); search(); }}
          className="mb-6 overflow-hidden rounded-3xl border border-slate-200 bg-[#132238] shadow-xl shadow-slate-200/60"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-5 sm:px-6 sm:py-6">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                <FaFilter /> Student directory
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">Find a student</h2>
              <p className="mt-1 text-sm text-slate-300">Search by ledger ID or student name.</p>
            </div>
            <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 text-2xl text-cyan-300 sm:flex">
              <FaUserGraduate />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 px-4 py-4 sm:px-6 sm:py-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-slate-300" htmlFor="ledger-filter">Ledger ID</label>
              <input
                id="ledger-filter"
                value={ledgerId}
                onChange={e => setLedgerId(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                placeholder="e.g. LDR-001"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wide text-slate-300" htmlFor="student-filter">Student name</label>
              <input
                id="student-filter"
                value={name}
                onChange={e => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                placeholder="Type all or part of a name"
              />
            </div>

            <div className="flex gap-2">
              <button type="submit" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-extrabold text-[#132238] transition hover:bg-cyan-200 md:flex-none">
                <FaSearch /> {loading ? "Searching..." : "Search"}
              </button>
              {(ledgerId || name || results.length > 0) && (
                <button type="button" onClick={clearFilters} aria-label="Clear filters" title="Clear filters" className="inline-flex min-h-12 w-12 items-center justify-center rounded-xl border border-white/15 text-slate-300 transition hover:bg-white/10 hover:text-white">
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(280px,0.8fr)_minmax(0,2fr)]">

          {/* Student Results */}
          <div className="min-w-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black text-slate-900">Matches</h3>
                  <p className="text-xs text-slate-500">{results.length} student{results.length === 1 ? '' : 's'} found</p>
                </div>
                <FaIdCard className="text-xl text-cyan-600" />
              </div>

              {results.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  Run a search to see students here.
                </div>
              )}

              {results.length > 0 && (
                <div
                  className="hide-scrollbar max-h-[42vh] overflow-y-auto pr-1 sm:max-h-[60vh]"
                >
                  <div className="flex flex-col gap-3">
                    {results.map(s => (
                      <div
                        key={s._id}
                        onClick={() => loadStudent(s.ledgerId)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') loadStudent(s.ledgerId); }}
                        role="button"
                        tabIndex={0}
                        className={`group relative cursor-pointer rounded-xl border p-3 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md ${selected?.ledgerId === s.ledgerId ? 'border-cyan-400 bg-cyan-50/60' : 'border-slate-100 bg-slate-50/70'}`}
                      >
                        <div className="flex justify-between gap-2">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-extrabold text-slate-900">{s.studentName}</div>
                            <div className="truncate text-xs text-slate-500">
                              Ledger: {s.ledgerId}
                            </div>
                            {s.admissionNumber && (
                              <div className="truncate text-xs text-slate-500">
                                Admission: {s.admissionNumber}
                              </div>
                            )}
                          </div>

                          <div className="text-sm text-gray-500 shrink-0">
                            Class {s.studentClass || "-"}
                          </div>
                        </div>

                        <div className="mt-2 space-y-1 break-words text-xs text-slate-600">
                          <div><strong className="text-slate-700">Mobile:</strong> {s.mobileNo || "-"}</div>
                          <div><strong className="text-slate-700">Parents:</strong> {s.fatherName || "-"} / {s.motherName || "-"}</div>
                        </div>
                        <FaChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-cyan-500" />

                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Student Details + Fee Table */}
          <div className="min-w-0">
            <div className="min-h-[260px] rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

              {!selected && (
                <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 text-center text-slate-500">
                  <FaUserGraduate className="mb-3 text-3xl text-slate-300" />
                  <p className="font-bold text-slate-700">Select a student</p>
                  <p className="mt-1 text-sm">Choose a match to view profile and fee records.</p>
                </div>
              )} 

              {selected && (
                <>
                  <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-start md:justify-between">

                    <div className="min-w-0">
                      {/* NAME */}
                      {!editStudent ? (
                        <div className="break-words text-2xl font-black tracking-tight text-slate-900">
                          {selected.studentName}{" "}
                          <span className="text-sm font-medium text-slate-400">
                            ({selected.ledgerId})
                          </span>
                        </div>
                      ) : (
                        <input
                          className="border p-1 rounded text-xl font-bold w-full sm:w-auto"
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
                        <div className="mt-1 break-words text-sm text-slate-500">
                          Class: {selected.studentClass} • Mobile: {selected.mobileNo}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-3 mt-2">
                          <input
                            className="border p-1 rounded w-24 sm:w-20"
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
                            className="border p-1 rounded w-36 sm:w-32"
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
                        <div className="mt-1 break-words text-sm text-slate-500">
                          Parents: {selected.fatherName} / {selected.motherName}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-3 mt-2">
                          <input
                            className="border p-1 rounded w-36 sm:w-32"
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
                            className="border p-1 rounded w-36 sm:w-32"
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
                        <div className="mt-1 break-words text-sm text-slate-500">
                          Address: {selected.address}
                        </div>
                      ) : (
                        <input
                          className="border p-1 rounded w-full sm:w-64 mt-2"
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
                    <div className="text-left md:text-right shrink-0">

                      {/* EDIT → SAVE/CANCEL */}
                      {!editStudent ? (
                        <button
                          onClick={() => setEditStudent(true)}
                          className="w-full cursor-pointer rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-700 sm:w-auto"
                        >
                          Edit
                        </button>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={saveStudentDetails}
                            className="cursor-pointer rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelStudentEdit}
                            className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600"
                          >
                            Cancel
                          </button>

                          <button
                            onClick={() => StudentAccountDelete(selected._id)}
                            className="flex cursor-pointer items-center justify-center rounded-xl bg-rose-600 px-3 text-white"
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
                          className="mt-3 w-full rounded-xl border border-slate-200 bg-white p-2 text-sm sm:w-auto"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(220px,0.8fr)_minmax(0,1.8fr)]">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                      <h4 className="mb-3 text-base font-black text-slate-900">
                        Student Details
                      </h4>

                      <div className="text-sm text-gray-700 break-words">
                        <strong>Name:</strong> {selected.studentName}
                      </div>
                      <div className="text-sm text-gray-700 break-words">
                        <strong>Ledger:</strong> {selected.ledgerId}
                      </div>
                      {selected.admissionNumber && (
                        <div className="text-sm text-gray-700 break-words">
                          <strong>Admission:</strong> {selected.admissionNumber}
                        </div>
                      )}
                      <div className="text-sm text-gray-700 break-words">
                        <strong>Class:</strong> {selected.studentClass}
                      </div>
                      <div className="text-sm text-gray-700 break-words">
                        <strong>Mobile:</strong> {selected.mobileNo}
                      </div>
                      { selected.additionalMobileNo && (
                        <div className="text-sm text-gray-700 break-words">
                          <strong>Additional Mobile:</strong> {selected.additionalMobileNo}
                        </div>
                      )}
                      <div className="text-sm text-gray-700 break-words">
                        <strong>Parents:</strong> {selected.fatherName} / {selected.motherName}
                      </div>
                      <div className="text-sm text-gray-700 break-words">
                        <strong>Address:</strong> {selected.address}
                      </div>

                      <div className="mt-4">
                        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          Select Year
                        </label>
                        <select
                          value={selectedYear}
                          onChange={e => setSelectedYear(Number(e.target.value))}
                          className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-semibold"
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
                    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4">
                      <h4 className="mb-3 text-base font-black text-slate-900">
                        {selectedYear} - Month Fees
                      </h4>

                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[560px] text-left">
                          <thead className="bg-slate-50">
                            <tr className="text-xs font-bold uppercase tracking-wide text-slate-500">
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
                                  <td className="py-2 px-3 text-sm font-medium text-indigo-700 whitespace-nowrap">{month}</td>

                                  {/* BACK DUES */}
                                  <td className="py-2 px-3">
                                    {isEditing ? (
                                      <input
                                        className="w-24 sm:w-28 p-1 border rounded text-right"
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
                                        className="w-24 sm:w-28 p-1 border rounded text-right"
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
                                  <td className="py-2 px-3 text-red-600 font-semibold whitespace-nowrap">
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
                                        className="px-3 py-1 bg-white border rounded whitespace-nowrap"
                                      >
                                        {rec ? "Edit" : "Add"}
                                      </button>
                                    ) : (
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => saveEdit({ year: selectedYear, month })}
                                          className="px-3 py-1 bg-green-600 text-white rounded whitespace-nowrap"
                                        >
                                          Save
                                        </button>
                                        <button
                                          onClick={() => cancelEdit({ year: selectedYear, month })}
                                          className="px-3 py-1 border rounded whitespace-nowrap"
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
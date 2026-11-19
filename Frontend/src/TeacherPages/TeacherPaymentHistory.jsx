import { useEffect, useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa6';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

const inputClassName = 'w-full min-w-32 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100';

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString();
};

const formatDateForInput = (value) => {
  const datePart = String(value || '').match(/^\d{4}-\d{2}-\d{2}/)?.[0];
  if (datePart) return datePart;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount)
    ? amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
    : '-';
};

const TeacherPaymentHistory = () => {
  const { teacherPaymentList = [] } = UserData();
  const [payments, setPayments] = useState(teacherPaymentList);
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [editDraft, setEditDraft] = useState(null);
  const [editError, setEditError] = useState('');

  useEffect(() => {
    setPayments(teacherPaymentList);
    setEditingPaymentId(null);
    setEditDraft(null);
    setEditError('');
  }, [teacherPaymentList]);

  const startEditing = (payment) => {
    setEditingPaymentId(payment._id);
    setEditError('');
    setEditDraft({
      name: payment.teacherId?.name || payment.teacherName || '',
      mobileNumber: payment.mobileNumber || '',
      paymentDate: formatDateForInput(payment.submitedDate),
      amount: String(payment.teacherPaid ?? ''),
    });
  };

  const savePayment = (event, payment) => {
    event.preventDefault();
    const name = editDraft.name.trim();
    const amount = Number(editDraft.amount);

    if (!name || !editDraft.mobileNumber.trim() || !editDraft.paymentDate || !Number.isFinite(amount) || amount < 0) {
      setEditError('Enter a valid name, mobile number, payment date, and amount.');
      return;
    }

    setPayments((currentPayments) => currentPayments.map((currentPayment) => (
      currentPayment._id === payment._id
        ? {
          ...currentPayment,
          teacherId: currentPayment.teacherId
            ? { ...currentPayment.teacherId, name }
            : currentPayment.teacherId,
          teacherName: name,
          mobileNumber: editDraft.mobileNumber.trim(),
          submitedDate: editDraft.paymentDate,
          teacherPaid: amount,
        }
        : currentPayment
    )));
    setEditingPaymentId(null);
    setEditDraft(null);
    setEditError('');
  };

  const deletePayment = (payment) => {
    if (!window.confirm('Delete this payment from the current view? This will not change the saved server record.')) return;
    setPayments((currentPayments) => currentPayments.filter((item) => item._id !== payment._id));
    setEditingPaymentId(null);
    setEditDraft(null);
    setEditError('');
  };

  const cancelEditing = () => {
    setEditingPaymentId(null);
    setEditDraft(null);
    setEditError('');
  };

  return (
    <TeacherLayout>
      <main className="min-h-[calc(100vh-4rem)] bg-slate-100 px-3 pb-24 pt-20 sm:px-6 sm:pb-24 md:pb-10">
        <section className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          <header className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-indigo-600">Staff payroll</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Teacher payment history
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                {payments.length} {payments.length === 1 ? 'payment record' : 'payment records'}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Edits and deletions affect this page only and are not saved to the server.
              </p>
            </div>
          </header>

          {payments.length === 0 ? (
            <div className="px-5 py-12 text-center sm:px-8">
              <FaRupeeSign className="mx-auto text-3xl text-slate-300" aria-hidden="true" />
              <p className="mt-3 font-semibold text-slate-700">No payment records yet</p>
              <p className="mt-1 text-sm text-slate-500">Submitted teacher payments will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-3 sm:px-8">Teacher</th>
                    <th scope="col" className="px-5 py-3">Mobile</th>
                    <th scope="col" className="px-5 py-3">Month</th>
                    <th scope="col" className="px-5 py-3">Payment date</th>
                    <th scope="col" className="px-5 py-3">Method</th>
                    <th scope="col" className="px-5 py-3 text-right">Amount</th>
                    <th scope="col" className="px-5 py-3 sm:px-8">Recorded by</th>
                    <th scope="col" className="px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {payments.map((payment) => {
                    const isEditing = editingPaymentId === payment._id;
                    const formId = `edit-payment-${payment._id}`;

                    return (
                      <tr key={payment._id} className="text-slate-700">
                        <td className="px-5 py-4 font-semibold sm:px-8">
                          {isEditing ? (
                            <input
                              aria-label="Teacher name"
                              className={inputClassName}
                              form={formId}
                              onChange={(event) => {
                                setEditDraft({ ...editDraft, name: event.target.value });
                                setEditError('');
                              }}
                              required
                              value={editDraft.name}
                            />
                          ) : (
                            payment.teacherId?.name || payment.teacherName || 'Unknown teacher'
                          )}
                        </td>
                        <td className="px-5 py-4">
                          {isEditing ? (
                            <input
                              aria-label="Mobile number"
                              className={inputClassName}
                              form={formId}
                              maxLength={10}
                              onChange={(event) => {
                                setEditDraft({ ...editDraft, mobileNumber: event.target.value });
                                setEditError('');
                              }}
                              required
                              type="tel"
                              value={editDraft.mobileNumber}
                            />
                          ) : (
                            payment.mobileNumber || '-'
                          )}
                        </td>
                        <td className="px-5 py-4">{payment.submitMonth || '-'}</td>
                        <td className="px-5 py-4">
                          {isEditing ? (
                            <input
                              aria-label="Payment date"
                              className={inputClassName}
                              form={formId}
                              onChange={(event) => {
                                setEditDraft({ ...editDraft, paymentDate: event.target.value });
                                setEditError('');
                              }}
                              required
                              type="date"
                              value={editDraft.paymentDate}
                            />
                          ) : (
                            formatDate(payment.submitedDate)
                          )}
                        </td>
                        <td className="px-5 py-4">{payment.paymentMethod || '-'}</td>
                        <td className="px-5 py-4 text-right font-semibold">
                          {isEditing ? (
                            <input
                              aria-label="Payment amount"
                              className={`${inputClassName} text-right`}
                              form={formId}
                              min="0"
                              onChange={(event) => {
                                setEditDraft({ ...editDraft, amount: event.target.value });
                                setEditError('');
                              }}
                              required
                              step="0.01"
                              type="number"
                              value={editDraft.amount}
                            />
                          ) : (
                            formatAmount(payment.teacherPaid)
                          )}
                        </td>
                        <td className="px-5 py-4 sm:px-8">{payment.submitedBy?.name || '-'}</td>
                        <td className="px-5 py-4">
                          {isEditing ? (
                            <div className="flex flex-wrap gap-2">
                              <form id={formId} onSubmit={(event) => savePayment(event, payment)}>
                                <button
                                  className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700"
                                  type="submit"
                                >
                                  Save
                                </button>
                              </form>
                              <button
                                className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-rose-700"
                                onClick={() => deletePayment(payment)}
                                type="button"
                              >
                                Delete
                              </button>
                              <button
                                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                                onClick={cancelEditing}
                                type="button"
                              >
                                Cancel
                              </button>
                              {editError && <p className="basis-full text-xs font-semibold text-rose-600" role="alert">{editError}</p>}
                            </div>
                          ) : (
                            <button
                              className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-indigo-700"
                              onClick={() => startEditing(payment)}
                              type="button"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </TeacherLayout>
  );
};

export default TeacherPaymentHistory;
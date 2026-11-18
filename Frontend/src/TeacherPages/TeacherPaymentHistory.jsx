import { FaRupeeSign } from 'react-icons/fa6';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString();
};

const formatAmount = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount)
    ? amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
    : '-';
};

const TeacherPaymentHistory = () => {
  const { teacherPaymentList = [] } = UserData();

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
                {teacherPaymentList.length} {teacherPaymentList.length === 1 ? 'payment record' : 'payment records'}
              </p>
            </div>
          </header>

          {teacherPaymentList.length === 0 ? (
            <div className="px-5 py-12 text-center sm:px-8">
              <FaRupeeSign className="mx-auto text-3xl text-slate-300" aria-hidden="true" />
              <p className="mt-3 font-semibold text-slate-700">No payment records yet</p>
              <p className="mt-1 text-sm text-slate-500">Submitted teacher payments will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th scope="col" className="px-5 py-3 sm:px-8">Teacher</th>
                    <th scope="col" className="px-5 py-3">Month</th>
                    <th scope="col" className="px-5 py-3">Payment date</th>
                    <th scope="col" className="px-5 py-3">Method</th>
                    <th scope="col" className="px-5 py-3 text-right">Amount</th>
                    <th scope="col" className="px-5 py-3 sm:px-8">Recorded by</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teacherPaymentList.map((payment) => (
                    <tr key={payment._id} className="text-slate-700">
                      <td className="px-5 py-4 font-semibold sm:px-8">
                        {payment.teacherId?.name || payment.teacherName || 'Unknown teacher'}
                      </td>
                      <td className="px-5 py-4">{payment.submitMonth || '-'}</td>
                      <td className="px-5 py-4">{formatDate(payment.submitedDate)}</td>
                      <td className="px-5 py-4">{payment.paymentMethod || '-'}</td>
                      <td className="px-5 py-4 text-right font-semibold">{formatAmount(payment.teacherPaid)}</td>
                      <td className="px-5 py-4 sm:px-8">{payment.submitedBy?.name || '-'}</td>
                    </tr>
                  ))}
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
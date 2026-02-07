import TeacherLayout from '../Components/TeacherLayout';
import { useState } from 'react';
import { UserData } from '../context/User';

const mockBookData = [
	{
		sNo: 1,
		name: 'John Doe',
		class: '10A',
		paymentMethod: 'Cash',
		totalAmount: 500,
		submitAmount: 400,
		dues: 100,
		date: '2026-02-01',
		submittedBy: 'Mr. Smith',
		status: 'Pending',
	},
	{
		sNo: 2,
		name: 'Jane Smith',
		class: '9B',
		paymentMethod: 'Online',
		totalAmount: 600,
		submitAmount: 600,
		dues: 0,
		date: '2026-02-03',
		submittedBy: 'Ms. Johnson',
		status: 'Accept',
	},
	// Add more mock data as needed
];

const BookSaleHistory = () => {
	const [bookData, setBookData] = useState(mockBookData);
	const { user, bookSale } = UserData();
	console.log(bookSale);
	// Determine role: fallback to 'accountant' if not set
	const role = user?.role || 'accountant';

	// Accept handler (mock)
	const handleAccept = (sNo) => {
		setBookData((prev) => prev.map(row => row.sNo === sNo ? { ...row, status: 'Accept' } : row));
	};

	return (
		<TeacherLayout>
			<div className="w-full mx-auto mt-20 p-4">
				<h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow animate-fade-in">Book Sale History</h2>
				<div className="overflow-x-auto rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-white p-2 md:p-6 scrollbar-hide">
					<table className="min-w-full divide-blue-200 bg-white rounded-xl">
						<thead className="bg-blue-200">
							<tr>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">S.No</th>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">LedgerID</th>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Name</th>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Class</th>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Payment Method</th>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Total Amount</th>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Submit Amount</th>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Dues</th>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Date</th>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Submitted By</th>
								<th className="px-4 py-3 text-left text-xs font-bold text-blue-900 uppercase tracking-wider">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-blue-100">
							{bookSale.map((row, index) => (
								<tr key={row.sNo} className="hover:bg-blue-50 transition group">
									<td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-700 group-hover:text-blue-700">{index+1}</td>
									<td className="px-4 py-3 whitespace-nowrap text-gray-800">{row.ledgerId}</td>
									<td className="px-4 py-3 whitespace-nowrap text-gray-800">{row.studentName}</td>
									<td className="px-4 py-3 whitespace-nowrap text-gray-800">{row.studentClass}</td>
									<td className="px-4 py-3 whitespace-nowrap text-gray-800">{row.paymentMethod}</td>
									<td className="px-4 py-3 whitespace-nowrap text-green-700 font-bold">₹{row.totalamount}</td>
									<td className="px-4 py-3 whitespace-nowrap text-green-700 font-bold">₹{row.submitAmount}</td>
									<td className="px-4 py-3 whitespace-nowrap text-red-600 font-semibold">₹{row.dues}</td>
									<td className="px-4 py-3 whitespace-nowrap text-gray-700">{row.date}</td>
									<td className="px-4 py-3 whitespace-nowrap text-gray-700">{row.submitedBy.name}</td>
									{/* <td className="px-4 py-3 whitespace-nowrap">
										{role === 'admin' ? (
											row.status === 'Pending' ? (
												<button
													className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded shadow transition text-xs font-semibold"
													onClick={() => handleAccept(row.sNo)}
												>
													Accept
												</button>
											) : (
												<span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Accept</span>
											)
										) : (
											<span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{row.status}</span>
										)}
									</td> */}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</TeacherLayout>
	);
};

export default BookSaleHistory;

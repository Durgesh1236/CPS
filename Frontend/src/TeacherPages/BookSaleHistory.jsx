import TeacherLayout from '../Components/TeacherLayout';
import { useState } from 'react';
import { UserData } from '../context/User';
import { MdDelete } from "react-icons/md";

const BookSaleHistory = () => {
	const [editIndex, setEditIndex] = useState(null);
	const [editRow, setEditRow] = useState({});
	const { user, bookSale, Deletebookdata, editBookData } = UserData();
	const role = user?.role || 'accountant';

	// Edit button handler
	const handleEdit = (index, row) => {
		setEditIndex(index);
		setEditRow({ ...row });
	};

	// Save button handler (mock, you should replace with API call)
	const handleSave = (row) => {
		editBookData(row._id, editRow.ledgerId, editRow.studentName, editRow.studentClass, editRow.paymentMethod, editRow.totalamount, editRow.submitAmount, editRow.dues);
		setEditIndex(null);
	};

	// Cancel button handler
	const handleCancel = () => {
		setEditIndex(null);
		setEditRow({});
	};
	return (
		<TeacherLayout>
			<div className="w-full mx-auto mt-20 p-4">
				<h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow animate-fade-in">Book Sale History</h2>
				<div className="overflow-x-auto rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-white p-2 md:p-6">
					<div className="w-full overflow-x-auto">
						<table className="min-w-full divide-blue-200 bg-white rounded-xl text-xs sm:text-sm md:text-base">
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
										<td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-700 group-hover:text-blue-700">{index + 1}</td>
										{editIndex === index ? (
											<>
												<td className="px-4 py-3 whitespace-nowrap">
													<input
														className="border rounded px-2 py-1 w-24 sm:w-32"
														value={editRow.ledgerId || ''}
														onChange={e => setEditRow({ ...editRow, ledgerId: e.target.value })}
													/>
												</td>
												<td className="px-4 py-3 whitespace-nowrap">
													<input
														className="border rounded px-2 py-1 w-24 sm:w-32"
														value={editRow.studentName || ''}
														onChange={e => setEditRow({ ...editRow, studentName: e.target.value })}
													/>
												</td>
												<td className="px-4 py-3 whitespace-nowrap">
													<input
														className="border rounded px-2 py-1 w-16 sm:w-24"
														value={editRow.studentClass || ''}
														onChange={e => setEditRow({ ...editRow, studentClass: e.target.value })}
													/>
												</td>
												<td className="px-4 py-3 whitespace-nowrap">
													<input
														className="border rounded px-2 py-1 w-20 sm:w-28"
														value={editRow.paymentMethod || ''}
														onChange={e => setEditRow({ ...editRow, paymentMethod: e.target.value })}
													/>
												</td>
												<td className="px-4 py-3 whitespace-nowrap">
													<input
														type="number"
														className="border rounded px-2 py-1 w-20 sm:w-28"
														value={editRow.totalamount || ''}
														onChange={e => setEditRow({ ...editRow, totalamount: e.target.value })}
													/>
												</td>
												<td className="px-4 py-3 whitespace-nowrap">
													<input
														type="number"
														className="border rounded px-2 py-1 w-20 sm:w-28"
														value={editRow.submitAmount || ''}
														onChange={e => setEditRow({ ...editRow, submitAmount: e.target.value })}
													/>
												</td>
												<td className="px-4 py-3 whitespace-nowrap">
													<input
														type="number"
														className="border rounded px-2 py-1 w-16 sm:w-24"
														value={editRow.dues || ''}
														onChange={e => setEditRow({ ...editRow, dues: e.target.value })}
													/>
												</td>
												<td className="px-4 py-3 whitespace-nowrap text-gray-700">{row.date}</td>
												<td className="px-4 py-3 whitespace-nowrap text-gray-700">{row.submitedBy.name}</td>
											</>
										) : (
											<>
												<td className="px-4 py-3 whitespace-nowrap text-gray-800">{row.ledgerId}</td>
												<td className="px-4 py-3 whitespace-nowrap text-gray-800">{row.studentName}</td>
												<td className="px-4 py-3 whitespace-nowrap text-gray-800">{row.studentClass}</td>
												<td className="px-4 py-3 whitespace-nowrap text-gray-800">{row.paymentMethod}</td>
												<td className="px-4 py-3 whitespace-nowrap text-green-700 font-bold">₹{row.totalamount}</td>
												<td className="px-4 py-3 whitespace-nowrap text-green-700 font-bold">₹{row.submitAmount}</td>
												<td className="px-4 py-3 whitespace-nowrap text-red-600 font-semibold">₹{row.totalamount - row.submitAmount}</td>
												<td className="px-4 py-3 whitespace-nowrap text-gray-700">{row.date}</td>
												<td className="px-4 py-3 whitespace-nowrap text-gray-700">{row.submitedBy.name}</td>
											</>
										)}
										<td className="px-4 py-3 whitespace-nowrap">
											{editIndex === index ? (
												<div className="flex flex-col gap-2 sm:flex-row">
													<button className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-semibold" onClick={() => handleSave(row)}>Save</button>
													<button className="bg-gray-400 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs font-semibold" onClick={handleCancel}>Cancel</button>
													<button className="py-2 px-4">
														<MdDelete
															className="text-2xl text-red-500 cursor-pointer"
															onClick={() => Deletebookdata(row._id)}
														/>
													</button>
												</div>
											) : (
												<button className="bg-blue-600 hover:bg-blue-800 text-white px-2 py-1 rounded text-xs font-semibold" onClick={() => handleEdit(index, row)}>Edit</button>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</TeacherLayout>
	);
};


export default BookSaleHistory;

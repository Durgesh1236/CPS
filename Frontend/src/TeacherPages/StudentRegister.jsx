
import React, { useState } from "react";
import TeacherLayout from "../Components/TeacherLayout";
import { StudentData } from "../context/Student";
import { UserData } from "../context/User";

const StudentRegister = () => {
	const [form, setForm] = useState({
		ledgerId: "",
		name: "",
		password: "",
		terms: false,
	});
    const { StudentRegister } = StudentData();
    const { results } = UserData();
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Submission logic will be added later
        StudentRegister(form.ledgerId, form.name, form.password);
        setForm({
            ledgerId: "",
            name: "",
            password: "",
            terms: false,
        });
	};

	return (
        <TeacherLayout>
		<div className="flex items-center justify-center h-full animate-fade-in">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 animate-fade-in-up">
				<h2 className="text-3xl font-bold text-center text-blue-700 mb-8 tracking-tight">Student Registration</h2>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label className="block text-gray-700 font-medium mb-1">Ledger ID</label>
						<input
							type="text"
							name="ledgerId"
							value={form.ledgerId}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
							placeholder="Enter Ledger ID"
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-medium mb-1">Name</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
							placeholder="Enter Name"
						/>
					</div>
					<div>
						<label className="block text-gray-700 font-medium mb-1">Password</label>
						<input
							type="password"
							name="password"
							value={form.password}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
							placeholder="Enter Password"
						/>
					</div>
					<div className="flex items-center">
						<input
							type="checkbox"
							name="terms"
							checked={form.terms}
							onChange={handleChange}
							required
							className="mr-2 accent-blue-600 scale-110"
							id="terms"
						/>
						<label htmlFor="terms" className="text-gray-600 select-none">I agree to the <span className="text-blue-600 underline cursor-pointer">Terms and Conditions</span></label>
					</div>
					<button
						type="submit"
						disabled={!form.terms}
						className={`w-full py-3 rounded-lg font-semibold text-lg text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed ${form.terms ? 'animate-bounce-once' : ''}`}
					>
						Register
					</button>
				</form>
			</div>
		</div>
        </TeacherLayout>
	);
};

export default StudentRegister;

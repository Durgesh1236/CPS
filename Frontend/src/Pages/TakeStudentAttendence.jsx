import axios from 'axios';
import { useState } from 'react';
import { FaCalendarAlt, FaChalkboardTeacher, FaCheckCircle, FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';
import TeacherLayout from '../Components/TeacherLayout';
import { UserData } from '../context/User';

const classOptions = ['P.Nur', 'Nur', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8'];
const subjectOptions = ['Math', 'Science', 'English', 'Hindi', 'Social Studies', 'Computer', 'Art', 'Physical Education', 'Other'];
 
const TakeStudentAttendence = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('Math');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [attendance, setAttendance] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { getStudentAttendence, loading, students, setStudents } = UserData();

    const handleClassChange = async (event) => {
        const className = event.target.value;
        setSelectedClass(className);
        setStudents([]);
        setAttendance({});
        setSubmitted(false);

        if (!className) return;

        // setLoadingStudents(true);
       await getStudentAttendence(className);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedClass || !selectedSubject || !selectedDate || students.length === 0) return;

        setSubmitting(true);
        try {
            await Promise.all(students.map(student => axios.post('/api/user/student-attendance', {
                studentId: student.ledgerId,
                date: selectedDate,
                subjects: [{
                    subject: selectedSubject,
                    status: attendance[student.ledgerId] ? 'present' : 'absent',
                }],
            })));
            setSubmitted(true);
            toast.success('Attendance submitted successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to submit attendance');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setSelectedClass('');
        setStudents([]);
        setAttendance({});
        setSubmitted(false);
    };

    return (
        <TeacherLayout>
            <main className="min-h-screen bg-slate-50 px-3 pb-10 pt-24 sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <header className="mb-6 rounded-2xl bg-slate-900 p-5 text-white shadow-lg sm:p-7">
                        <div className="flex items-start gap-4">
                            <span className="rounded-xl bg-emerald-400/20 p-3 text-emerald-300"><FaChalkboardTeacher /></span>
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-300">Teacher workspace</p>
                                <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Student attendance</h1>
                                <p className="mt-2 max-w-2xl text-sm text-slate-300">Choose a class, then mark each student present. Students left unchecked will be recorded absent.</p>
                            </div>
                        </div>
                    </header>

                    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <label className="text-sm font-semibold text-slate-700">
                                Class
                                <select value={selectedClass} onChange={handleClassChange} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                                    <option value="">Choose class</option>
                                    {classOptions.map(className => <option key={className} value={className}>Class {className}</option>)}
                                </select>
                            </label>
                            <label className="text-sm font-semibold text-slate-700">
                                Subject
                                <select value={selectedSubject} onChange={event => setSelectedSubject(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                                    {subjectOptions.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                                </select>
                            </label>
                            <label className="text-sm font-semibold text-slate-700">
                                Attendance date
                                <span className="relative mt-2 block">
                                    <FaCalendarAlt className="pointer-events-none absolute left-3 top-3.5 text-slate-400" />
                                    <input type="date" value={selectedDate} onChange={event => setSelectedDate(event.target.value)} className="w-full rounded-xl border border-slate-300 p-3 pl-10 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100" />
                                </span>
                            </label>
                        </div>

                        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
                            <div className="flex flex-col gap-2 bg-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                                <h2 className="flex items-center gap-2 font-bold text-slate-800"><FaUsers className="text-emerald-600" /> Student list</h2>
                                {selectedClass && <span className="text-sm text-slate-500">{students.length} student{students.length === 1 ? '' : 's'}</span>}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[620px] text-left">
                                    <thead className="bg-slate-800 text-sm text-white">
                                        <tr><th className="px-4 py-3">S.No</th><th className="px-4 py-3">Student name</th><th className="px-4 py-3">Ledger ID</th><th className="px-4 py-3 text-center">Present</th></tr>
                                    </thead>
                                    <tbody>
                                        {loading && <tr><td colSpan="4" className="px-4 py-10 text-center text-slate-500">Loading students...</td></tr>}
                                        {!loading && !selectedClass && <tr><td colSpan="4" className="px-4 py-10 text-center text-slate-500">Choose a class to load students.</td></tr>}
                                        {!loading && selectedClass && students.length === 0 && <tr><td colSpan="4" className="px-4 py-10 text-center text-slate-500">No students found for this class.</td></tr>}
                                        {!loading && students.map((student, index) => <tr key={student.ledgerId} className="border-t border-slate-100 hover:bg-emerald-50/50">
                                            <td className="px-4 py-4 text-slate-500">{index + 1}</td>
                                            <td className="px-4 py-4 font-semibold text-slate-800">{student.studentName}</td>
                                            <td className="px-4 py-4 font-mono text-sm text-slate-500">{student.ledgerId}</td>
                                            <td className="px-4 py-4 text-center">
                                                <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100">
                                                    <input type="checkbox" checked={Boolean(attendance[student.ledgerId])} onChange={event => setAttendance(previous => ({ ...previous, [student.ledgerId]: event.target.checked }))} className="h-5 w-5 accent-emerald-600" />
                                                    <FaCheckCircle /> Present
                                                </label>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {students.length > 0 && <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button type="button" onClick={handleReset} disabled={submitting} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50">Reset</button>
                            <button type="submit" disabled={submitting} className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">{submitting ? 'Submitting...' : 'Submit attendance'}</button>
                        </div>}
                        {submitted && <p className="mt-4 text-center font-semibold text-emerald-600">Attendance saved for Class {selectedClass}.</p>}
                    </form>
                </div>
            </main>
        </TeacherLayout>
    );
};

export default TakeStudentAttendence;

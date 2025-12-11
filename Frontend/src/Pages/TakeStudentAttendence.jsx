
import { FaUserGraduate, FaCheckCircle, FaTimesCircle, FaBookOpen, FaChalkboardTeacher } from 'react-icons/fa';
import { UserData } from '../context/User';
import { useEffect, useState } from 'react';
import TeacherLayout from '../Components/TeacherLayout';
const classOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
const subjectOptions = [
    { value: 'Math', topics: ['Algebra', 'Geometry', 'Trigonometry', 'Arithmetic', 'Other'] },
    { value: 'Science', topics: ['Physics', 'Chemistry', 'Biology', 'Other'] },
    { value: 'English', topics: ['Grammar', 'Literature', 'Writing', 'Other'] },
    { value: 'Hindi', topics: ['Grammar', 'Literature', 'Writing', 'Other'] },
    { value: 'Social Studies', topics: ['History', 'Geography', 'Civics', 'Other'] },
    { value: 'Computer', topics: ['Programming', 'Theory', 'Practical', 'Other'] },
    { value: 'Art', topics: ['Drawing', 'Painting', 'Craft', 'Other'] },
    { value: 'Physical Education', topics: ['Sports', 'Yoga', 'Other'] },
    { value: 'Other', topics: ['General', 'Other'] },
];
const placeholderImg = '/src/assets/cps1.jpg';

const exampleStudents = [
    {
        ledgerId: '1001',
        studentName: 'Amit Sharma',
        studentClass: '5',
        imageUrl: '',
    },
    {
        ledgerId: '1002',
        studentName: 'Priya Singh',
        studentClass: '5',
        imageUrl: '',
    },
    {
        ledgerId: '1003',
        studentName: 'Rahul Verma',
        studentClass: '6',
        imageUrl: '',
    },
    {
        ledgerId: '1004',
        studentName: 'Sneha Gupta',
        studentClass: '6',
        imageUrl: '',
    },
];

const TakeStudentAttendence = () => {
    const { getAllStudents, results } = UserData();
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [students, setStudents] = useState(exampleStudents);
    const [attendance, setAttendance] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // if (selectedClass) {
        // 	getAllStudents().then(() => {
        // 		setStudents(results.filter(s => s.studentClass === selectedClass));
        // 		setAttendance({});
        // 	});
        // } else {
        setStudents(exampleStudents);
        setAttendance({});
        // }
        setSubmitted(false);
    }, [selectedClass]);

    useEffect(() => {
        setSelectedTopic('');
    }, [selectedSubject]);

    const handleMark = (ledgerId, status) => {
        setAttendance(prev => ({ ...prev, [ledgerId]: status }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Here you would send attendance data to backend
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            // Reset all fields after submit
            setSelectedClass('');
            setSelectedSubject('');
            setSelectedTopic('');
            setStudents(exampleStudents);
            setAttendance({});
        }, 1200);
    };

    const handleCancel = () => {
        setSelectedClass('');
        setSelectedSubject('');
        setSelectedTopic('');
        setStudents([]);
        setAttendance({});
        setSubmitted(false);
    };

    return (
        <TeacherLayout>
            <div className="min-h-screen pt-24 p-2 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="w-full mx-auto">
                    <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100 ring-1 ring-blue-50">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-500 mb-6 flex items-center gap-3">
                            <FaChalkboardTeacher className="text-blue-500" /> Take Student Attendance
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Select Class</label>
                                    <select
                                        className="w-full cursor-pointer p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        value={selectedClass}
                                        onChange={e => setSelectedClass(e.target.value)}
                                    >
                                        <option value="">-- Choose Class --</option>
                                        {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Select Subject</label>
                                    <select
                                        className="w-full p-3 cursor-pointer border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        value={selectedSubject}
                                        onChange={e => setSelectedSubject(e.target.value)}
                                    >
                                        <option value="">-- Choose Subject --</option>
                                        {subjectOptions.map(s => <option key={s.value} value={s.value}>{s.value}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Select Topic</label>
                                    <select
                                        className="w-full p-3 border cursor-pointer rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                        value={selectedTopic}
                                        onChange={e => setSelectedTopic(e.target.value)}
                                        disabled={!selectedSubject}
                                    >
                                        <option value="">-- Choose Topic --</option>
                                        {selectedSubject && subjectOptions.find(s => s.value === selectedSubject)?.topics.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {selectedClass && selectedSubject && selectedTopic && (
                                <div className="mt-8">
                                    <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2"><FaBookOpen /> Students List</h2>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full bg-white rounded-xl shadow border border-blue-100">
                                            <thead>
                                                <tr className="bg-blue-50">
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Photo</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                                                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Ledger ID</th>
                                                    <th className="py-3 px-4 text-center font-semibold text-gray-700">Mark Attendance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {students.length === 0 && (
                                                    <tr>
                                                        <td colSpan="4" className="text-center text-gray-500 text-lg py-6">No students found for this class.</td>
                                                    </tr>
                                                )}
                                                {students.map(stu => (
                                                    <tr key={stu.ledgerId} className="border-b border-blue-50 hover:bg-blue-50">
                                                        <td className="py-3 px-4">
                                                            <img src={stu.imageUrl || placeholderImg} alt={stu.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-blue-300 shadow" />
                                                        </td>
                                                        <td className="py-3 px-4 font-bold text-gray-800">{stu.studentName}</td>
                                                        <td className="py-3 px-4 text-gray-500">{stu.ledgerId}</td>
                                                        <td className="py-3 px-4 text-center">
                                                            <button
                                                                type="button"
                                                                className={`px-4 cursor-pointer py-2 rounded-lg font-bold text-white mr-2 ${attendance[stu.ledgerId] === 'present' ? 'bg-green-600' : 'bg-gray-300'} transition`}
                                                                onClick={() => handleMark(stu.ledgerId, 'present')}
                                                            >
                                                                <FaCheckCircle className="inline mr-1" /> Present
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className={`px-4 py-2 cursor-pointer rounded-lg font-bold text-white ${attendance[stu.ledgerId] === 'absent' ? 'bg-red-600' : 'bg-gray-300'} transition`}
                                                                onClick={() => handleMark(stu.ledgerId, 'absent')}
                                                            >
                                                                <FaTimesCircle className="inline mr-1" /> Absent
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {selectedClass && selectedSubject && selectedTopic && students.length > 0 && (
                                <div className="flex justify-end gap-4 mt-8">
                                    <button
                                        type="submit"
                                        className="px-8 py-3 cursor-pointer rounded-xl font-bold text-lg bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:from-green-600 hover:to-blue-600 transition"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Submitting...' : 'Submit Attendance'}
                                    </button>
                                    <button
                                        type="button"
                                        className="px-8 py-3 cursor-pointer rounded-xl font-bold text-lg bg-gradient-to-r from-gray-400 to-gray-600 text-white shadow-lg hover:from-gray-500 hover:to-gray-700 transition"
                                        onClick={handleCancel}
                                        disabled={submitting}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                            {submitted && (
                                <div className="mt-6 text-center text-green-600 font-bold text-lg">Attendance submitted successfully!</div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </TeacherLayout>
    );
};

export default TakeStudentAttendence;

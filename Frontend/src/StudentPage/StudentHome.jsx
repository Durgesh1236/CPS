import { useNavigate } from 'react-router-dom';
import Layout from '../Components/LayoutStu';
import { FaCalendarCheck, FaMoneyCheckAlt, FaClock, FaChartBar, FaBullhorn } from 'react-icons/fa';

const StudentHome = () => {
  const navigate = useNavigate();
  const studentName = "John Doe";
  const studentImage = "https://randomuser.me/api/portraits/men/32.jpg";

  return (
    <Layout>
      <div className="w-full mt-10 lg:mt-10 min-h-screen bg-gray-50 flex flex-col gap-6 p-4">
        {/* Top Welcome Section */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between bg-white rounded-xl shadow p-6 mb-2 gap-4">
          <div className="flex items-center gap-4">
            <img src={studentImage} alt="Student" className="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow" />
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-1">Welcome, {studentName}!</h2>
              <p className="text-gray-600 text-base">Hope you have a great day at school.</p>
            </div>
          </div>
          <button
            className="w-full md:w-auto bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition-all text-lg md:self-end"
            onClick={() => alert('View Profile Clicked!')}
          >
            View Profile
          </button>
        </div>
        
        {/* Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div onClick={() => navigate("/attendance")}
            className="bg-white rounded shadow p-6 cursor-pointer transition hover:shadow-lg"
          >
            <FaCalendarCheck className="text-blue-500 text-2xl mb-1" />
            <span className="text-lg text-gray-700 font-bold mt-2">Attendance</span>
          </div>
          <div
            className="bg-white rounded shadow p-6 cursor-pointer transition hover:shadow-lg"
          >
            <FaMoneyCheckAlt className="text-green-500 text-2xl mb-1" />
            <span className="text-lg text-gray-700 font-bold mt-2">School Fees</span>
          </div>
          <div
            className="bg-white rounded shadow p-6 cursor-pointer transition hover:shadow-lg"
          >
            <FaClock className="text-yellow-500 text-2xl mb-1" />
            <span className="text-lg text-gray-700 font-bold mt-2">Time Table</span>
          </div>
          <div
            className="bg-white rounded shadow p-6 cursor-pointer transition hover:shadow-lg"
          >
            <FaChartBar className="text-purple-500 text-2xl mb-1" />
            <span className="text-lg text-gray-700 font-bold mt-2">Result</span>
          </div>
          <div
            className="bg-white rounded h-96 shadow p-6 cursor-pointer transition hover:shadow-lg"
          >
            <FaBullhorn className="text-red-500 text-2xl mb-1" />
            <span className="text-lg text-red-500 font-bold mt-2">Important Message</span>
            <p className=''>Parent-Teacher meeting scheduled for 10th August at 10:00 AM in the school auditorium.</p>
          </div>
        </div>
        </div>
      {/* </div> */}
    </Layout>
  );
}

export default StudentHome;
import { useNavigate } from 'react-router-dom';
import Layout from '../Components/LayoutStu';

const StudentHome = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col gap-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              className="bg-white rounded shadow p-6 cursor-pointer transition hover:shadow-lg"
            >
             <span onClick={() => navigate("/attendance")} className="text-lg text-gray-700 font-bold mt-2">Attendance</span>
            </div>

            <div
              className="bg-white rounded shadow p-6 cursor-pointer transition hover:shadow-lg"
            >
             <span className="text-lg text-gray-700 font-bold mt-2">School Fees</span>
            </div>

            <div
              className="bg-white rounded shadow p-6 cursor-pointer transition hover:shadow-lg"
            >
             <span className="text-lg text-gray-700 font-bold mt-2">Time Table</span>
            </div>

            <div
              className="bg-white rounded shadow p-6 cursor-pointer transition hover:shadow-lg"
            >
             <span className="text-lg text-gray-700 font-bold mt-2">Result</span>
            </div>

            <div
              className="bg-white rounded h-96 shadow p-6 cursor-pointer transition hover:shadow-lg"
            >
             <span className="text-lg text-red-500 font-bold mt-2">Important Message</span>
             <p className=''>Parent-Teacher meeting scheduled for 10th August at 10:00 AM in the school auditorium.</p>
            </div>
        </div>
      </div>
    </Layout>
  );
}

export default StudentHome;
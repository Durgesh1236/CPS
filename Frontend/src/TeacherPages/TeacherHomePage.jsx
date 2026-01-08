import React from 'react';
import { FaMoneyCheckAlt, FaHistory, FaExclamationCircle, FaUserTie, FaClipboardList, FaUserGraduate, FaSearch, FaCalendarAlt, FaRupeeSign, FaFileAlt, FaBell, FaQuestionCircle, FaHandPaper } from 'react-icons/fa';
import TeacherLayout from '../Components/TeacherLayout';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/User';
import { MdOutlineManageHistory, MdEventNote } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";

const importantMessage = "Staff meeting scheduled for 28th August at 2:00 PM in the conference hall.";

const TeacherHomePage = () => {
  const navigate = useNavigate();
  const { user } = UserData()
  const { getStudentCount } = UserData();
  const [totalStudents, setTotalStudents] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const c = await getStudentCount();
        if (mounted) setTotalStudents(c);
      } catch (err) {
        console.error('Could not fetch student count', err);
      }
    })();
    return () => { mounted = false; }
  }, [getStudentCount]);

  return (
    <TeacherLayout>
      {/* Mobile View - ONLY DESIGN ADDED */}
      <div className="md:hidden min-h-screen bg-white p-4 pt-20">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 shadow-sm"
            placeholder="Search modules..."
          />
        </div>

        {/* Welcome Message */}
        <div className="mb-8 flex bg-blue-500 rounded-2xl shadow-lg p-5 text-white">
          {/* { user.thumbnails ? (
                <img
                  src={user.thumbnails.url}
                  alt="Teacher Profile"
                  className="w-15 h-15md:w-24 md:h-24 rounded-full object-cover border-4 border-blue-300"
                  />
              ):
              <FaUserTie className="text-5xl text-blue-600" />
              } */}
          <h1 className="text-2xl mr-2 font-bold text-gray-900 mb-1">Hey <span className='text-white'>{user.name.split(' ')[0]} </span> <span className='text-3xl'> 👋 </span></h1>
          {/* <p className="text-gray-600 text-sm">Welcome back to your dashboard</p> */}
        </div>

        <div className="mb-8 bg-gradient-to-br from-purple-300 to-purple-300 rounded-2xl shadow-lg p-5 text-black">
          <h1 className="text-2xl font-bold  mb-1">Total Students: {totalStudents}</h1>
        </div>

        {/* Attendance, Timetable, Fees Row */}
        {/* <div className="grid grid-cols-3 gap-3 mb-8">
          <div onClick={()=> navigate("/teacher-profile")} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-purple-200">
            <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
              <FaUserGraduate className="text-xl text-purple-600" />
            </div>
            <span className="font-medium text-gray-800 text-sm">Profile</span>
          </div> */}
          {/* <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200">
            <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
              <FaClipboardList className="text-xl text-blue-600" />
            </div>
            <span className="font-medium text-gray-800 text-sm">Attendance</span>
          </div> */}
          {/* <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-yellow-200">
            <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
              <FaRupeeSign className="text-xl text-yellow-600" />
            </div>
            <span className="font-medium text-gray-800 text-sm">Teacher Payment</span>
          </div> */}
        {/* </div> */}

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* Admin Card Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-5 w-1 bg-blue-500 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-900">Student Fees Submit</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(user.role === 'accountent' || user.role === 'admin') &&
            <div onClick={() => navigate("/student-fee-submit")} className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-teal-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaMoneyCheckAlt className="text-lg text-teal-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">Fees Submit</span>
            </div>
            }

            {(user.role === 'accountent' || user.role === 'admin') &&
            <div onClick={() => navigate("/student-fee-history")} className="bg-gradient-to-br from-red-50 to-sky-300 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-red-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaHistory className="text-lg text-purple-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">Fees History</span>
            </div>
            }

            {(user.role === 'admin') &&
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-red-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaBell className="text-lg text-red-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">Notifications</span>
            </div>
           }
           {(user.role === 'admin') &&
             <div onClick={() => navigate("/student-attendence")} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200">
            <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
              <FaClipboardList className="text-xl text-blue-600" />
            </div>
            <span className="font-medium text-gray-800 text-sm">Attendance</span>
          </div> 
           }

           {(user.role === 'admin') &&
             <div onClick={() => navigate('/student-data-input')} className="bg-gradient-to-br from-blue-50 to-blue-400 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200">
            <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
              <FaUserGraduate className="text-xl text-blue-600" />
            </div>
            <span className="font-medium text-gray-800 text-sm">Student Data</span>
          </div> 
           }

           {(user.role === 'admin') &&
             <div onClick={() => navigate('/student-data')} className="bg-gradient-to-br from-blue-50 to-yellow-400 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200">
            <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
              <FaSearch className="text-xl text-blue-600" />
            </div>
            <span className="font-medium text-gray-800 text-sm">Search Student</span>
          </div> 
           }

           {(user.role === 'admin') &&
             <div onClick={() => navigate("/student-register")} className="bg-gradient-to-br from-blue-50 to-black-500 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200">
            <div className="p-3 rounded-lg bg-white shadow-sm mb-2">
              <FaUserTie className="text-xl text-blue-600" />
            </div>
            <span className="font-medium text-gray-800 text-sm">Student Registration</span>
          </div> 
           }

            {/* <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-orange-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <IoMdCalendar className="text-lg text-orange-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">Holidays</span>
            </div> */}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* spend form Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-5 w-1 bg-green-500 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-900">Spend Data Input</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(user.role === 'accountent' || user.role === 'admin') &&
            <div onClick={() => navigate("/total-spend")} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-blue-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaRupeeSign className="text-lg text-blue-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">Spend</span>
            </div>
            }

            {(user.role === 'accountent' || user.role === 'admin') &&
            <div onClick={() => navigate("/spend-history")} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-green-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <MdOutlineManageHistory className="text-lg text-green-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">Spend History</span>
            </div>
           }

            {/* <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-red-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaQuestionCircle className="text-lg text-red-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">Grievance</span>
            </div> */}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* Teacher Data Input Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-5 w-1 bg-purple-500 rounded-full"></div>
            <h2 className="text-lg font-bold text-gray-900">Teacher Data Input</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(user.role === 'accountent' || user.role === 'admin') &&
            <div onClick={() => navigate("/teacher-payment")} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-purple-200"> 
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <GiTeacher className="text-lg text-purple-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">Teacher Payment</span>
            </div>
             }

             {(user.role === 'accountent' || user.role === 'admin' || user.role === 'teacher') &&
            <div onClick={() => navigate("/spend-history")} className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-yellow-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <GiTeacher className="text-lg text-yellow-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">History Payment</span>
            </div>
            }

            {
            user.role === 'admin' &&
            <div onClick={() => navigate("/teacher-registration")} className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-teal-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaUserTie className="text-lg text-teal-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">Teacher Registration</span>
            </div>
             }

             {
            user.role === 'admin' &&
            <div onClick={() => navigate("/teacher-registration")} className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-teal-200">
              <div className="p-2 rounded-lg bg-white shadow-sm mb-2">
                <FaUserTie className="text-lg text-teal-600" />
              </div>
              <span className="font-medium text-gray-800 text-xs">Teacher Data</span>
            </div>
             }
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>

        {/* Bottom Row - Seating Plan & Request Center */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 flex items-center gap-4 border border-gray-200">
            <div className="p-3 rounded-lg bg-white shadow-sm">
              <MdEventNote className="text-xl text-gray-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm"></h3>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 flex items-center gap-4 border border-blue-200">
            <div className="p-3 rounded-lg bg-white shadow-sm">
              <FaUserGraduate className="text-xl text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm">Request Center</h3>
            </div>
          </div>
        </div>

        {/* Important Message - Mobile */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <FaExclamationCircle className="text-white text-xl mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white text-sm mb-1">Important Message</h4>
              <p className="text-blue-100 text-sm">{importantMessage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View - Your original code EXACTLY AS IT WAS */}
      <div className="hidden md:block min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex-col items-center p-4 w-full pt-20">
        {/* Teacher Info Box */}
        <div className="w-full mb-8">
          <div className="bg-white rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 w-full">
            <div className="flex items-center gap-4">
              { user.thumbnails ? (
                <img
                  src={user.thumbnails.url}
                  alt="Teacher Profile"
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-blue-300"
                  />
              ):
              <FaUserTie className="text-5xl text-blue-600" />
              }
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Welcome,</h2>
                <span className="text-xl md:text-2xl font-semibold text-yellow-600">{user.name}</span>
              </div>
            </div>
            <div
              className="flex-1 flex cursor-pointer justify-end"
              onClick={() => navigate("/teacher-profile")}>
              <span className="bg-blue-100 cursor-pointer text-blue-700 px-4 py-2 rounded-full font-semibold shadow">
                Teacher Profile
              </span>
            </div>
          </div>
        </div>
        {/* Main Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full">
          {/* Total Students */}
          <div
            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-default w-full"
          >
            <FaUserGraduate className="text-4xl text-teal-600" />
            <span className="text-xl font-semibold text-gray-800">Total Students</span>
            <div className="text-3xl font-bold text-indigo-600">{totalStudents == null ? '—' : totalStudents}</div>
          </div>
          {/* Student Fees Submit */}
          {(user.role === 'accountent' || user.role === 'admin') &&
            <div
              onClick={() => navigate("/student-fee-submit")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <FaMoneyCheckAlt className="text-4xl text-green-600" />
              <span className="text-xl font-semibold text-gray-800">Student Fees Submit</span>
              <button className="mt-2 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition">Submit Details</button>
            </div>
          }
          {/* Student Fees History */}
          {(user.role === 'accountent' || user.role === 'admin') &&
            <div
              onClick={() => navigate("/student-fee-history")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <FaHistory className="text-4xl text-blue-600" />
              <span className="text-xl font-semibold cursor-pointer text-gray-800">Student Fees History</span>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold cursor-pointer hover:bg-blue-600 transition">View History</button>
            </div>
          }
          {/* Teacher Attendance */}
          <div
            // onClick={() => navigate("/teacher-attendance")}
            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
          >
            <FaClipboardList className="text-4xl text-purple-600" />
            <span className="text-xl font-semibold  text-gray-800">Teacher Attendance</span>
            <button className="mt-2 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition">View Attendance</button>
          </div>


          {(user.role === 'accountent' || user.role === 'admin') &&
            <div
              onClick={() => navigate("/total-spend")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <FaRupeeSign className="text-4xl text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">Spend</span>
              <button className="mt-2 px-4 cursor-pointer py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition">Submit Spend</button>
            </div>
          }

          {(user.role === 'accountent' || user.role === 'admin') &&
            <div
              onClick={() => navigate("/spend-history")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <MdOutlineManageHistory className="text-4xl text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">Spend History</span>
              <button className="mt-2 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition">View History</button>
            </div>
          }

          {/* Teacher Payment */}
          {(user.role === 'accountent' || user.role === 'admin') &&
            <div
              onClick={() => navigate("/teacher-payment")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <GiTeacher className="text-4xl text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">Teacher Payment</span>
              <button className="mt-2 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition">Teacher Paid</button>
            </div>
          }

          {(user.role === 'accountent' || user.role === 'admin') &&
            <div
              onClick={() => navigate("/spend-history")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <GiTeacher className="text-4xl text-blue-600" />
              <span className="text-xl font-semibold text-gray-800">Teacher Paid History</span>
              <button className="mt-2 px-4 py-2 cursor-pointer bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition">Teacher Paid History</button>
            </div>
          }

          {/* Student Attendance */}
          <div
            onClick={() => navigate("/student-attendence")}
            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
          >
            <FaClipboardList className="text-4xl text-green-600" />
            <span className="text-xl font-semibold text-gray-800">Student Attendance</span>
            <button className="mt-2 px-4 py-2 cursor-pointer bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition">Take Attendance</button>
          </div>

          {/* Student Data Input - link to the form page */}
          {(
            // user.role === 'accountent' || 
            user.role === 'admin') &&
            <div
              onClick={() => navigate('/student-data-input')}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <FaUserGraduate className="text-4xl text-teal-600" />
              <span className="text-xl font-semibold text-gray-800">Student Data Input</span>
              <button className="mt-2 cursor-pointer px-4 py-2 bg-teal-500 text-white rounded-lg font-bold hover:bg-teal-600 transition">Add Student</button>
            </div>
          }

          {/* Student Data Search - added before Teacher Registration */}
          {(
            // user.role === 'accountent' || 
            user.role === 'admin') &&
            <div
              onClick={() => navigate('/student-data')}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <FaSearch className="text-4xl text-indigo-600" />
              <span className="text-xl font-semibold text-gray-800">Student Data Search</span>
              <button className="mt-2 cursor-pointer px-4 py-2 bg-indigo-500 text-white rounded-lg font-bold hover:bg-indigo-600 transition">Search Students</button>
            </div>
          }

          {/* Teacher Registration */}
          {
            user.role === 'admin' &&
            <div
              onClick={() => navigate("/teacher-registration")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <FaUserTie className="text-4xl text-orange-500" />
              <span className="text-xl font-semibold text-gray-800">Teacher Registration</span>
              <button className="mt-2 px-4 cursor-pointer py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">Register Now</button>
            </div>
          }

          {
            user.role === 'admin' &&
            <div
              onClick={() => navigate("/student-register")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full"
            >
              <FaUserTie className="text-4xl text-black-500" />
              <span className="text-xl font-semibold text-gray-800">Student Registration</span>
              <button className="mt-2 px-4 cursor-pointer py-2 bg-sky-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">Register Now</button>
            </div>
          }

          {/* Teacher Data */}
          {user.role === 'admin' &&
            <div
              onClick={() => navigate("/teacher-data")}
              className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:scale-105 transition w-full border-2 border-blue-300"
            >
              <FaUserTie className="text-4xl text-blue-700 animate-pulse" />
              <span className="text-xl font-bold text-blue-700">Teacher Data</span>
              <button className="mt-2 px-4 cursor-pointer py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-bold hover:from-blue-600 hover:to-green-600 transition">View Teacher Data</button>
            </div>
          }

        </div>

        {/* Important Message - now on next line */}
        <div className="w-full mt-8">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center gap-4 w-full">
            <FaExclamationCircle className="text-4xl text-red-600" />
            <span className="text-xl font-semibold text-gray-800">Important Message</span>
            <p className="text-gray-700 text-center mt-2">{importantMessage}</p>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherHomePage;
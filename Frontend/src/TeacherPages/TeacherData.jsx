import React from "react";
import { FaUserTie, FaEnvelope, FaIdBadge, FaPhone, FaUserCheck } from "react-icons/fa";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

const TeacherData = () => {
  const { teacherList, deleteTeacher, editTeacherProfile } = UserData();
  const [editIdx, setEditIdx] = React.useState(null);
  const [editData, setEditData] = React.useState({ name: '', email: '', mobileNo: '', role: '' });
  console.log(editData)
  const handleEdit = (idx) => {
    setEditIdx(idx);
    const { name, email, mobileNo, role } = teacherList[idx];
    setEditData({ name, email, mobileNo, role });
  };
  const handleCancel = () => {
    setEditIdx(null);
    setEditData({});
    toast.info("Edit cancelled");
  };
  const handleSave = (id) => {
    console.log(id);
    editTeacherProfile(id,editData.name, editData.email, editData.mobileNo, editData.role );
    setEditIdx(null);
    setEditData({});
  };
  const handleDelete = (id) => {
    deleteTeacher(id);
  };
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <TeacherLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-start pt-24 px-2">
      <div className="w-full bg-white shadow-2xl rounded-2xl p-1 sm:p-4 md:p-8 border-4 border-blue-300">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-green-500 to-blue-700 flex items-center justify-center gap-3 drop-shadow-lg">
            <FaUserCheck className="text-blue-500 animate-bounce" /> Teacher Data
          </h2>
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[400px] sm:min-w-[600px] divide-y divide-blue-200 rounded-xl overflow-hidden text-xs sm:text-sm md:text-base">
              <thead>
                <tr className="bg-gradient-to-r from-blue-100 via-green-100 to-blue-100">
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-blue-700 whitespace-nowrap">S.No</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-blue-700 whitespace-nowrap">Teacher ID</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-blue-700 whitespace-nowrap">Name</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-blue-700 whitespace-nowrap">Email</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-blue-700 whitespace-nowrap">Mobile No</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-blue-700 whitespace-nowrap">Role</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-bold text-blue-700 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teacherList.map((teacher, idx) => (
                  <tr key={teacher.teacherId || idx} className="hover:bg-blue-50 transition-all duration-200">
                      <td className="px-1 sm:px-2 py-2 sm:py-3 font-semibold text-gray-700 whitespace-nowrap">{idx + 1}</td>
                      <td className="px-1 sm:px-2 py-2 sm:py-3 text-blue-600 font-bold whitespace-nowrap"><FaIdBadge className="inline mr-1" />CPS00{idx + 1}</td>
                      <td className="px-1 sm:px-2 py-2 sm:py-3 text-gray-800 font-bold whitespace-nowrap"><FaUserTie className="inline mr-1" />
                        {editIdx === idx ? (
                          <input name="name" value={editData.name} onChange={handleChange} className="border rounded px-2 py-1 w-20 sm:w-24" />
                        ) : teacher.name}
                      </td>
                      <td className="px-1 sm:px-2 py-2 sm:py-3 text-green-700 whitespace-nowrap"><FaEnvelope className="inline mr-1" />
                        {editIdx === idx ? (
                          <input name="email" value={editData.email} onChange={handleChange} className="border rounded px-2 py-1 w-28 sm:w-32" />
                        ) : teacher.email}
                      </td>
                      <td className="px-1 sm:px-2 py-2 sm:py-3 text-purple-700 whitespace-nowrap"><FaPhone className="inline mr-1" />
                        {editIdx === idx ? (
                          <input name="mobileNo" value={editData.mobileNo} onChange={handleChange} className="border rounded px-2 py-1 w-20 sm:w-24" />
                        ) : teacher.mobileNo}
                      </td>
                      <td className="px-1 sm:px-2 py-2 sm:py-3 font-semibold text-yellow-700 whitespace-nowrap">
                        {editIdx === idx ? (
                          <input name="role" value={editData.role} onChange={handleChange} className="border rounded px-2 py-1 w-16 sm:w-20" />
                        ) : teacher.role}
                      </td>
                      <td className="px-1 sm:px-2 py-2 sm:py-3 flex flex-col sm:flex-row gap-2 whitespace-nowrap">
                        {editIdx === idx ? (
                          <>
                            <button onClick={()=>handleSave(teacher._id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs sm:text-sm">Save</button>
                            <button onClick={handleCancel} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-xs sm:text-sm">Cancel</button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(idx)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm">Edit</button>
                            <button onClick={() => handleDelete(teacher._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm ml-0 sm:ml-2"><MdDeleteForever/></button>
                          </>
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

export default TeacherData;

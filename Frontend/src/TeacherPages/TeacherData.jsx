import React from "react";
import {
  FaUserTie,
  FaEnvelope,
  FaIdBadge,
  FaPhone,
  FaUserCheck,
} from "react-icons/fa";
import { MdDeleteForever, MdEdit, MdSave, MdClose } from "react-icons/md";
import TeacherLayout from "../Components/TeacherLayout";
import { UserData } from "../context/User";
import { toast } from "react-toastify";

const TeacherData = () => {
  const { teacherList, deleteTeacher, editTeacherProfile } = UserData();
  const [editIdx, setEditIdx] = React.useState(null);
  const [editData, setEditData] = React.useState({
    name: "",
    email: "",
    mobileNo: "",
    role: "",
  });

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
    editTeacherProfile(id, editData.name, editData.email, editData.mobileNo, editData.role);
    setEditIdx(null);
    setEditData({});
  };
  const handleDelete = (id) => {
    deleteTeacher(id);
  };
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const inputCls =
    "border border-[#DCD2B8] rounded-lg px-2.5 py-1.5 w-full bg-white text-sm outline-none focus:ring-2 focus:ring-[#E8A33D] transition";

  return (
    <TeacherLayout>
      <div
        className="min-h-screen w-full px-3 sm:px-6 py-10 lg:py-16"
        style={{
          background: "linear-gradient(180deg, #F3EEE1 0%, #ECE4D0 100%)",
        }}
      >
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-7">
            <div className="bg-[#1F2E4A] p-3 rounded-xl shrink-0">
              <FaUserCheck className="text-[#E8A33D] w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1F2E4A] tracking-tight">
                Teacher Directory
              </h2>
              <p className="text-xs sm:text-sm text-[#8A7F65]">
                {teacherList.length} teacher{teacherList.length !== 1 ? "s" : ""} on record
              </p>
            </div>
          </div>

          {/* Empty state */}
          {teacherList.length === 0 && (
            <div className="bg-[#FFFDF8] border border-[#E4D9BE] rounded-2xl p-10 text-center text-[#8A7F65]">
              No teachers added yet.
            </div>
          )}

          {/* ===== Desktop / tablet: table ===== */}
          {teacherList.length > 0 && (
            <div className="hidden md:block bg-[#FFFDF8] rounded-2xl shadow-xl border border-[#E4D9BE] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1F2E4A]">
                      {["S.No", "Teacher ID", "Name", "Email", "Mobile No", "Role", "Actions"].map(
                        (h) => (
                          <th
                            key={h}
                            className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[#E8D9B5] whitespace-nowrap"
                          >
                            {h}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFE7D2]">
                    {teacherList.map((teacher, idx) => (
                      <tr
                        key={teacher.teacherId || idx}
                        className="hover:bg-[#FBF5E6] transition-colors"
                      >
                        <td className="px-4 py-3.5 font-medium text-[#6B5F45]">{idx + 1}</td>
                        <td className="px-4 py-3.5 font-semibold text-[#1F2E4A] whitespace-nowrap">
                          <FaIdBadge className="inline mr-1.5 text-[#E8A33D]" />
                          CPS00{idx + 1}
                        </td>
                        <td className="px-4 py-3.5 text-[#2A2A2A] font-medium">
                          {editIdx === idx ? (
                            <input name="name" value={editData.name} onChange={handleChange} className={inputCls} />
                          ) : (
                            <span className="flex items-center gap-1.5">
                              <FaUserTie className="text-[#1F2E4A]/60" /> {teacher.name}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-[#3D6E52]">
                          {editIdx === idx ? (
                            <input name="email" value={editData.email} onChange={handleChange} className={inputCls} />
                          ) : (
                            <span className="flex items-center gap-1.5">
                              <FaEnvelope className="text-[#3D6E52]/70" /> {teacher.email}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-[#5A4B8C]">
                          {editIdx === idx ? (
                            <input name="mobileNo" value={editData.mobileNo} onChange={handleChange} className={inputCls} />
                          ) : (
                            <span className="flex items-center gap-1.5">
                              <FaPhone className="text-[#5A4B8C]/70" /> {teacher.mobileNo}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          {editIdx === idx ? (
                            <input name="role" value={editData.role} onChange={handleChange} className={inputCls} />
                          ) : (
                            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F3E0B0] text-[#8A5E10]">
                              {teacher.role}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            {editIdx === idx ? (
                              <>
                                <button
                                  onClick={() => handleSave(teacher._id)}
                                  className="p-2 rounded-lg bg-[#2F6B4F] text-white hover:bg-[#265940] transition"
                                  title="Save"
                                >
                                  <MdSave />
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="p-2 rounded-lg bg-[#BDB29A] text-white hover:bg-[#a99e87] transition"
                                  title="Cancel"
                                >
                                  <MdClose />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(idx)}
                                  className="p-2 rounded-lg bg-[#1F2E4A] text-white hover:bg-[#16223a] transition"
                                  title="Edit"
                                >
                                  <MdEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete(teacher._id)}
                                  className="p-2 rounded-lg bg-[#B04A3B] text-white hover:bg-[#963d30] transition"
                                  title="Delete"
                                >
                                  <MdDeleteForever />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ===== Mobile: stacked cards ===== */}
          <div className="md:hidden space-y-4">
            {teacherList.map((teacher, idx) => (
              <div
                key={teacher.teacherId || idx}
                className="bg-[#FFFDF8] rounded-2xl shadow-md border border-[#E4D9BE] p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#1F2E4A] bg-[#F3E0B0] px-2.5 py-1 rounded-full flex items-center gap-1">
                    <FaIdBadge /> CPS00{idx + 1}
                  </span>
                  <span className="text-xs text-[#8A7F65]">#{idx + 1}</span>
                </div>

                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2">
                    <FaUserTie className="text-[#1F2E4A]/70 shrink-0" />
                    {editIdx === idx ? (
                      <input name="name" value={editData.name} onChange={handleChange} className={inputCls} />
                    ) : (
                      <span className="font-semibold text-[#1F2E4A]">{teacher.name}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-[#3D6E52]/70 shrink-0" />
                    {editIdx === idx ? (
                      <input name="email" value={editData.email} onChange={handleChange} className={inputCls} />
                    ) : (
                      <span className="text-[#3D6E52] break-all">{teacher.email}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-[#5A4B8C]/70 shrink-0" />
                    {editIdx === idx ? (
                      <input name="mobileNo" value={editData.mobileNo} onChange={handleChange} className={inputCls} />
                    ) : (
                      <span className="text-[#5A4B8C]">{teacher.mobileNo}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase text-[#8A7F65] shrink-0">Role</span>
                    {editIdx === idx ? (
                      <input name="role" value={editData.role} onChange={handleChange} className={inputCls} />
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F3E0B0] text-[#8A5E10]">
                        {teacher.role}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  {editIdx === idx ? (
                    <>
                      <button
                        onClick={() => handleSave(teacher._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#2F6B4F] text-white text-sm font-semibold hover:bg-[#265940] transition"
                      >
                        <MdSave /> Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#BDB29A] text-white text-sm font-semibold hover:bg-[#a99e87] transition"
                      >
                        <MdClose /> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(idx)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#1F2E4A] text-white text-sm font-semibold hover:bg-[#16223a] transition"
                      >
                        <MdEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(teacher._id)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#B04A3B] text-white text-sm font-semibold hover:bg-[#963d30] transition"
                      >
                        <MdDeleteForever /> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
};

export default TeacherData;
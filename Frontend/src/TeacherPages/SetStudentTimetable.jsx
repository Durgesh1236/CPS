import React, { useState } from "react";
import TeacherLayout from "../Components/TeacherLayout";

export const SetStudentTimetable = () => {
  const [form, setForm] = useState({
    day: "Monday",
    className: "",
    subject: "",
    start: "",
    end: "",
    teacher: "",
  });

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get current day automatically
  const todayIndex = new Date().getDay();
  const todayName = todayIndex === 0 ? "Sunday" : days[todayIndex - 1];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = form;
      setData(updated);
      setEditIndex(null);
    } else {
      setData([...data, form]);
    }

    setForm({
      day: "Monday",
      className: "",
      subject: "",
      start: "",
      end: "",
      teacher: "",
    });
  };

  const handleEdit = (index) => {
    setForm(data[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const filtered = data.filter((_, i) => i !== index);
    setData(filtered);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setForm({
      day: "Monday",
      className: "",
      subject: "",
      start: "",
      end: "",
      teacher: "",
    });
  };

  const classes = [...new Set(data.map((d) => d.className))];

  return (
    <TeacherLayout>
    <div className="min-h-screen bg-gray-100 p-3 mt-15 md:p-6">
      <h1 className="text-xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-blue-600">
        Student Time Table ({todayName})
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 md:p-6 rounded-2xl shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
      >
        <select name="day" value={form.day} onChange={handleChange} className="p-2 border rounded w-full">
          {days.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <input type="text" name="className" placeholder="Class" value={form.className} onChange={handleChange} className="p-2 border rounded w-full" />

        <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className="p-2 border rounded w-full" />

        <input type="time" name="start" value={form.start} onChange={handleChange} className="p-2 border rounded w-full" />

        <input type="time" name="end" value={form.end} onChange={handleChange} className="p-2 border rounded w-full" />

        <input type="text" name="teacher" placeholder="Teacher Name" value={form.teacher} onChange={handleChange} className="p-2 border rounded w-full" />

        <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-wrap gap-2">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto">
            {editIndex !== null ? "Save" : "Add"}
          </button>

          {editIndex !== null && (
            <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-auto">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE DESKTOP */}
      <div className="hidden md:block mt-8 overflow-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3">Class</th>
              {days.map((day) => (
                <th key={day} className="p-3">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls} className="border-t">
                <td className="p-3 font-bold bg-gray-100">{cls}</td>
                {days.map((day) => {
                  const item = data.find((d) => d.className === cls && d.day === day);
                  return (
                    <td key={day} className={`p-3 text-center ${day === todayName ? "bg-green-100" : ""}`}>
                      {item ? (
                        <div>
                          <p className="font-semibold">{item.subject}</p>
                          <p className="text-sm">{item.start} - {item.end}</p>
                          <p className="text-xs">{item.teacher}</p>
                        </div>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden mt-6 space-y-4">
        {data
          .filter((d) => d.day === todayName)
          .map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-bold text-lg text-blue-600">{item.className}</h2>
              <p className="font-semibold">{item.subject}</p>
              <p className="text-sm">{item.start} - {item.end}</p>
              <p className="text-xs text-gray-600">{item.teacher}</p>

              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(index)} className="bg-yellow-400 px-3 py-1 rounded text-white text-sm w-full">Edit</button>
                <button onClick={() => handleDelete(index)} className="bg-red-500 px-3 py-1 rounded text-white text-sm w-full">Delete</button>
              </div>
            </div>
          ))}
      </div>

      {/* Sunday */}
      <div className="bg-green-100 p-4 rounded-xl shadow mt-6 text-center">
        <h2 className="text-xl font-bold text-green-700">Sunday</h2>
        <p className="text-lg">Holiday 🎉</p>
      </div>
    </div>
    </TeacherLayout>
  );
}
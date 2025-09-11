import React, { useState } from 'react';
import Layout from '../Components/LayoutStu';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const attendanceData = [
  { date: '2025-08-01', status: 'Present' },
  { date: '2025-08-02', status: 'Absent' },
  { date: '2025-08-03', status: 'Present' },
  { date: '2025-08-04', status: 'Present' },
  { date: '2025-08-05', status: 'Absent' },
  { date: '2025-08-06', status: 'Present' },
  { date: '2025-08-07', status: 'Present' },
];

// Prepare data for graph
const getGraphData = (data) => {
  const days = data.map(d => d.date.slice(-2));
  const present = data.map(d => d.status === 'Present' ? 1 : 0);
  const absent = data.map(d => d.status === 'Absent' ? 1 : 0);

  return {
    labels: days,
    datasets: [
      {
        label: 'Present',
        data: present,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: 'Absent',
        data: absent,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
      },
    ],
  };
};

const StuAttendance = () => {
  const [month, setMonth] = useState('2025-08');
  const filteredData = attendanceData.filter(d => d.date.startsWith(month));

  return (
    <Layout>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col gap-6 p-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Student Attendance</h2>

        {/* Attendance Graph */}
        <div className="bg-white rounded max-w-full max-h-[450px] shadow p-6">
          <h3 className="text-lg font-bold mb-4 text-blue-600">Attendance Graph</h3>
          <Bar
            data={getGraphData(filteredData)}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                tooltip: { enabled: true },
              },
              scales: {
                y: { beginAtZero: true, max: 1, ticks: { stepSize: 1 } },
              },
            }}
          />
        </div>
        {/* Month Selector */}
        <div className="mb-4">
          <label className="text-gray-700 font-medium mr-2">Select Month:</label>
          <input
            type="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
            className="border px-2 py-1 rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        {/* Attendance Table */}
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Date</th>
                <th className="py-2 px-4 border-b text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((d, idx) => (
                <tr key={idx} className={d.status === 'Absent' ? 'bg-red-50' : ''}>
                  <td className="py-2 px-4 border-b">{d.date}</td>
                  <td className={`py-2 px-4 border-b font-semibold ${d.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                    {d.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default StuAttendance;
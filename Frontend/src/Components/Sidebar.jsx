import React, { useState } from 'react';
import { FaCalendarCheck, FaClock, FaMoneyBill, FaChartBar, FaTimes } from 'react-icons/fa';

const menuItems = [
  { label: 'Attendance', icon: <FaCalendarCheck />, path: '/attendance' },
  { label: 'School Time Table', icon: <FaClock />, path: '/timetable' },
  { label: 'Fees', icon: <FaMoneyBill />, path: '/fees' },
  { label: 'Result', icon: <FaChartBar />, path: '/result' },
];

const Sidebar = ({ sidebarOpen }) => {

  return (
    <>
    {
      sidebarOpen ? (<>
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity ${open ? 'block md:hidden' : 'hidden'}`}
        // onClick={handleClose}
      />
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 flex flex-col`}
      >
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center gap-3 px-4 py-2 rounded hover:bg-blue-100 text-gray-800 font-medium transition"
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>
      </>) : <></>}
    </>
  );
};

export default Sidebar;
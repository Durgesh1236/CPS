import React, { useState } from 'react';
import NavbarTeacher from './TeacherNavbar';
import { useNavigate } from 'react-router-dom';

const TeacherLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [activeTab, setActiveTab] = React.useState('home');
    const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarTeacher/>
      <div className="flex flex-1">
        {/* <Sidebar sidebarOpen = {sidebarOpen} /> */}
        <main className="flex-1 p-2 bg-gray-200 overflow-auto">
          {children}
        </main>
      </div>
      <div className="md:hidden">
      <div className="fixed bottom-0  left-0 right-0 h-16 bg-[#0f0a28] border-t border-white/10 flex z-50">
          {[
            { id: 'home', emoji: '🏠', label: 'Home', action: () => navigate('/teacher-home') },
            { id: 'students', emoji: '🎓', label: 'Students', action: () => navigate('/student-data') },
            { id: 'fees', emoji: '💰', label: 'Fees', action: () => navigate('/student-fee-submit') },
            { id: 'profile', emoji: '👤', label: 'Profile', action: () => navigate('/teacher-profile') },
          ].map(tab => (
            <div
              key={tab.id}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer active:opacity-60"
              onClick={() => { setActiveTab(tab.id); tab.action?.(); }}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all duration-200 ${activeTab === tab.id ? 'bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50' : ''}`}>
                {tab.emoji}
              </div>
              <span className={`text-[10px] font-extrabold transition-colors ${activeTab === tab.id ? 'text-indigo-300' : 'text-white/40'}`}>
                {tab.label}
              </span>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};

export default TeacherLayout;
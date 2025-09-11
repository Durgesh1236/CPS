import { useState } from 'react';
import NavbarTeacher from './TeacherNavbar';

const TeacherLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarTeacher/>
      <div className="flex flex-1">
        {/* <Sidebar sidebarOpen = {sidebarOpen} /> */}
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
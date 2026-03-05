import { useState } from 'react';
import NavbarStu from './NavbarStu.jsx';
import Sidebar from './Sidebar.jsx';

const LayoutStu = ({ children }) => {
    // const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarStu />
      <div className="flex flex-1">
        {/* <Sidebar sidebarOpen = {sidebarOpen} /> */}
        <main className="flex-1 p-2 bg-gray-200 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}; 

export default LayoutStu;
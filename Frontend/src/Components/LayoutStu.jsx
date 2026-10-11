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
        <main className="min-w-0 flex-1 overflow-auto bg-[#F6F3EC]">
          {children}
        </main>
      </div>
    </div>
  );
}; 

export default LayoutStu;
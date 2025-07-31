import { useState } from 'react';
import NavbarStu from './NavbarStu.jsx';
import Sidebar from './Sidebar.jsx';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarStu setSidebarOpen={setSidebarOpen} sidebarOpen = {sidebarOpen}/>
      <div className="flex flex-1">
        <Sidebar sidebarOpen = {sidebarOpen} />
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
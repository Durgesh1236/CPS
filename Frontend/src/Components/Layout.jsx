import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
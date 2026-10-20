import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <div className="flex min-h-0 flex-1 pt-16 lg:pt-20">
        <main className="min-h-0 flex-1 overflow-y-auto p-2">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
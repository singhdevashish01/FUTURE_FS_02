import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ title, children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar title={title} />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
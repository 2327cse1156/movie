import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminNavbar from "../../components/admin/adminNavbar";
import AdminSidebar from "../../components/admin/adminSidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Auto-close on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <>
      <AdminNavbar onToggleSidebar={toggleSidebar} />

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex pt-16">
        {/* Sidebar */}
        <div
          className={`fixed top-16 bottom-0 z-40 transition-transform duration-300
            ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } 
            lg:translate-x-0 w-64 border-r shadow-md`}
        >
          <AdminSidebar />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-4 w-full lg:ml-64">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;

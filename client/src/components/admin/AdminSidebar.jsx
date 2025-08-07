import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const adminNavLinks = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Add Shows",
      path: "/admin/add-shows",
      icon: PlusSquareIcon,
    },
    {
      name: "List Shows",
      path: "/admin/list-shows",
      icon: ListIcon,
    },
    {
      name: "List Bookings",
      path: "/admin/list-bookings",
      icon: ListCollapseIcon,
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="md:hidden p-4 flex justify-between items-center bg-primary/10">
        <div className="text-lg font-bold text-primary">Admin Panel</div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-primary focus:outline-none"
        >
          {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-primary/10 p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* User Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.imageUrl}
            alt="Admin"
            className="w-12 h-12 rounded-full object-cover"
          />
          <p className="text-lg font-semibold text-primary">
            {user.firstName} {user.lastName}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {adminNavLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={index}
                to={link.path}
                end
                onClick={() => setIsOpen(false)} // Close sidebar on link click
                className={({ isActive }) =>
                  `relative group flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-primary/20 text-primary font-semibold"
                      : "hover:bg-primary/10 text-primary"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
                <span
                  className={`absolute right-0 h-10 w-1.5 rounded-l ${
                    window.location.pathname === link.path ? "bg-primary" : ""
                  }`}
                ></span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </>
  );
}

export default AdminSidebar;

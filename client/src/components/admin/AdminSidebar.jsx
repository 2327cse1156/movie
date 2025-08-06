import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

function AdminSidebar() {
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
    <div className="min-h-screen w-64 bg-primary/5 shadow-lg flex flex-col gap-6 px-4 py-6">
      {/* User Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.imageUrl}
          alt="Admin"
          className="w-12 h-12 rounded-full object-cover"
        />
        <p className="text-lg font-semibold text-gray-800">
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
              className={({ isActive }) =>
                `relative group flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
                  isActive
                    ? "bg-primary/15 text-primary font-semibold"
                    : "hover:bg-primary/10 text-gray-700"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>

              {/* Active border line */}
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
  );
}

export default AdminSidebar;

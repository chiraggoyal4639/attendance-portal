// 📁 src/components/dashboard/Sidebar.jsx
import { NavLink } from "react-router-dom";

const sidebarLinks = [
  { label: "Home",     icon: "🏠", path: "/admin", exact: true },
  { label: "Users",    icon: "👥", path: "/admin/users" },
  { label: "Reports",  icon: "📋", path: "/admin/reports" },
  { label: "Settings", icon: "⚙️", path: "/admin/settings" },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg min-h-screen border-r border-gray-200">
      <div className="p-6">
        <nav className="space-y-2 text-[18px]">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.exact} // only apply 'end' to the Home route
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg font-medium transition ${
                  isActive
                    ? "text-gray-900 bg-blue-50"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Columns3
} from "lucide-react";

function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-10">LeadFlow</h1>

      <nav className="space-y-2">
        <NavLink to="/" className={linkClass}>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/leads" className={linkClass}>
          <Users size={20} />
          Leads
        </NavLink>

        <NavLink
          to="/pipeline"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Columns3 size={20} />
          <span>Pipeline</span>
        </NavLink>

        <NavLink to="/analytics" className={linkClass}>
          <BarChart3 size={20} />
          Analytics
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          <Settings size={20} />
          Settings
        </NavLink>
        
      </nav>
    </aside>
  );
}

export default Sidebar;
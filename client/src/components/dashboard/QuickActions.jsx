import { Link } from "react-router-dom";
import {
  Plus,
  Columns3,
  BarChart3,
  Settings,
} from "lucide-react";

function QuickActions() {
  const actions = [
    {
      title: "Add Lead",
      to: "/leads",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: <Plus size={22} />,
    },
    {
      title: "Pipeline",
      to: "/pipeline",
      color: "bg-green-600 hover:bg-green-700",
      icon: <Columns3 size={22} />,
    },
    {
      title: "Analytics",
      to: "/analytics",
      color: "bg-purple-600 hover:bg-purple-700",
      icon: <BarChart3 size={22} />,
    },
    {
      title: "Settings",
      to: "/settings",
      color: "bg-slate-700 hover:bg-slate-800",
      icon: <Settings size={22} />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.to}
            className={`${action.color} text-white rounded-xl p-5 transition duration-200`}
          >
            <div className="mb-3">
              {action.icon}
            </div>

            <p className="font-semibold">
              {action.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default QuickActions;
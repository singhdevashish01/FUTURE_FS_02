import { useState } from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import useLeads from "../../hooks/useLeads";

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { leads } = useLeads();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const notifications = [];

  leads.forEach((lead) => {
    if (lead.nextFollowUp) {
      const followUpDate = new Date(lead.nextFollowUp);
      followUpDate.setHours(0, 0, 0, 0);

      if (followUpDate < today) {
        notifications.push({
          type: "Overdue",
          variant: "red",
          message: `${lead.name} follow-up is overdue`,
          leadId: lead._id || lead.id,
        });
      }

      if (followUpDate.getTime() === today.getTime()) {
        notifications.push({
          type: "Today",
          variant: "yellow",
          message: `${lead.name} follow-up is due today`,
          leadId: lead._id || lead.id,
        });
      }
    }

    if (lead.priority === "High" && !lead.nextFollowUp) {
      notifications.push({
        type: "Priority",
        variant: "orange",
        message: `${lead.name} is high priority with no follow-up`,
        leadId: lead._id || lead.id,
      });
    }
  });

  const visibleNotifications = notifications.slice(0, 6);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
      >
        <Bell size={20} />

        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 rounded-2xl shadow-lg z-50 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Notifications</h3>
            <span className="text-sm text-gray-500">
              {notifications.length}
            </span>
          </div>

          {visibleNotifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications.</p>
          ) : (
            <div className="space-y-3">
              {visibleNotifications.map((item, index) => (
                <Link
                  key={`${item.leadId}-${index}`}
                  to={`/leads/${item.leadId}`}
                  onClick={() => setOpen(false)}
                  className="block border-b last:border-b-0 pb-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-gray-700">
                      {item.message}
                    </p>

                    <Badge variant={item.variant}>
                      {item.type}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {notifications.length > 6 && (
            <Link
              to="/follow-ups"
              onClick={() => setOpen(false)}
              className="block mt-4 text-blue-600 text-sm font-medium"
            >
              View all follow-ups →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
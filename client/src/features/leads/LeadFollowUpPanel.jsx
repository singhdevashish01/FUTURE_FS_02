import { CalendarClock } from "lucide-react";
import Badge from "../../components/ui/Badge";

function LeadFollowUpPanel({ lead }) {
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const getFollowUpStatus = (date) => {
    if (!date) return "Not Scheduled";

    const today = new Date();
    const followUpDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    followUpDate.setHours(0, 0, 0, 0);

    if (followUpDate < today) return "Overdue";
    if (followUpDate.getTime() === today.getTime()) return "Today";
    return "Upcoming";
  };

  const getVariant = (status) => {
    if (status === "Overdue") return "red";
    if (status === "Today") return "yellow";
    if (status === "Upcoming") return "blue";
    return "gray";
  };

  const status = getFollowUpStatus(lead.nextFollowUp);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Follow-up Action</h3>
        <CalendarClock size={20} className="text-blue-600" />
      </div>

      <div className="space-y-3 text-gray-700">
        <div className="flex items-center justify-between">
          <span>Status</span>
          <Badge variant={getVariant(status)}>{status}</Badge>
        </div>

        <p>
          <strong>Next Follow-up:</strong> {formatDate(lead.nextFollowUp)}
        </p>

        <p>
          <strong>Last Contacted:</strong> {formatDate(lead.lastContacted)}
        </p>

        <p>
          <strong>Expected Close:</strong> {formatDate(lead.expectedCloseDate)}
        </p>
      </div>
    </section>
  );
}

export default LeadFollowUpPanel;
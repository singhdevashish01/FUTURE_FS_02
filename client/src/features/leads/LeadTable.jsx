import { Link } from "react-router-dom";
import Badge from "../../components/ui/Badge";

function LeadTable({ leads, onEdit, onDelete }) {
  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const getStatusVariant = (status) => {
    if (status === "Won" || status === "Converted") return "green";
    if (status === "New") return "gray";
    if (status === "Contacted") return "blue";
    if (status === "Qualified") return "purple";
    if (status === "Proposal Sent") return "orange";
    if (status === "Negotiation") return "yellow";
    if (status === "Lost") return "red";
    return "gray";
  };

  const getPriorityVariant = (priority) => {
    if (priority === "High") return "red";
    if (priority === "Medium") return "yellow";
    if (priority === "Low") return "green";
    return "gray";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full text-left min-w-[900px]">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Priority</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Lead</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Company</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Deal Value</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Source</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Follow-up</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id || lead.id} className="border-b last:border-b-0 hover:bg-gray-50">
              <td className="p-4">
                <Badge variant={getPriorityVariant(lead.priority)}>
                  {lead.priority || "Medium"}
                </Badge>
              </td>

              <td className="p-4">
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-gray-500">{lead.email}</p>
              </td>

              <td className="p-4 text-gray-600">{lead.company || "Not added"}</td>

              <td className="p-4 font-medium">
                {formatCurrency(lead.estimatedValue)}
              </td>

              <td className="p-4">
                <Badge variant={getStatusVariant(lead.status)}>
                  {lead.status}
                </Badge>
              </td>

              <td className="p-4 text-gray-600">{lead.source || "-"}</td>

              <td className="p-4 text-gray-600">
                {formatDate(lead.nextFollowUp)}
              </td>

              <td className="p-4">
                <div className="flex gap-3">
                  <Link
                    to={`/leads/${lead._id || lead.id}`}
                    className="text-gray-600 hover:text-black font-medium"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => onEdit(lead)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(lead._id || lead.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeadTable;
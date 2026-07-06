function LeadTable({ leads, onView, onEdit, onDelete }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "bg-gray-100 text-gray-700";
      case "Contacted":
        return "bg-blue-100 text-blue-700";
      case "Qualified":
        return "bg-purple-100 text-purple-700";
      case "Proposal Sent":
        return "bg-orange-100 text-orange-700";
      case "Negotiation":
        return "bg-yellow-100 text-yellow-700";
      case "Won":
      case "Converted":
        return "bg-green-100 text-green-700";
      case "Lost":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full text-left min-w-[900px]">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">Priority</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Lead</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Company</th>
            <th className="p-4 text-sm font-semibold text-gray-600">
              Deal Value
            </th>
            <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-4 text-sm font-semibold text-gray-600">Source</th>
            <th className="p-4 text-sm font-semibold text-gray-600">
              Follow-up
            </th>
            <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id || lead.id}
              className="border-b last:border-b-0 hover:bg-gray-50"
            >
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityClass(
                    lead.priority
                  )}`}
                >
                  {lead.priority || "Medium"}
                </span>
              </td>

              <td className="p-4">
                <p className="font-medium">{lead.name}</p>
                <p className="text-sm text-gray-500">{lead.email}</p>
              </td>

              <td className="p-4 text-gray-600">
                {lead.company || "Not added"}
              </td>

              <td className="p-4 font-medium">
                {formatCurrency(lead.estimatedValue)}
              </td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                    lead.status
                  )}`}
                >
                  {lead.status}
                </span>
              </td>

              <td className="p-4 text-gray-600">{lead.source || "-"}</td>

              <td className="p-4 text-gray-600">
                {formatDate(lead.nextFollowUp)}
              </td>

              <td className="p-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onView(lead)}
                    className="text-gray-600 hover:text-black font-medium"
                  >
                    View
                  </button>

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
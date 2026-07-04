function LeadTable({
  leads,
  onView,
  onEdit,
  onDelete,
}) {
  const getStatusClass = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-700";

      case "Contacted":
        return "bg-yellow-100 text-yellow-700";

      case "Converted":
        return "bg-green-100 text-green-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 text-sm font-semibold text-gray-600">
              Name
            </th>

            <th className="p-4 text-sm font-semibold text-gray-600">
              Email
            </th>

            <th className="p-4 text-sm font-semibold text-gray-600">
              Source
            </th>

            <th className="p-4 text-sm font-semibold text-gray-600">
              Status
            </th>

            <th className="p-4 text-sm font-semibold text-gray-600">
              Created
            </th>

            <th className="p-4 text-sm font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id || lead.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-4 font-medium">
                {lead.name}
              </td>

              <td className="p-4 text-gray-600">
                {lead.email}
              </td>

              <td className="p-4 text-gray-600">
                {lead.source}
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

              <td className="p-4 text-gray-600">
                {lead.createdAt
                  ? new Date(lead.createdAt).toLocaleDateString()
                  : "-"}
              </td>

              <td className="p-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => onView(lead)}
                    className="text-gray-600 hover:text-black"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(lead)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(lead._id || lead.id)}
                    className="text-red-600 hover:text-red-800"
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
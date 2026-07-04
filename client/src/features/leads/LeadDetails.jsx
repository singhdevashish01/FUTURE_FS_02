function LeadDetails({ lead, onClose }) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Lead Details</h2>

        <div className="space-y-3 text-gray-700">
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phone || "N/A"}</p>
          <p><strong>Source:</strong> {lead.source}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Notes:</strong> {lead.notes || "No notes added."}</p>
          <p><strong>Created:</strong> {lead.createdAt}</p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
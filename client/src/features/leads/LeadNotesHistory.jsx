import { FileText } from "lucide-react";

function LeadNotesHistory({ lead }) {
  const notes = [
    {
      title: "Requirements",
      content: lead.requirements,
    },
    {
      title: "Pain Points",
      content: lead.painPoints,
    },
    {
      title: "General Notes",
      content: lead.notes,
    },
  ].filter((item) => item.content);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <FileText size={20} className="text-blue-600" />
        <h3 className="text-xl font-semibold">Notes History</h3>
      </div>

      {notes.length === 0 ? (
        <p className="text-sm text-gray-500">No notes recorded yet.</p>
      ) : (
        <div className="space-y-4">
          {notes.map((note, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-500 bg-gray-50 rounded-lg p-4"
            >
              <p className="font-semibold text-gray-900">{note.title}</p>

              <p className="text-sm text-gray-600 mt-2 whitespace-pre-line">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default LeadNotesHistory;
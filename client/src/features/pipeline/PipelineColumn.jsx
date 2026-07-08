import { useDroppable } from "@dnd-kit/core";
import PipelineCard from "./PipelineCard";

function PipelineColumn({ title, leads }) {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  const columnColors = {
    New: "border-gray-300",
    Contacted: "border-blue-400",
    Qualified: "border-purple-400",
    "Proposal Sent": "border-orange-400",
    Negotiation: "border-yellow-400",
    Won: "border-green-500",
    Lost: "border-red-400",
  };

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-50 rounded-2xl p-4 min-w-[320px] border-t-4 ${
        columnColors[title] || "border-gray-300"
      } ${isOver ? "ring-2 ring-blue-400 bg-blue-50" : ""}`}
    >
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-semibold text-gray-800">{title}</h3>

        <span className="bg-white rounded-full px-3 py-1 text-sm font-semibold shadow-sm">
          {leads.length}
        </span>
      </div>

      <div className="space-y-3 min-h-[180px]">
        {leads.length > 0 ? (
          leads.map((lead) => (
            <PipelineCard key={lead._id || lead.id} lead={lead} />
          ))
        ) : (
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm">
            No leads in this stage
          </div>
        )}
      </div>
    </div>
  );
}

export default PipelineColumn;
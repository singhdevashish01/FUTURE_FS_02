import { useDraggable } from "@dnd-kit/core";

function PipelineCard({ lead }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: lead._id || lead.id,
    });

  const priorityClasses = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white rounded-xl border border-gray-200 shadow-sm p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition ${
        isDragging ? "opacity-60 z-50" : ""
      }`}
    >
      <h4 className="font-semibold text-gray-900">{lead.name}</h4>

      <p className="text-sm text-gray-500 mt-1">
        {lead.company || "No company"}
      </p>

      <p className="text-xs text-gray-400 mt-1">
        Source: {lead.source || "Website"}
      </p>

      <div className="mt-4 flex justify-between items-center">
        <span className="font-semibold text-blue-600">
          {formatCurrency(lead.estimatedValue)}
        </span>

        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            priorityClasses[lead.priority] || "bg-gray-100 text-gray-700"
          }`}
        >
          {lead.priority || "Medium"}
        </span>
      </div>

      {lead.nextFollowUp && (
        <div className="mt-3 text-xs text-gray-500">
          📅 {new Date(lead.nextFollowUp).toLocaleDateString("en-IN")}
        </div>
      )}
    </div>
  );
}

export default PipelineCard;
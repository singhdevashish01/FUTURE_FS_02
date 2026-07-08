function LeadActivityTimeline({ lead }) {
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const activities = [
    {
      title: "Lead created",
      date: lead.createdAt,
      description: "This lead was added to the CRM.",
    },
    {
      title: `Current stage: ${lead.status || "New"}`,
      date: lead.updatedAt,
      description: "Latest pipeline stage for this lead.",
    },
    {
      title: "Last contacted",
      date: lead.lastContacted,
      description: lead.lastContacted
        ? "The lead was contacted on this date."
        : "No contact date recorded.",
    },
    {
      title: "Next follow-up scheduled",
      date: lead.nextFollowUp,
      description: lead.nextFollowUp
        ? "A follow-up has been scheduled."
        : "No follow-up scheduled yet.",
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-5">Activity Timeline</h3>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />

              {index !== activities.length - 1 && (
                <div className="w-px flex-1 bg-gray-200 mt-2" />
              )}
            </div>

            <div>
              <p className="font-medium text-gray-900">{activity.title}</p>

              <p className="text-sm text-gray-500">
                {formatDate(activity.date)}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {activity.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LeadActivityTimeline;
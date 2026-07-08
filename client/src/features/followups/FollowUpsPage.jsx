import { Link } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import Badge from "../../components/ui/Badge";
import useLeads from "../../hooks/useLeads";

function FollowUpsPage() {
  const { leads, loading, error } = useLeads();

  const leadsWithFollowUps = leads
    .filter((lead) => lead.nextFollowUp)
    .sort(
      (a, b) =>
        new Date(a.nextFollowUp).getTime() -
        new Date(b.nextFollowUp).getTime()
    );

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  const getFollowUpStatus = (date) => {
    const today = new Date();
    const followUpDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    followUpDate.setHours(0, 0, 0, 0);

    if (followUpDate < today) return "Overdue";
    if (followUpDate.getTime() === today.getTime()) return "Today";

    return "Upcoming";
  };

  const getFollowUpVariant = (status) => {
    if (status === "Overdue") return "red";
    if (status === "Today") return "yellow";
    return "blue";
  };

  const getPriorityVariant = (priority) => {
    if (priority === "High") return "red";
    if (priority === "Medium") return "yellow";
    if (priority === "Low") return "green";
    return "gray";
  };

  return (
    <Layout title="Follow-ups">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Follow-up Tracker</h3>
        <p className="text-gray-600">
          Track upcoming, due, and overdue lead follow-ups.
        </p>
      </div>

      {error && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-3 mb-5">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : leadsWithFollowUps.length === 0 ? (
        <EmptyState message="No follow-ups scheduled yet." />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Lead
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Company
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Follow-up Date
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Due Status
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Priority
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Lead Status
                </th>
                <th className="p-4 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {leadsWithFollowUps.map((lead) => {
                const followUpStatus = getFollowUpStatus(lead.nextFollowUp);

                return (
                  <tr
                    key={lead._id || lead.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <p className="font-medium">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </td>

                    <td className="p-4 text-gray-600">
                      {lead.company || "-"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {formatDate(lead.nextFollowUp)}
                    </td>

                    <td className="p-4">
                      <Badge variant={getFollowUpVariant(followUpStatus)}>
                        {followUpStatus}
                      </Badge>
                    </td>

                    <td className="p-4">
                      <Badge variant={getPriorityVariant(lead.priority)}>
                        {lead.priority || "Medium"}
                      </Badge>
                    </td>

                    <td className="p-4 text-gray-600">
                      {lead.status || "-"}
                    </td>

                    <td className="p-4">
                      <Link
                        to={`/leads/${lead._id || lead.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Lead
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}

export default FollowUpsPage;
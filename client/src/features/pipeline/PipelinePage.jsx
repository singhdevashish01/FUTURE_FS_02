import Layout from "../../components/layout/Layout";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import useLeads from "../../hooks/useLeads";
import { LEAD_STATUSES } from "../../constants/leadConstants";
import { toast } from "react-toastify";

function PipelinePage() {
  const { leads, loading, error, updateLead, loadLeads } = useLeads();

  const handleStatusChange = async (lead, status) => {
    try {
      await updateLead(lead._id || lead.id, { status });
      toast.success("Lead status updated.");
      await loadLeads();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  return (
    <Layout title="Pipeline">
      <p className="text-gray-600 mb-6">
        Track leads across the sales pipeline.
      </p>

      {error && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-3 mb-5">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : leads.length === 0 ? (
        <EmptyState message="No leads available in the pipeline." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {LEAD_STATUSES.map((status) => {
            const stageLeads = leads.filter((lead) => lead.status === status);

            return (
              <div
                key={status}
                className="bg-gray-100 rounded-2xl p-4 min-h-[300px]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">{status}</h3>
                  <span className="bg-white text-sm px-3 py-1 rounded-full">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead._id || lead.id}
                      className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                    >
                      <h4 className="font-semibold">{lead.name}</h4>

                      <p className="text-sm text-gray-500">
                        {lead.company || "No company added"}
                      </p>

                      <div className="mt-3 flex justify-between text-sm">
                        <span className="font-medium">
                          {formatCurrency(lead.estimatedValue)}
                        </span>

                        <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                          {lead.priority || "Medium"}
                        </span>
                      </div>

                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead, e.target.value)
                        }
                        className="w-full mt-4 border rounded-lg px-3 py-2 text-sm"
                      >
                        {LEAD_STATUSES.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}

export default PipelinePage;
import {
  Users,
  IndianRupee,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import Layout from "../../components/layout/Layout";
import LeadTable from "../leads/LeadTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import MetricCard from "../../components/ui/MetricCard";
import useLeads from "../../hooks/useLeads";

function Dashboard() {
  const { leads, loading, error } = useLeads();

  const totalLeads = leads.length;
  const convertedLeads = leads.filter((lead) => lead.status === "Converted").length;

  const pipelineValue = leads.reduce(
    (total, lead) => total + Number(lead.estimatedValue || 0),
    0
  );

  const conversionRate =
    totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  const highPriorityLeads = leads.filter(
    (lead) => lead.priority === "High"
  ).length;

  const recentLeads = leads.slice(0, 5);

  const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
  };

  return (
    <Layout title="Dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Good to see you, Devashish </h1>
        <p className="text-gray-600 mt-2">
          Here is your live sales and lead management overview.
        </p>
      </div>

      {error && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-3 mb-5">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Leads"
              value={totalLeads}
              subtitle="All leads in CRM"
              icon={<Users size={24} />}
              accent="blue"
            />

            <MetricCard
              title="Pipeline Value"
              value={formatCurrency(pipelineValue)}
              subtitle="Estimated deal value"
              icon={<IndianRupee size={24} />}
              accent="green"
            />

            <MetricCard
              title="Conversion Rate"
              value={`${conversionRate}%`}
              subtitle={`${convertedLeads} converted leads`}
              icon={<TrendingUp size={24} />}
              accent="yellow"
            />

            <MetricCard
              title="High Priority"
              value={highPriorityLeads}
              subtitle="Requires attention"
              icon={<AlertCircle size={24} />}
              accent="red"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Recent Leads</h3>

              {recentLeads.length === 0 ? (
                <EmptyState message="No leads available yet." />
              ) : (
                <LeadTable
                  leads={recentLeads}
                  onView={() => {}}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">Pipeline Summary</h3>

              <div className="space-y-4">
                {["New", "Contacted", "Qualified", "Proposal Sent", "Negotiation", "Converted", "Lost"].map(
                  (status) => {
                    const count = leads.filter(
                      (lead) => lead.status === status
                    ).length;

                    return (
                      <div
                        key={status}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-blue-600" />
                          <span className="text-gray-700">{status}</span>
                        </div>

                        <span className="font-semibold">{count}</span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Dashboard;
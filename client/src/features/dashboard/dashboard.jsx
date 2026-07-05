import Layout from "../../components/layout/Layout";
import StatCard from "./StatCard";
import LeadTable from "../leads/LeadTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import useLeads from "../../hooks/useLeads";

function Dashboard() {
  const { leads, loading, error } = useLeads();

  const stats = {
    total: leads.length,
    newLeads: leads.filter((lead) => lead.status === "New").length,
    contacted: leads.filter((lead) => lead.status === "Contacted").length,
    converted: leads.filter((lead) => lead.status === "Converted").length,
  };

  const recentLeads = leads.slice(0, 3);

  return (
    <Layout title="Dashboard">
      <p className="text-gray-600 mb-6">
        Welcome to LeadFlow CRM. Track, manage, and convert client leads
        efficiently.
      </p>

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
            <StatCard title="Total Leads" value={stats.total} color="bg-blue-600" />
            <StatCard title="New Leads" value={stats.newLeads} color="bg-indigo-600" />
            <StatCard title="Contacted" value={stats.contacted} color="bg-yellow-500" />
            <StatCard title="Converted" value={stats.converted} color="bg-green-600" />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>

            <div className="flex flex-wrap gap-4">
              <a
                href="/leads"
                className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                + Add Lead
              </a>

              <a
                href="/analytics"
                className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
              >
                View Analytics
              </a>

              <a
                href="/leads"
                className="bg-slate-800 text-white px-5 py-3 rounded-xl hover:bg-slate-900 transition"
              >
                Manage Leads
              </a>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Recent Leads</h3>
            <p className="text-gray-600">
              Latest client inquiries added to the CRM.
            </p>
          </div>

          {recentLeads.length === 0 ? (
            <EmptyState message="No recent leads available yet." />
          ) : (
            <LeadTable
              leads={recentLeads}
              onView={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          )}
        </>
      )}
    </Layout>
  );
}

export default Dashboard;
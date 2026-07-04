import Layout from "../../components/layout/Layout";
import StatCard from "./StatCard";
import LeadTable from "../leads/LeadTable";
import {
  getLeadStatistics,
  getRecentLeads,
} from "../../services/leadService";
import { Link } from "react-router-dom";

function Dashboard() {
  const stats = getLeadStatistics();
  const recentLeads = getRecentLeads(3);

  return (
    <Layout title="Dashboard">
      {/* Welcome Message */}
      <p className="text-gray-600 mb-6">
        Welcome to LeadFlow CRM. Track, manage, and convert client leads efficiently.
      </p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Leads"
          value={stats.total}
          color="bg-blue-600"
        />

        <StatCard
          title="New Leads"
          value={stats.newLeads}
          color="bg-indigo-600"
        />

        <StatCard
          title="Contacted"
          value={stats.contacted}
          color="bg-yellow-500"
        />

        <StatCard
          title="Converted"
          value={stats.converted}
          color="bg-green-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/leads"
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          + Add Lead
        </Link>

        <Link
          to="/analytics"
          className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
        >
          View Analytics
        </Link>

        <Link
          to="/leads"
          className="bg-slate-800 text-white px-5 py-3 rounded-xl hover:bg-slate-900 transition"
        >
          Manage Leads
        </Link>
      </div>

      {/* Recent Leads */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Recent Leads
        </h3>

        <p className="text-gray-600">
          Latest client inquiries added to the CRM.
        </p>
      </div>

      <LeadTable
        leads={recentLeads}
        onView={() => { }}
        onEdit={() => { }}
        onDelete={() => { }}
      />
    </Layout>
  );
}

export default Dashboard;
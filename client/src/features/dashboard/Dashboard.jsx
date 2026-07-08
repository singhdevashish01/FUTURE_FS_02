import {
  Users,
  IndianRupee,
  TrendingUp,
  AlertCircle,
  CalendarClock,
} from "lucide-react";

import { Link } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import LeadTable from "../leads/LeadTable";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import MetricCard from "../../components/ui/MetricCard";
import Badge from "../../components/ui/Badge";
import useLeads from "../../hooks/useLeads";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  const { leads, loading, error } = useLeads();

  const totalLeads = leads.length;

  const wonLeads = leads.filter(
    (lead) => lead.status === "Won" || lead.status === "Converted"
  ).length;

  const pipelineValue = leads.reduce(
    (total, lead) => total + Number(lead.estimatedValue || 0),
    0
  );

  const conversionRate =
    totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  const highPriorityLeads = leads.filter(
    (lead) => lead.priority === "High"
  ).length;

  const recentLeads = leads.slice(0, 5);

  const upcomingFollowUps = leads
    .filter((lead) => lead.nextFollowUp)
    .sort(
      (a, b) =>
        new Date(a.nextFollowUp).getTime() -
        new Date(b.nextFollowUp).getTime()
    )
    .slice(0, 5);

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

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

  return (
    <Layout title="Dashboard">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Good to see you, Devashish</h1>
        <p className="text-gray-600 mt-2">
          Here is your live sales, pipeline, and follow-up overview.
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
              subtitle={`${wonLeads} won leads`}
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
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
              )}
            </div>

            <div className="space-y-6">
              <QuickActions />

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Upcoming Follow-ups</h3>
                  <CalendarClock size={20} className="text-blue-600" />
                </div>

                {upcomingFollowUps.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No follow-ups scheduled.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {upcomingFollowUps.map((lead) => {
                      const status = getFollowUpStatus(lead.nextFollowUp);

                      return (
                        <div
                          key={lead._id || lead.id}
                          className="flex items-start justify-between gap-4 border-b last:border-b-0 pb-3"
                        >
                          <div>
                            <Link
                              to={`/leads/${lead._id || lead.id}`}
                              className="font-medium text-gray-900 hover:text-blue-600"
                            >
                              {lead.name}
                            </Link>

                            <p className="text-sm text-gray-500">
                              {lead.company || "No company"}
                            </p>

                            <p className="text-sm text-gray-500">
                              {formatDate(lead.nextFollowUp)}
                            </p>
                          </div>

                          <Badge variant={getFollowUpVariant(status)}>
                            {status}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                )}

                <Link
                  to="/follow-ups"
                  className="inline-block mt-5 text-blue-600 font-medium hover:text-blue-800"
                >
                  View all follow-ups →
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Pipeline Summary</h3>

                <div className="space-y-4">
                  {[
                    "New",
                    "Contacted",
                    "Qualified",
                    "Proposal Sent",
                    "Negotiation",
                    "Won",
                    "Lost",
                  ].map((status) => {
                    const count = leads.filter(
                      (lead) => lead.status === status
                    ).length;

                    return (
                      <div
                        key={status}
                        className="flex items-center justify-between"
                      >
                        <span className="text-gray-700">{status}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default Dashboard;
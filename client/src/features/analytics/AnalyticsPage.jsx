import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import Layout from "../../components/layout/Layout";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import MetricCard from "../../components/ui/MetricCard";
import useLeads from "../../hooks/useLeads";
import { LEAD_STATUSES } from "../../constants/leadConstants";
import { IndianRupee, TrendingUp, AlertCircle, Users } from "lucide-react";

function AnalyticsPage() {
  const { leads, loading, error } = useLeads();

  const totalLeads = leads.length;

  const wonLeads = leads.filter(
    (lead) => lead.status === "Won" || lead.status === "Converted"
  ).length;

  const pipelineValue = leads.reduce(
    (total, lead) => total + Number(lead.estimatedValue || 0),
    0
  );

  const averageDealValue =
    totalLeads > 0 ? Math.round(pipelineValue / totalLeads) : 0;

  const highPriorityLeads = leads.filter(
    (lead) => lead.priority === "High"
  ).length;

  const conversionRate =
    totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const statusData = LEAD_STATUSES.map((status) => ({
    name: status,
    value: leads.filter((lead) => lead.status === status).length,
  }));

  const sourceMap = leads.reduce((acc, lead) => {
    const source = lead.source || "Other";
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  const sourceData = Object.entries(sourceMap).map(([source, count]) => ({
    source,
    count,
  }));

  const priorityData = ["High", "Medium", "Low"].map((priority) => ({
    name: priority,
    value: leads.filter((lead) => lead.priority === priority).length,
  }));

  const pipelineValueData = LEAD_STATUSES.map((status) => ({
    status,
    value: leads
      .filter((lead) => lead.status === status)
      .reduce((total, lead) => total + Number(lead.estimatedValue || 0), 0),
  }));

  const chartColors = [
    "#2563eb",
    "#eab308",
    "#16a34a",
    "#9333ea",
    "#f97316",
    "#dc2626",
    "#64748b",
  ];

  return (
    <Layout title="Analytics">
      <p className="text-gray-600 mb-6">
        Review pipeline value, conversion performance, lead sources, and
        priority distribution.
      </p>

      {error && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-3 mb-5">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : leads.length === 0 ? (
        <EmptyState message="No lead data available for analytics yet." />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Pipeline Value"
              value={formatCurrency(pipelineValue)}
              subtitle="Estimated total value"
              icon={<IndianRupee size={24} />}
              accent="green"
            />

            <MetricCard
              title="Average Deal"
              value={formatCurrency(averageDealValue)}
              subtitle="Average value per lead"
              icon={<TrendingUp size={24} />}
              accent="blue"
            />

            <MetricCard
              title="Conversion Rate"
              value={`${conversionRate}%`}
              subtitle={`${wonLeads} won leads`}
              icon={<Users size={24} />}
              accent="yellow"
            />

            <MetricCard
              title="High Priority"
              value={highPriorityLeads}
              subtitle="Needs attention"
              icon={<AlertCircle size={24} />}
              accent="red"
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">
                Lead Status Distribution
              </h3>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                      label
                    >
                      {statusData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">Lead Sources</h3>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sourceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">
                Priority Distribution
              </h3>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={priorityData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                      label
                    >
                      {priorityData.map((entry, index) => (
                        <Cell
                          key={entry.name}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">
                Pipeline Value by Stage
              </h3>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pipelineValueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Bar dataKey="value" fill="#16a34a" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default AnalyticsPage;
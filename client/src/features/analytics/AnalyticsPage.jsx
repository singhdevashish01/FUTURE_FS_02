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
import useLeads from "../../hooks/useLeads";

function AnalyticsPage() {
  const { leads, loading, error } = useLeads();

  const totalLeads = leads.length;

  const convertedLeads = leads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const conversionRate =
    totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  const statusData = ["New", "Contacted", "Converted"].map((status) => ({
    name: status,
    value: leads.filter((lead) => lead.status === status).length,
  }));

  const sourceMap = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {});

  const sourceData = Object.entries(sourceMap).map(([source, count]) => ({
    source,
    count,
  }));

  const chartColors = ["#2563eb", "#eab308", "#16a34a"];

  return (
    <Layout title="Analytics">
      <p className="text-gray-600 mb-6">
        Review live lead performance, conversion rate, and lead sources.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <h3 className="text-4xl font-bold mt-2">{conversionRate}%</h3>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <p className="text-sm text-gray-500">Converted Leads</p>
              <h3 className="text-4xl font-bold mt-2">
                {convertedLeads}/{totalLeads}
              </h3>
            </div>
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
          </div>
        </>
      )}
    </Layout>
  );
}

export default AnalyticsPage;
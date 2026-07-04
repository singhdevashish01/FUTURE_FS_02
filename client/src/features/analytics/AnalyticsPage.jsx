import Layout from "../../components/layout/Layout";
import {
  getLeadStatistics,
  getLeadSources,
} from "../../services/leadService";

function AnalyticsPage() {
  const stats = getLeadStatistics();
  const sources = getLeadSources();

  const conversionRate =
    stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0;

  return (
    <Layout title="Analytics">
      <p className="text-gray-600 mb-6">
        Review lead performance, conversion rate, and lead sources.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <h3 className="text-4xl font-bold mt-2">{conversionRate}%</h3>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm text-gray-500">Converted Leads</p>
          <h3 className="text-4xl font-bold mt-2">
            {stats.converted}/{stats.total}
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4">Lead Sources</h3>

        <div className="space-y-3">
          {Object.entries(sources).map(([source, count]) => (
            <div
              key={source}
              className="flex items-center justify-between border-b last:border-b-0 pb-3"
            >
              <span className="text-gray-700">{source}</span>
              <span className="font-semibold">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default AnalyticsPage;
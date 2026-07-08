import { Link, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import useLeads from "../../hooks/useLeads";

import LeadActivityTimeline from "./LeadActivityTimeline";
import LeadFollowUpPanel from "./LeadFollowUpPanel";
import LeadNotesHistory from "./LeadNotesHistory";  

function LeadDetailsPage() {
  const { id } = useParams();
  const { leads, loading, error } = useLeads();

  const lead = leads.find(
    (item) => String(item._id || item.id) === String(id)
  );

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  if (loading) {
    return (
      <Layout title="Lead Details">
        <LoadingSpinner />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Lead Details">
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-3">
          {error}
        </div>
      </Layout>
    );
  }

  if (!lead) {
    return (
      <Layout title="Lead Details">
        <EmptyState message="Lead not found." />
      </Layout>
    );
  }

  return (
    <Layout title="Lead Details">
      <Link
        to="/leads"
        className="text-blue-600 font-medium"
      >
        ← Back to Leads
      </Link>

      {/* Lead Header */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">
              {lead.name}
            </h2>

            <p className="text-gray-600 mt-1">
              {lead.company || "No company added"}
            </p>
          </div>

          <div className="flex gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
              {lead.status}
            </span>

            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-medium">
              {lead.priority || "Medium"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">

          {/* Contact Information */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>Email:</strong> {lead.email}
              </p>

              <p>
                <strong>Phone:</strong> {lead.phone}
              </p>

              <p>
                <strong>Job Title:</strong> {lead.jobTitle || "-"}
              </p>

              <p>
                <strong>Location:</strong> {lead.location || "-"}
              </p>
            </div>
          </section>

          {/* Company Information */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <p>
                <strong>Company:</strong> {lead.company || "-"}
              </p>

              <p>
                <strong>Website:</strong> {lead.website || "-"}
              </p>

              <p>
                <strong>Industry:</strong> {lead.industry || "-"}
              </p>

              <p>
                <strong>Source:</strong> {lead.source || "-"}
              </p>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">
              Notes & Requirements
            </h3>

            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Requirements:</strong>{" "}
                {lead.requirements || "-"}
              </p>

              <p>
                <strong>Pain Points:</strong>{" "}
                {lead.painPoints || "-"}
              </p>

              <p>
                <strong>Notes:</strong>{" "}
                {lead.notes || "-"}
              </p>
            </div>
          </section>

          {/* Activity Timeline */}
          <LeadActivityTimeline lead={lead} />
          <LeadNotesHistory lead={lead} />

        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Follow-up Panel */}
          <LeadFollowUpPanel lead={lead} />

          {/* Sales Overview */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">
              Sales Overview
            </h3>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Deal Value:</strong>{" "}
                {formatCurrency(lead.estimatedValue)}
              </p>

              <p>
                <strong>Probability:</strong>{" "}
                {lead.probability || 0}%
              </p>

              <p>
                <strong>Assigned To:</strong>{" "}
                {lead.assignedTo || "Admin"}
              </p>

              <p>
                <strong>Created By:</strong>{" "}
                {lead.createdBy || "Admin"}
              </p>
            </div>
          </section>

          {/* Timeline */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">
              Timeline
            </h3>

            <div className="space-y-3 text-gray-700">
              <p>
                <strong>Created:</strong>{" "}
                {formatDate(lead.createdAt)}
              </p>

              <p>
                <strong>Last Contacted:</strong>{" "}
                {formatDate(lead.lastContacted)}
              </p>

              <p>
                <strong>Next Follow-up:</strong>{" "}
                {formatDate(lead.nextFollowUp)}
              </p>

              <p>
                <strong>Expected Close:</strong>{" "}
                {formatDate(lead.expectedCloseDate)}
              </p>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
}

export default LeadDetailsPage;
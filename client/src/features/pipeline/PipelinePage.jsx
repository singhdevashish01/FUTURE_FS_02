import { toast } from "react-toastify";
import { Users, IndianRupee, Trophy, AlertCircle } from "lucide-react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import Layout from "../../components/layout/Layout";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import MetricCard from "../../components/ui/MetricCard";
import useLeads from "../../hooks/useLeads";
import { LEAD_STATUSES } from "../../constants/leadConstants";
import PipelineColumn from "./PipelineColumn";

function PipelinePage() {
  const { leads, loading, error, updateLead, loadLeads } = useLeads();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const totalLeads = leads.length;

  const pipelineValue = leads.reduce(
    (total, lead) => total + Number(lead.estimatedValue || 0),
    0
  );

  const wonDeals = leads.filter(
    (lead) => lead.status === "Won" || lead.status === "Converted"
  ).length;

  const highPriorityLeads = leads.filter(
    (lead) => lead.priority === "High"
  ).length;

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const lead = leads.find(
      (item) => String(item._id || item.id) === String(active.id)
    );

    if (!lead) return;

    if (lead.status === over.id) return;

    try {
      await updateLead(lead._id || lead.id, {
        status: over.id,
      });

      toast.success(`Lead moved to "${over.id}".`);

      await loadLeads();
    } catch (error) {
      console.error(error);
      toast.error("Failed to move lead.");
    }
  };

  return (
    <Layout title="Pipeline">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Sales Pipeline</h3>
        <p className="text-gray-600">
          Track leads across each stage of your sales process.
        </p>
      </div>

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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Leads"
              value={totalLeads}
              subtitle="Across all stages"
              icon={<Users size={24} />}
              accent="blue"
            />

            <MetricCard
              title="Pipeline Value"
              value={formatCurrency(pipelineValue)}
              subtitle="Estimated total value"
              icon={<IndianRupee size={24} />}
              accent="green"
            />

            <MetricCard
              title="Won Deals"
              value={wonDeals}
              subtitle="Successfully closed"
              icon={<Trophy size={24} />}
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

          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-5 min-w-max">
                {LEAD_STATUSES.map((status) => {
                  const stageLeads = leads.filter(
                    (lead) => lead.status === status
                  );

                  return (
                    <PipelineColumn
                      key={status}
                      title={status}
                      leads={stageLeads}
                    />
                  );
                })}
              </div>
            </div>
          </DndContext>
        </>
      )}
    </Layout>
  );
}

export default PipelinePage;
import { useState } from "react";
import { toast } from "react-toastify";

import Layout from "../../components/layout/Layout";
import SearchBar from "./SearchBar";
import LeadTable from "./LeadTable";
import LeadForm from "./LeadForm/LeadForm";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";

import useLeads from "../../hooks/useLeads";
import { defaultLeadValues } from "./LeadForm/defaultLeadValues";
import ConfirmDialog from "../../components/ui/ConfirmDialog";

function LeadsPage() {
  const {
    leads,
    loading,
    error,
    loadLeads,
    createLead,
    updateLead,
    deleteLead,
  } = useLeads();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const [formData, setFormData] = useState(defaultLeadValues);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  const resetForm = () => {
    setFormData(defaultLeadValues);
    setEditingLead(null);
  };

  const filteredLeads = leads.filter((lead) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      lead.name?.toLowerCase().includes(search) ||
      lead.email?.toLowerCase().includes(search) ||
      lead.phone?.toLowerCase().includes(search) ||
      lead.company?.toLowerCase().includes(search) ||
      lead.source?.toLowerCase().includes(search) ||
      lead.status?.toLowerCase().includes(search) ||
      lead.notes?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const normalizeLeadPayload = (data) => ({
    ...data,
    estimatedValue: Number(data.estimatedValue || 0),
    probability: Number(data.probability || 0),
    tags:
      typeof data.tags === "string"
        ? data.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
        : data.tags || [],
  });

  const handleSaveLead = async (e) => {
    e.preventDefault();

    try {
      const payload = normalizeLeadPayload(formData);

      if (editingLead) {
        await updateLead(editingLead._id || editingLead.id, payload);
        toast.success("Lead updated successfully.");
      } else {
        await createLead(payload);
        toast.success("Lead created successfully.");
      }

      await loadLeads();

      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save lead.");
    }
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);

    setFormData({
      ...defaultLeadValues,
      ...lead,
      tags: Array.isArray(lead.tags) ? lead.tags.join(", ") : lead.tags || "",
      nextFollowUp: lead.nextFollowUp
        ? lead.nextFollowUp.split("T")[0]
        : "",
      expectedCloseDate: lead.expectedCloseDate
        ? lead.expectedCloseDate.split("T")[0]
        : "",
      lastContacted: lead.lastContacted
        ? lead.lastContacted.split("T")[0]
        : "",
    });

    setShowForm(true);
  };

  const handleDeleteLead = (id) => {
    setLeadToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDeleteLead = async () => {
    try {
      await deleteLead(leadToDelete);

      await loadLeads();

      toast.success("Lead deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete lead.");
    } finally {
      setLeadToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  return (
    <Layout title="Leads">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Client Leads</h3>

        <p className="text-gray-600">
          Manage incoming client inquiries and follow-up status.
        </p>
      </div>

      {error && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-lg p-3 mb-5">
          {error}
        </div>
      )}

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onAddLead={handleOpenAddForm}
      />

      {loading ? (
        <LoadingSpinner />
      ) : filteredLeads.length === 0 ? (
        <EmptyState message="No leads match your current search or filter." />
      ) : (
        <LeadTable
          leads={filteredLeads}
          onEdit={handleEditLead}
          onDelete={handleDeleteLead}
        />
      )}

      {showForm && (
        <LeadForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSaveLead}
          onCancel={handleCloseForm}
          title={editingLead ? "Edit Lead" : "Add New Lead"}
          submitText={editingLead ? "Update Lead" : "Save Lead"}
        />
      )}

      {showDeleteDialog && (
        <ConfirmDialog
          title="Delete Lead"
          message="Are you sure you want to delete this lead? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={confirmDeleteLead}
          onCancel={() => {
            setShowDeleteDialog(false);
            setLeadToDelete(null);
          }}
        />
      )}
    </Layout>
  );
}

export default LeadsPage;
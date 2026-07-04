import { useState } from "react";
import Layout from "../../components/layout/Layout";
import SearchBar from "./SearchBar";
import LeadTable from "./LeadTable";
import LeadForm from "./LeadForm";
import LeadDetails from "./LeadDetails";

import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";

import useLeads from "../../hooks/useLeads";

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
  const [selectedLead, setSelectedLead] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    status: "New",
    notes: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      source: "",
      status: "New",
      notes: "",
    });

    setEditingLead(null);
  };

  const filteredLeads = leads.filter((lead) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      lead.name.toLowerCase().includes(search) ||
      lead.email.toLowerCase().includes(search) ||
      lead.source.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleSaveLead = async (e) => {
    e.preventDefault();

    try {
      if (editingLead) {
        await updateLead(editingLead._id || editingLead.id, formData);
      } else {
        await createLead(formData);
      }

      await loadLeads();

      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save lead.");
    }
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);

    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: lead.source,
      status: lead.status,
      notes: lead.notes,
    });

    setShowForm(true);
  };

  const handleDeleteLead = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLead(id);
      await loadLeads();
    } catch (err) {
      console.error(err);
      alert("Failed to delete lead.");
    }
  };

  const handleCloseForm = () => {
    resetForm();
    setShowForm(false);
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
          onView={setSelectedLead}
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

      {selectedLead && (
        <LeadDetails
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </Layout>
  );
}

export default LeadsPage;
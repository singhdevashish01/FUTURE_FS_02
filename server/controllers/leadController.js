const Lead = require("../models/Lead");

// GET /api/leads
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    console.error("GET LEADS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch leads",
      error: error.message,
    });
  }
};

// POST /api/leads
const createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    console.error("CREATE LEAD ERROR:", error);
    res.status(500).json({
      message: "Failed to create lead",
      error: error.message,
    });
  }
};

// PUT /api/leads/:id
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(lead);
  } catch (error) {
    console.error("UPDATE LEAD ERROR:", error);
    res.status(500).json({
      message: "Failed to update lead",
      error: error.message,
    });
  }
};

// DELETE /api/leads/:id
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("DELETE LEAD ERROR:", error);
    res.status(500).json({
      message: "Failed to delete lead",
      error: error.message,
    });
  }
};

module.exports = {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
};
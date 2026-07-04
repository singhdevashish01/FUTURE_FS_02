const mongoose = require("mongoose");
const Lead = require("../models/Lead");

let demoLeads = [
  {
    id: 1,
    name: "Amit Sharma",
    email: "amit@example.com",
    phone: "9876543210",
    source: "Portfolio Contact Form",
    status: "New",
    notes: "Interested in website development.",
    createdAt: "2026-07-03",
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya@example.com",
    phone: "9123456780",
    source: "LinkedIn",
    status: "Contacted",
    notes: "Asked for a business website quotation.",
    createdAt: "2026-07-02",
  },
];

const isMongoConnected = () => mongoose.connection.readyState === 1;

const getLeads = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      return res.status(200).json(demoLeads);
    }

    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leads" });
  }
};

const createLead = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      const newLead = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date().toISOString().split("T")[0],
      };

      demoLeads.unshift(newLead);
      return res.status(201).json(newLead);
    }

    const lead = await Lead.create(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: "Failed to create lead" });
  }
};

const updateLead = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      demoLeads = demoLeads.map((lead) =>
        String(lead.id) === String(req.params.id)
          ? { ...lead, ...req.body }
          : lead
      );

      return res.status(200).json({ message: "Lead updated successfully" });
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: "Failed to update lead" });
  }
};

const deleteLead = async (req, res) => {
  try {
    if (!isMongoConnected()) {
      demoLeads = demoLeads.filter(
        (lead) => String(lead.id) !== String(req.params.id)
      );

      return res.status(200).json({ message: "Lead deleted successfully" });
    }

    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete lead" });
  }
};

module.exports = {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
};
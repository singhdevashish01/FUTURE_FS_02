const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    industry: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    source: {
      type: String,
      enum: ["Website", "LinkedIn", "Referral", "Email", "Cold Call", "Other"],
      default: "Website",
    },

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Qualified",
        "Proposal Sent",
        "Negotiation",
        "Won",
        "Lost",
      ],
      default: "New",
    },

    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },

    estimatedValue: {
      type: Number,
      default: 0,
    },

    probability: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    assignedTo: {
      type: String,
      default: "Admin",
    },

    nextFollowUp: {
      type: Date,
    },

    expectedCloseDate: {
      type: Date,
    },

    lastContacted: {
      type: Date,
    },

    requirements: {
      type: String,
      default: "",
    },

    painPoints: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    createdBy: {
      type: String,
      default: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);
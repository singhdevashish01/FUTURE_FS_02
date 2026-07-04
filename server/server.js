const express = require("express");
const cors = require("cors");
require("dotenv").config();

// MongoDB Connection
// const connectDB = require("./config/db");
// connectDB();

// Routes
const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("LeadFlow CRM Backend is running");
});

// API Routes
app.use("/api/leads", leadRoutes);
app.use("/api/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
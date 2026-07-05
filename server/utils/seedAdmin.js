const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: "admin@leadflowcrm.com",
    });

    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit();
    }

    await User.create({
      name: "Admin User",
      email: "admin@leadflowcrm.com",
      password: "LeadFlowAdmin2026Secure",
      role: "admin",
    });

    console.log("Admin user created successfully");
    process.exit();
  } catch (error) {
    console.error(`Admin seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
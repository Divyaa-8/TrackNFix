import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Complaint from "../models/Complaint.js";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  await connectDB();
  await Promise.all([User.deleteMany(), Complaint.deleteMany()]);

  const admin = await User.create({
    name: "Admin Manager",
    email: "admin@example.com",
    password: "admin123",
    role: "admin"
  });

  const user = await User.create({
    name: "Riya Sharma",
    email: "user@example.com",
    password: "user123",
    role: "user"
  });

  await Complaint.insertMany([
    {
      userId: user._id,
      title: "Water leakage near main gate",
      description: "There is continuous water leakage near the main gate causing slippery flooring.",
      category: "Maintenance",
      priority: "High",
      status: "In Progress",
      history: [
        { status: "Pending", note: "Complaint submitted", updatedBy: user._id },
        { status: "In Progress", note: "Maintenance team assigned", updatedBy: admin._id }
      ]
    },
    {
      userId: user._id,
      title: "Street light not working",
      description: "The street light beside block C has not been working for three days.",
      category: "Electrical",
      priority: "Medium",
      status: "Pending",
      history: [{ status: "Pending", note: "Complaint submitted", updatedBy: user._id }]
    },
    {
      userId: user._id,
      title: "Garbage collection delayed",
      description: "Garbage collection has been missed twice this week in our lane.",
      category: "Sanitation",
      priority: "Low",
      status: "Resolved",
      history: [
        { status: "Pending", note: "Complaint submitted", updatedBy: user._id },
        { status: "Resolved", note: "Collection completed", updatedBy: admin._id }
      ]
    }
  ]);

  console.log("Sample data seeded");
  await mongoose.connection.close();
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

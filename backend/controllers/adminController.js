import Complaint from "../models/Complaint.js";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getDashboard = asyncHandler(async (_req, res) => {
  const [totalComplaints, totalUsers, byStatus, byCategory, monthly] = await Promise.all([
    Complaint.countDocuments(),
    User.countDocuments({ role: "user" }),
    Complaint.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Complaint.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    Complaint.aggregate([
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ])
  ]);

  const statusMap = byStatus.reduce((acc, item) => ({ ...acc, [item._id]: item.count }), {});

  res.json({
    totalComplaints,
    totalUsers,
    resolvedComplaints: statusMap.Resolved || 0,
    pendingComplaints: statusMap.Pending || 0,
    inProgressComplaints: statusMap["In Progress"] || 0,
    rejectedComplaints: statusMap.Rejected || 0,
    byStatus,
    byCategory,
    monthly: monthly.map((item) => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
      count: item.count
    }))
  });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { status, priority, note } = req.body;
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  if (status) {
    complaint.status = status;
    complaint.history.push({ status, note: note || `Status changed to ${status}`, updatedBy: req.user._id });
  }
  if (priority) complaint.priority = priority;

  const updated = await complaint.save();
  res.json(updated);
});

export const getUsers = asyncHandler(async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
});

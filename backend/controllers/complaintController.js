import { validationResult } from "express-validator";
import Complaint from "../models/Complaint.js";
import asyncHandler from "../utils/asyncHandler.js";

const buildComplaintQuery = (req) => {
  const { search, status, priority, category, from, to } = req.query;
  const query = {};

  if (req.user.role !== "admin") query.userId = req.user._id;
  if (status) query.status = status;
  if (priority) query.priority = priority;
  if (category) query.category = new RegExp(category, "i");
  if (search) query.$or = [{ title: new RegExp(search, "i") }, { category: new RegExp(search, "i") }];
  if (from || to) {
    query.createdAt = {};
    if (from) query.createdAt.$gte = new Date(from);
    if (to) query.createdAt.$lte = new Date(to);
  }

  return query;
};

export const createComplaint = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ message: "Validation failed", errors: errors.array() });

  const image = req.file ? `/uploads/${req.file.filename}` : undefined;
  const complaint = await Complaint.create({
    ...req.body,
    userId: req.user._id,
    image,
    history: [{ status: "Pending", note: "Complaint submitted", updatedBy: req.user._id }]
  });

  res.status(201).json(complaint);
});

export const getComplaints = asyncHandler(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 8, 1), 50);
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order === "asc" ? 1 : -1;
  const query = buildComplaintQuery(req);

  const [complaints, total] = await Promise.all([
    Complaint.find(query)
      .populate("userId", "name email role")
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit),
    Complaint.countDocuments(query)
  ]);

  res.json({ complaints, total, page, pages: Math.ceil(total / limit) || 1 });
});

export const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id)
    .populate("userId", "name email role")
    .populate("history.updatedBy", "name role");

  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  if (req.user.role !== "admin" && complaint.userId._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You cannot access this complaint");
  }

  res.json(complaint);
});

export const updateComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  const isOwner = complaint.userId.toString() === req.user._id.toString();
  if (req.user.role !== "admin" && (!isOwner || complaint.status !== "Pending")) {
    res.status(403);
    throw new Error("Only pending complaints created by you can be edited");
  }

  const allowedFields = req.user.role === "admin"
    ? ["title", "description", "category", "priority", "status"]
    : ["title", "description", "category", "priority"];

  const previousStatus = complaint.status;
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) complaint[field] = req.body[field];
  });

  if (req.file) complaint.image = `/uploads/${req.file.filename}`;
  if (req.body.status && req.body.status !== previousStatus) {
    complaint.history.push({ status: req.body.status, note: req.body.note, updatedBy: req.user._id });
  }

  const updated = await complaint.save();
  res.json(updated);
});

export const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    res.status(404);
    throw new Error("Complaint not found");
  }

  if (req.user.role !== "admin" && complaint.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You cannot delete this complaint");
  }

  await complaint.deleteOne();
  res.json({ message: "Complaint deleted successfully" });
});

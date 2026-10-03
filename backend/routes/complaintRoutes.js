import express from "express";
import { body } from "express-validator";
import {
  createComplaint,
  deleteComplaint,
  getComplaintById,
  getComplaints,
  updateComplaint
} from "../controllers/complaintController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

const complaintValidators = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("priority").optional().isIn(["Low", "Medium", "High"]).withMessage("Invalid priority")
];

router
  .route("/")
  .post(protect, upload.single("image"), complaintValidators, createComplaint)
  .get(protect, getComplaints);

router
  .route("/:id")
  .get(protect, getComplaintById)
  .put(protect, upload.single("image"), updateComplaint)
  .delete(protect, deleteComplaint);

export default router;

import express from "express";
import { getDashboard, getUsers, updateStatus } from "../controllers/adminController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/dashboard", getDashboard);
router.get("/users", getUsers);
router.put("/status/:id", updateStatus);

export default router;

import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  if (!name || !email) {
    res.status(422);
    throw new Error("Name and email are required");
  }

  if (password && password.length < 6) {
    res.status(422);
    throw new Error("Password must be at least 6 characters");
  }

  const emailOwner = await User.findOne({ email });
  if (emailOwner && emailOwner._id.toString() !== user._id.toString()) {
    res.status(409);
    throw new Error("Email is already used by another account");
  }

  user.name = name;
  user.email = email;
  if (password) user.password = password;

  const updated = await user.save();
  res.json({
    id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    createdAt: updated.createdAt
  });
});

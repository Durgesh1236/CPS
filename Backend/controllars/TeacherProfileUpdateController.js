import mongoose from "mongoose";
import { TeacherProfileUpdateRequest } from "../models/TeacherProfileUpdateRequest.js";
import { User } from "../models/TeacherModel.js";
import TryCatch from "../utils/TryCatch.js";

const profileFields = ["name", "email", "mobileNo"];

export const submitTeacherProfileUpdateRequest = TryCatch(async (req, res) => {
  if (req.user.role?.toLowerCase() === "admin") {
    return res.status(403).json({
      success: false,
      message: "Admins cannot submit profile update requests",
    });
  }

  const updates = {};
  const current = {};
  for (const [field, value] of Object.entries(req.body || {})) {
    if (!profileFields.includes(field)) {
      return res.status(400).json({
        success: false,
        message: `The ${field} field cannot be changed through a profile request`,
      });
    }

    if (typeof value !== "string" || !value.trim()) {
      return res.status(400).json({
        success: false,
        message: `${field} must be a non-empty string`,
      });
    }

    const trimmedValue = value.trim();
    if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address",
      });
    }
    if (trimmedValue !== req.user[field]) {
      updates[field] = trimmedValue;
      current[field] = req.user[field];
    }
  }

  if (!Object.keys(updates).length) {
    return res.status(400).json({
      success: false,
      message: "Enter at least one profile change",
    });
  }

  const existingRequest = await TeacherProfileUpdateRequest.findOne({
    teacherId: req.user._id,
    status: "pending",
  });
  if (existingRequest) {
    return res.status(409).json({
      success: false,
      message: "You already have a profile update request awaiting review",
    });
  }

  const profileUpdateRequest = await TeacherProfileUpdateRequest.create({
    teacherId: req.user._id,
    updates,
    current,
  });

  return res.status(201).json({
    success: true,
    request: profileUpdateRequest,
    message: "Profile update request sent to the admin",
  });
});

export const getMyTeacherProfileUpdateRequests = TryCatch(async (req, res) => {
  const requests = await TeacherProfileUpdateRequest.find({
    teacherId: req.user._id,
  }).sort({ createdAt: -1 });

  return res.status(200).json(requests);
});

export const getTeacherProfileUpdateRequests = TryCatch(async (_req, res) => {
  const requests = await TeacherProfileUpdateRequest.find()
    .sort({ createdAt: -1 })
    .populate("teacherId", "name email mobileNo role")
    .populate("reviewedBy", "name");

  return res.status(200).json(requests);
});

export const reviewTeacherProfileUpdateRequest = TryCatch(async (req, res) => {
  const { id } = req.params;
  const decision = req.body?.decision;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      success: false,
      message: "A valid request is required",
    });
  }
  if (!["accept", "reject"].includes(decision)) {
    return res.status(400).json({
      success: false,
      message: "Decision must be accept or reject",
    });
  }

  const profileUpdateRequest = await TeacherProfileUpdateRequest.findById(id);
  if (!profileUpdateRequest) {
    return res.status(404).json({
      success: false,
      message: "Profile update request not found",
    });
  }
  if (profileUpdateRequest.status !== "pending") {
    return res.status(409).json({
      success: false,
      message: "This profile update request has already been reviewed",
    });
  }

  if (decision === "accept") {
    const teacher = await User.findById(profileUpdateRequest.teacherId);
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "The requesting teacher no longer exists",
      });
    }

    const duplicateConditions = [];
    if (profileUpdateRequest.updates.email) {
      duplicateConditions.push({ email: profileUpdateRequest.updates.email });
    }
    if (profileUpdateRequest.updates.mobileNo) {
      duplicateConditions.push({ mobileNo: profileUpdateRequest.updates.mobileNo });
    }
    if (duplicateConditions.length) {
      const duplicate = await User.findOne({
        _id: { $ne: teacher._id },
        $or: duplicateConditions,
      });
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "The requested email or mobile number is already in use",
        });
      }
    }

    for (const field of profileFields) {
      const requestedValue = profileUpdateRequest.updates[field];
      if (typeof requestedValue === "string") {
        teacher[field] = requestedValue;
      }
    }
    await teacher.save();
  }

  profileUpdateRequest.status = decision === "accept" ? "accepted" : "rejected";
  profileUpdateRequest.reviewedBy = req.user._id;
  profileUpdateRequest.reviewedAt = new Date();
  await profileUpdateRequest.save();

  return res.status(200).json({
    success: true,
    request: profileUpdateRequest,
    message: `Profile update request ${decision === "accept" ? "accepted" : "rejected"}`,
  });
});

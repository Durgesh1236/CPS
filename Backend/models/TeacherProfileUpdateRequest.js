import mongoose from "mongoose";

const teacherProfileUpdateRequestSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updates: {
      name: String,
      email: String,
      mobileNo: String,
    },
    current: {
      name: String,
      email: String,
      mobileNo: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: Date,
  },
  { timestamps: true }
);

export const TeacherProfileUpdateRequest = mongoose.model(
  "TeacherProfileUpdateRequest",
  teacherProfileUpdateRequestSchema
);

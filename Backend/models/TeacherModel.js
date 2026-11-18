import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobileNo: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },

    thumbnails: {
      id: String,
      url: String,
    },

    // Attendance Section
    attendance: [
      {
        date: {
          type: String,
          required: true,
        },

        status: {
          type: String,
          enum: ["Present", "Absent"],
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("teacherPayment", {
  ref: "TeacherPayment",
  localField: "_id",
  foreignField: "teacherId",
});

export const User = mongoose.model("User", userSchema);
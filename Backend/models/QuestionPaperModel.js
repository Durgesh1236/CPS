import mongoose from "mongoose";

const QuestionPaperSchema = new mongoose.Schema(
  {
    academicYear: {
      type: String,
      required: true,
      match: /^\d{4}-\d{4}$/,
    },
    examTerm: {
      type: String,
      required: true,
      enum: ["firstTerm", "secondTerm", "finalTerm"],
    },
    pdf: {
      type: Buffer,
      required: true,
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  { timestamps: true }
);

export const QuestionPaper = mongoose.model(
  "QuestionPaper",
  QuestionPaperSchema
);

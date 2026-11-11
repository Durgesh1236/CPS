import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
  },
});

const QuestionPaperSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
      trim: true,
    },
    className: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    examTime: {
      type: String,
      required: true,
      trim: true,
    },
    totalMarks: {
      type: Number,
      required: true,
      min: 0,
    },
    questions: {
      type: [QuestionSchema],
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

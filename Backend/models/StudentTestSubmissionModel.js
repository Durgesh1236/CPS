import mongoose from "mongoose";

const StudentTestSubmissionSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestQuestion",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    ledgerId: { type: String, required: true },
    studentName: { type: String, required: true },
    studentClass: { type: String, required: true },
    subject: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true, min: 0 },
    wrongAnswers: { type: Number, required: true, min: 0 },
    unanswered: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const StudentTestSubmission = mongoose.model(
  'StudentTestSubmission',
  StudentTestSubmissionSchema
);
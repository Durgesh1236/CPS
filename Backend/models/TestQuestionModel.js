import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  questionNumber: {
    type: Number,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // array of options
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const TestQuestionSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    question: [QuestionSchema], 
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      // required: true,
    },
  },
  { timestamps: true }
);

export const TestQuestion = mongoose.model(
  "TestQuestion",
  TestQuestionSchema
);
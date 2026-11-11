import { QuestionPaper } from "../models/QuestionPaperModel.js";
import TryCatch from "../utils/TryCatch.js";

export const createQuestionPaper = TryCatch(async (req, res) => {
  const {
    schoolName,
    className,
    subject,
    examTime,
    totalMarks,
    questions,
  } = req.body;

  if (
    ![schoolName, className, subject, examTime].every(
      (value) => typeof value === "string" && value.trim()
    ) ||
    !Number.isFinite(Number(totalMarks)) ||
    Number(totalMarks) <= 0 ||
    !Array.isArray(questions) ||
    questions.length === 0 ||
    questions.some(
      (question) =>
        !question ||
        typeof question.question !== "string" ||
        !question.question.trim() ||
        !Number.isFinite(Number(question.marks)) ||
        Number(question.marks) <= 0
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid paper details and questions",
    });
  }

  const questionPaper = await QuestionPaper.create({
    schoolName: schoolName.trim(),
    className: className.trim(),
    subject: subject.trim(),
    examTime: examTime.trim(),
    totalMarks: Number(totalMarks),
    questions: questions.map((question) => ({
      question: question.question.trim(),
      marks: Number(question.marks),
    })),
    teacherId: req.user._id,
  });

  return res.status(201).json({
    success: true,
    questionPaper,
    message: "Question paper saved successfully",
  });
});

export const getQuestionPapers = TryCatch(async (req, res) => {
  const questionPapers = await QuestionPaper.find();
  return res.status(200).json({
    success: true,
    questionPapers,
  });
});
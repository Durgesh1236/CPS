import { QuestionPaper } from "../models/QuestionPaperModel.js";
import TryCatch from "../utils/TryCatch.js";

export const createQuestionPaper = TryCatch(async (req, res) => {
  const { academicYear, examTerm } = req.body;
  const pdf = req.file;

  if (
    typeof academicYear !== "string" ||
    !/^\d{4}-\d{4}$/.test(academicYear) ||
    Number(academicYear.slice(5)) !== Number(academicYear.slice(0, 4)) + 1 ||
    !["firstTerm", "secondTerm", "finalTerm"].includes(examTerm) ||
    !pdf ||
    pdf.mimetype !== "application/pdf" ||
    !pdf.buffer ||
    pdf.buffer.length < 5 ||
    pdf.buffer.subarray(0, 5).toString("ascii") !== "%PDF-"
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid PDF, academic year, and exam term",
    });
  }

  const questionPaper = await QuestionPaper.create({
    academicYear,
    examTerm,
    pdf: pdf.buffer,
    teacherId: req.user._id,
  });

  return res.status(201).json({
    success: true,
    questionPaper: {
      _id: questionPaper._id,
      academicYear: questionPaper.academicYear,
      examTerm: questionPaper.examTerm,
      createdAt: questionPaper.createdAt,
    },
    message: "Question paper saved successfully",
  });
});

export const getQuestionPapers = TryCatch(async (req, res) => {
  const { academicYear, examTerm } = req.query;
  const filter = {};

  if (academicYear) filter.academicYear = academicYear;
  if (examTerm) filter.examTerm = examTerm;

  const questionPapers = await QuestionPaper.find({
    ...filter,
    pdf: { $exists: true, $ne: null },
  })
    .select("-pdf")
    .sort({ createdAt: -1 });
  return res.status(200).json({
    success: true,
    questionPapers,
  });
});

export const getQuestionPaperPdf = TryCatch(async (req, res) => {
  const questionPaper = await QuestionPaper.findById(req.params.id).select("pdf");
  if (!questionPaper) {
    return res.status(404).json({
      success: false,
      message: "Question paper not found",
    });
  }

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline; filename="question-paper-${questionPaper._id}.pdf"`,
    "Content-Length": questionPaper.pdf.length,
    "Cache-Control": "private, no-store",
  });
  return res.status(200).send(questionPaper.pdf);
});

export const deleteQuestionPaper = TryCatch(async (req, res) => {
  const questionPaper = await QuestionPaper.findById(req.params.id);
  if (!questionPaper) {
    return res.status(404).json({
      success: false,
      message: "Question paper not found",
    });
  }

  const canDelete =
    req.user.role === "admin" ||
    req.user.role === "accountent" ||
    questionPaper.teacherId.toString() === req.user._id.toString();

  if (!canDelete) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to delete this question paper",
    });
  }

  await questionPaper.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Question paper deleted successfully",
  });
});
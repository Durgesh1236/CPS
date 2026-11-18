import multer from "multer";

const storage = multer.memoryStorage();
const uploadFile = multer({ storage }).single("file");
const questionPaperPdfUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== "application/pdf") {
      callback(new Error("Question paper upload must be a PDF"));
      return;
    }
    callback(null, true);
  },
}).single("file");

export const uploadQuestionPaperPdf = (req, res, next) => {
  questionPaperPdfUpload(req, res, (error) => {
    if (error) {
      const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      return res.status(status).json({
        success: false,
        message: error.code === "LIMIT_FILE_SIZE"
          ? "PDF must be 10 MB or smaller"
          : error.message,
      });
    }
    next();
  });
};
export default uploadFile;
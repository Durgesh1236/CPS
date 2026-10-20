import express from "express";
import { addStudent, getStudentAttendence, getStudentClassTests, studentFeeHistory, StudentLogin, studentLogout, studentProfile, submitStudentTest } from "../controllars/StudentControllar.js";
import { StudentisAuth } from "../middlewares/StudentisAuth.js";
import { isAuth } from "../middlewares/isAuth.js";
import { bookPriceDelete, bookPriceEdit, bookPriceForm, getBookPrice } from "../controllars/FeesSubmitControllars.js";
import { StudentTestQuestion } from "../controllars/TeacherControllar.js";
import { loginLimiter } from "../middlewares/loginRateLimit.js";

const studentRouter = express.Router();

// studentRouter.post("/student/register", StudentAccount);
studentRouter.post("/create-student-account", isAuth, addStudent);
studentRouter.post("/student/login", loginLimiter, StudentLogin);
studentRouter.post("/student/profile", StudentisAuth, studentProfile);
// studentRouter.delete("/student/delete/:id", StudentisAuth, StudentProfileDelete);
studentRouter.post("/student/logout", StudentisAuth, studentLogout);
studentRouter.post("/student/fee-history/:ledgerId", StudentisAuth, studentFeeHistory);
studentRouter.post("/student/book-sale-form", isAuth, bookPriceForm);
studentRouter.post("/student/book-price-edit/:id", isAuth, bookPriceEdit);
studentRouter.get("/student/get-all-book-price", isAuth, getBookPrice);
studentRouter.delete("/student/delete-book-price/:id", isAuth, bookPriceDelete);
studentRouter.post("/student-test-question", isAuth, StudentTestQuestion);
studentRouter.get("/student/test-questions", StudentisAuth, getStudentClassTests);
studentRouter.post("/student/test-submit", StudentisAuth, submitStudentTest);
studentRouter.get("/student-attendance/:ledgerId", StudentisAuth, getStudentAttendence);

export default studentRouter; 
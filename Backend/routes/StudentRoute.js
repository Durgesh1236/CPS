import express from "express";
import { addStudent, studentFeeHistory, StudentLogin, studentLogout, studentProfile } from "../controllars/StudentControllar.js";
import { StudentisAuth } from "../middlewares/StudentisAuth.js";
import { isAuth } from "../middlewares/isAuth.js";
import { bookPriceDelete, bookPriceEdit, bookPriceForm, getBookPrice } from "../controllars/FeesSubmitControllars.js";

const studentRouter = express.Router();

// studentRouter.post("/student/register", StudentAccount);
studentRouter.post("/create-student-account", isAuth, addStudent);
studentRouter.post("/student/login", StudentLogin);
studentRouter.post("/student/profile", StudentisAuth, studentProfile);
// studentRouter.delete("/student/delete/:id", StudentisAuth, StudentProfileDelete);
studentRouter.post("/student/logout", StudentisAuth, studentLogout);
studentRouter.post("/student/fee-history/:ledgerId", StudentisAuth, studentFeeHistory);
studentRouter.post("/student/book-sale-form", isAuth, bookPriceForm);
studentRouter.post("/student/book-price-edit/:id", isAuth, bookPriceEdit);
studentRouter.get("/student/get-all-book-price", isAuth, getBookPrice);
studentRouter.delete("/student/delete-book-price/:id", isAuth, bookPriceDelete);

export default studentRouter; 
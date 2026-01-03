import express from "express";
import { StudentAccount, StudentLogin } from "../controllars/StudentControllar.js";
import { isAuth } from "../middlewares/isAuth.js";

const studentRouter = express.Router();

studentRouter.post("/student/register", StudentAccount);
studentRouter.post("/student/login", isAuth, StudentLogin);

export default studentRouter;
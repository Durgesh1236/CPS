import express from "express";
import { addStudent, StudentLogin, studentLogout, studentProfile } from "../controllars/StudentControllar.js";
import { StudentisAuth } from "../middlewares/StudentisAuth.js";
import { isAuth } from "../middlewares/isAuth.js";

const studentRouter = express.Router();

// studentRouter.post("/student/register", StudentAccount);
studentRouter.post("/create-student-account", isAuth, addStudent);
studentRouter.post("/student/login", StudentLogin);
studentRouter.post("/student/profile", StudentisAuth, studentProfile);
// studentRouter.delete("/student/delete/:id", StudentisAuth, StudentProfileDelete);
studentRouter.post("/student/logout", StudentisAuth, studentLogout);
export default studentRouter; 
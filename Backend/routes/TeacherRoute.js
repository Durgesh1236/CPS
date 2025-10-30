import express from "express";
import { getAllTeachers, loginUser, logoutUser, MyProfile, registerUser } from "../controllars/TeacherControllar.js";
import { isAuth } from "../middlewares/isAuth.js";
import { FeesSubmit, getAllFeesSubmit, getAllSpend, totalSpend, markSpendReceived, addStudent, searchStudents, getStudentByLedger, updateFeeRecord } from "../controllars/FeesSubmitControllars.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logoutUser);
router.get("/me", isAuth, MyProfile);  
router.get("/all-teachers", isAuth, getAllTeachers);
router.post("/fee-submit", isAuth, uploadFile, FeesSubmit);
router.post("/add-student", isAuth, addStudent);
router.get('/student/search', isAuth, searchStudents);
router.get('/student/:ledgerId', isAuth, getStudentByLedger);
router.put('/student/:ledgerId/fee', isAuth, updateFeeRecord);
router.get("/get-all-fees-submits", isAuth, getAllFeesSubmit);
router.post("/spend-record", isAuth, totalSpend);
router.get("/get-all-spend", isAuth, getAllSpend);
router.put('/spend/:id/receive', isAuth, markSpendReceived);

export default router;
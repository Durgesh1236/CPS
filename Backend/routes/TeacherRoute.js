import express from "express";
import { getAllTeachers, loginUser, logoutUser, MyProfile, registerUser } from "../controllars/TeacherControllar.js";
import { isAuth } from "../middlewares/isAuth.js";
import { 
    FeesSubmit, getAllFeesSubmit, 
    getAllSpend, totalSpend, 
    markSpendReceived, addStudent, 
    searchStudents, getAllStudents, 
    getStudentByLedger, updateFeeRecord, 
    getStudentCount, deleteFeeSubmit, 
    editStudentFeeRecord, editStudentProfile, 
    SpendHistoryEdit } from "../controllars/FeesSubmitControllars.js";
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
router.get('/students', isAuth, getAllStudents);
router.get('/student/:ledgerId', isAuth, getStudentByLedger);
router.post('/student/:ledgerId/fee', isAuth, updateFeeRecord);
router.get("/get-all-fees-submits", isAuth, getAllFeesSubmit);
router.post("/spend-record", isAuth, totalSpend);
router.get("/get-all-spend", isAuth, getAllSpend);
router.put('/spend/:id/receive', isAuth, markSpendReceived);
router.get('/student-count', isAuth, getStudentCount);
router.delete('/fee-submit/:id', isAuth, deleteFeeSubmit);
router.post('/student-profile-edit/:ledgerId', isAuth, editStudentProfile);
router.post('/student-fee-edit/:id', isAuth, editStudentFeeRecord);
router.post('/edit-spend-record/:id', isAuth, SpendHistoryEdit);

export default router;
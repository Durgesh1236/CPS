import express from "express";
import { deleteTeacher, editTeacherProfile, getAllTeachers, loginUser, logoutUser, MyProfile, registerUser, TeacherProfile } from "../controllars/TeacherControllar.js";
import { isAuth } from "../middlewares/isAuth.js";
import { 
    FeesSubmit, getAllFeesSubmit, 
    getAllSpend, totalSpend, 
    markSpendReceived, deleteFeeSubmit, 
    editStudentFeeRecord, editStudentProfile, 
    SpendHistoryEdit, 
    deleteSpendRecord} from "../controllars/FeesSubmitControllars.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logoutUser);
router.get("/me", isAuth, MyProfile);
router.get("/all-teachers", isAuth, getAllTeachers);
router.post("/fee-submit", isAuth, uploadFile, FeesSubmit);
router.get("/get-all-fees-submits", isAuth, getAllFeesSubmit);
router.post("/spend-record", isAuth, totalSpend);
router.get("/get-all-spend", isAuth, getAllSpend);
router.put('/spend/:id/receive', isAuth, markSpendReceived);
router.delete('/fee-submit/:id', isAuth, deleteFeeSubmit);
router.post('/student-profile-edit/:ledgerId', isAuth, editStudentProfile);
router.post('/student-fee-edit/:id', isAuth, editStudentFeeRecord);
router.post('/edit-spend-record/:id', isAuth, SpendHistoryEdit);
router.delete('/delete-spend-record/:id', isAuth, deleteSpendRecord);
router.delete('/delete-teacher-data/:id', isAuth, deleteTeacher);
router.post('/edit-teacher-profile/:id', isAuth, editTeacherProfile);
router.post('/teacher-profile-pic-upload/:id', isAuth, uploadFile, TeacherProfile);

export default router;
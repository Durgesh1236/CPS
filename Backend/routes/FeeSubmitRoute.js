import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { 
    allBookData,
    BookSaleSubmit,
     deleteBookData,
     editBookData,
     editStudentProfile, getAllStudents, 
    getStudentByLedger, getStudentCount, 
    searchStudents, updateFeeRecord } from "../controllars/FeesSubmitControllars.js";
import { StudentProfileDelete } from "../controllars/StudentControllar.js";

const feeSubmitRouter = express.Router();
// feeSubmitRouter.post("/create-student-account", isAuth, addStudent);
feeSubmitRouter.get("/search-student-account", isAuth, searchStudents);
feeSubmitRouter.post("/get-all-student-accounts", isAuth, getAllStudents);
feeSubmitRouter.get("/get-total-students", isAuth, getStudentCount);
feeSubmitRouter.get('/student/:ledgerId', isAuth, getStudentByLedger);
feeSubmitRouter.post('/fees-update/:ledgerId', isAuth, updateFeeRecord);
feeSubmitRouter.post('/student-profile-edit/:ledgerId', isAuth, editStudentProfile);
feeSubmitRouter.delete('/delete-student/:id', isAuth, StudentProfileDelete);
feeSubmitRouter.post("/book-sale-data", isAuth, BookSaleSubmit);
feeSubmitRouter.get("/all-book-sale-data", isAuth, allBookData);
feeSubmitRouter.post("/book/data/update/:id", isAuth, editBookData);
feeSubmitRouter.post("/book/data/delete/:id", isAuth, deleteBookData);
export default feeSubmitRouter;
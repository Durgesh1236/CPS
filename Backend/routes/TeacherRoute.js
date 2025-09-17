import express from "express";
import { getAllTeachers, loginUser, logoutUser, MyProfile, registerUser } from "../controllars/TeacherControllar.js";
import { isAuth } from "../middlewares/isAuth.js";
import { FeesSubmit, getAllFeesSubmit } from "../controllars/FeesSubmitControllars.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logoutUser);
router.get("/me", isAuth, MyProfile);  
router.get("/all-teachers", isAuth, getAllTeachers);
router.post("/fee-submit", isAuth, uploadFile, FeesSubmit);
router.get("/get-all-fees-submits", isAuth, getAllFeesSubmit);

export default router;
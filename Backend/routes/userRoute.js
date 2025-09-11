import express from "express";
import { getAllTeachers, loginUser, logoutUser, MyProfile, registerUser } from "../controllars/userControllar.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isAuth, logoutUser);
router.get("/me", isAuth, MyProfile);  
router.get("/all-teachers", isAuth, getAllTeachers);

export default router;
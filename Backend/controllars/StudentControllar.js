import { StudentAccountCreate } from "../models/StudentAccountCreate.js";
// import { Student } from "../models/StudentModel";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from 'bcrypt';

export const StudentAccount = TryCatch(async(req, res) => {
    const { ledgerId, name, password, studentfeeID } = req.body;
    if(!ledgerId || !name || !password){
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        })
    }

    if(password.length < 6){
        return res.json({
            success: false,
            message: "Password must be at least 6 characters"
        })
    }

    const StudentExists = await StudentAccountCreate.findOne({ ledgerId });
    if(StudentExists){
        return res.status(400).json({
            success: false,
            message: "Student with this ledgerId already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const Student = await StudentAccountCreate.create({
        ledgerId,
        name,
        password: hashPassword,
        studentfeeID
    });

    return res.status(201).json({
        success: true,
        Student,
        message: "Student Account Created Successfully"
    })
})

export const StudentLogin = TryCatch(async(req, res) => {
    const { ledgerId, password } = req.body;
    if(!ledgerId || !password){
        return res.json({
            success: false,
            message: "Please provide all required fields"
        })
    }
    const student = await StudentAccountCreate.findOne({ ledgerId });
    if(!student){
        return res.json({
            success: false,
            message: "Student not found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if(!isPasswordValid){
        return res.json({
            success: false,
            message: "Password is incorrect"
        })
    }
    return res.json({
        success: true,
        student,
        message: "Login Successfully"
    })
})

export const studentProfile = TryCatch(async(req, res) => {
    const students = await StudentAccountCreate.findById(req.user._id);
    return res.status(200).json({
        success: true,
        students,
    })
})

export const studentLogout = TryCatch(async(req,res) => {
    res.cookie("token", "", {maxAge: 0});
    return res.json({
        success: true,
        message: "Logout Successfully"
    })
})
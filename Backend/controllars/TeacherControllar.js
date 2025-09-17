import { User } from "../models/TeacherModel.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from 'bcrypt';

export const registerUser = TryCatch(async(req, res) => {
    const {name, email, password, mobileNo, role} = req.body;
    if(!name || !email || !password || !mobileNo || !role) {
        return res.json({
            success: false,
            message: "All fields are required"
        })
    }

    if(password.length < 6){
        return res.json({
            success: false,
            message: "Password must be at least 6 characters"
        })
    }
    let user = await User.findOne({email});
    if(user) {
        return res.json({
            success: false,
            message: "User Already Exist"
        })
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
        name,
        email,
        password: hashPassword,
        mobileNo,
        role
    });
    generateToken(user._id, res);
    return res.json({
        user,
        success: true,
        message: "Account Created Successfully"
    })
})

export const loginUser = TryCatch(async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.json({
            success: false,
            message: "All fields are required"
        })
    }
    const user = await User.findOne({email});
    if(!user) {
        return res.json({
            success: false,
            message: "Your account is not created, please contact with admin"
        })
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if(!comparePassword){
        return res.json({
            success: false,
            message: "Your password is incorrect"
        })
    }
    generateToken(user._id, res);
    return res.json({
        user,
        success: true,
        message: "Login Successfully"
    })
})

export const MyProfile = TryCatch(async(req,res) => {
    const user = await User.findById(req.user._id);
    return res.json(user);
})

export const logoutUser = TryCatch(async(req, res) => {
     res.cookie("token", "", {maxAge: 0});
    return res.json({
        success: true,
        message: "Logout Successfully"
    })
})

export const getAllTeachers = TryCatch(async(req, res) => {
    const user = await User.find();
    return res.json(user);
})
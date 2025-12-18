import sharp from "sharp";
import { User } from "../models/TeacherModel.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from 'bcrypt';
import cloudinary from "cloudinary";
import getDataurl from "../utils/urlGenerator.js";

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
    const user = await User.findOne({email});
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

export const editTeacherProfile = TryCatch(async(req, res) => {
    const { id } = req.params;
    const { name, email, mobileNo, role } = req.body;
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "Teacher not found"
        })
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.mobileNo = mobileNo || user.mobileNo;
    user.role = role || user.role;
    await user.save();
    return res.status(200).json({
        success: true,
        message: "Teacher profile updated successfully"
    })
})

export const deleteTeacher = TryCatch(async(req, res) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Teacher is not found"
        })
    }
    const user = await User.findByIdAndDelete(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "Teacher is not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Teacher deleted successfully"
    })
})

export const TeacherProfile = TryCatch(async(req, res) => {
    const { id } = req.params;
    const file = req.file;
   
    if(!file){
        return res.status(400).json({
            success: false,
            message: "Image Upload"
        })
    }

    if(!id){
        return res.status(400).json({
            success: false,
            message: "Teacher is not found"
        })
    }

    const compressedImage = await sharp(file.buffer)
            .rotate()
            .resize(800,800)
            .jpeg({ quality: 80 })
            .png({ quality: 50 }) 
            .toBuffer();
    
            const fileUrl = getDataurl({...file, buffer: compressedImage});
            const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
                quality: "auto",
            });
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "Teacher is not found"
        })
    }
    user.thumbnails = {
        id: cloud.public_id,
        url: cloud.secure_url,
    }
    await user.save();
    return res.status(200).json({
        success: true,
        message: "Teacher profile image updated successfully"
    })
})

export const deleteTeacherProfileImage = TryCatch(async(req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Teacher is not found"
        })
    }
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({
            success: false,
            message: "Teacher is not found"
        })
    }
    if(user.thumbnails && user.thumbnails.id){
        await cloudinary.v2.uploader.destroy(user.thumbnails.id);
    }
    user.thumbnails = null;
    await user.save();
    return res.status(200).json({
        success: true,
        message: "Teacher profile image deleted successfully"
    })
})
import jwt from "jsonwebtoken";
import { User } from "../models/TeacherModel.js";

export const isAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(403).json({
                message: "Please Login First", 
            })
        }
        const decodedData = jwt.verify(token, process.env.Jwt_secret);
        if(!decodedData){
            return res.status(403).json({
                message: "token expired"
            })
        }
        req.user = await User.findById(decodedData.id);
        next();
    } catch (error) {
        res.status(500).json({
            message: "Please Login",
        });
    }
}
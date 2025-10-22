import { FeeSubmit } from "../models/FeeSubmitModels.js";
import TryCatch from "../utils/TryCatch.js";
import getDataurl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import sharp from "sharp";

export const FeesSubmit = TryCatch(async(req, res) => {
    const { 
        ledgerId, 
        studentName, 
        studentClass, 
        backDues, 
        submitFees, 
        dues, 
        date } = req.body;
        const file = req.file;

        if(!ledgerId || !studentName || !studentClass || !backDues || !submitFees || !dues || !date || !file) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const  compressedImage = await sharp(file.buffer)
        .resize(500,500)
        .jpeg({ quality: 80 })
        .png({ quality: 50 }) 
        .toBuffer();

        const fileUrl = getDataurl({...file, buffer: compressedImage});
        const cloud = await cloudinary.v2.uploader.upload(fileUrl.content, {
            quality: "auto",
        });

        const feeSubmit = await FeeSubmit.create ({
            ledgerId,
            studentName,
            studentClass,
            submitFees,
            dues,
            backDues,
            date,
            receiptImage:{
                id: cloud.public_id,
                url: cloud.secure_url,
            }
        })
        if(!feeSubmit){
            return res.status(500).json({
                success: false,
                message: "Failed to submit fees"
            })
        }
        return res.status(201).json ({
            feeSubmit,
            success: true,
            message: "Fees submitted successfully",
        })
})

export const getAllFeesSubmit = TryCatch(async(req, res) => {
    const feeSubmit = await FeeSubmit.find();
    return res.json(feeSubmit);
})


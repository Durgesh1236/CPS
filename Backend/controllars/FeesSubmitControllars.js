import { FeeSubmit } from "../models/FeeSubmitModels.js";
import { SpendModel } from "../models/SpendModel.js";
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
        .resize(800,800)
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

export const totalSpend = TryCatch(async(req, res) => {
    const { name, date, totalReceived,  } = req.body;
    if(!name || !date || !totalReceived) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    } 
    const totalSpend = await SpendModel.create ({
        name,
        date,
        totalReceived,
        status: 'pending',
        UserId: req.user?._id ? String(req.user._id) : undefined,
        submittedBy: req.user?._id || undefined,
    })
    if(!totalSpend){
        return res.status(500).json({
            success: false,
            message: "Failed to record spend"
        })
    }
    return res.status(200).json ({
        totalSpend,
        success: true,
        message: "record successfully Submitted"
    })
})

export const markSpendReceived = TryCatch(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: 'Missing id' });
    }
    const spend = await SpendModel.findById(id);
    if (!spend) {
        return res.status(404).json({ success: false, message: 'Spend record not found' });
    }
    spend.status = 'received';
    await spend.save();
    const updated = await SpendModel.findById(spend._id).populate('submittedBy', 'name');
    return res.status(200).json({ success: true, spend: updated, message: 'Marked as received' });
})

export const getAllSpend = TryCatch(async(req, res) => {
    const spend = await SpendModel.find().populate('submittedBy', 'name');
    return res.status(200).json(spend);
})

import { BookSubmit } from "../models/BookSubmitModel.js";
import { FeeSubmit } from "../models/FeeSubmitModels.js";
import { SpendModel } from "../models/SpendModel.js";
import { Student } from "../models/StudentModel.js";
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
        date, 
        paymentMethod } = req.body;
        const file = req.file;

        if(!ledgerId || !studentName || !studentClass || !backDues || !submitFees || !dues || !date || !file) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const  compressedImage = await sharp(file.buffer)
        // .resize(800,800)
        .rotate()
        .jpeg({ quality: 50 })
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
            submittedBy: req.user?._id || undefined,
            receiptImage:{
                id: cloud.public_id,
                url: cloud.secure_url,
            },
            paymentMethod
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
    const feeSubmit = await FeeSubmit.find().populate('submittedBy', 'name');
    return res.json(feeSubmit);
})

export const totalSpend = TryCatch(async(req, res) => {
    const { name, date, totalReceived, paymentMethod } = req.body;
    if(!name || !date || !totalReceived || !paymentMethod) {
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
        paymentMethod,
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

// export const addStudent = TryCatch(async (req, res) => {
//     const { ledgerId, studentName, studentClass, mobileNo, fatherName, motherName, aadhar, address, transport, monthDetails } = req.body;
//     if (!ledgerId || !studentName) {
//         return res.status(400).json({ success: false, message: 'ledgerId and studentName are required' });
//     }

//     let student = await Student.findOne({ ledgerId });
//     if (!student) {
//         student = await Student.create({ ledgerId, studentName, studentClass, mobileNo, fatherName, motherName, aadhar, address, transport });
//     } else {
//         student.studentName = studentName || student.studentName;
//         student.studentClass = studentClass || student.studentClass;
//         student.mobileNo = mobileNo || student.mobileNo;
//         student.fatherName = fatherName || student.fatherName;
//         student.motherName = motherName || student.motherName;
//         student.aadhar = aadhar || student.aadhar;
//         student.address = address || student.address;
//         student.transport = typeof transport === 'boolean' ? transport : student.transport;
//     }

//     if (monthDetails && typeof monthDetails === 'object') {
//         const monthsOrder = ['April','May','June','July','August','September','October','November','December','January','February','March'];

//         const payloadNormalized = {}; 
//         for (const key of Object.keys(monthDetails)) {
//             const parts = key.split('-');
//             const year = Number(parts[0]);
//             const month = parts.slice(1).join('-');
//             const md = monthDetails[key] || {};
//             const back = Number(md.backdues || 0);
//             const paid = Number(md.paid || 0);
//             const dues = Math.max(0, back - paid);
//             payloadNormalized[key] = { year, month, back, paid, dues };
//         }

//         const prevKeyFor = (year, month) => {
//             const idx = monthsOrder.indexOf(month);
//             if (idx === -1) return null;
//             if (idx > 0) return `${year}-${monthsOrder[idx - 1]}`;
//             return `${year - 1}-${monthsOrder[monthsOrder.length - 1]}`;
//         }

//         for (const key of Object.keys(payloadNormalized)) {
//             const { year, month, back, paid } = payloadNormalized[key];

//             const prevKey = prevKeyFor(year, month);
//             let prevDues = 0;
//             if (prevKey) {
//                 if (payloadNormalized[prevKey]) {
//                     prevDues = payloadNormalized[prevKey].dues || 0;
//                 } else {
//                     const existing = student.feeRecords.find(r => r.year === Number(prevKey.split('-')[0]) && r.month === prevKey.split('-').slice(1).join('-'));
//                     if (existing) prevDues = existing.dues || 0;
//                 }
//             }

//             const adjustedBack = Number(back || 0) + Number(prevDues || 0);
//             student.upsertFeeRecord(year, month, adjustedBack, paid);
//         }
//     }

//     await student.save();
//     return res.status(201).json({  student, success: true, message: 'Student saved successfully' });
// }) 

export const searchStudents = TryCatch(async (req, res) => {
    const { ledgerId, name } = req.query;
    const query = {};
    if (ledgerId) query.ledgerId = ledgerId;
    if (name) query.studentName = { $regex: name, $options: 'i' };
    const students = await Student.find(query).limit(50);
    return res.json({ success: true, students });
});

export const getAllStudents = TryCatch(async (req, res) => {
    const students = await Student.find({}).sort({ studentName: 1 });
    return res.json({ success: true, students });
});

export const getStudentCount = TryCatch(async (req, res) => {
    const count = await Student.countDocuments();
    return res.json({ success: true, count });
});

export const getStudentByLedger = TryCatch(async (req, res) => {
    const { ledgerId } = req.params;
    if (!ledgerId) return res.status(400).json({ success: false, message: 'Missing ledgerId' });
    const student = await Student.findOne({ ledgerId });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });
    return res.json({ success: true, student });
});

export const updateFeeRecord = TryCatch(async (req, res) => {
    const { ledgerId } = req.params;
    const { year, month, backdues, paid } = req.body;
    if (!ledgerId || year == null || !month) return res.status(400).json({ success: false, message: 'Missing required fields' });
    const student = await Student.findOne({ ledgerId });
    if (!student) return res.status(404).json({ success: false, message: 'Student not found' });

    // compute dues and upsert
    const b = Number(backdues || 0);
    const p = Number(paid || 0);
    student.upsertFeeRecord(Number(year), month, b, p);
    await student.save();
    return res.json({ success: true, student, message: 'Fee record updated' });
});

export const deleteFeeSubmit = TryCatch(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "ID is required"
        });
    }

    const feeSubmit = await FeeSubmit.findByIdAndDelete(id);

    if (!feeSubmit) {
        return res.status(404).json({
            success: false,
            message: "Fee submit record not found"
        });
    }

    return res.status(200).json({
        success: true,
        message: "Fee submit record deleted successfully"
    });
});

export const editStudentProfile =  TryCatch(async (req, res) => {
    const { ledgerId } = req.params;
    if(!ledgerId) {
        return res.status(400).json({
            success: false,
            message: "Ledger ID is required"
        })
    }
    const { studentName, studentClass, mobileNo, fatherName, motherName, aadhar, address, transport } = req.body;
    const student = await Student.findOne({ledgerId});
    if(!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        })
    }
    student.studentName = studentName || student.studentName;
    student.studentClass = studentClass || student.studentClass;
    student.mobileNo = mobileNo || student.mobileNo;
    student.fatherName = fatherName || student.fatherName;
    student.motherName = motherName || student.motherName;
    student.aadhar = aadhar || student.aadhar;
    student.address = address || student.address;
    student.transport = typeof transport === 'boolean' ? transport : student.transport;

    await student.save();
    return res.status(200).json({
        success: true,
        message: "Student details updated successfully",
    })
})

export const editStudentFeeRecord = TryCatch(async(req, res) => {
    const { id } = req.params;
    const { studentName, studentClass, date } = req.body;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "Ledger Id is wrong contact with Durgesh"
        })
    }

    const studentFee = await FeeSubmit.findById(id);
    if(!studentFee) {
        return res.status(404).json({
            success: false,
            message: "Student Fee Record not found"
        })
    }
     studentFee.studentName = studentName || studentFee.studentName;
     studentFee.studentClass = studentClass || studentFee.studentClass;
     studentFee.date = date || studentFee.date;
    await studentFee.save();
    return res.status(200).json({
        success: true,
        message: "Student Fee Record updated successfully"
    }) 
})

export const SpendHistoryEdit = TryCatch(async (req, res) => {
    const { id } = req.params;
    const { name, date, totalReceived, paymentMethod } = req.body;
    
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "ID is required"
        })
    }
    const spendRecord = await SpendModel.findById(id);
    if(!spendRecord) {
        return res.status(400).json({
            success: false,
            message: "Spend record not found"
        })
    }
    spendRecord.name = name || spendRecord.name;
    spendRecord.date = date || spendRecord.date;
    spendRecord.totalReceived = totalReceived || spendRecord.totalReceived;
    spendRecord.paymentMethod = paymentMethod || spendRecord.paymentMethod;
    await spendRecord.save();
    return res.status(200).json({
        success: true,
        message: "Spend record updated successfully"
    })
})

export const deleteSpendRecord = TryCatch(async(req, res) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({
            success: false,
            message: "ID is required"
        })
    }

    const SpendRecord = await SpendModel.findByIdAndDelete(id);
    if(!SpendRecord){
        return res.status(404).json({
            success: false,
            message: "Spend record not found"
        })
    }
     
    return res.status(200).json({
        success: true,
        message: "Spend record deleted successfully"
    })
})

export const BookSaleSubmit = TryCatch(async(req,res) => {
    const {ledgerId, studentName, studentClass, totalamount, submitFees, dues, date, paymentMethod} = req.body;
    if(!ledgerId || !studentName || !studentClass || !totalamount || !submitFees || !dues || !date || !paymentMethod) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    const bookSale = await BookSubmit.create ({
        ledgerId,
        studentName,
        studentClass,
        totalamount,
        submitAmount: submitFees,
        dues,
        date,
        paymentMethod,
        submitedBy: req.user._id
    })
    if(!bookSale){
        return res.status(500).json({
            success: false,
            message: "Failed to submit book sale"
        })
    }
    return res.status(201).json ({
        success: true,
        bookSale,
        message: "Book sale submitted successfully",
    })
})

export const allBookData = TryCatch(async(req,res) => {
    const booksale = await BookSubmit.find().populate('submitedBy', 'name');
    return res.status(200).json(booksale);
})
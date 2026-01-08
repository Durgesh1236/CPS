import { StudentAccountCreate } from "../models/StudentAccountCreate.js";
import { Student } from "../models/StudentModel.js";
import generateToken from "../utils/generateToken.js";
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

export const StudentProfileDelete = TryCatch(async(req, res) =>  {
    const { id } = req.params;
    const student = await Student.findById(id);
    if(!student){
        return res.status(404).json({
            success: false,
            message: "Student not found"
        })
    }
    await Student.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        message: "Student deleted successfully"
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
    const user = await StudentAccountCreate.findOne({ ledgerId });
    if(!user){
        return res.json({
            success: false,
            message: "Student not found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.json({
            success: false,
            message: "Password is incorrect"
        })
    }
    generateToken(user._id, res);
    return res.json({
        user,
        success: true,
        message: "Login Successfully"
    })
})

export const studentProfile = TryCatch(async(req, res) => {
    const students = await StudentAccountCreate.findById(req.user._id);
    return res.status(200).json({
        students,
        success: true,
    })
})

export const studentLogout = TryCatch(async(req,res) => {
    res.cookie("token", "", {maxAge: 0});
    return res.json({
        success: true,
        message: "Logout Successfully"
    })
})
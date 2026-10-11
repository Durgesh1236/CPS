import sharp from "sharp";
import { User } from "../models/TeacherModel.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import bcrypt from 'bcrypt';
import cloudinary from "cloudinary";
import getDataurl from "../utils/urlGenerator.js";
import { TeacherPayment } from "../models/TeacherPaymentModel.js";
import { TestQuestion } from "../models/TestQuestionModel.js";
import { schoolphotoUpload } from "../models/SchoolPhotoModel.js";
import { Student } from "../models/StudentModel.js";
import { StudentAttendance } from "../models/StudentAttendanceModel.js";
import { TeacherAttendance } from "../models/TeacherAttendence.js";
import { StudentTestSubmission } from "../models/StudentTestSubmissionModel.js";

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
    const { name, email, mobileNo, role, password } = req.body;
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
    if(password) {
        user.password = await bcrypt.hash(password, 10);
    }
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

export const teacherPayment = TryCatch(async(req, res) => {
    const { teacherName, teacherBackdues, teacherPaid, teacherDues, submitedDate } = req.body;
    if(!teacherName || !teacherBackdues || !teacherPaid || !teacherDues || !submitedDate){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    const TeacherPayment = await TeacherPayment.create({
        teacherName,
        teacherBackdues,
        teacherPaid,
        teacherDues,
        submitedDate,
        submitedBy: req.user._id
    })

    return res.status(201).json({
        success: true,
        message: "Teacher payment created successfully",
    })
})

export const getTeacherPayment = TryCatch(async(req, res) => {
    const teacherPayment = await TeacherPayment.find().populate("submitedBy", "name");
    return res.status(200).json(teacherPayment);
})

export const deleteTeacherPayment = TryCatch(async(req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Teacher payment record is not found"
        })
    }
    const teacherPayment = await TeacherPayment.findByIdAndDelete(id);
    if(!teacherPayment){
        return res.status(404).json({
            success: false,
            message: "Teacher payment record is not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Teacher payment record deleted successfully"
    })
}) 

export const StudentTestQuestion = TryCatch(async(req, res) => {
  const { className, subject, questions } = req.body;

  // Validation
  if (!className || !subject || !Array.isArray(questions) || !questions.length) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Validate each question before transforming
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const options = [q.option1, q.option2, q.option3, q.option4];

    if (
      !q.question ||
      options.some((opt) => !opt) ||
      !q.correctAnswer
    ) {
      return res.status(400).json({
        success: false,
        message: `Question ${i + 1} is missing required fields`,
      });
    }

    if (!options.includes(q.correctAnswer)) {
      return res.status(400).json({
        success: false,
        message: `Question ${i + 1}: correctAnswer must match one of the options`,
      });
    }
  }

  // Convert frontend format → schema format
  const formattedQuestions = questions.map((q, index) => ({
    questionNumber: index + 1,
    questionText: q.question,
    options: [q.option1, q.option2, q.option3, q.option4],
    correctAnswer: q.correctAnswer,
  }));

  // Save
  const testQuestion = await TestQuestion.create({
    class: className,
    subject,
    question: formattedQuestions,
    teacherId: req.user._id,
  });

  return res.status(200).json({
    success: true,
    testQuestion,
    message: "Questions submitted successfully",
  });
});

export const getTestQuestions = TryCatch(async(req, res) => {
    const { className, subject } = req.body;
    if(!className || !subject){
        return res.status(400).json({
            success: false,
            message: "Class and Subject are required"   
        })
    }

    const testQuestion = await TestQuestion.findOne({ teacherId: req.user._id })
    if(!testQuestion){
        return res.status(404).json({
            success: false,
            message: "Test questions not found for this teacher"
        })
    }
    //  console.log(testQuestion, className, subject)
    return res.status(200).json({
        success: true,
        testQuestion,
        message: "Test questions retrieved successfully"
    })
})

export const getStudentTestSubmissions = TryCatch(async (req, res) => {
    const { studentClass, subject } = req.body;
    if (!studentClass || !subject) {
        return res.status(400).json({
            success: false,
            message: "Class and Subject are required"
        })
    }

    const submissions = await StudentTestSubmission.find({
         studentClass: studentClass || studentClass,
         subject: subject || subject }); 
    if(submissions.length === 0){
        return res.status(404).json({
            success: false,
            message: "No test submissions found for this class and subject"
        })
    }
    // console.log(submissions);
    return res.status(200).json({
        submissions,
        success: true,
        message: "Test submissions retrieved successfully"
    });
});

export const schoolPhotoUpload = TryCatch(async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            success: false,
            message: "Please upload a photo",
        });
    }

    // High-quality compression
    const compressedImage = await sharp(file.buffer)
        .resize({
            width: 1600,
            fit: "inside",
            withoutEnlargement: true,
        })
        .rotate()
        .jpeg({
            quality: 90,
            mozjpeg: true,
        })
        .toBuffer();

    const fileUrl = getDataurl({
        ...file,
        buffer: compressedImage,
    });

    const cloud = await cloudinary.v2.uploader.upload(
        fileUrl.content,
        {
            quality: "auto:best",
        }
    );

    const photoData = await schoolphotoUpload.create({
        photoUrl: {
            id: cloud.public_id,
            url: cloud.secure_url,
        },
    });

    return res.status(201).json({
        success: true,
        photoData,
        message: "Photo uploaded successfully",
    });
});

export const getSchoolPhotos = TryCatch(async (req, res) =>{
    const photos = await schoolphotoUpload.find();
    return res.status(200).json({
        success: true,
        photos,
        message: "Photos retrieved successfully"
    })
})

export const deleteSchoolPhoto = TryCatch(async (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            success: false,
            message: "Photo not found"
        })
    }

    const photo = await schoolphotoUpload.findByIdAndDelete(id);
    if(!photo){
        return res.status(404).json({
            success: false,
            message: "Photo not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Photo deleted successfully"
    })
})

export const getstudentAttendence = TryCatch(async (req, res) => {
    const { className } = req.query;
    if(!className) {
        return res.status(400).json({
            success: false,
            message: "Class name is required"
        })
    }

    const students = await Student.find({ studentClass: className })
        .select("ledgerId studentName studentClass")
        .sort({ studentName: 1 });
    if(students.length === 0){
        return res.status(404).json({
            success: false,
            message: "Students not found"
        })
    }

    return res.status(200).json({
        success: true,
        students,
        message: "Students retrieved successfully"
    })
})

export const studentAttendence = TryCatch(async(req, res) => {
    const { studentId, subject, status, subjects, date } = req.body;
    const attendanceSubjects = Array.isArray(subjects)
        ? subjects
        : [{ subject, status }];

    if(!studentId || !date || attendanceSubjects.length === 0 || attendanceSubjects.some(item => !item.subject || !item.status)) {
        return res.status(400).json({
            success: false,
            message: "studentId, date, and at least one subject with status are required"
        })
    }

    const attendanceDate = new Date(date);
    if (Number.isNaN(attendanceDate.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid attendance date" });
    }
    attendanceDate.setUTCHours(0, 0, 0, 0);

    let student = await StudentAttendance.findOne({ studentId, date: attendanceDate });
    if (!student) {
        student = await StudentAttendance.create({
            studentId,
            date: attendanceDate,
            subjects: attendanceSubjects
        });
    } else {
        const subjectsByName = new Map(student.subjects.map(item => [item.subject, item.status]));
        attendanceSubjects.forEach(item => subjectsByName.set(item.subject, item.status));
        student.subjects = [...subjectsByName].map(([subjectName, subjectStatus]) => ({
            subject: subjectName,
            status: subjectStatus,
            teacherId: req.user._id
        }));
        await student.save();
    }

    await TeacherAttendance.updateOne(
        { teacherId: req.user._id, date: attendanceDate },
        {
            $setOnInsert: {
                teacherId: req.user._id,
                date: attendanceDate,
                status: "present",
                markedAt: new Date()
            }
        },
        { upsert: true }
    );

    return res.status(201).json({
        success: true,
        student,
        message: "Attendance submitted successfully"
    })
})

export const getTeacherAttendance = TryCatch(async (req, res) => {
    const { teacherId, date } = req.query;
    const filter = {};

    if (req.user.role === "admin") {
        if (teacherId) filter.teacherId = teacherId;
    } else {
        filter.teacherId = req.user._id;
    }

    if (date) {
        const attendanceDate = new Date(date);
        if (Number.isNaN(attendanceDate.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid attendance date" });
        }
        attendanceDate.setUTCHours(0, 0, 0, 0);
        filter.date = attendanceDate;
    }

    const records = await TeacherAttendance.find(filter)
        .sort({ date: -1 })
        .populate("teacherId", "name email mobileNo role");

    return res.status(200).json({
        success: true,
        teacherAttendance: records,
        message: "Teacher attendance fetched successfully"
    });
});

export const teacherAttendance = TryCatch(async(req, res) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Only administrators can manually mark teacher attendance"
        });
    }

    const { teacherId, date, status } = req.body;
    const targetTeacherId = teacherId || req.user?._id;

    if(!targetTeacherId || !date || !status){
        return res.status(400).json({
            success: false,
            message: "teacherId, date, and status are required"
        })
    }

    const attendanceDate = new Date(date);
    if (Number.isNaN(attendanceDate.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid attendance date" });
    }
    attendanceDate.setUTCHours(0, 0, 0, 0);

    const normalizedStatus = String(status).trim().toLowerCase();
    if (!['present', 'absent', 'late'].includes(normalizedStatus)) {
        return res.status(400).json({
            success: false,
            message: "status must be present, absent, or late"
        });
    }

    let teacherRecord = await TeacherAttendance.findOne({ teacherId: targetTeacherId, date: attendanceDate });

    if (!teacherRecord) {
        teacherRecord = await TeacherAttendance.create({
            teacherId: targetTeacherId,
            date: attendanceDate,
            status: normalizedStatus,
            markedAt: new Date()
        });

        return res.status(201).json({
            success: true,
            teacherAttendance: teacherRecord,
            message: "Teacher attendance submitted successfully"
        });
    }

    teacherRecord.status = normalizedStatus;
    teacherRecord.markedAt = new Date();
    await teacherRecord.save();

    return res.status(200).json({
        success: true,
        teacherAttendance: teacherRecord,
        message: "Teacher attendance updated successfully"
    });
})

export const scanTeacherAttendance = TryCatch(async(req, res) => {
    const { date } = req.body;
    if (!req.user?._id || !date) {
        return res.status(400).json({
            success: false,
            message: "date is required"
        });
    }

    const attendanceDate = new Date(date);
    if (Number.isNaN(attendanceDate.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid attendance date" });
    }
    attendanceDate.setUTCHours(0, 0, 0, 0);

    let teacherRecord = await TeacherAttendance.findOne({
        teacherId: req.user._id,
        date: attendanceDate
    });

    if (!teacherRecord) {
        teacherRecord = await TeacherAttendance.create({
            teacherId: req.user._id,
            date: attendanceDate,
            status: "present",
            markedAt: new Date()
        });
        return res.status(201).json({
            success: true,
            teacherAttendance: teacherRecord,
            message: "Attendance marked present successfully"
        });
    }

    teacherRecord.status = "present";
    teacherRecord.markedAt = new Date();
    await teacherRecord.save();

    return res.status(200).json({
        success: true,
        teacherAttendance: teacherRecord,
        message: "Attendance marked present successfully"
    });
});

import mongoose from "mongoose";

const SubjectAttendanceSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["present", "absent"],
        required: true
    }, 
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, { _id: false });

const StudentAttendanceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        index: true
    },
    date: {
        type: Date,
        required: true,
        index: true
    },
    subjects: {
        type: [SubjectAttendanceSchema],
        required: true,
        validate: {
            validator: subjects => subjects.length > 0,
            message: "At least one subject is required"
        }
    }
}, { timestamps: true });

StudentAttendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });

export const StudentAttendance = mongoose.model("StudentAttendance", StudentAttendanceSchema);
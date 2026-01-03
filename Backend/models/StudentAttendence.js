import mongoose from "mongoose";
const StudentAttemdemceSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
    }
})
export const StudentAttendence = mongoose.model("StudentAttendence", StudentAttemdemceSchema);
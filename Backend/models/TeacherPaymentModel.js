import mongoose from "mongoose";

const TeacherPaymentSchema = new mongoose.Schema({
    teacherName: {
        type: String,
        required: true
    },
    teacherBackdues: {
        type: Number,
        required: true
    },
    teacherPaid: {
        type: Number,
        required: true
    },
    teacherDues: {
        type: Number,
        required: true 
    },
    submitedDate: {
        type: Date,
        required: true
    },
    submitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {timestamps: true});

export const TeacherPayment = mongoose.model("TeacherPayment", TeacherPaymentSchema);
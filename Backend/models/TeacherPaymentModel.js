import mongoose from "mongoose";

const TeacherPaymentSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    submitMonth:{
        type: String,
        required: true
    },
    teacherPaid: {
        type: Number,
        min: 0,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Account', 'Cash'],
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
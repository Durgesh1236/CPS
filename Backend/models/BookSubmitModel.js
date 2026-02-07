import mongoose, { Mongoose } from "mongoose";

const booksubmitschema = mongoose.Schema({
    ledgerId: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },
    totalamount: {
        type: String,
        required: true
    },
    submitAmount: {
        type: String,
        required: true
    },
    dues: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    submitedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, { timestamps: true })

export const BookSubmit = mongoose.model("BookSubmit", booksubmitschema);
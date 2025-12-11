import mongoose from "mongoose";

const SpendSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }, 
    totalReceived : {
        type: Number,
        required: true
    }, 
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'received'],
        default: 'pending'
    },
    UserId: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    }
}, { timestamps: true })

export const SpendModel = mongoose.model("SpendModel", SpendSchema);
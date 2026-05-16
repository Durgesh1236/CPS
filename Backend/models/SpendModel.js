import mongoose from "mongoose";

const SpendSchema = new mongoose.Schema({
    name: { 
        type: String, 
        // required: true,
        default: 'Pawan sir'
    }, 
    totalReceived : {
        type: String,
        required: true
    }, 
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'received'],
        default: 'pending'
    },
    UserId: {
        type: String,
        // required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    ledgerId: {
        type: String,
        default: null
    }
}, { timestamps: true })

export const SpendModel = mongoose.model("SpendModel", SpendSchema);
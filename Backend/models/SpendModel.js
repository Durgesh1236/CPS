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
    }
}, { timestamps: true })

export const SpendModel = mongoose.model("SpendModel", SpendSchema);
import mongoose from "mongoose";
const StudentAccountCreateSchema = new mongoose.Schema({
    ledgerId: {
        type: String,
        required: true,
        unique: true
    }, 
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    studentfeeID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, { timestamps: true })

export const StudentAccountCreate = mongoose.model("StudentAccountCreate", StudentAccountCreateSchema);
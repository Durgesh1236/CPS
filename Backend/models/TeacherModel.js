import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email: { 
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "user"
    },
    thumbnails:{
        id: String,
        url: String,
    },
    teacherPayment: [
        {
            type: String,
            required: true,
        },
    ],

}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema);
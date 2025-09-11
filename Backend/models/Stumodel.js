import mongoose from "mongoose";

const StuSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }, 
    mobileNo:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    thumbnails: {
        id: String,
        url:String
    },
    verifyotp:{
        type: String,
        default: ''
    }
})
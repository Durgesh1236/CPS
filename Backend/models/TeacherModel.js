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
    verifyotp:{
        type: String,
        default:''
    },
     verifyotpExpireAt : {
        type: Number,
        default: 0
     },
     isAccountVerified:{
        type: Boolean,
        default: false
     },
}, {
    timestamps: true
})

export const User = mongoose.model('User', userSchema);
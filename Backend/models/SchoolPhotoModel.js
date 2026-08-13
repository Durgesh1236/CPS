import mongoose from "mongoose";
const schoolPhotoSchema = new mongoose.Schema({
    photoUrl: [
        {
            id: String,
            url: String,
        },
    ],
}, { timestamps: true });

export const schoolphotoUpload = mongoose.model(
  "schoolphotoUpload",
  schoolPhotoSchema
);  
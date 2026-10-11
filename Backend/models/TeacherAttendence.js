import mongoose from "mongoose";

const TeacherAttendenceSchema = new mongoose.Schema(
    {
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        date: {
            type: Date,
            required: true,
            index: true
        },
        status: {
            type: String,
            enum: ["present", "absent", "late"],
            required: true,
            lowercase: true,
            trim: true
        },
        markedAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

TeacherAttendenceSchema.index({ teacherId: 1, date: 1 }, { unique: true });

export const TeacherAttendance = mongoose.models.TeacherAttendance || mongoose.model("TeacherAttendance", TeacherAttendenceSchema);
export const TeacherAttendence = TeacherAttendance;
export default TeacherAttendance;
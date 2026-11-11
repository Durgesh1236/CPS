import mongoose from mongoose;

const teacherNotificationSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true,
    }, 
    message: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true})

export const TeacherNotification = mongoose.model('TeacherNotification', teacherNotificationSchema);
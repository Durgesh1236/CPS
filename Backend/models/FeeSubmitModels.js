import mongoose from "mongoose";

const feeSubmitSchema = mongoose.Schema({
    ledgerId: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    studentClass: {
        type: String,
        required: true,
    },
    backDues: {
        type: String,
        required: true,
    },
    submitFees: {
        type: String,
        required: true,
    },
    dues: {
        type: String,
        required: true,
        default: "0",
    },
    date: {
        type: String,
        required: true,
    },
    receiptImage: {
        id: String,
        url: String,
    }, paymentMethod: {
        type: String,
        required: true,
    }
}, { timestamps: true });
feeSubmitSchema.add({
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export const FeeSubmit = mongoose.model("FeeSubmit", feeSubmitSchema);
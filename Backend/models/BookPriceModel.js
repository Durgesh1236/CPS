import mongoose from "mongoose";

const bookpriceschema = mongoose.Schema({
    studentClass: {
        type: String,
        required: true
    },
    TotalBooks: {
        type: String,
        required: true
    },
    bookTotalPrice: {
        type: String,
        required: true
    },
    diary:{
        type: String,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    totalPayable:{
        type: String,
        required: true
    },
    BookQuantity:{
        type: String,
        required: true
    }
}, {
    timestamps: true
 })

export const BookPrice = mongoose.model("BookPrice", bookpriceschema);
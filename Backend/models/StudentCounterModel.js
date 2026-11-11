import mongoose from "mongoose";

const StudentCounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence: {
    type: Number,
    default: 0,
  },
});

export const StudentCounter = mongoose.model(
  "StudentCounter",
  StudentCounterSchema
);

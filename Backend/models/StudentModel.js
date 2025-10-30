import mongoose from "mongoose";

const FeeRecordSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  month: { type: String, required: true }, // e.g., 'April'
  backdues: { type: Number, default: 0 },
  paid: { type: Number, default: 0 },
  dues: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const StudentSchema = new mongoose.Schema({
  ledgerId: { type: String, required: true, index: true },
  studentName: { type: String, required: true },
  studentClass: { type: String },
  mobileNo: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  aadhar: { type: String },
  address: { type: String },
  transport: { type: Boolean, default: false },
  // year-wise fee records. Stored as an array of records where each record contains year & month
  feeRecords: { type: [FeeRecordSchema], default: [] },
}, {
  timestamps: true,
});

// Optional helper: add a method to add or update a fee record for a given year+month
StudentSchema.methods.upsertFeeRecord = function (year, month, backdues = 0, paid = 0) {
  const dues = Math.max(0, Number(backdues || 0) - Number(paid || 0));
  const idx = this.feeRecords.findIndex(r => r.year === Number(year) && r.month === month);
  if (idx >= 0) {
    this.feeRecords[idx].backdues = Number(backdues || 0);
    this.feeRecords[idx].paid = Number(paid || 0);
    this.feeRecords[idx].dues = dues;
    this.feeRecords[idx].createdAt = new Date();
  } else {
    this.feeRecords.push({ year: Number(year), month, backdues: Number(backdues || 0), paid: Number(paid || 0), dues, createdAt: new Date() });
  }
  return this;
}

export const Student = mongoose.model('Student', StudentSchema);

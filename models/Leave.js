const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  reason: { type: String, required: true },
  dates: { type: [String], required: true },
  status: { type: String, default: "Pending" }, // Pending, Approved, Declined
});

module.exports = mongoose.model("Leave", LeaveSchema);

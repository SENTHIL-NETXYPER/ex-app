const express = require("express");
const Leave = require("../models/Leave");
// const authenticate = require("../middleware/authMiddleware");
// const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Utility function to handle errors
const handleError = (res, err, message = "An error occurred") => {
  console.error(message, err);
  res.status(500).json({ message });
};

// router.post("/", authenticate, authorize(["faculty"]), async (req, res) => {
//     const { userId, username, reason, dates, status } = req.body;

//     try {
//       console.log("Leave request received:", req.body);

//       if (!userId || !username || !reason || !dates || dates.length === 0) {
//         return res.status(400).json({ message: "All fields are required" });
//       }

//       const newLeave = new Leave({ userId, username, reason, dates, status });
//       await newLeave.save();

//       console.log("Leave request saved successfully");
//       res.status(201).json({ message: "Leave request submitted successfully" });
//     } catch (err) {
//       console.error("Error submitting leave request:", err);
//       res.status(500).json({ message: "Error submitting leave request" });
//     }
//   });
// Submit a Leave Request
router.post("/", async (req, res) => {
  const { userId, username, reason, dates, status } = req.body;

  try {
    console.log("Leave request received:", req.body);

    // Validate required fields
    if (!userId || !username || !reason || !dates || dates.length === 0) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save the new leave request
    const newLeave = new Leave({ userId, username, reason, dates, status });
    await newLeave.save();

    console.log("Leave request saved successfully");
    res.status(201).json({ message: "Leave request submitted successfully" });
  } catch (err) {
    handleError(res, err, "Error submitting leave request");
  }
});

// router.get("/", authenticate, async (req, res) => {
//     try {
//       let leaveRequests;

//       if (req.user.userType === "faculty") {
//         // Faculty can view all leave requests
//         leaveRequests = await Leave.find();
//       } else if (req.user.userType === "student") {
//         // Students can view only their own leave requests
//         leaveRequests = await Leave.find({ userId: req.user._id });
//       } else {
//         return res.status(403).json({ message: "Forbidden: Access denied" });
//       }

//       res.json(leaveRequests);
//     } catch (err) {
//       console.error("Error fetching leave requests:", err);
//       res.status(500).json({ message: "Error fetching leave requests" });
//     }
//   });
//Get All Leave Requests
router.get("/", async (req, res) => {
  try {
    const leaveRequests = await Leave.find();
    res.json(leaveRequests);
  } catch (err) {
    handleError(res, err, "Error fetching leave requests");
  }
});

// // Update Leave Status (Faculty Only)
// router.put("/:id", authenticate, authorize(["faculty"]), async (req, res) => {
//     const { status } = req.body;

//     try {
//       const validStatuses = ["Pending", "Approved", "Declined"];
//       if (!validStatuses.includes(status)) {
//         return res.status(400).json({ message: "Invalid status value" });
//       }

//       const updatedLeave = await Leave.findByIdAndUpdate(
//         req.params.id,
//         { status },
//         { new: true }
//       );

//       if (!updatedLeave) {
//         return res.status(404).json({ message: "Leave request not found" });
//       }

//       res.json({ message: "Leave status updated successfully", leave: updatedLeave });
//     } catch (err) {
//       console.error("Error updating leave status:", err);
//       res.status(500).json({ message: "Error updating leave status" });
//     }
//   });

// // Update Leave Status
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  try {
    // Validate the status value
    const validStatuses = ["Pending", "Approved", "Declined"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update the leave request status
    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave request not found" });
    }

    res.json({
      message: "Leave status updated successfully",
      leave: updatedLeave,
    });
  } catch (err) {
    handleError(res, err, "Error updating leave status");
  }
});

module.exports = router;

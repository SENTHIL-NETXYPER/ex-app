import React, { useState } from "react";
import { useUser } from "../UserContext"; // Import useUser
import "./leaveForm.css";

const LeaveForm = () => {
  const { user } = useUser(); // Access user from context
  const [reason, setReason] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [dateInput, setDateInput] = useState("");

  // Debugging the user object
  console.log("User object:", user);

  const handleAddDate = () => {
    if (dateInput && !selectedDates.includes(dateInput)) {
      setSelectedDates([...selectedDates, dateInput]);
      setDateInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      userId: user.id,
      username: user.username, // Ensure this field exists in the user object
      reason,
      dates: selectedDates,
      status: "Pending",
    };

    console.log("Request body being sent:", requestBody);

    try {
      const response = await fetch("http://localhost:5000/api/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit leave request");
      }

      alert("Leave request submitted successfully!");
      setReason("");
      setSelectedDates([]);
    } catch (err) {
      console.error("Error submitting leave request:", err);
      alert(err.message);
    }
  };

  return (
    <div className="leave-form">
      <h2>Leave Application</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Reason for Leave"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        <button type="button" onClick={handleAddDate}>
          Add Date
        </button>
        <ul>
          {selectedDates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
        <button type="submit">Submit Leave Application</button>
      </form>
    </div>
  );
};

export default LeaveForm;

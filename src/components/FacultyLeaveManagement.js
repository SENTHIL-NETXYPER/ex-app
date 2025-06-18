import React, { useEffect, useState } from "react";

const FacultyLeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLeaveRequests(data);
    };

    fetchLeaveRequests();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const token = localStorage.getItem("authToken");
    await fetch(`http://localhost:5000/api/leave/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    setLeaveRequests((prev) =>
      prev.map((leave) => (leave._id === id ? { ...leave, status } : leave))
    );
  };

  return (
    <div>
      <h2>All Leave Requests</h2>
      <ul>
        {leaveRequests.map((leave) => (
          <li key={leave._id}>
            <p>
              {leave.username}: {leave.reason}
            </p>
            <p>Status: {leave.status}</p>
            <button onClick={() => handleStatusUpdate(leave._id, "Approved")}>
              Approve
            </button>
            <button onClick={() => handleStatusUpdate(leave._id, "Declined")}>
              Decline
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyLeaveManagement;

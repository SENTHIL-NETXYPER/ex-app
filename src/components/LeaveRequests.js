import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext"; // Import useUser
import "./leaveRequests.css";

const LeaveRequests = () => {
  const { user } = useUser(); // Access user from context
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leave");
        const data = await response.json();
        setLeaveRequests(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleAction = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/leave/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setLeaveRequests((prev) =>
          prev.map((request) =>
            request._id === id ? { ...request, status } : request
          )
        );
      } else {
        alert("Failed to update leave status.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="leave-requests">
      <h2>Leave Requests</h2>
      <ul>
        {leaveRequests.map((request) => (
          <li key={request._id}>
            <p>
              <strong>{request.username}</strong> requested leave for:
            </p>
            <ul>
              {request.dates.map((date, index) => (
                <li key={index}>{date}</li>
              ))}
            </ul>
            <p>Reason: {request.reason}</p>
            <p>Status: {request.status}</p>
            {user.userType === "Faculty" && request.status === "Pending" && (
              <>
                <button onClick={() => handleAction(request._id, "Approved")}>
                  Approve
                </button>
                <button onClick={() => handleAction(request._id, "Declined")}>
                  Decline
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequests;

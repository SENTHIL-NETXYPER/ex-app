import React, { useEffect, useState } from "react";

const StudentLeaveApplications = () => {
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

  return (
    <div>
      <h2>My Leave Applications</h2>
      <ul>
        {leaveRequests.map((leave) => (
          <li key={leave._id}>
            <p>Reason: {leave.reason}</p>
            <p>Dates: {leave.dates.join(", ")}</p>
            <p>Status: {leave.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentLeaveApplications;

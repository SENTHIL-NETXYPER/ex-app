import React from "react";
import { useUser } from "../UserContext";
import FacultyLeaveManagement from "./FacultyLeaveManagement";
import StudentLeaveApplications from "./StudentLeaveApplications";

const LeavePage = () => {
  const { user, logoutUser } = useUser();

  if (!user) {
    return <p>Please log in to access this page.</p>;
  }

  return (
    <div>
      <button onClick={logoutUser}>Logout</button> {/* Logout button */}
      {user.userType === "faculty" && <FacultyLeaveManagement />}
      {user.userType === "student" && <StudentLeaveApplications />}
    </div>
  );
};

export default LeavePage;

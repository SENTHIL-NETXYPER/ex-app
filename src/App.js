import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./UserContext"; // Importing UserProvider
import Navbar from "./components/Navbar"; // Navbar Component
import Home from "./components/Home"; // Home Component
import Login from "./components/Login"; // Login Component
import Register from "./components/Register"; // Register Component
import LeaveForm from "./components/LeaveForm"; // LeaveForm Component
import LeaveRequests from "./components/LeaveRequests"; // LeaveRequests Component
//import LeavePage from "./components/LeavePage";

const App = () => {
  console.log("App component loaded");
  return (
    <Router>
      <UserProvider>
        <Navbar /> {/* Ensure Navbar is at the top */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/leave-form" element={<LeaveForm />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;

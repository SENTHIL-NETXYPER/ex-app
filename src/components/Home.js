import React from "react";
import { useUser } from "../UserContext"; // Correct import for useUser
import "./home.css";

const Home = () => {
  const { user, logoutUser } = useUser(); // Using the custom hook `useUser`

  console.log("User object:", user); // Debugging the user object
  return (
    <div className="main-content">
      <h1>Welcome to the Home Page!</h1>
      
      {user ? (
        <>
          <p>Hello, {user.name || user.username || "User"}!</p>{" "}
          {/* Fallback logic */}
          <button onClick={logoutUser}>Log Out</button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Home;

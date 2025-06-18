import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// Create the context
const UserContext = createContext();

// Create a provider to wrap your app and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // We store the user in the state
  const navigate = useNavigate(); 
  // Simulate user login (for the sake of this example)
  const loginUser = (userData) => {
    console.log("Logging in user:", userData); // Debugging log
    setUser(userData); // Set user data when logged in
  };

  const logoutUser = () => {
    setUser(null); // Clear the user data when logged out
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use user context
export const useUser = () => {
  return useContext(UserContext);
};

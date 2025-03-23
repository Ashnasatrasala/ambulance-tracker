import React, { useState, useEffect } from "react";
import Login from "./Login";
import Tracking from "./Tracking";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // Check if user was previously logged in
  useEffect(() => {
    const savedUserData = localStorage.getItem('ambulanceTrackerUser');
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setUserData(parsedData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem('ambulanceTrackerUser');
      }
    }
  }, []);
  
  const handleLogin = (user) => {
    setUserData(user);
    setIsLoggedIn(true);
    // Save user data to localStorage for persistence
    localStorage.setItem('ambulanceTrackerUser', JSON.stringify(user));
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('ambulanceTrackerUser');
  };

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <Tracking userData={userData} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLogin} />
      )}
    </div>
  );
};

export default App;
import React, { useState } from "react";
import { db } from "./firebase";
import { ref, set } from "firebase/database";
import Spline from '@splinetool/react-spline';

const EmailForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("patient");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Generate a unique ID
      const userId = Date.now().toString();
      // Save to Realtime Database
      await set(ref(db, `${userType}s/${userId}`), {
        email: email,
        name: name,
        registeredAt: new Date().toISOString()
      });
      
      // Create user data object to pass to tracking page
      const userData = {
        id: userId,
        email: email,
        name: name,
        userType: userType
      };
      
      // Call onLoginSuccess with user data
      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }
      
      setLoading(false);
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Registration failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="app-title">
        <h1>Ambulance Tracker App</h1>
      </div>
      <div className="spline-wrapper">
        <Spline
          scene="https://prod.spline.design/GFqOadA2k9Ee3nDf/scene.splinecode"
        />
      </div>
      <div className="form-wrapper">
        <h3>Register Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="userType" 
                value="patient" 
                checked={userType === "patient"} 
                onChange={() => setUserType("patient")} 
              />
              Patient
            </label>
            <label>
              <input 
                type="radio" 
                name="userType" 
                value="driver" 
                checked={userType === "driver"} 
                onChange={() => setUserType("driver")} 
              />
              Driver
            </label>
            <label>
              <input 
                type="radio" 
                name="userType" 
                value="hospital" 
                checked={userType === "hospital"} 
                onChange={() => setUserType("hospital")} 
              />
              Hospital
            </label>
          </div>
          
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
          
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Register & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
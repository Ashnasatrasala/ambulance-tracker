import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue } from 'firebase/database';
import './styles/Tracking.css';

const Tracking = ({ userData, onLogout }) => {
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Fetch ambulance data from Firebase based on user type
      const dataRef = ref(db, userData?.userType === 'hospital' ? 'hospitals' : 'drivers');
      const unsubscribe = onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const dataList = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setAmbulances(dataList);
          setError(null);
        } else {
          setAmbulances([]);
        }
        setLoading(false);
      }, (error) => {
        console.error("Database error:", error);
        setError("Failed to load data. Please try again.");
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Setup error:", error);
      setError("Something went wrong. Please refresh the page.");
      setLoading(false);
    }
  }, [userData]);

  const handleAmbulanceSelect = (ambulance) => {
    setSelectedAmbulance(ambulance);
  };

  return (
    <div className="tracking-container">
      <div className="tracking-header">
        <h1>Ambulance Tracking</h1>
        <div className="user-info">
          <span>Welcome, {userData?.name || 'User'}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>
      
      <div className="tracking-content">
        <div className="ambulance-list">
          <h2>Available Ambulances</h2>
          {error ? (
            <p className="error-message">{error}</p>
          ) : loading ? (
            <p>Loading ambulances...</p>
          ) : ambulances.length > 0 ? (
            <ul>
              {ambulances.map(ambulance => (
                <li 
                  key={ambulance.id} 
                  onClick={() => handleAmbulanceSelect(ambulance)}
                  className={selectedAmbulance?.id === ambulance.id ? 'selected' : ''}
                >
                  <div className="ambulance-item">
                    <span className="ambulance-name">{ambulance.name || 'Unnamed Driver'}</span>
                    <span className={`ambulance-status ${ambulance.status?.toLowerCase() || 'available'}`}>
                      {ambulance.status || 'Available'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No ambulances available</p>
          )}
        </div>
        
        <div className="map-container">
          {selectedAmbulance ? (
            <div className="ambulance-details">
              <h3>{selectedAmbulance.name || 'Unnamed Driver'}</h3>
              <p>Email: {selectedAmbulance.email || 'No email provided'}</p>
              <p>Status: {selectedAmbulance.status || 'Available'}</p>
              <p>Registration: {new Date(selectedAmbulance.registeredAt).toLocaleDateString()}</p>
              <div className="map-placeholder">
                <p>Map will be displayed here</p>
                <p>Location data integration coming soon</p>
              </div>
            </div>
          ) : (
            <div className="select-prompt">
              <p>Select an ambulance to view details and location</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracking;
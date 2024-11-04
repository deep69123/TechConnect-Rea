// RetailerDashboard.js
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { db } from './firebase'; // Firestore instance
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import './RetailerDashboard.css';

function RetailerDashboard({ userId }) { // Accept userId as a prop
  const [metrics, setMetrics] = useState({
    totalSales: '',
    totalOrders: '',
    productsInStock: '',
    pendingOrders: '',
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!userId) {
        alert("No such userID...");
        return;
      }; // Ensure userId is available

      try {
        // Fetch metrics for the specific user
        const docRef = doc(db, "retailerMetrics", userId); // Use userId to fetch user-specific metrics
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMetrics(docSnap.data());
        } else {
          console.log("No metrics data found for this user!");
        }
      } catch (error) {
        console.error("Error fetching user metrics:", error);
      }
    };

    fetchMetrics();
  }, [userId]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <h1 className="welcome-message">Welcome, Retailer</h1>
        <div className="metrics">
          {Object.entries(metrics).map(([key, value]) => (
            <div className="metric-card" key={key}>
              <h3>{key.replace(/([A-Z])/g, ' $1')}</h3>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RetailerDashboard;

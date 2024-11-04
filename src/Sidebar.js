// Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Retailer Dashboard</h2>
      <ul>
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#orders">Orders</a></li>
        <li><a href="#inventory">Inventory</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;

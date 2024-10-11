<template>
    <div class="admin-container">
      <h1 class="dashboard-title">Admin Dashboard</h1>
  
      <!-- Website Overview Section -->
      <div class="dashboard-overview">
        <h2 class="section-title">Website Overview</h2>
        <div class="overview-grid">
          <div class="overview-item">
            <h3>Total Users</h3>
            <p>{{ totalUsers }}</p>
          </div>
          <div class="overview-item">
            <h3>Regular Users</h3>
            <p>{{ regularUsers }}</p>
          </div>
          <div class="overview-item">
            <h3>Admin Users</h3>
            <p>{{ adminUsers }}</p>
          </div>
        </div>
      </div>
  
      <!-- Export Buttons Section -->
      <div class="export-section">
        <h3 class="section-title">Export Data</h3>
        <div class="export-buttons">
          <button @click="exportData('bookings')">Export Bookings as CSV</button>
          <button @click="exportData('ratings')">Export Ratings as CSV</button>
          <button @click="exportPDF('bookings')">Export Bookings as PDF</button>
          <button @click="exportPDF('ratings')">Export Ratings as PDF</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { exportCSV, exportPDF } from '../utils/exportFunctions'; // Utility functions to handle exports
  
  export default {
    name: 'AdminView',
    data() {
      return {
        totalUsers: 0,  // Holds the total number of users
        regularUsers: 0, // Holds the number of regular users
        adminUsers: 1,  // Fixed number of admin users
      };
    },
    mounted() {
      this.getUserOverview(); // Fetch the user overview data when the component is mounted
    },
    methods: {
      // Function to export data (either bookings or ratings) as CSV
      exportData(dataKey) {
        exportCSV(dataKey); // Export the specified data as CSV
      },
  
      // Function to export data (either bookings or ratings) as PDF
      exportPDF(dataKey) {
        exportPDF(dataKey); // Export the specified data as PDF
      },
  
      // Function to retrieve and calculate the number of users
      getUserOverview() {
        const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve users from localStorage
  
        this.totalUsers = users.length + 1; // Total users include all regular users + 1 admin
        this.regularUsers = users.length;   // Number of regular users equals the number of usernames in localStorage
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-container {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f7f7f7;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  /* Title styling */
  .dashboard-title {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 40px;
    text-align: center;
  }
  
  /* Overview section styling */
  .dashboard-overview {
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #4CAF50;
    text-align: center;
  }
  
  .overview-grid {
    display: flex;
    justify-content: space-around;
    gap: 20px;
  }
  
  .overview-item {
    background-color: #fff;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    flex: 1;
  }
  
  .overview-item h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #4CAF50;
  }
  
  .overview-item p {
    font-size: 1.2rem;
    color: #333;
  }
  
  /* Export section styling */
  .export-section {
    margin-top: 40px;
  }
  
  .export-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  button {
    padding: 12px 24px;
    font-size: 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  
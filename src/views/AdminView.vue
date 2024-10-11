<template>
    <div class="admin-container">
      <h1>Admin Dashboard</h1>
      <button @click="exportData('bookings')">Export Bookings as CSV</button>
      <button @click="exportData('ratings')">Export Ratings as CSV</button>
      <button @click="exportPDF('bookings')">Export Bookings as PDF</button>
      <button @click="exportPDF('ratings')">Export Ratings as PDF</button>
    </div>
  </template>
  
  <script>
  import { exportCSV, exportPDF } from '../utils/exportFunctions'; // Assuming you've created these utilities
  
  export default {
    name: 'AdminView',
    methods: {
      exportData(dataKey) {
        // Export the specified data (bookings or ratings) as CSV
        exportCSV(dataKey); // Export as CSV
      },
      exportPDF(dataKey) {
        // Export the specified data (bookings or ratings) as PDF
        exportPDF(dataKey); // Export as PDF
      }
    }
  };
  </script>
  
  <style scoped>
  .admin-container {
    padding: 20px;
    text-align: center;
  }
  
  button {
    padding: 10px 20px;
    margin: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  
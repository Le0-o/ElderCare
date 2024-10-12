<template>
  <div class="admin-container">
    <h1 class="dashboard-title">Admin Dashboard</h1>

    <!-- Website Overview Section -->
    <div class="dashboard-overview">
      <h2 class="section-title">User Overview</h2>
      <div class="overview-item">
        <h3>Total Users</h3>
        <p>{{ totalUsers }}</p>
      </div>
    </div>

    <!-- User Data Section -->
    <div class="user-data-section">
      <h2 class="section-title">All Users</h2>
      <table class="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.uid">
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>{{ formatDate(user.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/init';  // Import Firestore configuration

export default {
  name: 'AdminView',
  data() {
    return {
      users: [],  // Holds all user data from Firestore
      totalUsers: 0,  // Holds the total number of users
    };
  },
  mounted() {
    this.getUserOverview(); // Fetch the user overview data when the component is mounted
  },
  methods: {
    // Function to retrieve and calculate the number of users
    async getUserOverview() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users')); // Get all users from Firestore
        const usersData = [];

        // Loop through the user documents and push them into usersData array
        querySnapshot.forEach(doc => {
          const userData = doc.data();
          usersData.push({
            uid: userData.uid,
            email: userData.email,
            role: userData.role,
            createdAt: userData.createdAt?.toDate() || new Date(), // Convert Firestore timestamp to JS date
          });
        });

        // Update the component's state
        this.users = usersData;
        this.totalUsers = usersData.length;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },

    // Function to format the date for display
    formatDate(date) {
      return date.toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.admin-container {
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #f7f7f7;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dashboard-title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 40px;
  text-align: center;
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #4CAF50;
  text-align: center;
}

.overview-item {
  background-color: #fff;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
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

.user-data-section {
  margin-top: 40px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-table th,
.user-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.user-table th {
  background-color: #4CAF50;
  color: white;
}

.user-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.user-table tr:hover {
  background-color: #ddd;
}
</style>

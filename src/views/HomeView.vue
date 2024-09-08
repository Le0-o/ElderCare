<template>
  <div class="home-container">

    <div class="hero-section">
      <h1>Welcome to ElderCare</h1>
      <p>Your trusted partner in providing compassionate care for the elderly.</p>
      <button class="btn btn-primary" @click="navigateToAbout">Learn More About Us</button>
    </div>

    <div class="info-section">
      <div class="info-card">
        <h3>Our Mission</h3>
        <p>To enhance the quality of life for elderly individuals by providing comprehensive, compassionate care.</p>
      </div>
      <div class="info-card">
        <h3>Our Services</h3>
        <p>24/7 support, health monitoring, community engagement, and tailored care plans.</p>
      </div>
      <div class="info-card">
        <h3>Join Our Community</h3>
        <p>Be a part of our caring community. Sign up today to start your journey with ElderCare.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '../router/authenticate';

const router = useRouter();
const { logout } = useAuth();

const navigateToAbout = () => {
  router.push({ name: 'About' });
};
</script>

<style scoped>
/* General page style */
.home-container {
  padding: 20px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #e0f7fa 0%, #e0f2f1 100%);
  min-height: 100vh;
}

/* Header and button styles */
.custom-header {
  background-color: #ffffff;
  padding: 10px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.nav-buttons {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.nav-button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  text-decoration: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
}

.home-button {
  background-color: #ff9800;
}

.about-button {
  background-color: #8bc34a;
}

.login-button {
  background-color: #2196f3;
}

.logout-button {
  background-color: #f44336;
}

.nav-button:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

/* Hero section */
.hero-section {
  background-color: #4caf50;
  color: white;
  padding: 40px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Info card section */
.info-section {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
}

.info-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 30%;
  min-width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Button styles */
.btn-primary {
  background-color: #ff9800;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #f57c00;
}
</style>

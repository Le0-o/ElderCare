<template>
  <!-- Improved Header Design -->
  <div class="container">
    <header class="custom-header d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link home-link" active-class="active" aria-current="page">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link about-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link login-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item">
          <button class="nav-link logout-link" @click="logout">Logout</button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import router from '../router/index'
import { useAuth } from '../router/authenticate'

const { isAuthenticated } = useAuth()

const logout = () => {
  isAuthenticated.value = false
  alert("Logout successful")
  router.push({ name: 'Home' })
}
</script>

<style scoped>
.custom-header {
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 10px;
}

.nav-pills .nav-link {
  border-radius: 20px;
  padding: 8px 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.home-link {
  background-color: #ff9800;
  color: white;
}

.about-link {
  background-color: #8bc34a;
  color: white;
}

.login-link {
  background-color: #2196f3;
  color: white;
}

.logout-link {
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
}

.nav-link:hover {
  transform: scale(1.05);
  opacity: 0.85;
}
</style>

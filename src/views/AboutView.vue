<template>
    <div class="about">
      <h1>About Our APP</h1>
      <p>Welcome to ElderCare! We're dedicated to providing a vast resources to our community.</p>
      <button @click="navigateToRating" class="btn btn-primary mt-3">Rate Us</button>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const navigateToRating = () => {
  router.push({ name: 'Rate' }); // Navigate to the Rating page
};
  </script>
  
  <style>
  </style>
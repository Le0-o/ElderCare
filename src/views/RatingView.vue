<template>
    <div class="container mt-5">
      <h2>Rate Our Service</h2>
      <select v-model="rating" @change="submitRating">
        <option disabled value="">Please select a rating</option>
        <option v-for="i in 5" :key="i" :value="i">{{ i }}</option>
      </select>
      <p>Average Rating: {{ averageRating }}</p>
      <button @click="goBack" class="btn btn-secondary mt-3">Back to Home</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const rating = ref('');
  const ratings = ref([]); // All user ratings
  
  const submitRating = () => {
    if (rating.value) {
      ratings.value.push(parseInt(rating.value));
      rating.value = '';
    }
  };
  
  const averageRating = computed(() => {
    if (ratings.value.length === 0) return 0;
    const sum = ratings.value.reduce((a, b) => a + b, 0);
    return (sum / ratings.value.length).toFixed(2);
  });
  
  const goBack = () => {
    router.push({ name: 'Home' }); // Navigate back to the Home page
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  </style>
  
<template>
  <div class="rating-container mt-5">
    <h2>Rate Our Service</h2>
    <div class="stars">
      <span 
        v-for="i in 5" 
        :key="i" 
        class="star" 
        :class="{ 'selected': i <= rating }" 
        @click="setRating(i)">
        ★
      </span>
    </div>
    <p>Average Rating: {{ averageRating }}</p>
    <button @click="goBack" class="btn btn-secondary mt-3">Back to Home</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const rating = ref(0);
const ratings = ref([]); // All user ratings

// Load stored ratings from localStorage on component mount
onMounted(() => {
  const storedRatings = JSON.parse(localStorage.getItem('ratings')) || [];
  ratings.value = storedRatings.map(r => Number(r)); // Convert stored values to numbers
});

// Set the rating and save to localStorage
const setRating = (value) => {
  rating.value = value;
  ratings.value.push(value);
  localStorage.setItem('ratings', JSON.stringify(ratings.value));
};

// Compute the average rating
const averageRating = computed(() => {
  if (ratings.value.length === 0) return 0;
  const sum = ratings.value.reduce((a, b) => a + b, 0);
  return (sum / ratings.value.length).toFixed(2);
});

// Navigate back to Home page
const goBack = () => {
  router.push({ name: 'Home' });
};
</script>

<style scoped>
.rating-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.stars {
  font-size: 2rem;
  color: #ddd;
  cursor: pointer;
}

.star.selected {
  color: #ffd700; /* Gold color for selected stars */
  transition: color 0.3s;
}

.btn-secondary {
  background-color: #2196F3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.btn-secondary:hover {
  background-color: #1976D2;
}
</style>

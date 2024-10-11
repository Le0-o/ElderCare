<script setup>
// Import necessary components
import JSONLab from './components/JSONLab.vue';
import BHeader from './components/BHeader.vue';
import LibraryRegistrationForm from './components/ElderCare.vue';
import FontSizeAdjuster from './FontSizeAdjuster.vue';

// Font size state management
import { ref, onMounted } from 'vue';

const fontSize = ref(16); // Default font size

// Load saved font size from localStorage when component is mounted
onMounted(() => {
  const savedFontSize = localStorage.getItem('fontSize');
  if (savedFontSize) {
    fontSize.value = parseInt(savedFontSize, 10);
  }
});

// Method to adjust font size based on user action
const adjustFontSize = (action) => {
  if (action === 'increase') {
    fontSize.value = Math.min(fontSize.value + 2, 24); // Max size limit 24px
  } else if (action === 'decrease') {
    fontSize.value = Math.max(fontSize.value - 2, 12); // Min size limit 12px
  }
  // Save the updated font size to localStorage
  localStorage.setItem('fontSize', fontSize.value);
};
</script>

<template>
  <div class="main-router" :style="{ fontSize: `${fontSize}px` }">
    <!-- Header section -->
    <header>
      <BHeader />
    </header>

    <!-- Main content section with dynamic router view -->
    <main class="main-box">
      <router-view />
    </main>

    <!-- FontSizeAdjuster Component to change font size -->
    <FontSizeAdjuster @changeFontSize="adjustFontSize" />
  </div>
</template>

<style scoped>
/* Global CSS to apply font family and ensure consistent styles */
body {
  font-family: Arial, sans-serif;
}

.main-router {
  padding: 20px;
}

.main-box {
  margin-top: 20px;
}

/* About section to center-align text */
.about {
  text-align: center;
}
</style>

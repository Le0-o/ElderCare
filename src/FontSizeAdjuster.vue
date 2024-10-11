<!-- src/components/FontSizeAdjuster.vue -->
<template>
    <div class="font-size-adjuster">
      <button @click="decreaseFontSize" aria-label="Decrease font size">A-</button>
      <button @click="increaseFontSize" aria-label="Increase font size">A+</button>
    </div>
  </template>
  
  <script>
  export default {
    emits: ['changeFontSize'],
    methods: {
      increaseFontSize() {
        this.$emit('changeFontSize', 'increase');
      },
      decreaseFontSize() {
        this.$emit('changeFontSize', 'decrease');
      }
    }
  }
  </script>
  
  <style scoped>
  .font-size-adjuster {
    position: fixed;
    top: 10px;
    right: 10px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  
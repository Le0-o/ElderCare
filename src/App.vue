<script setup>
import JSONLab from './components/JSONLab.vue'
import BHeader from './components/BHeader.vue'
import LibraryRegistrationForm from './components/ElderCare.vue'
</script>

<template>
  <div class="main-router">
  <header>
    <BHeader />
  </header>

  <main class="main-box">
    <!-- <LibraryRegistrationForm /> -->
    <!-- <JSONLab /> -->
    <router-view></router-view>
  </main>
  </div>
</template>

<style scoped>

.about{
  text-align: center;
}
</style>

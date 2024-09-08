
  <template>
    <div class="about-container">
      <div class="hero-section">
        <h1>About ElderCare</h1>
        <p>We are dedicated to improving the well-being of the elderly through compassionate care, innovative solutions, and community engagement.</p>
      </div>
  
      <div class="services-section">
        <h2>Our Services</h2>
        <ul>
          <li>24/7 Elderly Care Support</li>
          <li>Health Monitoring & Wellness Programs</li>
          <li>Community Activities & Events</li>
          <li>Customized Care Plans</li>
        </ul>
      </div>
  
      <div class="action-buttons">
        <button class="btn btn-primary" @click="learnMore">Rating</button>
        <button class="btn btn-secondary" @click="contactUs">Contact Us</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  const learnMore = () => {
    router.push({ name: 'Rate' }); // Redirect to the rating page for more details
  };
  
  const contactUs = () => {
    alert('You can reach us at contact@eldercare.org or call us at 123-456-7890.');
  };
  </script>
  
  <style scoped>
  .about-container {
    padding: 20px;
    background-color: #f0f0f0;
    color: #333;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .hero-section {
    background-color: #4CAF50; /* Main color */
    color: white;
    padding: 40px;
    border-radius: 10px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .services-section {
    margin: 20px 0;
    padding: 20px;
    background-color: #e7e7e7; /* Secondary color */
    border-radius: 10px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    background-color: #8BC34A;
    padding: 10px;
    margin: 5px 0;
    color: white;
    border-radius: 5px;
  }
  
  .action-buttons {
    text-align: center;
    margin-top: 20px;
  }
  
  .btn-primary {
    background-color: #2196F3; /* Button color */
    color: white;
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-secondary {
    background-color: #FF9800; /* Button color */
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    opacity: 0.8;
  }
  </style>
  
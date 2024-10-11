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
      <button class="btn btn-info" @click="navigateToEvents">Events</button>
    </div>

    <!-- Events table (this part is displayed when user clicks "Events") -->
    <div v-if="showEvents" class="events-section mt-5">
      <h2 class="text-center">Health Events</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in filteredEvents" :key="event.id">
            <td>{{ event.name }}</td>
            <td>{{ event.description }}</td>
            <td>{{ event.date }}</td>
            <td>{{ event.location }}</td>
            <td><button @click="bookEvent(event)" class="btn btn-primary">Book</button></td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination and Search -->
      <div class="search-pagination mt-3">
        <input v-model="searchTerm" class="form-control" placeholder="Search events..." />
        <nav aria-label="Event pages" class="mt-3">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="previousPage">Previous</a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
              <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showEvents = ref(false);  // Control visibility of events section
const searchTerm = ref('');  // Search input
const currentPage = ref(1);  // Current page
const itemsPerPage = 10;  // Number of events per page

// Sample event data
const events = ref([
  { id: 1, name: 'Health Checkup', description: 'Free health checkup for seniors.', date: '2024-10-20', location: 'Community Hall' },
  { id: 2, name: 'Yoga for Seniors', description: 'Yoga sessions tailored for seniors.', date: '2024-10-22', location: 'Wellness Center' },
  { id: 3, name: 'Flu Vaccination', description: 'Free flu vaccination.', date: '2024-11-01', location: 'Clinic' },
  { id: 4, name: 'Physical Therapy Seminar', description: 'Discussion on physical therapy techniques.', date: '2024-10-25', location: 'Rehab Center' },
  { id: 5, name: 'Mental Health Workshop', description: 'Workshop on managing mental health.', date: '2024-11-05', location: 'Mental Health Clinic' },
  { id: 6, name: 'Diabetes Screening', description: 'Screening for diabetes.', date: '2024-11-08', location: 'Community Center' },
  { id: 7, name: 'Dental Care Session', description: 'Free dental checkup.', date: '2024-11-10', location: 'Dental Clinic' },
  { id: 8, name: 'Nutrition Workshop', description: 'Nutritional advice for seniors.', date: '2024-11-15', location: 'Community Hall' },
  { id: 9, name: 'Hearing Aid Fitting', description: 'Free hearing aid fitting and consultation.', date: '2024-11-20', location: 'Hearing Clinic' },
  { id: 10, name: 'Cardiovascular Health Check', description: 'Heart health screening and advice.', date: '2024-11-25', location: 'Heart Center' },
  { id: 11, name: 'Arthritis Management Seminar', description: 'Learn about managing arthritis pain.', date: '2024-11-28', location: 'Wellness Center' },
  { id: 12, name: 'Vision Care', description: 'Eye checkup for seniors.', date: '2024-11-30', location: 'Vision Clinic' }
]);

// Pagination calculations
const totalPages = computed(() => Math.ceil(filteredEvents.value.length / itemsPerPage));
const filteredEvents = computed(() => {
  const filtered = events.value.filter(event => event.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filtered.slice(startIndex, startIndex + itemsPerPage);
});

// Handle pagination
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Navigation and booking functions
const navigateToEvents = () => {
  showEvents.value = true;  // Show the events table
};

const bookEvent = (event) => {
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  bookings.push({ ...event, bookedAt: new Date().toISOString() });
  localStorage.setItem('bookings', JSON.stringify(bookings));
  alert(`You have successfully booked: ${event.name}`);
};

const learnMore = () => {
  router.push({ name: 'Rate' }); // Redirect to the rating page
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
  background-color: #4CAF50;
  color: white;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
}

.services-section {
  margin: 20px 0;
  padding: 20px;
  background-color: #e7e7e7;
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
  background-color: #2196F3;
  color: white;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #FF9800;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.8;
}

.table {
  width: 100%;
  margin-top: 20px;
}

.table th, .table td {
  padding: 12px;
  text-align: left;
}

.search-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

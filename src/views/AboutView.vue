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
      <button class="btn btn-warning" @click="openEmailForm">Email</button>
    </div>

    <!-- Events table (this part is displayed when user clicks "Events") -->
    <div v-if="showEvents" class="events-section mt-5">
      <h2 class="text-center">Health Events</h2>

      <!-- Filter and Search Buttons -->
      <div class="event-controls mb-3">
        <button class="btn btn-info" @click="toggleSearch">Search</button>
        <button class="btn btn-secondary" @click="toggleFilter">Filter by Location</button>
      </div>

      <!-- Search Input Field -->
      <div v-if="showSearch" class="mb-3">
        <input v-model="searchTerm" class="form-control" placeholder="Search events..." />
      </div>

      <!-- Filter by Location Dropdown -->
      <div v-if="showFilter" class="mb-3">
        <select v-model="selectedLocation" class="form-control">
          <option value="">All Locations</option>
          <option v-for="location in uniqueLocations" :key="location" :value="location">{{ location }}</option>
        </select>
      </div>

      <!-- Event Table -->
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

    <!-- Email form section -->
    <div v-if="showEmailForm" class="email-section mt-5">
      <h2 class="text-center">Send Email</h2>
      <div class="email-form">
        <input v-model="email.to" placeholder="Recipient Email" class="form-control mb-2" />
        <input v-model="email.subject" placeholder="Email Subject" class="form-control mb-2" />
        <textarea v-model="email.text" placeholder="Email Body" class="form-control mb-2"></textarea>
        <input type="file" @change="handleFileUpload" class="form-control mb-2" />
        <button @click="sendEmail" class="btn btn-primary">Send Email</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

// Define router instance
const router = useRouter();

// State variables for the events table and email form
const showEvents = ref(false);  
const showEmailForm = ref(false);
const showSearch = ref(false);
const showFilter = ref(false);

// Email data model
const email = ref({
  to: '',
  subject: '',
  text: '',
  attachment: null
});

// Open email form function
const openEmailForm = () => {
  showEmailForm.value = true;
};

// File upload handler
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    email.value.attachment = reader.result.split(',')[1]; // Keep only base64 part
  };
  reader.readAsDataURL(file);
};

// Function to send email using Axios to the server-side endpoint
const sendEmail = async () => {
  try {
    await axios.post('http://localhost:3001/send-email', {
      to: email.value.to,
      subject: email.value.subject,
      text: email.value.text,
      attachment: email.value.attachment
    });
    alert('Email sent successfully');
  } catch (error) {
    alert('Failed to send email');
    console.error(error);
  }
};

// Event data and pagination logic
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
]);  

const searchTerm = ref('');
const selectedLocation = ref('');  // Holds the selected location for filtering
const currentPage = ref(1);
const itemsPerPage = 10;

// Computed property for unique locations
const uniqueLocations = computed(() => {
  const locations = events.value.map(event => event.location);
  return [...new Set(locations)];
});

// Computed property for filtering and searching events
const filteredEvents = computed(() => {
  let filtered = events.value;
  if (selectedLocation.value) {
    filtered = filtered.filter(event => event.location === selectedLocation.value);
  }
  if (searchTerm.value) {
    filtered = filtered.filter(event => event.name.toLowerCase().includes(searchTerm.value.toLowerCase()));
  }
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  return filtered.slice(startIndex, startIndex + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredEvents.value.length / itemsPerPage));

// Pagination navigation functions
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

// Event booking function
const bookEvent = (event) => {
  const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
  bookings.push({ ...event, bookedAt: new Date().toISOString() });
  localStorage.setItem('bookings', JSON.stringify(bookings));
  alert(`You have successfully booked: ${event.name}`);
};

// Toggle functions for showing search and filter
const toggleSearch = () => {
  showSearch.value = !showSearch.value;
};

const toggleFilter = () => {
  showFilter.value = !showFilter.value;
};

// Navigation and other utility functions
const navigateToEvents = () => {
  showEvents.value = true;
};

const learnMore = () => {
  router.push({ name: 'Rate' });
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

.btn-primary, .btn-secondary, .btn-info, .btn-warning {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  min-width: 100px;
}

.btn-primary {
  background-color: #2196F3;
}

.btn-secondary {
  background-color: #FF9800;
}

.btn-info {
  background-color: #17a2b8;
}

.btn-warning {
  background-color: #ffc107;
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

/* Email form styling */
.email-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.email-form input, .email-form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.email-form button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.email-form button:hover {
  background-color: #45a049;
}
</style>

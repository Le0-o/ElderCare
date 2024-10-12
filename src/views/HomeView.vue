<template>
  <div class="home-container">
    <div class="hero-section">
      <h1>Welcome to ElderCare</h1>
      <p>Your trusted partner in providing compassionate care for the elderly.</p>
      <button class="btn btn-primary" @click="navigateToAbout">Learn More About Us</button>
    </div>

    <div class="info-section">
      <div class="info-card">
        <h3>Our Mission</h3>
        <p>To enhance the quality of life for elderly individuals by providing comprehensive, compassionate care.</p>
      </div>
      <div class="info-card">
        <h3>Our Services</h3>
        <p>24/7 support, health monitoring, community engagement, and tailored care plans.</p>
      </div>
      <div class="info-card">
        <h3>Join Our Community</h3>
        <p>Be a part of our caring community. Sign up today to start your journey with ElderCare.</p>
      </div>
    </div>

    <!-- Mapbox Section -->
    <div class="map-section">
      <h2>Explore Locations</h2>
      <div id="map" class="map"></div>
      <div class="map-controls">
        <input v-model="searchQuery" placeholder="Search for places..." @keypress.enter="searchLocation" />
        <button @click="searchLocation">Search</button>
        <button @click="navigateBetweenPlaces">Navigate</button>
        <button @click="getUserLocation">Locate Me</button> <!-- 新增定位按钮 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import mapboxgl from 'mapbox-gl';

const router = useRouter();
const searchQuery = ref('');
let map, marker, navigationControl;

// Set up Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibGNkbGNkIiwiYSI6ImNtMjZyOGh2bDE3aGUyam9oc3gzeWI1dHQifQ.rmdEC0D8USgHs5lWSYR_NA';

// Function to navigate to the About page
const navigateToAbout = () => {
  router.push({ name: 'About' });
};

// Function to initialize the map
const initializeMap = () => {
  map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  // Add navigation controls (zoom in/out)
  navigationControl = new mapboxgl.NavigationControl();
  map.addControl(navigationControl, 'top-right');

  // Add a marker
  marker = new mapboxgl.Marker().setLngLat([-74.5, 40]).addTo(map);
};

// Function to request user's location and center map
const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = [position.coords.longitude, position.coords.latitude];

      // Update map to user's location
      map.flyTo({ center: userLocation, zoom: 12 });

      // Add marker at user's location
      new mapboxgl.Marker({ color: 'red' })
        .setLngLat(userLocation)
        .addTo(map);
    }, (error) => {
      console.error('Error getting user location:', error);
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
};

// Function to search for a location
const searchLocation = async () => {
  const query = searchQuery.value;
  if (!query) return;

  // Use Mapbox's geocoding API to find the location
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const [lng, lat] = data.features[0].center;

    // Update the map to center on the new location
    map.flyTo({ center: [lng, lat], essential: true });
    marker.setLngLat([lng, lat]).addTo(map);
  } catch (error) {
    console.error('Error searching location:', error);
  }
};

// Function to simulate navigating between places
const navigateBetweenPlaces = () => {
  const start = [-74.5, 40]; // Example start point (replace with real locations)
  const end = [-73.9, 40.7]; // Example end point

  // Use Mapbox Directions API for navigation
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}.json?access_token=${mapboxgl.accessToken}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const route = data.routes[0].geometry.coordinates;
      const routeGeoJSON = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
      };

      // Add the route to the map
      if (map.getSource('route')) {
        map.getSource('route').setData(routeGeoJSON);
      } else {
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: routeGeoJSON,
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3b9ddd',
            'line-width': 5,
          },
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching directions:', error);
    });
};

// Initialize the map on component mount
onMounted(() => {
  initializeMap();
});
</script>

<style scoped>
.home-container {
  padding: 20px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #e0f7fa 0%, #e0f2f1 100%);
  min-height: 100vh;
}

/* Hero section */
.hero-section {
  background-color: #4caf50;
  color: white;
  padding: 40px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Info card section */
.info-section {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
}

.info-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 30%;
  min-width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Map section */
.map-section {
  margin-top: 40px;
}

.map {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.map-controls {
  margin-top: 10px;
}

.map-controls input {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.map-controls button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.map-controls button:hover {
  background-color: #45a049;
}
</style>

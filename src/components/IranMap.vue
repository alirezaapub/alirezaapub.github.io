<template>
  <div class="iran-map-container">
    <div id="map" class="map-area"></div>
    <button @click="goBack" class="back-button">Back to Main</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// Leaflet is expected to be available globally via window.L
// import L from 'leaflet'; // This might not work in subtask if not configured for global

const emit = defineEmits(['back']);

const map = ref<any>(null); // Using any for Leaflet map instance type

onMounted(async () => {
  if (window.L) {
    const L = window.L;
    map.value = L.map('map').setView([32.4279, 53.6880], 5); // Centered on Iran

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);

    try {
      const response = await fetch('/world.geojson');
      if (!response.ok) {
        console.error('Failed to fetch world.geojson:', response.statusText);
        return;
      }
      const worldData = await response.json();

      const iranFeature = worldData.features.find(
        (feature: any) => feature.properties.name === 'Iran'
      );

      if (iranFeature) {
        L.geoJSON(iranFeature, {
          style: () => ({
            color: '#006400',       // Dark green border
            weight: 2,
            opacity: 1,
            fillColor: '#90EE90',   // Light green fill
            fillOpacity: 0.5
          })
        }).addTo(map.value);
      } else {
        console.error('Iran feature not found in GeoJSON data.');
      }
    } catch (error) {
      console.error('Error loading or processing GeoJSON:', error);
    }
  } else {
    console.error('Leaflet (L) not found on window. Make sure it is loaded.');
  }
});

function goBack() {
  emit('back');
}
</script>

<style scoped>
.iran-map-container {
  position: fixed; /* Or absolute, depending on layout needs */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white; /* Or a background that fits the app */
  z-index: 100; /* Ensure it's above other content */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.map-area {
  width: 90%;
  height: 80%;
  border: 1px solid #ccc;
}

.back-button {
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #0056b3;
}
</style>

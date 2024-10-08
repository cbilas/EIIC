// Initialize the map and set its view to the center of the world
var map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tile layer (this is the map background)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Example data: Number of people helped per country
var helpData = {
  "Afghanistan": 100,
  "United States of America": 120,
  "Mexico": 85,
  "Canada": 50,
  "India": 230
};

// When a country is clicked, show the number of people helped
function onCountryClick(countryName) {
  var count = helpData[countryName] || 0; // Default to 0 if the country is not in the data
  alert(`People helped from ${countryName}: ${count}`);
}

// Load GeoJSON data for countries
fetch('world.geojson')
  .then(response => {
    if (!response.ok) {
      throw new Error('GeoJSON file could not be loaded');
    }
    return response.json();
  })
  .then(geoData => {
    // Add GeoJSON layer to the map
    L.geoJSON(geoData, {
      onEachFeature: function (feature, layer) {
        // For each country (feature), add a click event listener
        layer.on('click', function () {
          var countryName = feature.properties.name; // "name" is the country name in your GeoJSON
          onCountryClick(countryName); // Call function with the clicked country's name
        });
      }
    }).addTo(map);
  })
  .catch(error => {
    console.error("Error loading GeoJSON:", error);
  });


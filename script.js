let startTime = null;
let timerActive = false;
let markerPlaced = false; 

//begin in specified area
const map = L.map('map').setView([-40.35626731604201, 175.61136884964438], 13); //adjust here
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to add marker on map
function onMapClick(e) {
    if (!markerPlaced) { // Allow marker to be placed once
        L.marker(e.latlng).addTo(map)
            .openPopup();
        markerPlaced = true; // Set flag to true
        document.getElementById('output').textContent = "Press spacebar to start the timer.";
    }
}

// Add event listener for map click
map.on('click', onMapClick);

// Timer functionality
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && markerPlaced) { // Check if a marker is placed
        if (!timerActive) {
            // Start timer
            startTime = new Date();
            timerActive = true;
            document.getElementById('output').textContent = "Press spacebar again to stop the timer.";
        } else {
            // Stop  timer
            const endTime = new Date();
            const elapsedTime = Math.round((endTime - startTime) / 1000); // convert to seconds
            const distance = (elapsedTime / 3)
            timerActive = false;
            document.getElementById('output').textContent = `Strike approximately ${distance} kilometers away`;
            startTime = null; // Reset startTime 
        }
    } else if (!markerPlaced) {
        document.getElementById('output').textContent = "Please place a marker first!";
    }
});
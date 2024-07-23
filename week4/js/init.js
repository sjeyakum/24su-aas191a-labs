// week 4 variables
let mapObjects = {
    "coordinate": [-118.4430,34.0691],
    "zoomLevel": 7.5
}

// Initialize the map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapObjects.coordinate,
    zoom: mapObjects.zoomLevel
});

// return button

function createReturnLink() {
    const returnDiv = document.getElementById('return');
    const returnLinks = [
        { text: 'Return', link: 'https://sjeyakum.github.io/24su-aas191a-labs/week3/index.html' }
    ];
 
    returnLinks.forEach(item => {
        const a = document.createElement('a');
        a.href = item.link;
        a.style.marginRight = '10px'; // Add some spacing between the buttons
 
 
        const button = document.createElement('button');
        button.textContent = item.text;
        button.classList.add('pagelink-button');
        button.style.display = 'inline-block'; // Ensure the buttons are displayed inline
 
 
        a.appendChild(button);
        returnDiv.appendChild(a); // Append to returnDiv, not return
    });
 }

 window.onload = function() {
    createReturnLink();
 }; 

// marker

function addMarker(data){
    let lng = data['lng'];
    let lat = data['lat'];
    let success = data['Did you escape in time?'];
    let completedEscapeRoom = data['Have you completed an escape room before in either Ventura, Orange, or Los Angeles County?'];
    let name = data['Please provide the name of the escape room location you completed.'];
    let room = data['Please provide the name of a room at this location.'];
    let comment = data['Please share 1-2 sentences about your experience!'];

    let keyType;
    if (success.includes('Yes')) {
        keyType = 'mint_key';
    } else if (success.includes('No')) {
        keyType = 'coral_key';
    } else if (success.includes('So close! (was on the last clue)')) {
        keyType = 'blue_key';
    } else {
        keyType = 'key'; // Default marker if location doesn't match expected values
    }

    let popup_message;
    if (completedEscapeRoom === "Yes") {
        let popup_message = `<div style="font-size: 1.0em;"><strong style="color: darkpurple;">Name:</strong> <span style="color: darkpurple;">${name}</span></div>`;
        popup_message += `<div style="font-size: 1.0em;"><strong style="color: darkpurple;">Room:</strong> <span style="color: darkpurple;">${room}</span></div><br>`;
        popup_message += `<div style="font-size: 1.0em;"><strong>Comment:</strong> <span>${comment}</span></div>`;
        
        // Create and add marker only if completedEscapeRoom is "Yes"
        const marker = new maplibregl.Marker({
            element: createCustomMarkerElement(keyType)
        })
            .setLngLat([lng, lat])
            .setPopup(new maplibregl.Popup({
                maxwidth: "300px",
                className: "custom-popup"
            })
                .setHTML(popup_message))
            .addTo(map);
    }

}

// custom markers
function createCustomMarkerElement(keyType) {
    const markerElement = document.createElement('div');
    markerElement.style.width = '50px'; // Set width to 1080px
    markerElement.style.height = '50px'; // Set height to 1080px
    markerElement.style.backgroundSize = 'contain';
    markerElement.classList.add('map-marker'); // new

    switch (keyType) {
        case 'mint_key':
            markerElement.style.backgroundImage = 'url(mint_key.png)';
            markerElement.setAttribute('id', 'mint_key'); // Set ID for mint key markers
            break;
        case 'coral_key':
            markerElement.style.backgroundImage = 'url(coral_key.png)';
            markerElement.setAttribute('id', 'coral_key'); // Set ID for coral key markers
            break;
        case 'blue_key':
            markerElement.style.backgroundImage = 'url(blue_key.png)';
            markerElement.setAttribute('id', 'blue_key'); // Set ID for blue key markers
            break;
        default:
            markerElement.style.backgroundImage = 'url(key.png)'; // should not show up, orange key (from week 3 lab)
            break;
    }

    markerElement.style.transition = "opacity 0.3s ease"; 
    markerElement.addEventListener('mouseenter', function() {
        markerElement.style.opacity = 0.6;
    });
    markerElement.addEventListener('mouseleave', function() {
        markerElement.style.opacity = 1.5;
    });

    return markerElement;
}

// change marker visibility with legend buttons 
document.addEventListener('DOMContentLoaded', function() {
    const mintButton = document.getElementById('mint_key_button');
    const coralButton = document.getElementById('coral_key_button');
    const blueButton = document.getElementById('blue_key_button');

    const mintMarkers = document.querySelectorAll('.mint-marker');
    const coralMarkers = document.querySelectorAll('.coral-marker');
    const blueMarkers = document.querySelectorAll('.blue-marker');

    // Function to toggle marker visibility based on button click
    function toggleMarkerVisibility(button, markersToShow) {
        button.addEventListener('click', function() {
            // Hide all markers first
            mintMarkers.forEach(marker => marker.style.display = 'none');
            coralMarkers.forEach(marker => marker.style.display = 'none');
            blueMarkers.forEach(marker => marker.style.display = 'none');
            
            // Show only the markers corresponding to the clicked button
            markersToShow.forEach(marker => marker.style.display = 'block');
            
            // Reset opacity of all buttons
            const allButtons = document.querySelectorAll('.legend-item');
            allButtons.forEach(btn => {
                btn.style.opacity = 1.0;
            });
            
            // Adjust opacity of clicked button
            button.style.opacity = 0.7;
        });
    }

    // Attach event listeners to each button and toggle markers accordingly
    toggleMarkerVisibility(mintButton, mintMarkers);
    toggleMarkerVisibility(coralButton, coralMarkers);
    toggleMarkerVisibility(blueButton, blueMarkers);
});

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIdfMZVYK05649xvXyQp9JL6QZSoM_NaVawqEZz5tBx1sTcNiwA61_o8asg5XiI_dbzp1_sX8k8Xam/pub?gid=2128111423&single=true&output=csv";

map.on('load', function() {
    Papa.parse(dataUrl, {
        download: true, // Tells PapaParse to fetch the CSV data from the URL
        header: true, // Assumes the first row of your CSV are column headers
        complete: function(results) {
            // Process the parsed data
            processData(results.data); // Use a new function to handle CSV data
        }
    });
});

function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        //console.log(feature) // for debugging: are we seeing each feature correctly?
        // assumes your geojson has a "title" and "message" attribute
        // let coordinates = feature.geometry.coordinates;
        let longitude = feature['lng']
        let latitude = feature['lat'];
        let name = feature['Please provide the name of the escape room location you completed in the county you selected above. '];
        let room = feature['Please provide the name of a room at this location.'];
        let comment = feature['Please share 1-2 sentences about your experience!'];
        addMarker(feature);
    });
};
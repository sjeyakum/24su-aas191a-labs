// week 3
let mapObjects = {
    "coordinate": [-118.4430,34.0691],
    "zoomLevel": 8
}

// Initialize the map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapObjects.coordinate,
    zoom: mapObjects.zoomLevel
});

// keys
function addMarker(lat,lng,title,message){
    let popup_message = `<h3>${title}</h3> <h4>${message}</h4>`
    
    // create custom marker 
    let marker = new maplibregl.Marker({
            element: createCustomMarkerElement('key.png', title, message)

        })       
        .setLngLat([lng,lat])
        .setPopup(new maplibregl.Popup({
            maxWidth: "300px",
            className: "custom-popup"
        })
        .setHTML(popup_message))
        .addTo(map);

    createButtons(lat,lng,title);
    return message;
}

function createCustomMarkerElement(iconUrl, title, message) {
    let markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.backgroundImage = `url('${iconUrl}')`;
    markerElement.style.backgroundSize = 'cover';
    markerElement.style.width = '50px';
    markerElement.style.height = '50px';
    markerElement.style.cursor = 'pointer';

    markerElement.style.transition = "opacity 0.3s ease"; 
    markerElement.addEventListener('mouseenter', function() {
        markerElement.style.opacity = 0.6;
    });
    markerElement.addEventListener('mouseleave', function() {
        markerElement.style.opacity = 1.5;
    });

    markerElement.title = title;
    markerElement.message = message;

    return markerElement;
}

function createPageLinks() {
    const labsDiv = document.getElementById('labs');

    const labs = [
        { text: 'Lab #1', link: 'https://sjeyakum.github.io/24su-aas191a-labs/week1/index.html' },
        { text: 'Lab #2', link: 'https://sjeyakum.github.io/24su-aas191a-labs/week2/index.html' },
        { text: 'Lab #3', link: 'https://sjeyakum.github.io/24su-aas191a-labs/week3/index.html' }
    ];

    labs.forEach(lab => {
        const a = document.createElement('a');
        a.href = lab.link;
        a.style.marginRight = '10px'; // Add some spacing between the buttons
        
        const button = document.createElement('button');
        button.textContent = lab.text;
        button.classList.add('pagelink-button');
        button.style.display = 'inline-block'; // Ensure the buttons are displayed inline
        
        a.appendChild(button);
        labsDiv.appendChild(a);
    });
}

window.onload = function() {
    createPageLinks();
};

// puzzle piece buttons

function createButtons(latitude,longitude,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button" + title; 
    newButton.style.display = "inline-flex"; 
    newButton.style.alignItems = "center";  
    newButton.style.justifyContent = "center"; 
    newButton.style.backgroundColor = 'transparent';
    newButton.style.border = "none";
    newButton.style.margin =  "10px";
    newButton.style.cursor = "pointer"; 
    newButton.style.fontSize = "16px";         
    newButton.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
    newButton.style.padding = "5px 10px";

    newButton.style.backgroundImage = "url('puzzlepiece.png')"; // image URL
    newButton.style.backgroundSize = "contain"; // contain or cover image in button
    newButton.style.backgroundPosition = "center";
    newButton.style.backgroundRepeat = "no-repeat"; 
    newButton.style.width = "220px"; // button width
    newButton.style.height = "100px"; // button height

    // dim button
    newButton.style.transition = "opacity 0.3s ease"; 
    newButton.addEventListener('mouseenter', function() {
        newButton.style.opacity = 0.6;
    });
    newButton.addEventListener('mouseleave', function() {
        newButton.style.opacity = 1.5;
    });

    newButton.innerHTML += title; 

    newButton.setAttribute("lat",latitude); 
    newButton.setAttribute("lng",longitude); 
    newButton.addEventListener('click', function() {
        map.flyTo({
            center: [longitude, latitude],
            essential: true
        });
        playSound('sound');
        newButton.classList.add('rotate-animation');

        // reset after completion code
        setTimeout(function() {
            newButton.classList.remove('rotate-animation');
        }, 600); // timing!
        });

    document.getElementById("contents").appendChild(newButton);
}

// Play sound function
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0; // Restart sound from beginning
    sound.play();
}

// GeoJSON data
map.on('load', function() {
    console.log("This is the map!")

    fetch("map.geojson")
        .then(response => response.json())
        .then(data => {
            processData(data); // Call processData with the fetched data
        })
        .catch(error => console.error('Error fetching GeoJSON: ', error));
});

function processData(results){
    console.log(results)
    // results.features.forEach(result => {
    for (let i = 0; i < results.features.length; i++) {
        let coordinates = results.features[i].geometry.coordinates;  // coordinates array      
        let longitude = coordinates[0]
        let latitude = coordinates[1]
        let name = results.features[i].properties.Name;
        let place = results.features[i].properties.Place;
        let room = results.features[i].properties.FavoriteRoom;
        let link = results.features[i].properties.Link;

        let content = `<span style="font-weight: 600;">Location:</span> ${place}<br>`;
        content += `<span style="font-weight: 600;">Favorite Room:</span> ${room}<br>`;
        content += `<a href="${link}" target="_blank">Check it out!</a>`;

        addMarker(latitude, longitude, name, content);    
    }
}
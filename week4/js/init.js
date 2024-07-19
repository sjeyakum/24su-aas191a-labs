// week 4 variables
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

// custom markers, keys
function addMarker(lat,lng,title,message,keyType){
    let popup_message = `<h3>${title}</h3> <h4>${message}</h4>`
    
    // create custom marker 
    let marker = new maplibregl.Marker({
        element: createCustomMarkerElement(keyType)

    })       
        .setLngLat([lng,lat])
        .setPopup(new maplibregl.Popup({
            maxWidth: "300px",
            className: "custom-popup"
        })
            .setHTML(popup_message))
        .addTo(map);
}

// key types

function createCustomMarkerElement(keyType) {
    let iconURL;
    switch (keyType) {
        case 'mint_key':
            iconURL = 'mint_key.png';
            break;
        case 'coral_key':
            iconURL = 'coral_key.png';
            break;
        case 'blue_key':
            iconURL = 'blue_key.png';
            break;
        default:
            iconURL = 'key.png';
    }

    let markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.backgroundImage = `url('${iconURL}')`;
    markerElement.style.backgroundSize = 'cover';
    markerElement.style.width = '50px';
    markerElement.style.height = '50px';
    markerElement.style.cursor = 'pointer';
    markerElement.title = 'Marker';

    markerElement.style.transition = "opacity 0.3s ease";
    markerElement.addEventListener('mouseenter', function () {
        markerElement.style.opacity = 0.6;
    });
    markerElement.addEventListener('mouseleave', function () {
        markerElement.style.opacity = 1.5;
    });

    return markerElement;
}

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

// Google Form

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSIdfMZVYK05649xvXyQp9JL6QZSoM_NaVawqEZz5tBx1sTcNiwA61_o8asg5XiI_dbzp1_sX8k8Xam/pub?gid=2128111423&single=true&output=csv";

map.on('load', function() {
    Papa.parse(dataUrl, {
        download: true,
        header: true,
        complete: (results) => {
            processData(results.data);
        }
    });
});

function processData(results){
    // console.log(results) ; for debugging: this can help us see if the results are what we want
    results.forEach(data => {
        let location = data['Please provide the name of one escape room location you completed.'];
        let room = data['Please provide the name of a room at this location.'];
        let comment = data['Please share 1-2 sentences about your experience!'];
        let county = data['Select one county in which you completed an escape room.'];

        let content = `<span style="font-weight: 600;">Name:</span> ${location}<br>`;
        content += `<span style="font-weight: 600;">Room:</span> ${room}<br>`;
        content += `<span style="font-weight: 600;">Comment:</span> ${comment}<br>`;

        if (completedEscapeRoom === "Yes") {
            let content = `<span style="font-weight: 600;">Name:</span> ${location}<br>`;
            content += `<span style="font-weight: 600;">Room:</span> ${room}<br>`;
            content += `<span style="font-weight: 600;">Comment:</span> ${comment}<br>`;

            let keyType;
            if (county.includes('Ventura')) {
                keyType = 'mint_key';
            } else if (county.includes('Orange')) {
                keyType = 'coral_key';
            } else if (county.includes('Los Angeles')) {
                keyType = 'blue_key';
            } else {
                keyType = 'key';
            }

            addMarker(parseFloat(data.lat), parseFloat(data.lng), location, content, keyType);
        }
    });
}



// function addMarker(data) {
//     let popup_message;
//     let longitude = data['lng']
//     let latitude = data['lat'];
//     if (data['Have you completed an escape room before in either Ventura, Orange, or Los Angeles County?'] == "Yes") {
//         popup_message = `<h2>Vaccinated</h2> <h3>Location: ${data['Where did you get vaccinated?']}</h3> <p>Zip Code: ${data['What zip code do you live in?']}</p>`
//     }
//     else {
//         popup_message = none
//     }
    
//     new maplibregl.Marker() {
//         .setLngLat([lng, lat])
//         .setPopup(new maplibregl.Popup()
//             .setHTML(popup_message))
//         .addTo(map)
//     }

//     let message = feature['Please share 1-2 sentences about your experience!'];
//     addMarker(latitude,longitude,location,title,message);
// };
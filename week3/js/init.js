// week 3 lab activity

const coordinate = [-118.4430,34.0691];
let zoomLevel = 15;

let mapObjects = {
    "coordinate": [-118.4430,34.0691],
    "zoomLevel": 12
}

// Initialize the map
const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1',
    center: mapObjects.coordinate,
    zoom: mapObjects.zoomLevel
});

function addMarker(lat,lng,title,message){
    let popup_message = `<h2>${title}</h2> <h3>${message}</h3>`
    new maplibregl.Marker()
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

function processData(results){
    console.log(results)
    results.features.forEach(result => {
        let coordinates = results.geometry.coordinates
        let longitude = coordiantes[0]
        let latitude = coordinates[1]
        let title = result.properties.title;
        let message = result.properties.message
        consolelog(result)
        addMarker(result.)
    })
}

map.on('load', function() {
    console.log("This is the map!")
    fetch("map.geojson")
        .then(response => response.json())
        .then(data => {
            processData(data); // Call processData with the fetched data
        });
});

function processData(data) {
    console.log("Map is loading!")
    console.log(data);
}

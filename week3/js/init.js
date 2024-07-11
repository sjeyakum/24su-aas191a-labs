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

function createButtons(latitude,longitude,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button" + title; 
    newButton.style.display = "inline-flex"; // text in line  
    newButton.style.alignItems = "center"; // text centered vertically 
    newButton.style.justifyContent = "center"; // text centered horizontally
    newButton.style.backgroundColor = 'transparent';
    newButton.style.border = "none";
    newButton.style.margin =  "10px";
    newButton.style.cursor = "pointer"; 
    newButton.style.fontSize = "14px";         
    newButton.style.fontFamily = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";
    newButton.style.padding = "5px 10px";

    newButton.style.backgroundImage = "url('puzzle.jpg')"; // image URL
    newButton.style.backgroundSize = "contain"; // contain image in button
    newButton.style.backgroundRepeat = "no-repeat"; 
    newButton.style.width = "110px"; // button width
    newButton.style.height = "50px"; // button height
    
    // add image
    // const img = document.createElement("img");
    // img.src = "plate.png";
    // img.style.width = "30px";
    // img.style.height = "20px";
    // img.style.marginRight = "5px"; // gap

    // dim button
    newButton.style.transition = "opacity 0.3s ease"; 
    newButton.addEventListener('mouseenter', function() {
        newButton.style.opacity = 0.6;
    });
    newButton.addEventListener('mouseleave', function() {
        newButton.style.opacity = 1.5;
    });

    // append
    // newButton.appendChild(img);
    newButton.innerHTML += title; 

    newButton.setAttribute("lat",latitude); 
    newButton.setAttribute("lng",longitude); 
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [longitude,latitude], 
        })
    })
    document.getElementById("contents").appendChild(newButton); 
}

// GeoJSON data
map.on('load', function() {
    console.log("This is the map!")
    fetch("map.geojson")
        .then(response => response.json())
        .then(data => {
            processData(data); // Call processData with the fetched data
        });
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
        console.log(results);
        addMarker(latitude, longitude, name, `${place}: ${room}`);
    }
}
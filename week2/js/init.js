// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.46799975901826,34.04025541111296], // Starting position [lng, lat] 34.04025541111296, -118.46799975901826
    zoom: 12 // Starting zoom level
});

// adding markers
// let, new, function, and const are keywords! variables cannot be keywords

function addMarker(latitude,longitude,title,message){ 
    new maplibregl.Marker()
        .setLngLat([longitude,latitude])
        .setPopup(new maplibregl.Popup()
            .setHTML(`<h2>${title}</h2><h4>${message}</h4>`)
            )   
        .addTo(map)
    createButtons(latitude,longitude,title);
}

addMarker(34.039216040007375, -118.4425111543923, "Chinchikurin","The pan-fried noodles here are amazing!")
addMarker(34.058362622167536, -118.41699844344514,"Din Tai Fung","I always get the chocolate dumplings here for dessert!")
addMarker(34.050568696525715, -118.46014294375658,"Sham India's Oven","I once got free samosas because I spoke the same South Indian language as the chef")
addMarker(34.05953525344204, -118.4451484901527,"Tulsi","They have the best lunch combo options here. I recommend trying out their paneer masala.")
addMarker(34.015413613125325, -118.4979674083517, "Elephanté","The rosé pasta was so delicious! I don't go here regularly becuase it's expensive, but it's a great fine dining restaurant.")

function createButtons(latitude,longitude,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button" + title; 
    newButton.innerHTML = title; 

    // added image
    const img = document.createElement("img");
    img.src = "plate.png";
    img.style.width = "20repx";
    img.style.height = "20px";
    newButton.appendChild(img);

    newButton.setAttribute("lat",latitude); 
    newButton.setAttribute("lng",longitude); 
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [longitude,latitude], 
        })
    })
    document.getElementById("contents").appendChild(newButton); 
}

const btn = document.querySelector("#changeColorBtn");

// light pink, light orange, light red background colors
const colors = ['#ffb6c1', '#ffcc99', '#ff9999'];

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

btn.addEventListener("click", () => {
    const index = getRandomIndex(colors.length);
    const rndCol = colors[index];
    document.documentElement.style.backgroundColor = rndCol; // Change background color of <html> element
    // document.body.style.backgroundColor = rndCol;
});
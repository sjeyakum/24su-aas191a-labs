// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // old style URL
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

    newButton.style.backgroundImage = "url('plate.png')"; // image URL
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

const btn = document.querySelector("#changeColorBtn");

// change background color to use addEvent Listener
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
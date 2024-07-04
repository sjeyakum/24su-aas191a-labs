// original code
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.4430,34.0691], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});

new maplibregl.Marker()
    .setLngLat([ -118.444, 34.0709])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I used to work in '))
    .addTo(map);

// adding markers
let ucla;
let metro;
let games;

// let is more flexible than const
//number
// let box1 = 5;
// let box2 = 5.0;

//string
// let box3 = 'five';
// let box4 = "five";

// string literal, uses backticks and ${variable} to bring in another variable
// let box5 = `this is from box #4: ${box4}`;

// array (also known as a list)
// let box6 = [1,2,3,4,5]; 

// object, stores variables together, can be of different types!
// let box7 = {"number": 'five', "value":5};

// boolean (true or false)
// let box8 = true;

// null value
// let emptyBox;
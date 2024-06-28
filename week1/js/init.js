// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL', // Your style URL
    center: [-118.444, 34.0709], // Starting position [lng, lat]
    zoom: 15,
    pitch: 45,
    bearing: -17.6,
    antialias: true
});

// Add a marker to the map
new maplibregl.Marker()
    .setLngLat([-118.441978, 34.070290])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('<div><b>Evelyn & Mo Ostin Music Café</b><br/><img src="https://cdn-icons-png.flaticon.com/256/10775/10775777.png" width="100"/><br/>My favorite menu item from here is the cinnamon roll!</div>'))
    .addTo(map);

new maplibregl.Marker()
    .setLngLat([-118.442145, 34.068219])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('</div><b>Yoshinoya</b><br/><img src="https://static.vecteezy.com/system/resources/previews/036/085/711/original/ai-generated-chicken-teriyaki-bowl-on-transparent-background-png.png" width="100"/><br/>My favorite restaurant in the Bombshelter! I usually get their chicken teriyaki bowl!</div>'))
    .addTo(map);

new maplibregl.Marker()
    .setLngLat([-118.442370, 34.075330])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('<div><b>Northern Lights Café</b><br/><img src="https://png.pngtree.com/png-clipart/20230917/original/pngtree-sandwich-icon-icon-illustration-vector-png-image_12290588.png" width="100"/><br/>It is convenient that the café is located right next to YRL. I love their chicken pesto panini!</div>'))
    .addTo(map);


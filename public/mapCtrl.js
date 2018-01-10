// initialize map
var mymap = L.map('mapid').setView([41.8781, -87.6298], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FyYW5rd2F0cmEiLCJhIjoiY2pjNDAwZmF3MGtraDJxamRsdXo3Zm1obyJ9.C_CJcAwCEGNXNfz3NF8miw'
}).addTo(mymap);

// add marker
var marker = L.marker([41.8781, -87.6298]).addTo(mymap);

// add shapes and polygons
var circle = L.circle([41.87595, -87.61897], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 245
}).addTo(mymap);

var polygon = L.polygon([
    [41.88068, -87.63682],
    [41.88685, -87.62815],
    [41.88642, -87.63637]
]).addTo(mymap);

// add popups on click
function onMapClick(e) {
  var popup = L.popup();
  popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mymap);
}
mymap.on('click', onMapClick);

// add hover events
marker.bindPopup("Welcome to Chicago");
marker.on('mouseover', function (e) {
    this.openPopup();
});
marker.on('mouseout', function(e){
  this.closePopup();
})

circle.bindPopup("This is a circle")
circle.on('mouseover', function (e) {
    this.openPopup();
});
circle.on('mouseout', function(e){
  this.closePopup();
})

// add geoJSON feature to map
var myStyle = {"color": "#ff7800"}

$.getJSON("chicago.geojson", function(json) {
  var geojsonfeature = json // this will show the info it in firebug console
  L.geoJSON(geojsonfeature, {
    style: myStyle
  }).addTo(mymap);
});

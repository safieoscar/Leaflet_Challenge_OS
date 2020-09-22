// Creating map object
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 3
  });

  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: "pk.eyJ1Ijoic2FmaWVvc2NhciIsImEiOiJja2Y4bHY2cnQwMGpxMnFxbmF6NzBscGNiIn0.qZ1Z090Wau7I3cBN1qNY0w"
}).addTo(myMap);

var geoUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

function createMap (inputData) {
    function magnitudeColor(feature){
        var magnitude = features.properties.mag;
        var color = "";

        if (magnitude > 6) {
            color = "#B22222";
        }
        else if (magnitude > 5) {
            color = "#DC143C";
        }
        else if (magnitude > 4) {
            color = "#CD5C5C";
        }
        else if (magnitude > 3) {
            color = "#F08080";
        }
        else if (magnitude > 2) {
            color = "#FFB6C1";
        }
        else {
            color = "#FFE4E1";
        }
        var mapStyle = {
            opacity: 1,
            fillOpacity: 1,
            color: "#000000",
            fillColor: color,
            radius: magnitude * 7,
            stroke: true,
            weight: 0.5
        };

        function onEachFeature (feature, layer) {
            layer.bindPopup("<h3>" + features.properties.place + 
            "</h3><hr><p>" + new Date(features.properties.time) +
            "</p><br><p>Magnitude: " + features.properties.mag + "</p>")
        };

        d3.json(geoUrl, function(data) {
            L.geoJson(inputData, {
                style: mapStyle,
                onEachFeature: onEachFeature
        
            }).addTo(myMap);
    });

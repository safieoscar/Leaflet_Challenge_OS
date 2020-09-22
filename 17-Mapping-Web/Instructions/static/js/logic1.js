//Addding a tile layer
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: "pk.eyJ1Ijoic2FmaWVvc2NhciIsImEiOiJja2Y4bHY2cnQwMGpxMnFxbmF6NzBscGNiIn0.qZ1Z090Wau7I3cBN1qNY0w"
    })

// Creating map object
var myMap = L.map("map", {
    center: [13.706520, -89.246099],
    zoom: 3
});

lightmap.addTo(myMap);

//Load in geojson data
var geoUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

//Using D3 to retreive the data
d3.json(geoUrl, function(data) {
    //Create magnitude color function
    function magnitudeColor(magnitude) {
        
        if (magnitude > 5) {
            color = "#B22222";
        }
        else if (magnitude > 4) {
            color = "#DC143C";
        }
        else if (magnitude > 3) {
            color = "#CD5C5C";
        }
        else if (magnitude > 2) {
            color = "#F08080";
        }
        else if (magnitude > 1) {
            color = "#FFB6C1";
        }
        else {
            color = "#FFE4E1";
        }
        return color;
    };
    
    //Create map style function
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            color: "#000000",
            fillColor: magnitudeColor(feature.properties.mag),
            radius: getMagnitude(feature.properties.mag),
            stroke: true,
            weight: 0.5
        }
    };

    function onEachFeature (feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + 
        "</h3><hr><p>" + new Date(feature.properties.time) +
        "</p><br><p>Magnitude: " + feature.properties.mag + "</p>")
    };

    function getCoordinates(feature, latlng) {
        return L.circleMarker(latlng);
            };

    
    function getMagnitude(magnitude) {
        return magnitude*4;
        };

    L.geoJson(data, {
        onEachFeature: onEachFeature,
        style: mapStyle,
        pointToLayer: getCoordinates
        }).addTo(myMap);

    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var colors = ["#FFE4E1", "#FFB6C1", "#F08080", "#CD5C5C", "#DC143C", "#B22222"];
        var grades = [0, 1, 2, 3, 4, 5];

            for (var i = 0; i < grades.length; i++) {
                div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
                grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
            }
            return div;
        };
    
    legend.addTo(myMap);
    
});

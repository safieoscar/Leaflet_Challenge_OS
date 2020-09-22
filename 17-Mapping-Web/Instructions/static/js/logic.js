

//Addding a tile layer
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: "pk.eyJ1Ijoic2FmaWVvc2NhciIsImEiOiJja2Y4bHY2cnQwMGpxMnFxbmF6NzBscGNiIn0.qZ1Z090Wau7I3cBN1qNY0w"
    })

// Creating map object
var myMap = L.map("map", {
    center: [0, 0],
    zoom: 3
});

lightmap.addTo(myMap);

//Load in geojson data
var geoUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

function displayMap(inputData) {
    
    //Create a function to show each earthquake's magnitude
    function magnitudeColor(mag){
        //var magnitude = features.properties.mag;
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
        return color;
    }

    var latlng = L.latLng([feature.geometry.coordinates[1],feature.geometry.coordinates[0]])
        console.log(latlng);
        return L.circleMarker(latlng, geojsonMarkerOptions);
        }

    function getMagnitude(mag) {
        return mag*7;
    }
    function mapStyle(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            color: "#000000",
            fillColor: magnitudeColor(feature.properties.magnitude),
            radius: magnitudeColor(feature.properties.magnitude),
            stroke: true,
            weight: 0.5
        };
        
    }
   

    function onEachFeature (feature, layer) {
        layer.bindPopup("<h3>" + features.properties.place + 
        "</h3><hr><p>" + new Date(features.properties.time) +
        "</p><br><p>Magnitude: " + features.properties.mag + "</p>")
    };
    
    var earthquake = L.geoJson(inputData, {
            style: mapStyle,
            pointToLayer: magnitudeColor,
            onEachFeature: onEachFeature
        })
    

    earthquake.addTo(myMap);

d3.json(geoUrl, function(response) {
    displayMap(response.features);
})
    
};

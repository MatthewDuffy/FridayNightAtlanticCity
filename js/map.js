var map = L.map('map');

map.setView([39.3601, -74.4203], 14);


//
// ESRI IMAGERY
//
var imagery = L.tileLayer(
'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
{
    attribution: 'Esri'
}
);


//
// ESRI TOPO OVERLAY
//
var topo = L.tileLayer(
'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
{
    opacity: 0.40
}
);

imagery.addTo(map);
topo.addTo(map);


//
// MODAL WINDOW
//
const modal = document.getElementById("viewerModal");
const frame = document.getElementById("mediaFrame");

document.getElementById("closeModal").onclick = function () {
    modal.style.display = "none";
    frame.src = "";
};


//
// HARDCODED EMBEDDABLE LIST
//
const embeddableSites = [
    "casino.hardrock.com"
];

function launchMedia(url) {

    let embed = embeddableSites.some(site =>
        url.includes(site)
    );

    if (embed) {

        frame.src = url;
        modal.style.display = "block";

    } else {

        window.open(url, "_blank");
    }
}


//
// CUSTOM MARKER STYLE
//
function markerStyle(feature, latlng) {

    return L.circleMarker(latlng, {
        radius: 8,
        fillColor: "#ff4db8",
        color: "#ffff00",
        weight: 2,
        opacity: 1,
        fillOpacity: 1
    });
}


//
// LOAD GEOJSON
//
fetch('data/FridayNightEventsAtlanticCity.geojson')
.then(response => response.json())

.then(data => {

    var layer = L.geoJSON(data, {

        pointToLayer: markerStyle,

        onEachFeature: function(feature, layer) {

            let addr = feature.properties.Match_addr;

            let media = feature.properties.Media;

            let popupContent = `
                <strong>${addr}</strong>
                <br><br>
                <button onclick="launchMedia('${media}')">
                    View Events
                </button>
            `;

            layer.bindPopup(popupContent);
        }
    });

    layer.addTo(map);

    map.fitBounds(layer.getBounds(), {
        padding: [20,20]
    });

});

var map = L.map('map');

map.setView([39.3601, -74.4203], 14);
//
// ESRI TRANSPORTATION
//
var transportation = L.tileLayer(
'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
{
    opacity: 0.4
}
);
//
// ESRI IMAGERY
//
var imagery = L.tileLayer(
'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
{
    opacity: 0.8
}
);
//
// ESRI REFERENCE LABELS
//
var labels = L.tileLayer(
'https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
{
    opacity: 1.0
}
);

imagery.addTo(map);
labels.addTo(map);
transportation.addTo(map);

//
// MODAL VIEWER
//
const modal = document.getElementById("viewerModal");
const frame = document.getElementById("mediaFrame");

const locationTitle =
    document.getElementById("locationTitle");

const locationAddress =
    document.getElementById("locationAddress");

document.getElementById("closeModal").onclick = function () {
    modal.style.display = "none";
    frame.src = "";
};

//
// OPEN SITE INSIDE MAP
//
function launchMedia(url)
{
    frame.src = url;
    modal.style.display = "block";
}

function openVenue(title, address, url)
{
    locationTitle.textContent = title;

    locationAddress.textContent = address;

    frame.src = url;

    modal.style.display = "block";
}

//
// OPEN SITE IN SEPARATE WINDOW
//
function openExternal(url)
{
    window.open(
        url,
        "VenueWebsite",
        "width=1200,height=800,resizable=yes,scrollbars=yes"
    );
}

//
// MARKER STYLE
//
function markerStyle(feature, latlng)
{
    return L.circleMarker(latlng, {
        radius: 10,
        fillColor: "#ff4db8",
        color: "#ffff00",
        weight: 3,
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
            let media;
                if (addr.includes("Hard Rock")) {
                    media = "venues/hardrock.html";
                }
                else if (addr.includes("Anchor Rock")) {
                    media = "venues/anchorrockclub.html";
                }
                else if (addr.includes("Cardinal")) {
                    media = "venues/cardinalrestaurant.html";
                }
                else if (addr.includes("Little Water")) {
                    media = "venues/littlewaterdistillery.html";
                }
                else if (addr.includes("Beer Hall")) {
                    media = "venues/beerhall.html";
                }
                else if (addr.includes("Iron Room")) {
                    media = "venues/ironroom.html";
                }
                else if (addr.includes("Seed")) {
                    media = "venues/seedbeerproject.html";
                }
                else if (addr.includes("Bar32")) {
                    media = "venues/bar32.html";
                }
                else if (addr.includes("Absecon")) {
                    media = "venues/abseconlighthouse.html";
                }
                else {
                media = feature.properties.Media;
                }

            layer.on('click', function ()
            {
                openVenue(
                    addr,
                    '',
                    media
                );
            });
        }
    });

    layer.addTo(map);

    map.fitBounds(layer.getBounds(), {
        padding: [20,20]
    });

});

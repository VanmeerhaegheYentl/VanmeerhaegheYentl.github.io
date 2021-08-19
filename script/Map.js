const serverEndPoint = 'http://api.open-notify.org/iss-now.json';
const loadData = setInterval(data, 1000)
let long, lat, jsonData, map, htmlLong, htmlLat, button;

function getDOMElements(){
    htmlLat = document.getElementById('lat');
    htmlLong = document.getElementById('long');
    button = document.getElementById('reset-button');
};

async function getLocationData(){
    await fetch(serverEndPoint)
    .then(response => response.json())
    .then((data) => jsonData = data);
    long = jsonData.iss_position.longitude;
    lat = jsonData.iss_position.latitude;
};

function data(){
    if(jsonData == undefined) {
        console.log("Data is being parsed")
     } else {
        
     }
}

function makeMap(){
    console.log('called MakeMap')
    map = new ol.Map({
        target: 'Map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([long, lat]),
            zoom: 4
        })
    });
};

function addMapPoint(lat, lng) {
    var vectorLayer = new ol.layer.Vector({
        source:new ol.source.Vector({
          features: [new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([parseFloat(lng), parseFloat(lat)], 'EPSG:4326', 'EPSG:3857')),
            })]
        }),
        style: new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 0.5],
            anchorXUnits: "fraction",
            anchorYUnits: "fraction",
            src: "../img/svg/satellite.png"
          })
        })
      });

      map.addLayer(vectorLayer);
};

function fillLongLat(){
    htmlLong.innerHTML += long
    htmlLat.innerHTML += lat
};

function recenter() {
    let state = true
    button.addEventListener('click', function(){
        location.reload();
    });
};

document.addEventListener('DOMContentLoaded', async function () {
    console.log('Map.js loaded!');
    getDOMElements();
    await getLocationData();
    console.log(long, lat)
    fillLongLat();
    makeMap();
    addMapPoint(lat, long);
});
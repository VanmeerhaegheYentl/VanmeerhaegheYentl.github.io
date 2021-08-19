const serverEndPoint = 'http://api.open-notify.org/iss-now.json';
const loadData = setInterval(data, 1000)
let long, lat, jsonData;


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



document.addEventListener('DOMContentLoaded', async function () {
    console.log('GetLocation.js loaded!');
    await getLocationData();
    console.log(long, lat);
});
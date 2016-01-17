function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


var map = L.map('map').setView([37.74555,-119.59969], 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'theturrible.onjf9geo',
    accessToken: 'pk.eyJ1IjoidGhldHVycmlibGUiLCJhIjoiY2lqajA3ZTh3MDJ6OHRmbTV2Y2ZxY3JjZSJ9.yuIM93I3TyHVMAIHI9NwAQ'
}).addTo(map);

//get the track
var geoJsonTrack = httpGet("http://localhost:8080/track/track1");
L.geoJson(JSON.parse(geoJsonTrack)).addTo(map);



import StationVelibManager from "./StationVelibManager.js";
import OSMmap from "./OSMmap.js";



var myOSMmap=new OSMmap();
myOSMmap.initMap();

myOSMmap.macarte.on('locationfound', onLocationFound);

function onLocationFound(e) {


  //  var myPosition = L.marker([myLat, myLon],{icon: myIcon}).addTo(this.getMaCarte());
  // myPosition.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

  var myIcon = L.icon({
    iconUrl: 'https://icon-library.com/images/geolocation-icon-png/geolocation-icon-png-5.jpg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  //  popupAnchor: [-3, -76],
    //shadowSize: [68, 95],
  //  shadowAnchor: [22, 94]
});


  L.marker(e.latlng,{icon: myIcon}).addTo(myOSMmap.macarte);
  }


var myStationVelibManager=new StationVelibManager();
myStationVelibManager.init_StationVelib();

console.log ("[CALL addMarkerVelib]");
myOSMmap.addMarkerVelib(myStationVelibManager.arrayStation_Velib);


//document.getElementById ("BtnClearMarker").addEventListener ("click", cleanMap(), false);

function refreshMap()
{
  cleanMap();
  resetMap();
}

function cleanMap()
{
    myOSMmap.cleanMap();
}

function resetMap()
{
  myOSMmap.addMarkerVelib(myStationVelibManager.arrayStation_Velib);
}
window.cleanMap = cleanMap;
window.resetMap = resetMap;
window.refreshMap = refreshMap;
//myOSMmap.getMyPosition();

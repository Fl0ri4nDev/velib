import StationVelibManager from "./StationVelibManager.js";
import OSMmap from "./OSMmap.js";



var myOSMmap=new OSMmap();
myOSMmap.initMap();

myOSMmap.macarte.on('locationfound', onLocationFound);

function onLocationFound(e) {
  L.marker(e.latlng).addTo(myOSMmap.macarte);
  }


var myStationVelibManager=new StationVelibManager();
myStationVelibManager.init_StationVelib();

console.log ("[CALL addMarkerVelib]");
myOSMmap.addMarkerVelib(myStationVelibManager.arrayStation_Velib);


//document.getElementById ("BtnClearMarker").addEventListener ("click", cleanMap(), false);

function cleanMap()
{
  console.log ("[cleanMap]");
  myOSMmap.cleanMap();
}

function resetMap()
{
  console.log ("[resetMap]");
  myOSMmap.addMarkerVelib(myStationVelibManager.arrayStation_Velib);
}
window.cleanMap = cleanMap;
window.resetMap = resetMap;
//myOSMmap.getMyPosition();

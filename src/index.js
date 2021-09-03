import StationVelibManager from "./StationVelibManager.js";
import OSMmap from "./OSMmap.js";

var myLat=0;
var myLon=0;

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
  myLat=e.latlng.lat;
  myLon=e.latlng.lng;
  L.marker(e.latlng,{icon: myIcon}).addTo(myOSMmap.macarte);
  }


var myStationVelibManager=new StationVelibManager();
myStationVelibManager.init_StationVelib();

console.log ("[CALL addMarkerVelib]");
myOSMmap.addMarkerVelib(myStationVelibManager.arrayStation_Velib);


function getStationsDistance()
{
  var myArrayStationsInPerimeter=myStationVelibManager.getStationsByDistance(500, myLat, myLon)
  myStationVelibManager.SwitchAllStationDisplay(false);

  var i=0;
  for(i=0;i<myArrayStationsInPerimeter.length;i++)
  {
  myArrayStationsInPerimeter[i].displayOnMap=true;
  addBlockStation(myArrayStationsInPerimeter[i].stationName,myArrayStationsInPerimeter[i].veloMecanique,myArrayStationsInPerimeter[i].placesLibres);
  }
  refreshMap();

}


function addBlockStation(pStationName, pNbVeloMecanique, pNbPlacesLibres)
{
  var myHTMLContainer=document.getElementById("containerListStations");
  var newBlocStation = document.createElement('div');
  newBlocStation.className="stationBloc";
  newBlocStation.innerHTML=pStationName +"<hr>";


  var newBlocDispoVelo = document.createElement('div');
  newBlocDispoVelo.className="bloc_DispoVelo";
  newBlocDispoVelo.innerHTML="<img src='../img/bike.png' class='iconVelo'>"+pNbVeloMecanique;

  var newBlocDispoPlace = document.createElement('div');
  newBlocDispoPlace.className="bloc_DispoPlace";
  newBlocDispoPlace.innerHTML="<img src='../img/bikePark.png' class='iconPlace'>"+pNbPlacesLibres;


  var newBlocDispo = document.createElement('div');
  newBlocDispo.className="bloc_DispoStation";
  newBlocDispo.appendChild(newBlocDispoVelo);
  newBlocDispo.appendChild(newBlocDispoPlace);



newBlocStation.appendChild(newBlocDispo);


  myHTMLContainer.appendChild(newBlocStation);
}
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



function displayAll()
{
  myStationVelibManager.SwitchAllStationDisplay(true);
    resetMap();

}
window.displayAll=displayAll;
window.getStationsDistance=getStationsDistance;
window.cleanMap = cleanMap;
window.resetMap = resetMap;
window.refreshMap = refreshMap;
//myOSMmap.getMyPosition();

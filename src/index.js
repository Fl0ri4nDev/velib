import StationVelibManager from "./StationVelibManager.js";
import OSMmap from "./OSMmap.js";

var myLat=0;
var myLon=0;

var myOSMmap=new OSMmap();
myOSMmap.initMap();

var self=myOSMmap;
myOSMmap.macarte.on('click', function(e) {

    self.currentPositionLat=e.latlng.lat;
    self.currentPositionLon= e.latlng.lng;
    var myIcon = L.icon({
      iconUrl: 'https://icon-library.com/images/geolocation-icon-png/geolocation-icon-png-5.jpg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      });

    self.layerMarkerPosition.clearLayers();
    var myPositionMarker=L.marker(e.latlng,{icon: myIcon});
    myPositionMarker.addTo(self.layerMarkerPosition);
    self.layerMarkerPosition.addTo(self.macarte);
    displayOnlyStationAround(1000);

});




var myStationVelibManager=new StationVelibManager();
myStationVelibManager.init_StationVelib();


myOSMmap.addMarkerVelib(myStationVelibManager.arrayStation_Velib);





function addBlockStation(pStationName, pNbVeloMecanique,pNbVeloElectrique, pNbPlacesLibres)
{
  var myHTMLContainer=document.getElementById("containerListStations");
  var newBlocStation = document.createElement('div');
  newBlocStation.className="stationBloc";
  newBlocStation.innerHTML=pStationName.slice(0,25) +"<hr>";


  var newBlocDispoVelo = document.createElement('div');
  newBlocDispoVelo.className="bloc_DispoVelo";
  newBlocDispoVelo.innerHTML="<img src='../img/bike.png' class='iconVelo'> "+(pNbVeloMecanique+pNbVeloElectrique) + " [ M:"+pNbVeloMecanique + " | E:"+pNbVeloElectrique+" ]";

  var newBlocDispoPlace = document.createElement('div');
  newBlocDispoPlace.className="bloc_DispoPlace";
  newBlocDispoPlace.innerHTML="<img src='../img/bikePark.png' class='iconPlace'> "+pNbPlacesLibres;

  var newBlocDispo = document.createElement('div');
  newBlocDispo.className="bloc_DispoStation";
  newBlocDispo.appendChild(newBlocDispoVelo);
  newBlocDispo.appendChild(newBlocDispoPlace);

  newBlocStation.appendChild(newBlocDispo);
  myHTMLContainer.appendChild(newBlocStation);
}


function displayOnlyStationAround(pDistance)
{
  cleanListStation();
  var myArrayStationsInPerimeter = myStationVelibManager.selectOnlyStationInPerimeter(myOSMmap.currentPositionLat,myOSMmap.currentPositionLon, pDistance);
  var i=0;
  for(i=0;i<myArrayStationsInPerimeter.length;i++)
  {
    addBlockStation(myArrayStationsInPerimeter[i].stationName,myArrayStationsInPerimeter[i].veloMecanique,myArrayStationsInPerimeter[i].veloElectrique,myArrayStationsInPerimeter[i].placesLibres);
  }
  refreshMap();

}


function cleanListStation()
{
  var div = document.getElementById('containerListStations');
  while(div.firstChild)
  {
    div.removeChild(div.firstChild);
  }
}


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
window.displayOnlyStationAround=displayOnlyStationAround;
window.cleanMap = cleanMap;
window.resetMap = resetMap;
window.refreshMap = refreshMap;
//myOSMmap.getMyPosition();

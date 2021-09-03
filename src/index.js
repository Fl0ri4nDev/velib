import StationVelibManager from "./StationVelibManager.js";
import OSMmap from "./OSMmap.js";

var myLat=0;
var myLon=0;

var myOSMmap=new OSMmap();
myOSMmap.initMap();


var myStationVelibManager=new StationVelibManager();
myStationVelibManager.init_StationVelib();


myOSMmap.addMarkerVelib(myStationVelibManager.arrayStation_Velib);





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


function displayOnlyStationAround()
{
  cleanListStation();
  console.log("displayOnlyStationAround");
  var myArrayStationsInPerimeter = myStationVelibManager.selectOnlyStationInPerimeter(myOSMmap.currentPositionLat,myOSMmap.currentPositionLon);
  var i=0;
  for(i=0;i<myArrayStationsInPerimeter.length;i++)
  {
    addBlockStation(myArrayStationsInPerimeter[i].stationName,myArrayStationsInPerimeter[i].veloMecanique,myArrayStationsInPerimeter[i].placesLibres);
  }



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

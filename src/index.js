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
    var myDistanceInput=document.getElementById("inputDistance").value;
    displayOnlyStationAround(myDistanceInput);

});




var myStationVelibManager=new StationVelibManager();
myStationVelibManager.init_StationVelib();


myOSMmap.addMarkerVelib(myStationVelibManager.arrayStation_Velib);





function addBlockStation(pStationVelib)
{

  var myStationName=pStationVelib.stationName;
  var myNbVeloMecanique=pStationVelib.veloMecanique;
  var myNbVeloElectrique=pStationVelib.veloElectrique;
  var myNbPlacesLibres=pStationVelib.placesLibres;

  var myDistance= parseInt(myStationVelibManager.Distance(pStationVelib.lat,pStationVelib.lon,myOSMmap.currentPositionLat,myOSMmap.currentPositionLon));

  var classStationVide="";
  var classStationPleine="";

  if(myNbVeloMecanique+myNbVeloElectrique==0)
  {
    classStationVide="noVelo ";
  }
if(myNbPlacesLibres==0)
  {
    classStationPleine="noPlaces";
  }


  var myHTMLContainer=document.getElementById("containerListStations");
  var newBlocStation = document.createElement('div');
  newBlocStation.className="stationBloc";
newBlocStation.id=pStationVelib.stationID;


newBlocStation.addEventListener('click', function (event) {
var currentVelibList=[];
currentVelibList.push(pStationVelib);
  myOSMmap.addMarkerVelib(currentVelibList);

  alert(newBlocStation.id)
});
            // do something


  var newBlocStationTitre = document.createElement('div');
  newBlocStationTitre.className="bloc_titre";
  newBlocStationTitre.innerHTML=myStationName +" ("+myDistance + "m)";



//  var newBlocDispoVeloMeca = document.createElement('div');
//  newBlocDispoVeloMeca.className="bloc_DispoVelo";
//  newBlocDispoVeloMeca.innerHTML=myNbVeloMecanique +"<img src='../img/bike.png' class='iconVelo'>";

  var newBlocDispoVeloElec = document.createElement('div');
  newBlocDispoVeloElec.className="bloc_DispoVelo "+ classStationVide;
  newBlocDispoVeloElec.innerHTML=myNbVeloMecanique+"|"+myNbVeloElectrique+"<br><img src='../img/bike.png' class='iconVelo'> ";

  var newBlocDispoPlace = document.createElement('div');
  newBlocDispoPlace.className="bloc_DispoPlaces "+ classStationPleine;
  newBlocDispoPlace.innerHTML=myNbPlacesLibres+"<br><img src='../img/bikePark.png' class='iconPlace'> ";

  var newBlocDispo = document.createElement('div');
  newBlocDispo.className="bloc_DispoStation";



  //newBlocStation.appendChild(newBlocDispoVeloMeca);
  newBlocStation.appendChild(newBlocDispoVeloElec);
newBlocStation.appendChild(newBlocDispoPlace);

  newBlocStation.appendChild(newBlocStationTitre);

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
    addBlockStation(myArrayStationsInPerimeter[i]);
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

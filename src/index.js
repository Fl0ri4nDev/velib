import Station_Velib from "./station_Velib.js";

import Map from './map.js';


import { MyData_Velib } from '../listStationsVelib.js'

var canvas=document.getElementById("gameScreen");
canvas.width=1000;
canvas.height=1000;



var myMap_Velib;
let stations="";

var importStations_Velib=MyData_Velib.data.stations;
var arrayStation_Velib = [];

//var ctx = canvas.getContext("2d");


// ---- VELIB -----



var myLat=0;
var myLon=0;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Votre position actuelle est :');
  myLat=crd.latitude;
  myLon=crd.longitude;
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude : ${crd.longitude}`);
  console.log(`La précision est de ${crd.accuracy} mètres.`);



}

function error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

console.log("[FUNCTION] Main() - myLat/myLon : "+ myLat +"/"+myLon);
starter();



function starter()
{


  arrayStation_Velib=loadStations_Velib(importStations_Velib);
myMap_Velib=new Map(canvas,arrayStation_Velib);

  importDispoVelib(arrayStation_Velib);

  myMap_Velib.drawAllStations(canvas,arrayStation_Velib,myLat,myLon);





  document.addEventListener("keydown", keyDownTextField, false);
  canvas.addEventListener('click', (e) => {
    var rect = canvas.getBoundingClientRect();
    var x= (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    var y= (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
    onClickCanvas (canvas,x,y);
  }
  );

}


function loadStations_Velib(pData)
{
  var i=0;
  var arrayStation_Velib=[];
  for (i=0;i<pData.length;i++)
  {

    var station=new Station_Velib(pData[i].lat,pData[i].lon,pData[i].name,pData[i].station_id);
    arrayStation_Velib.push(station);
  }
    return arrayStation_Velib;
}


function getStationPosByID(pArrayStations,pID)
{
  console.log("[FUNCTION] Start getStationPosByID("+pArrayStations.length+","+pID+")");

  var i=0;
  for (i=0;i<pArrayStations.length;i++)
  {
      if(pArrayStations[i].stationID==pID)return i;
  }
  return -1;
}


function setDispoStation (pArrayStations, pArrayDispo)
{
  console.log("[FUNCTION] Start setDispoStation()");
  console.log("[FUNCTION] setDispoStation() - pArrayDispo.length="+pArrayDispo.length);


  var i=0;
  for(i=0;i<pArrayDispo.length;i++)
  {
    var myStationPos=getStationPosByID(pArrayStations,pArrayDispo[i]["station_id"]);
  //  console.log("[FUNCTION] SetDispoStation() - myStationPos=" + myStationPos );
    if(myStationPos>-1)pArrayStations[myStationPos].velo=pArrayDispo[i]["num_bikes_available"];
  }
  console.log("[FUNCTION] SetDispoStation() - " + i + " Dispo loaded");
}

function onClickCanvas(canvas,x,y)
{
//  var clickedStationID=myMap_Velib.getClickedStationID (canvas,x,y,arrayStation_Velib);
myMap_Velib.drawMyPosition (canvas,myLat,myLon);

}

function keyDownTextField(e) {
  var keyCode = e.keyCode;
    if(keyCode===13) {
      myMap_Velib.clearStations(canvas);
    } else if(keyCode===16){
      myMap_Velib.drawAllStations(canvas,arrayStation_Velib,myLat,myLon);
    } else if(keyCode===107)
    {
      myMap_Velib.clearStations(canvas);
      canvas.width+=100;
      canvas.height+=100;
      myMap_Velib.drawAllStations(canvas,arrayStation_Velib,myLat,myLon);
    }

    else if(keyCode===109)
    {

      myMap_Velib.clearStations(canvas);
      canvas.width-=100;
      canvas.height-=100;
      myMap_Velib.drawAllStations(canvas,arrayStation_Velib,myLat,myLon);
    }

  }


function importDispoVelib (pArrayStations)
{
console.log("[FUNCTION] Start importDispoVelib()");

    let requestURL ="https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_status.json";
    let request = new XMLHttpRequest();

    request.open("GET", requestURL);
    request.responseType = "text";
    request.send();


    request.onload = function () {
      const velibStationText = request.response;
      const velibStationsDispo = JSON.parse(velibStationText);
      //populateDispoStation(velibStations);4
      console.log("[FUNCTION] importDispoVelib() - velibStationsDispo[data][stations]:"+velibStationsDispo["data"]["stations"]);
setDispoStation (pArrayStations,velibStationsDispo["data"]["stations"]);
    };



    }

    function populateDispoStation(jsonObj) {
      stations = jsonObj["data"]["stations"];
      alert("ici");
      console.log("Stations :"+stations[1]);


}

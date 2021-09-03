export default class Station_Velib{


constructor (pLat,pLon, pName, pCode,pId)
{
  this.height=10;
  this.width=10;
  this.stationName=pName;
  this.stationCode=pCode
  this.stationID=pId;
  this.lat=pLat;
  this.lon=pLon;
  this.type="velib";
  this.placesLibres=-1;
  this.velo=-1;
  this.veloMecanique=-1;
  this.veloElectrique=-1;
  this.isInstalled=-1;
  this.isReturning=-1;
  this.isRenting=-1;
  this.lastReported=-1;
  this.displayOnMap=false;
}


getStationName()
{
  return stationName.slice(0,15);
}

getStatus()
{
  return this.isInstalled>0 && this.isReturning>0 && this.isRenting>0;
}

getStationInfo()
{
  if(this.getStatus()) //Si la station est Installed + Returning + Renting
  {
    return  "["+ this.stationCode + "] "+this.stationName ;
  }
  else
  {
  return  "<font color=red>["+ this.stationCode + "] "+this.stationName +"</font>";
  }
}

getStationOccupation()
{

  return "Places :"+ this.placesLibres + "<br>Vélos : "+ this.velo + " (M="+ this.veloMecanique + " | E="+this.veloElectrique + ")";

}

toString()
{
 return  "<b>["+ this.stationID + "] "+this.stationName  + "<br>- Places :"+ this.placesLibres + "<br>- Vélos :"+ this.velo;

}

}

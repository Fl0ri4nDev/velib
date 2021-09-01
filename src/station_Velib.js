export default class Station_Velib{


constructor (pLat,pLon, name, id)
{
  this.height=10;
  this.width=10;
  this.stationName=name;
  this.stationID=id;
  this.lat=pLat;
  this.lon=pLon;
  this.type="velib";
  this.placesLibres=-1;
  this.velo=-1;

}




toString()
{
 return  "["+ this.stationID + "] "+this.stationName  + "<br> Places :"+ this.placesLibres + "<br> Vélos :"+ this.velo;

}

}

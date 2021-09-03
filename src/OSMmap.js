import StationVelibManager from "./StationVelibManager.js";


export default class OSMmap{

getMaCarte()
{
  return this.macarte;
}

constructor()
  {
    this.myLat=48.852969;
    this.myLon=2.349903;
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.macarte = null;
    this.layerMarker="";


  }

success(pos) {
  var crd = pos.coords;
  var myLat=crd.latitude;
  var myLon=crd.longitude;

  var myIcon = L.icon({
    iconUrl: 'https://icon-library.com/images/geolocation-icon-png/geolocation-icon-png-5.jpg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});


//  var myPosition = L.marker([myLat, myLon],{icon: myIcon}).addTo(this.getMaCarte());
// myPosition.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();



}

error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}


getMyPosition()
{
  navigator.geolocation.getCurrentPosition(success, this.error, this.options);
}

cleanMap()
{
  this.layerMarker.clearLayers();
}

addMarkerVelib(pArrayStation_Velib)
{
  console.log ("[addMarkerVelib]");
  var i=0;
  for(i=0;i<pArrayStation_Velib.length;i++)
  {
    var myMarker=L.marker([pArrayStation_Velib[i].lat, pArrayStation_Velib[i].lon]);
    myMarker.bindPopup("<b>"+ pArrayStation_Velib[i].getStationInfo() + "</b><br>" + pArrayStation_Velib[i].getStationOccupation(), {permanent: false, className: "my-label", offset: [0, 0] });
  myMarker.addTo(this.layerMarker);
  }
  this.layerMarker.addTo(this.macarte);

}


initMap()
{
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    this.macarte = L.map('map').setView([this.myLat, this.myLon], 15);
    this.layerMarker=L.layerGroup().addTo(this.macarte);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr

  //  var urlLayerOSM ="http://c.tile.stamen.com/watercolor/${z}/${x}/${y}.jpg";
  //  var urlLayerOSM ="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png";
    var urlLayerOSM="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

    L.tileLayer(urlLayerOSM, {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(this.macarte);

    this.macarte.locate({setView: true, maxZoom: 16});

}
}

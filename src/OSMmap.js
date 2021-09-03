import StationVelibManager from "./StationVelibManager.js";


export default class OSMmap{

getMaCarte()
{
  return this.macarte;
}

constructor()
  {
    this.myPositionLat=48.852969;
    this.myPositionLon=2.349903;
    this.currentPositionLat=this.myPositionLat;;
    this.currentPositionLon=this.myPositionLon;
    this.options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    this.macarte = null;
    this.layerMarkerStations="";
    this.layerMarkerPosition="";

  }

success(pos) {
  var crd = pos.coords;
  var myPositionLat=crd.latitude;
  var myPositionLon=crd.longitude;

  var myIcon = L.icon({
    iconUrl: 'https://icon-library.com/images/geolocation-icon-png/geolocation-icon-png-5.jpg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

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
  this.layerMarkerStations.clearLayers();
}

addMarkerVelib(pArrayStation_Velib)
{
  var i=0;
  for(i=0;i<pArrayStation_Velib.length;i++)
  {
    if(pArrayStation_Velib[i].displayOnMap==true)
    {
      var myMarker=L.marker([pArrayStation_Velib[i].lat, pArrayStation_Velib[i].lon]);
      myMarker.bindPopup("<b>"+ pArrayStation_Velib[i].getStationInfo() + "</b><br>" + pArrayStation_Velib[i].getStationOccupation(), {permanent: false, className: "my-label", offset: [0, 0] });
      myMarker.addTo(this.layerMarkerStations);
    }
  }
  this.layerMarkerStations.addTo(this.macarte);

}


initMap()
{
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    this.currentPositionLat=this.myPositionLat;
    this.currentPositionLon=this.myPositionLon;

    this.macarte = L.map('map').setView([this.currentPositionLat, this.currentPositionLon], 15);

    this.layerMarkerStations=L.layerGroup().addTo(this.macarte);
    this.layerMarkerPosition=L.layerGroup().addTo(this.macarte);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    var urlLayerOSM="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

    L.tileLayer(urlLayerOSM, {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(this.macarte);

    this.macarte.locate({setView: true, maxZoom: 16});
    var self=this;
    
    this.macarte.on('locationfound', onLocationFound);

    function onLocationFound(e) {


        var myIcon = L.icon({
        iconUrl: 'https://icon-library.com/images/geolocation-icon-png/geolocation-icon-png-5.jpg',
        iconSize: [40, 40],
        iconAnchor: [20, 40],

    });
      self.myPositionLat=e.latlng.lat;
      self.myPositionLon=e.latlng.lng;
      self.currentPositionLat=self.myPositionLat;
      self.currentPositionLon=self.myPositionLon;

      self.layerMarkerPosition.clearLayers();
      var myPositionMarker=L.marker(e.latlng,{icon: myIcon});
      myPositionMarker.addTo(self.layerMarkerPosition);
      self.layerMarkerPosition.addTo(self.macarte);

      }
}
}

// On initialise la latitude et la longitude de Paris (centre de la carte)


var myLat=0;
var myLon=0;
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  myLat=crd.latitude;
  myLon=crd.longitude;
  initMap();

}

function error(err) {
  console.warn(`ERREUR (${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);



var macarte = null;
// Fonction d'initialisation de la carte
function initMap() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([myLat, myLon], 15);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr

  //  var urlLayerOSM ="http://c.tile.stamen.com/watercolor/${z}/${x}/${y}.jpg";
  //  var urlLayerOSM ="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png";
    var urlLayerOSM="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png";

    L.tileLayer(urlLayerOSM, {
        // Il est toujours bien de laisser le lien vers la source des données
        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);



    var myPosition = L.marker([myLat, myLon]).addTo(macarte);
    myPosition.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
}

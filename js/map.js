var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var latitude = parseInt(getParam("lat"));
    var longitude = parseInt(getParam("lon"));
    var myLatlng = new google.maps.LatLng(latitude,longitude);
    var dest = "Black Dog Smoke & Ale House, North Broadway Avenue, Urbana, IL"; //TODO
    calcRoute(myLatlng, dest);
    
    var mapOptions = {
      center: myLatlng,
      zoom: 11
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    directionsDisplay.setMap(map);
}

function calcRoute(start, end) {
    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
    });
}

function getParam ( sname )
{
    var params = location.search.substr(location.search.indexOf("?")+1);
    var sval = "";
    params = params.split("&");
    // split param and value into individual pieces
    for (var i=0; i<params.length; i++)
    {
             temp = params[i].split("=");
             if ( [temp[0]] == sname ) { sval = temp[1]; }
    }
    return sval;
}

google.maps.event.addDomListener(window, 'load', initialize);
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;

function initialize() {
    geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();
    var latitude = parseFloat(getParam("lat"));
    var longitude = parseFloat(getParam("lon"));
    var myLatlng = new google.maps.LatLng(latitude,longitude);
    var dest = "Black Dog Smoke & Ale House, North Broadway Avenue, Urbana, IL"; //TODO
    calcRoute(myLatlng, dest);
    
    var mapOptions = {
      center: myLatlng,
      zoom: 11,
      disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    directionsDisplay.setMap(map);
    createLegend(myLatlng);
}

function createLegend(latlng){
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        var address = results[1].formatted_address;
        var legend = document.getElementById('legend');
        var div = document.createElement('div');
        div.innerHTML = address;
        legend.appendChild(div);
        map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('legend'));
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });

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
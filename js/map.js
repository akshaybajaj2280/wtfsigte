var directionsDisplay;
var latitude = 0;
var longitude = 0;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;
var priceFilter = "$$$$"
var distFilter = 5;
var typeFilter = new Array(0);
var myLatlng = null;
var tempDistance = -1;

function displayRestaurant(all_restaurants, index) {
    // run filters
    var dest = all_restaurants[index]['name'] + ", " + all_restaurants[index]['location'].display_address.toString();
    $.when(priceFilterFunct(all_restaurants[index].url), calcDistancePHP(all_restaurants[index].location.coordinate.latitude, all_restaurants[index].location.coordinate.longitude)).done(function(a1, a2){

      // calculate distance
      var distance = a2[0];
      distance = parseFloat(distance.substring(0, distance.length - 3));

      console.log("price: " + a1[0]);
      console.log("distance: " + distance);

      // filter type
      var typeFound = $.inArray(all_restaurants[index].categories[0], typeFilter) > -1;

      if (a1[0].length <= priceFilter.length && distance <= distFilter && !typeFound) {

          console.log("ELIGIBLE");
          calcRoute(myLatlng, dest);

          var mapOptions = {
            center: myLatlng,
            zoom: 11,
            disableDefaultUI: true
          };
          $("#restaurant-name").append(all_restaurants[index]['name']);
          map = new google.maps.Map(document.getElementById('map-canvas'),
              mapOptions);
          directionsDisplay.setMap(map);
          createLegend(myLatlng);

      } else {
        console.log("one of these are not eligible");
        if (!(a1.length <= priceFilter.length)) {
          console.log("price failed");
        }
        if (!(distance <= distFilter)) {
          console.log("distance failed");
        }
        if (typeFound) {
          console.log("type failed");
        }
      }

    // run typeFilter
    });

}

function generateDestinations(latitude, longitude) {
  // determine location from Google Geolocation
    var google_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + ',' + longitude + "&key=AIzaSyAoFE_bD3BCvI_GGSkryOgEfgppsSn27fo";
        console.log("Getting location at: " + google_url);
        $.getJSON(google_url,
            function(data) {
                user_location = data.results[1]['formatted_address'];
                console.log("Location determined: " + user_location);

                // call Yelp API
                $.get('yelp/yelp_api.php?location=' + user_location, function(data) {
                    all_restaurants = jQuery.parseJSON( data );
                    myLatlng = new google.maps.LatLng(latitude,longitude);
                    displayRestaurant(all_restaurants, 3);
                }); // end function
            }
        );
}

function priceFilterFunct(rest_url) {
    return $.ajax({
        url: "getPrice.php?website=" + rest_url
    });
}

function calcDistancePHP(end_lat, end_long) {
    return $.ajax({
        url: "getDistance.php?origins=" + latitude + "," + longitude + "&end=" + end_lat + "," + end_long
    });
}

function initialize() {
    geocoder = new google.maps.Geocoder();
    directionsDisplay = new google.maps.DirectionsRenderer();
    latitude = parseFloat(getParam("lat"));
    longitude = parseFloat(getParam("lon"));
    var all_restaurants = generateDestinations(latitude, longitude);
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
          distance = response.routes[0].legs[0].distance.text;
          console.log("going to display " + distance);
          document.getElementById("distanceok").innerHTML = distance;
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
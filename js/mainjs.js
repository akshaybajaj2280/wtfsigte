var directionsDisplay;
var latitude = 0;
var longitude = 0;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;
var priceFilter = "$$$$";
var distFilter = 5;
var typeFilter = new Array(0);
var myLatlng = null;
var tempDistance = -1;
var idx=0;
var all_restaurants = null;

function displayRestaurant(all_restaurants, index) {
    // run filters
    console.log("on index " + index);
    var dest = all_restaurants[index]['name'] + ", " + all_restaurants[index]['location'].display_address.toString();
    $.when(priceFilterFunct(all_restaurants[index].url), calcDistancePHP(all_restaurants[index].location.coordinate.latitude, all_restaurants[index].location.coordinate.longitude)).done(function(a1, a2){

      // calculate distance
      var price = a1[0];
      var distance = a2[0];
      var type = null;
      if (all_restaurants[index].categories[0] instanceof Array) {
        type = all_restaurants[index].categories[0][0];
      } else {
        type = all_restaurants[index].categories[0];
      }
      type = type.toUpperCase();

      distance = parseFloat(distance.substring(0, distance.length - 3));

      // console.log("price: " + price);
      // console.log("distance: " + distance);
      // console.log("type: " + type);

      // filter type
      var typeFound = $.inArray(all_restaurants[index].categories[0], typeFilter) > -1;

      if (price.length <= priceFilter.length && distance <= distFilter && !typeFound) {

          // console.log("ELIGIBLE");
          calcRoute(myLatlng, dest);
          document.getElementById("priceok").innerHTML = price;
          document.getElementById("typeok").innerHTML = type;

          var mapOptions = {
            center: myLatlng,
            zoom: 11,
            disableDefaultUI: true
          };
          $("#restaurant-name").html(all_restaurants[index]['name'].toUpperCase());
          map = new google.maps.Map(document.getElementById('map-canvas'),
              mapOptions);
          directionsDisplay.setMap(map);
          // createLegend(myLatlng);

      } else {
        // console.log("one of these are not eligible");
        // if (!(a1.length <= priceFilter.length)) {
        //   console.log("price failed");
        // }
        // if (!(distance <= distFilter)) {
        //   console.log("distance failed");
        // }
        // if (typeFound) {
        //   console.log("type failed");
        // }
      }

    // run typeFilter
    });

}

function generateDestinations(latitude, longitude) {
  // determine location from Google Geolocation
    var google_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + ',' + longitude + "&key=AIzaSyAoFE_bD3BCvI_GGSkryOgEfgppsSn27fo";
        // console.log("Getting location at: " + google_url);
        $.getJSON(google_url,
            function(data) {
                user_location = data.results[1]['formatted_address'];
                // console.log("Location determined: " + user_location);

                // call Yelp API
                $.get('yelp/yelp_api.php?location=' + user_location, function(data) {
                    all_restaurants = jQuery.parseJSON( data );
                    myLatlng = new google.maps.LatLng(latitude,longitude);
                    displayRestaurant(all_restaurants, idx);
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

// function createLegend(latlng){
//   geocoder.geocode({'latLng': latlng}, function(results, status) {
//     if (status == google.maps.GeocoderStatus.OK) {
//       if (results[1]) {
//         var address = results[1].formatted_address;
//         var legend = document.getElementById('legend');
//         var div = document.createElement('div');
//         div.innerHTML = address;
//         legend.appendChild(div);
//         map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('legend'));
//       } else {
//         alert('No results found');
//       }
//     } else {
//       alert('Geocoder failed due to: ' + status);
//     }
//   });

// }

function calcRoute(start, end) {
    var request = {
      origin:start,
      destination:end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          distance = response.routes[0].legs[0].distance.text;
          // console.log("going to display " + distance);
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





























var priceclicked;
var distanceclicked;
var typeclicked;
var counter;

function hover(obj){
  var id = obj.id;
  if (id == "price"){
        document.getElementById("priceok").style.display = "none";
        document.getElementById("pricebad").style.display = "block";
  }
  else if (id=="distance"){
        document.getElementById("distanceok").style.display = "none";
        document.getElementById("distancebad").style.display = "block";
  }
  else{
        document.getElementById("typeok").style.display = "none";
        document.getElementById("typebad").style.display = "block";
  }
}

function hoverout(obj){
  var id = obj.id;
  if (id == "price" && priceclicked===0){
        document.getElementById("priceok").style.display = "block";
        document.getElementById("pricebad").style.display = "none";
  }
  else if (id=="distance" && distanceclicked===0){
        document.getElementById("distanceok").style.display = "block";
        document.getElementById("distancebad").style.display = "none";
  }
  else if (id=="type" && typeclicked===0){
        document.getElementById("typeok").style.display = "block";
        document.getElementById("typebad").style.display = "none";
  }
  else{
    return;
  }
}

function block(obj){
  var id = obj.id;
  if (id == "price" && priceclicked===0){
        priceclicked=1;
        var currprice = document.getElementById("priceok").innerHTML;
        var html = 'PRICES > ' + currprice;
        var newli = document.createElement('li');
        newli.setAttribute("class", "list-group-item");
        newli.innerHTML = html;
        document.getElementById("blocklist").appendChild(newli);

        document.getElementById("priceok").style.display = "none";
        document.getElementById("pricebad").style.display = "block";

  }
  else if (id=="distance" && distanceclicked===0){
        distanceclicked=1;
        var currdist = document.getElementById("distanceok").innerHTML;
        var html = 'DISTANCES > ' + currdist;
        var newli = document.createElement('li');
        newli.setAttribute("class", "list-group-item");
        newli.innerHTML = html;
        document.getElementById("blocklist").appendChild(newli);

        document.getElementById("distanceok").style.display = "none";
        document.getElementById("distancebad").style.display = "block";
  }
  else if(id=="type" && typeclicked===0){
        typeclicked=1;
        var currtype = document.getElementById("typeok").innerHTML;
        var html = 'TYPE: '+ currtype.toUpperCase();
        var newli = document.createElement('li');
        newli.setAttribute("class", "list-group-item");
        newli.innerHTML = html;
        document.getElementById("blocklist").appendChild(newli);

        document.getElementById("typeok").style.display = "none";
        document.getElementById("typebad").style.display = "block";
  }
  else if(id=="blockplace"){
        var name = document.getElementById("restaurant-name").innerHTML;
        var html = name.toUpperCase();
        var newli = document.createElement('li');
        newli.setAttribute("class", "list-group-item");
        newli.innerHTML = html;
        document.getElementById("blocklist").appendChild(newli);
  }
  else{
    idx++;
    displayRestaurant(all_restaurants, idx);
    return;
  }
  idx++;
  displayRestaurant(all_restaurants, idx);

}

function maybe(){
  var name = document.getElementById("restaurant-name").innerHTML;
  var spanid = name.toLowerCase();
  spanid = spanid.replace(/ /g,'');
  var html = name.toUpperCase() + '<span id=' + spanid + ' class="glyphicon glyphicon-remove badge-remove" onclick="removeFromMaybe(this)"></span>';
  var newli = document.createElement('li');
  newli.setAttribute("class", "list-group-item");
  newli.setAttribute("id", "list"+spanid);
  newli.innerHTML = html;
  document.getElementById("maybelist").appendChild(newli);
  counter++;
  displayRestaurant(all_restaurants, idx++);
}

function removeFromMaybe(obj){
  var id = obj.id;
  var listid = "list" + id;
  var listitem = document.getElementById(listid);
  listitem.parentNode.removeChild(listitem);
}

$(document).ready(function() {
  counter = 0;
  priceclicked=0;
  distanceclicked=0;
  typeclicked=0;
});
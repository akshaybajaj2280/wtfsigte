function initialize() {
        var latitude = parseInt(getParam("lat"));
        var longitude = parseInt(getParam("lon"));
        var myLatlng = new google.maps.LatLng(latitude,longitude);
        var mapOptions = {
          center: myLatlng,
          zoom: 11
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);

        var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title:"Your Location"
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
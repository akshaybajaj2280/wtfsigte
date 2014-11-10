// Check to see if this browser supports geolocation.
if (navigator.geolocation)
{
    // Get the location of the user's browser using the
    // native geolocation service. When we invoke this method
    // only the first callback is requied. The second
    // callback - the error handler - and the third
    // argument - our configuration options - are optional.
    navigator.geolocation.getCurrentPosition
    (
        function( position )
        {
            // alert( 'lat: ' + position.coords.latitude + ' long:' + position.coords.longitude );
            var google_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + ',' + position.coords.longitude + "&key=AIzaSyAoFE_bD3BCvI_GGSkryOgEfgppsSn27fo";
            console.log("Getting location at: " + google_url);
            $.getJSON(google_url,
                function(data) {
                    user_location = data.results[1]['formatted_address'];
                    console.log("Location determined: " + user_location);

                    var url = "main.html" + "?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
                    window.location.href = url;
                }
            );

        },
        function( error ){
            //console.log("User refused to share location or there was an error: ", error);

            $("#auto").css("display","none");
            $("#manual").css("display", "block");
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();

                var latitude = place.geometry.location.lat();
                var longitude = place.geometry.location.lng();

                var google_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + ',' + longitude;
                //console.log("Getting location at: " + google_url);
                $.getJSON(google_url,
                    function(data) {
                        user_location = data.results[1]['formatted_address'];
                        console.log("Location determined: " + user_location);

                        var url = "main.html" + "?lat=" + latitude + "&lon=" + longitude;
                        window.location.href = url;
                    }
                );

                    //alert($("#searchTextField").val());
                });

        },
        {
            timeout: (5 * 1000),
            maximumAge: (1000 * 60 * 15),
            enableHighAccuracy: true
        }
    );
}


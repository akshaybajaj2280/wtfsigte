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
        {                    var url = "main.html" + "?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
                    window.location.href = url;

        },
        function( error ){

            $("#auto").css("display","none");
            $("#manual").css("display", "block");
            google.maps.event.addListener(autocomplete, 'place_changed', function() {


                var place = autocomplete.getPlace();

                var latitude = place.geometry.location.lat();
                var longitude = place.geometry.location.lng();

                var url = "main.html" + "?lat=" + latitude + "&lon=" + longitude;
                window.location.href = url;
            });

        },
        {
            timeout: (5 * 1000),
            maximumAge: (1000 * 60 * 15),
            enableHighAccuracy: true
        }
    );
}


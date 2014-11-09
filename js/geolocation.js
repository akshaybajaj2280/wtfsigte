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
                        alert( 'lat: ' + position.coords.latitude + ' long:' + position.coords.longitude );
                },
                function( error ){
                        console.log( "Something went wrong: ", error );
                },
                {
                        timeout: (5 * 1000),
                        maximumAge: (1000 * 60 * 15),
                        enableHighAccuracy: true
                }
        );
}
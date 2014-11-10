
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>WTFSIGTE</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
    body{
        height: 100%;
        font-family: Impact, Charcoal, sans-serif;
      }
    </style>
  </head>

  <body>


    <div class="container" style="text-align:center;">
      <br/><br/><br/><br/><br/><br/>

      <div id ="auto" style="display:block;">
        <h1>ALLOW US TO FIND YOU.</h1>
      </div>

      <div id="thanks" style="display:none;">
        <h1>WAIT THE FORK UP.</h1>
      </div>

      <div id="manual" style="display:none;">
        <h1>TELL ME WHERE YOU FORKING ARE THEN.</h1>
        <input id="searchTextField" type="text" size="50">

        <script>
          var input = document.getElementById('searchTextField');
          var autocomplete = new google.maps.places.Autocomplete(input);

        </script>
    </div>
    </div><!-- /.container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script src="js/geolocation.js"></script>
  </body>
</html>

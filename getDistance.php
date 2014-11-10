<?php

$url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' . $_GET['origins'] . '&destinations=' . $_GET['end'] . '&mode=driving&language=en&units=imperial&sensor=false&key=AIzaSyAoFE_bD3BCvI_GGSkryOgEfgppsSn27fo';

$data = file_get_contents($url);
$data = utf8_decode($data);
$obj = json_decode($data);

// echo serialize($obj);
$a = $obj->rows[0];
$b = $a->elements[0];
$c = $b->distance;
$d = $c->text;
echo($d); // miles

?>
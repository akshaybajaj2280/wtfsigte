<?php

$html = file_get_contents($_GET['website']);
$start_pos = strpos($html, '<span class="business-attribute price-range"');
$html = substr($html, $start_pos + 44, strlen($html));
$mid_pos = strpos($html, ">");
$html = substr($html, $mid_pos + 1, strlen($html));
$end_pos = strpos($html, '</span>');
$price = substr($html, 0, $end_pos);

echo $price;

?>

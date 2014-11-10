<?php

$html = file_get_contents('http://www.yelp.com/biz/huaraches-moroleon-urbana');

$start_pos = strpos($html, '<dd class="nowrap price-description">');
echo "start position is " . $start_pos + "\n";
// $html = substr($html, $start_pos, strlen($html));

// $end_pos = strpos($html, '</dd>');
// $html = substr($html, 0, $end_pos);

// echo $start_pos;

?>
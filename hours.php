<?php
libxml_use_internal_errors(true);
$link = $_GET['website'];
$html = file_get_contents($link);
$doc = new DOMDocument();
$doc->loadHTML($html);
$xpath = new DOMXPath($doc);

$open = $xpath->query('//span[@class="nowrap extra open"]');
echo $open->item(0)->nodeValue;
?>
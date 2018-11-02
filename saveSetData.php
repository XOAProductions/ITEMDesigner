<?php
if(!empty($_POST['data'])){
$data = $_POST['data'];
$fname = "Sets.json";//generates random name

$file = fopen("savedItemData/" .$fname, 'w');//creates new file
fwrite($file, $data);
fclose($file);
}
?>
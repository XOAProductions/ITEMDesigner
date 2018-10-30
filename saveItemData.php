<?php
if(!empty($_POST['data'])){
$data = $_POST['data'];
$fname = "Items.json";//generates random name

$file = fopen("savedItemData/" .$fname, 'w');//creates new file
fwrite($file, $data);
fclose($file);
}
?>
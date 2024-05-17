<!DOCTYPE html>
<html>
<body>

<?php
$cars = array (
  array("Volvo",22,18),
  array("BMW",15,13),
  array("Saab",5,2),
  array("Land Rover",17,15)
);

//el primer foreach itera sobre cada fila del array $cars
foreach ($cars as $row => $car) {
  echo "<p><b>Row number $row</b></p>";
  echo "<ul>";
//el segundo foreach itera sobre cada elemento de la fila actual
  foreach ($car as $col => $value) {
    echo "<li>".$value."</li>";
  }
  echo "</ul>";
}
?>
</body>
</html>
<?php

$host = "localhost";
$dbName = "crud";
$user = "root";
$password = "";

try {
  // Generación de la conexión a la base de datos
  $conn = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
  // Establecer el modo de error de PDO a excepción
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  echo "Conexión exitosa a la base de datos";
} catch (PDOException $e) {
  die("Error en la conexión a la base de datos: " . $e->getMessage());
}

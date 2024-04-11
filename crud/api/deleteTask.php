<?php
include "./partials/Connection.php";

$idTask = $_GET['id'];

try {
    $sql = "DELETE FROM task WHERE id = ?";
    $state = $conn->prepare($sql);
    $state->execute([$idTask]);

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>

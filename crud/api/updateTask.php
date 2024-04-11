<?php
include "./partials/Connection.php";

$userId = $_POST['users'];
$taskTitle = $_POST['title'];
$completed = $_POST['completed'];
$taskId = $_GET['id'];

try {
    $sql = "UPDATE task SET title=?, idUser=?, completed=? WHERE id=?";
    $state = $conn->prepare($sql);
    $state->execute([$taskTitle, $userId, $completed, $taskId]);

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>

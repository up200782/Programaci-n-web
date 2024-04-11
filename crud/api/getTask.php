
<?php
include "./partials/Connection.php";

$idTask = $_GET['id'];

try {
    $sql = "SELECT t.*, u.firstname FROM task t INNER JOIN user u ON u.id = t.idUser WHERE t.id = ?";
    $state = $conn->prepare($sql);
    $state->execute([$idTask]);
    $row = $state->fetch();

    if ($row) {
        $json = [
            'id' => $row['id'],
            'idUser' => $row['idUser'],
            'title' => $row['title'],
            'completed' => $row['completed'] == 1,
            'firstname' => $row['firstname'],
        ];

        echo json_encode($json);
    } else {
        echo json_encode(["error" => "Task not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
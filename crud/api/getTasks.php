<?php
include "./partials/Connection.php";

$idUser = $_GET['id'];

try {
    $sql = "SELECT t.*, u.firstname FROM task t INNER JOIN user u ON u.id = t.idUser WHERE idUser = ?";
    $state = $conn->prepare($sql);
    $state->execute([$idUser]);
    $json = [];

    while ($row = $state->fetch(PDO::FETCH_ASSOC)) {
        $json[] = [
            'id' => $row['id'],
            'title' => $row['title'],
            'completed' => $row['completed'],
            'idUser' => $row['idUser'],
            'firstname' => $row['firstname']
        ];
    }

    echo json_encode($json);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>

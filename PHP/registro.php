<?php

//Establece el tipo de contenido como JSON
header('Content-Type: application/json');

//Variables con los datos del formulario
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$apellido = isset($_POST['lastName']) ? $_POST['lastName'] : '';
$cedula = isset($_POST['cedula']) ? $_POST['cedula'] : '';
$correo = isset($_POST['correo']) ? $_POST['correo'] : '';
$telefono = isset($_POST['telefono']) ? $_POST['telefono'] : '';
$mascotas = isset($_POST['mascotas']) ? $_POST['mascotas'] : '';
$tipoMascota = isset($_POST['tipoMascota']) ? $_POST['tipoMascota'] : '';
$clave = isset($_POST['password']) ? $_POST['password'] : '';

try {

    //Conexion Base de Datos
    $conexion = new PDO('mysql:host=localhost;port=3306;dbname=mascotiando_sas', 'root', '');
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    //Insertar información a la Base de Datos
    $pdo = $conexion->prepare('INSERT INTO clientes(nombreCliente,apellidoCliente,cedula,correo,telefono,nombre_mascota,tipo_mascota,clave) VALUES (?,?,?,?,?,?,?,?)');
    $pdo->bindParam(1, $nombre);
    $pdo->bindParam(2, $apellido);
    $pdo->bindParam(3, $cedula);
    $pdo->bindParam(4, $correo);
    $pdo->bindParam(5, $telefono);
    $pdo->bindParam(6, $mascotas);
    $pdo->bindParam(7, $tipoMascota);
    $pdo->bindParam(8, $clave);
    $pdo->execute() or die(print($pdo->errorInfo()));

    //Registro Exitoso
    echo json_encode(array("status" => "success", "message" => "El usuario se registró correctamente"));


} catch (PDOException $error) {

    //Registro Incorrecto
    echo json_encode(array("status" => "error", "message" => "Por favor verifique sus datos. El registro no fue correcto"));
    die();
}
?>
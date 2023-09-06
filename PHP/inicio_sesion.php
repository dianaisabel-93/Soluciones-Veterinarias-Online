<?php
// Obtener los datos del formulario HTML
$usuario = isset($_POST['userName']) ? $_POST['userName'] : '';
$clave = isset($_POST['password']) ? $_POST['password'] : '';

try {
    // Conexión a la Base de Datos
    $conexion = new PDO('mysql:host=localhost;port=3306;dbname=mascotiando_sas', 'root', '');
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    // Consultar la BD para buscar el usuario en tabla clientes
    $consulta = "SELECT * FROM clientes WHERE correo = :usuario AND clave = :clave";
    $resultado = $conexion->prepare($consulta);
    $resultado->bindParam(':usuario', $usuario);
    $resultado->bindParam(':clave', $clave);
    $resultado->execute();

    // Obtener el resultado de la consulta
    $filas = $resultado->fetch(PDO::FETCH_ASSOC);

    if ($filas) {
        // Enviar una respuesta si las credenciales son correctas
        echo json_encode(array("status" => "success", "message" => "Bienvenido a Mascotiando Sas"));

    } else {
        // Enviar una respuesta si las credenciales son incorrectas
        echo json_encode(array("status" => "error", "message" => "Credenciales Incorrectas"));
    }
} 
?>
<?php

$usuario = isset($_POST['userName']) ? $_POST['userName'] : '';
$clave = isset($_POST['password']) ? $_POST['password'] : '';

try {

    $conexion = new PDO('mysql:host=localhost;port=3306;dbname=mascotiando_sas', 'root', '');
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

    $consulta = "SELECT * FROM clientes WHERE correo = :usuario AND contraseña = :clave";
    $resultado = $conexion->prepare($consulta);
    $resultado->bindParam(':usuario', $usuario);
    $resultado->bindParam(':clave', $clave);
    $resultado->execute();

    $filas = $resultado->fetch(PDO::FETCH_ASSOC);

    if ($filas) {
       // echo json_encode(array("status" => "success", "message" => "Inicio de sesión exitoso"));
        echo "<script>alert('Bienvenido a Mascotiando Sas'); window.location.href = '../HTML/asignacion_citas.html'</script>";
    } else {
        echo "<script>alert('Credenciales Incorrectas'); window.location.href = '../HTML/inicio_sesion.html';</script>";
    }

} catch (PDOException $error) {
    echo json_encode(array("status" => "error", "message" => "Ocurrió un error al procesar la solicitud"));
    die();
}
?>

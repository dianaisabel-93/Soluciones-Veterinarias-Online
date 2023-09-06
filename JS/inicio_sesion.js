//Crear evento en formulario (al enviar formulario)
document.getElementById('inicio-sesion').addEventListener('submit', function(e) {
   
    e.preventDefault(); // Recargar la pagina 

    //Obtener valores desde formulario (usuario, clave) y crear constantes
    const usuario = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    //Realizar solicitud Fetch a PHP
    fetch('../PHP/inicio_sesion.php', {
        method: 'post',
        body: JSON.stringify({ userName: usuario, password: password }),
        headers: {
            'Content-Type': 'application/json' // Tipo de contenido JSON
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message); // Alerta de Bienvenido
            
        } else {
            alert(data.message); // Mensaje de error
        }
    })
});

// Agregar una acción al boton registro
const botonRegistro = document.getElementById("registro-boton");

botonRegistro.addEventListener("click", function() {
    window.location.href = "registro_clientes.html";
});
document.getElementById('inicio-sesion').addEventListener('submit', function(e) {
   
    e.preventDefault();

    const usuario = document.getElementById('userName').value;
    const password = document.getElementById('password').value;

    fetch('../PHP/inicio_sesion.php', {
        method: 'post',
        body: JSON.stringify({ userName: usuario, password: password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data == 'true') {
            alert('Bienvenido a Mascotiando Sas'); // Alerta de Bienvenido
            
        } else {
            alert(data.message); // Mensaje de error
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
});


const botonRegistro = document.getElementById("registro-boton");

botonRegistro.addEventListener("click", function() {
    window.location.href = "registro_clientes.html";

});
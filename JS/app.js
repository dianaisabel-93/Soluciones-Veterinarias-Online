//Crear un evento al formulario HTML cuando se envia
document.getElementById('formulario').addEventListener('submit', function(e) {
   
    e.preventDefault(); // Recargar la pagina

    //Crear constante donde se guarda el valor contraseña del formulario
    const password = document.getElementById('password');
    const passwordValor = password.value;

    //Validar la contraseña con la función validarClave
    if (!validarclave(passwordValor)) {
        alert("La contraseña debe tener al menos 8 caracteres, contener letras, números y al menos un caracter especial.");
        return;
    } 

    //Crear un objeto FormData a partir del Id formulario
    let formulario = new FormData(document.getElementById('formulario'));

    //Enviar los datos del formulario al PHP por medio de Fetch
    fetch('../PHP/registro.php', {
        method: 'post',
        body: formulario
    })
    .then(res => res.json())
    .then(data => {
        if(data == 'true') {
            //Borrar los campos del formulario luego del registro exitoso
            document.getElementById('nombre').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('cedula').value = '';
            document.getElementById('correo').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('mascotas').value = '';
            document.getElementById('tipoMascota').value = '';
            document.getElementById('password').value = '';
            alert("El usuario se registro correctamente"); // Muestra alerta de registro exitoso

        } else {
            alert(data.message); // Mostrar un mensaje de error si el registro es invalido

        }
    })
});

//Funcion para validar parametros de contraseña
function validarclave(password) {
    const minLenght = 8;
    const letras = /[a-zA-Z]/.test(password);
    const numeros = /\d/.test(password);
    const simbolos = /[@$!%*?&]/.test(password);;

    return password.length >= minLenght && letras && numeros && simbolos;
}
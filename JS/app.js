document.getElementById('formulario').addEventListener('submit', function(e) {
   
    e.preventDefault();

    const password = document.getElementById('password');
    const passwordValor = password.value;

    if (!validarclave(passwordValor)) {
        alert("La contraseña debe tener al menos 8 caracteres, contener letras, números y al menos un caracter especial.");
        return;
    } 

    let formulario = new FormData(document.getElementById('formulario'));

    fetch('../PHP/registro.php', {
        method: 'post',
        body: formulario
    })
    .then(res => res.json())
    .then(data => {
        if(data == 'true') {
            document.getElementById('nombre').value = '';
            document.getElementById('lastName').value = '';
            document.getElementById('cedula').value = '';
            document.getElementById('correo').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('mascotas').value = '';
            document.getElementById('tipoMascota').value = '';
            document.getElementById('password').value = '';
            alert('El usuario se registro correctamente');

        } else {
            console.log(data);
        }
    })
});

function validarclave(password) {
    const minLenght = 8;
    const letras = /[a-zA-Z]/.test(password);
    const numeros = /\d/.test(password);
    const simbolos = /[@$!%*?&]/.test(password);;

    return password.length >= minLenght && letras && numeros && simbolos;
}
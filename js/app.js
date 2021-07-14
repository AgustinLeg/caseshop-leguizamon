const admin = 'agustin';

function preguntar(){
    let usuario = prompt('Tienes una cuenta registrada? \n SI - NO');
    switch (usuario) {
        case 'SI':
            cuentaAdmin()
            break;
        case 'NO':
            alert('bienvenido a @CaseShop')
            break;
    
        default:
            preguntar();
            break;
    }
}

// desafio extra

function cuentaAdmin(){
    let cuentaUsuario = prompt('Nombre de usuario:')
    if(cuentaUsuario.toLowerCase() === admin){
        let producto = prompt('Agregar Producto:')
        let precio = prompt('Cual es el precio?')
        let IVA = prompt('Incluimos el I.V.A ? \n SI - NO');
        if(IVA.toLowerCase() === 'si'){
            precio *= 1.21;
            nuevoProducto(producto,precio)
        }else{
            nuevoProducto(producto,precio)
        }
    }else{
        alert(`Bienvenido ${cuentaUsuario}`)
    }
}


const nuevoProducto = (producto,precio) => alert(`Producto: ${producto} Precio: $${precio}\n Agregado Correctamente :D`)


preguntar();
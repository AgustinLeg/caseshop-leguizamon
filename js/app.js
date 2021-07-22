const admin = "agustin";
let productosContenedor = [];

function cuentaRegistrada() {
  let usuario = prompt("Tienes una cuenta registrada? \n si - no");
  switch (usuario) {
    case "si":
      cuentaAdmin();
      break;
    case "no":
      alert("bienvenido a @CaseShop");
      break;

    default:
      cuentaRegistrada();
      break;
  }
}

class Producto{
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 0;
  }
  sumarIVA(){
      this.precio *= 1.21;
  }
  reponer(){
    this.cantidad += parseInt(prompt(`Unidades de ${this.nombre}`));
    if(isNaN(this.cantidad)){
        while(isNaN(this.cantidad)){
            this.cantidad = prompt('Cantidad Incorrecta');
        }
    }
  }
  vender(){
    let confirmarVenta = prompt(`Quieres vender 15 unidades del producto: ${this.nombre}? \n si - no`);
    if(confirmarVenta.toLowerCase() === 'si'){
        if(this.cantidad >= 15){
            this.cantidad -= 15;
            alert(`Vendido exitosamente a $${this.precio} c/u \n unidades restantes ${this.cantidad}`)
        }else{
            alert(`Cantidad ${this.cantidad} insuficiente`)
        }
    }
  }
}

function cuentaAdmin() {
  let cuentaUsuario = prompt("Nombre de usuario:");
  if (cuentaUsuario.toLowerCase() === admin) {   
    while(prompt('Quiere agregar productos \n ESC para salir') !== 'ESC'){
      let idProducto = Number(prompt('id'));
      let existe = productosContenedor.some(producto => producto.id === idProducto )
      if(!existe){
        productosContenedor.push(new Producto(idProducto,prompt('nombre'),prompt('precio')));
      }else{
        alert(`ERROR \n YA EXISTE UN PRODUCTO CON EL ID: ${idProducto}`)
      }
    }
    let alertaProductos = 'Productos agregados: \n'
   

    // ---------- DESAFIO EXTRA ----------------
    let avisoOrdenar = prompt('Queres ver los productos ordenados alfabeticamente? \n SI - NO')
    if(avisoOrdenar.toLowerCase() === 'si'){
      let productosOrdenados = productosContenedor.sort((a,b) => {
        const nombreA = a.nombre.toLowerCase();
        const nombreB = b.nombre.toLowerCase();
        if(nombreA < nombreB){
          return -1;
        }
        if(nombreA > nombreA){
          return 1;
        }
        return 0;
      })
      for(producto of productosOrdenados){
        alertaProductos += `${producto.nombre} precio: $${producto.precio} ID:${producto.id} \n`
      }
      alert(alertaProductos)
    }else{
      for(producto of productosContenedor){
        alertaProductos += `Nº ${producto.id} nombre: ${producto.nombre} precio: $${producto.precio} \n`
      }
      alert(alertaProductos);
    }
    // -----------------------------------------------
    
  } else {
    alert(`Bienvenido ${cuentaUsuario}`);
  }
}

cuentaRegistrada();

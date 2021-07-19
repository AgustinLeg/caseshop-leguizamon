const admin = "agustin";

function preguntar() {
  let usuario = prompt("Tienes una cuenta registrada? \n si - no");
  switch (usuario) {
    case "si":
      cuentaAdmin();
      break;
    case "no":
      alert("bienvenido a @CaseShop");
      break;

    default:
      preguntar();
      break;
  }
}

class Productos {
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
    const producto1 = new Productos(1, "Funda Roja", 1200);
    const producto2 = new Productos(2, "Funda Azul", 1500);
    producto1.reponer();
    producto2.reponer();
    alert(`Productos agregados Correcatamente: \n ${producto1.nombre} $${producto1.precio} cantidad: ${producto1.cantidad} \n ${producto2.nombre} $${producto2.precio} cantidad: ${producto2.cantidad}`);
    let contarIva = prompt('Queres sumarle el IVA?')
    if(contarIva.toLowerCase() === 'si'){
        producto1.sumarIVA();
        producto2.sumarIVA();
        alert(`Productos actualizados: \n ${producto1.nombre} $${producto1.precio} \n ${producto2.nombre} $${producto2.precio} \n CON IVA`);
    }
    producto1.vender();
  } else {
    alert(`Bienvenido ${cuentaUsuario}`);
  }
}

preguntar();

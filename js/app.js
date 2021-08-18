import UI from './classes/UI.js';
const ui = new UI();
import {
  agregarProducto,
  borrarProductoCarrito,
  agregarCantidad,
  restarCantidad,
  leerLocalStorage,
  ordenarProductos
} from "./funciones.js";
import { Productos } from "./Productos.js";

import { listaProductos, productosCarrito} from "./selectores.js";

const banner = document.querySelector('.banner-carga')



iniciarApp();
function iniciarApp() {
  document.addEventListener("DOMContentLoaded", () => {
    leerLocalStorage();
    ordenarProductos();
    if(listaProductos){
      listaProductos.addEventListener("click", agregarProducto);
    }


    productosCarrito.addEventListener("click", borrarProductoCarrito);

    productosCarrito.addEventListener("click", agregarCantidad);

    productosCarrito.addEventListener("click", restarCantidad);
  
  });
}

$(document).ready(function() {
    if($('#productosTop').length > 0){
      for (let i = 0 ; i < 4 ; i++){
        ui.productosUI(Productos[i],'#productosTop .container__productos')
      }
    }else{
      for (const producto  of Productos){
        ui.productosUI(producto,'#listaProductos .container__productos');
      }
    }
})


window.addEventListener('load', function() {
  console.log('listo')
})
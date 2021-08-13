import UI from './classes/UI.js';
const ui = new UI();
import {
  agregarProducto,
  borrarProductoCarrito,
  agregarCantidad,
  restarCantidad,
  leerLocalStorage,
  toggleCarrito,
} from "./funciones.js";
import { Productos } from "./Productos.js";

import { listaProductos, productosCarrito} from "./selectores.js";

const banner = document.querySelector('.banner-carga')



iniciarApp();
function iniciarApp() {
  document.addEventListener("DOMContentLoaded", () => {
    $('.cart').click(toggleCarrito);
    leerLocalStorage();
    
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
        ui.productosTopUI(Productos[i])
      }
    }else{
      for (const producto  of Productos){
        ui.productosUI(producto);
      }
    }

  
})

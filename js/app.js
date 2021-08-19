import {
  agregarProducto,
  borrarProductoCarrito,
  agregarCantidad,
  restarCantidad,
  leerLocalStorage,
  ordenarProductos,
  obtenerProductos,
  filtrarProductos
} from "./funciones.js";

import { listaProductos, productosCarrito} from "./selectores.js";





$(document).ready(function() {
  leerLocalStorage();
  obtenerProductos();
  filtrarProductos();
  ordenarProductos();
  if(listaProductos){
    listaProductos.addEventListener("click", agregarProducto);
  }


  productosCarrito.addEventListener("click", borrarProductoCarrito);

  productosCarrito.addEventListener("click", agregarCantidad);

  productosCarrito.addEventListener("click", restarCantidad);
})


window.addEventListener('load', function() {
  // console.log('listo')
})
import {
  agregarProducto,
  borrarProductoCarrito,
  agregarCantidad,
  restarCantidad,
  leerLocalStorage,
  ordenarProductos,
  obtenerProductos,
  filtrarProductos,
  changeColor,
  imprirmirFinalizarCompra
} from "./funciones.js";

import { listaProductos, productosCarrito} from "./selectores.js";





$(document).ready(function() {
  leerLocalStorage();
  obtenerProductos();
  filtrarProductos();
  ordenarProductos();
  changeColor();
  imprirmirFinalizarCompra();
  if(listaProductos){
    listaProductos.addEventListener("click", agregarProducto);
  }
  

  productosCarrito.addEventListener("click", borrarProductoCarrito);

  productosCarrito.addEventListener("click", agregarCantidad);

  productosCarrito.addEventListener("click", restarCantidad);
})

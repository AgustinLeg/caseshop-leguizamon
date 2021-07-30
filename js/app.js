import {
  agregarProducto,
  borrarProductoCarrito,
  agregarCantidad,
  restarCantidad,
  leerLocalStorage,
  toggleCarrito,
} from "./funciones.js";

import { listaProductos, productosCarrito, btnCarrito } from "./selectores.js";

iniciarApp();
function iniciarApp() {
  document.addEventListener("DOMContentLoaded", () => {
    btnCarrito.addEventListener("click", toggleCarrito);

    leerLocalStorage();

    if (listaProductos) {
      listaProductos.addEventListener("click", agregarProducto);
    }


    productosCarrito.addEventListener("click", borrarProductoCarrito);

    productosCarrito.addEventListener("click", agregarCantidad);

    productosCarrito.addEventListener("click", restarCantidad);
  
  });
}

import UI from "./classes/UI.js";
import Producto from "./classes/Producto.js";
import { Productos } from "./Productos.js";

let productosContenedor = [];

const ui = new UI();
let animacion = false;


// Pasar datos del productos seleccionado
export function agregarProducto(e) {
  e.preventDefault();
  if (animacion) return;

  if (e.target.classList.contains("btn-agregar")) {
    animacion = true;
    const productoSeleccionado = e.target.parentElement.parentElement;
    $(e.target.parentElement).addClass("active");
    $(e.target).html(ui.spinnerCarga());
    setTimeout(() => {
      $(".sk-chase").remove();
      $(e.target).text("LISTO");
      $(e.target).fadeIn();
      leerDatosProducto(productoSeleccionado);
      setTimeout(() => {
        $(e.target).text("agregar al carrito");
        $(e.target.parentElement).removeClass("active");
        animacion = false;
      }, 1500);
    }, 1500);

  }
}

// Crea un objeto y lo agrega a un array contenedor
function leerDatosProducto(producto) {
  const nombre = producto.querySelector(".producto__titulo").textContent;
  const precio = producto
    .querySelector(".producto__precio")
    .textContent.slice(1);

  //cortar URL imagen
  let imgURL = producto.querySelector(".producto__img img").src;
  let index = imgURL.indexOf("images/");
  const id = Number(
    producto.querySelector(".btn-agregar").getAttribute("data-id")
  );

  // Sumar la cantidad del objeto si ya existe en el carrito
  const existe = productosContenedor.some((producto) => producto.id === id);
  if (existe) {
    const productosActualizado = productosContenedor.map((producto) => {
      if (producto.id === id) {
        producto.cantidad += 1;
        return producto;
      } else {
        return producto;
      }
    });
    productosContenedor = [...productosActualizado];
  } else {
    productosContenedor.push(
      new Producto(nombre, precio, imgURL.slice(index), id)
    );
  }

  // imprimir los productos en el carrito
  ui.imprimirCarrito(productosContenedor);
}

// borrar productos con  animacion de 1.5s
export function borrarProductoCarrito(e) {
  e.preventDefault();
  if (e.target.classList.contains("eliminar-btn")) {
    const idSeleccionado = Number(e.target.getAttribute("data-id"));
    productosContenedor = productosContenedor.filter(
      (producto) => producto.id !== idSeleccionado
    );
    $(e.target.parentElement).find('.spinner').css({
            'opacity': '1',
            'zIndex': '1'})
            .delay(1000)
            .fadeOut('fast', function(){
              $(this).text('ELIMINADO').fadeIn(0)
                                        .delay(1000)
                                        .slideUp();
              $(this).parent().delay(1000)
                            .slideUp();
            })
    setTimeout(() => {
      ui.imprimirCarrito(productosContenedor);
    }, 3000);
  }
}

export function agregarCantidad(e) {
  e.preventDefault();
  const btn =
    e.target.parentElement.parentElement.parentElement.querySelector(
      ".eliminar-btn"
    );
  const cantidad = e.target.parentElement.querySelector(".cantidad");

  if (e.target.classList.contains("sumarCantidad")) {
    const idSeleccionado = Number(btn.getAttribute("data-id"));
    const actualizarProducto = productosContenedor.find(
      (producto) => producto.id === idSeleccionado
    );
    if (actualizarProducto.cantidad > 0) {
      e.target.disabled = true;
      cantidad.innerHTML = ui.spinnerCarga();
      setTimeout(() => {
        actualizarProducto.cantidad += 1;
        ui.imprimirCarrito(productosContenedor);
        e.target.disabled = true;
      }, 1000);
    }
  }
}

export function restarCantidad(e) {
  e.preventDefault();
  const btn =
    e.target.parentElement.parentElement.parentElement.querySelector(
      ".eliminar-btn"
    );
  const cantidad = e.target.parentElement.querySelector(".cantidad");

  if (e.target.classList.contains("restarCantidad")) {
    const idSeleccionado = Number(btn.getAttribute("data-id"));
    const actualizarProducto = productosContenedor.find(
      (producto) => producto.id === idSeleccionado
    );
    if (actualizarProducto.cantidad > 1) {
      e.target.disabled = true;
      cantidad.innerHTML = ui.spinnerCarga();
      setTimeout(() => {
        actualizarProducto.cantidad -= 1;
        ui.imprimirCarrito(productosContenedor);
        e.target.disabled = true;
      }, 1000);
    }
  }
}

// Cargar productos del localStorage
export function leerLocalStorage() {
  if ("carrito" in localStorage) {
    productosContenedor = JSON.parse(localStorage.getItem("carrito"));
    ui.imprimirCarrito(productosContenedor);
  } else {
    productosContenedor = [];
    ui.cantidadCarrito([]);
  }
}


export function ordenarProductos(){
  $("#ordenarProductos").change(e => {
    const productosOrdenados = Producto.ordenar(Productos,e.target.value);
    $('.container__productos').fadeOut();
    $('#listaProductos .container__productos').empty();
    for(const producto of productosOrdenados){
      ui.productosUI(producto,'#listaProductos .container__productos')
    }
    $('.container__productos').fadeIn('slow');
    
  })
}

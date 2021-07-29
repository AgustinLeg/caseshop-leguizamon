const admin = "agustin";
let productosContenedor = [];
let productosCarrito = document.getElementById("productosCarrito");


class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 1;
  }
}

function comprarProductos() {
  while ( prompt( "Quiere agregar productos al carrito? \n ESC para salir").toLowerCase() !== "esc") {
    let idProducto = new Date().getTime();
    let nombreProducto = prompt("nombre").toLowerCase();
    let existe = productosContenedor.some(
      (producto) => producto.nombre === nombreProducto
    );
    if (!existe) {
      productosContenedor.push(
        new Producto(idProducto, nombreProducto, prompt("precio"))
      );
    } else {
      alert(`ERROR \n YA EXISTE UN PRODUCTO CON ESE NOMBRE: ${nombreProducto}`);
    }
  }

  if (productosContenedor.length >= 1) {
    // Ordenar alfabeticamente
    let avisoOrdenar = prompt(
      "Queres ver los productos ordenados alfabeticamente? \n SI - NO"
    );
    if (avisoOrdenar.toLowerCase() === "si") {
      productosContenedor.sort((a, b) => {
        const nombreA = a.nombre.toLowerCase();
        const nombreB = b.nombre.toLowerCase();
        if (nombreA < nombreB) {
          return -1;
        }
        if (nombreA > nombreA) {
          return 1;
        }
        return 0;
      });
    }
  }
  agregarCarrito(productosContenedor);
}


// Agregar los productos al carrito
function agregarCarrito(productos) {
  for (producto of productos) {
    let producto = document.createElement("div");
    producto.classList.add("producto");
    producto.innerHTML = `
          <img src="images/funda-iphone-amarillo.png" class="d-block w-100" alt="Hombre sosteniendo su celular con una funda negra">
          <div class="producto__info">
              <p class="producto__titulo">${this.producto.nombre}</p>
              <p class="producto__precio">$${this.producto.precio}</p>
              <div id="btnCantidad">
                  <button type="button" class="restarCantidad"> - </button>
                  <p class="cantidad">${this.producto.cantidad}</p>
                  <button type="button" class="sumarCantidad"> + </button>
              </div>
          </div>
          <a href="#" class="eliminar-btn"><i class="far fa-trash-alt"></i></a>
    `;
    productosCarrito.appendChild(producto);

  
    estadoCarrito();
  }
}

// Verificar si el carrito esta vacio - actualizar estado y cantidad
function estadoCarrito(){
  const cantidadCarrito = document.getElementsByClassName("count");
  const cartProductos = document.querySelector('.cart__productos')
  
  // Actualizar cantidad del icono Carrito
  cantidadCarrito[0].textContent = productosContenedor.length;

  const carritoInfo = document.querySelector('#estadoCarrito');
  
  
  if(productosCarrito.children.length < 1){
    carritoInfo.innerHTML= `<span>El carrito de compras está vacío</span>`
    cartProductos.appendChild(carritoInfo)
  }else{
    carritoInfo.innerHTML=`
          <div class="cart__total" id="cartTotal">
            <p class="total">Total: <span class="precio">$0</span></p>
          </div>
          <div class="btn-finalizar-compra">
              <button class="btn btn-primary"><a href="#">Finalizar Compra</a></button>
          </div>
    `
    cartProductos.appendChild(carritoInfo)
  }
}

estadoCarrito();
comprarProductos();
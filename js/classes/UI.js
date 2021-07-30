import Carrito from './Carrito.js'

const carrito = new Carrito();

class UI{
    // Borrar elementos del contenedor
    limpiarHTML(contenedor){
        while(contenedor.firstChild){
            contenedor.removeChild(contenedor.firstChild);
        }
    }
    // Agregar los productos al carrito
    imprimirCarrito(productos){
        const productosCarrito = document.querySelector('#productosCarrito');
        
        carrito.guardarLocalStorage(productos);// Guardar productos en localSotrageos

        this.limpiarHTML(productosCarrito);

        this.cantidadCarrito(productos); // Actualiza estado carrito

        let total = carrito.calcularTotal(productos)
        this.acutalizarTotal(total) // Actualiza total carrito

        // Mostrar los productos en el carrito
        productos.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.className="producto";
            productoDiv.innerHTML=`
                <img src="../${producto.imgURL}" class="d-block w-100" alt="Hombre sosteniendo su celular con una funda negra">
                <div class="producto__info">
                    <p class="producto__titulo">${producto.nombre}</p>
                    <p class="producto__precio">$${producto.precio} c/u</p>
                    <div class="btnCantidad">
                        <button type="button" class="restarCantidad"> - </button>
                        <p class="cantidad">${producto.cantidad}</p>
                        <button type="button" class="sumarCantidad"> + </button>
                    </div>
                </div>
                <a href="#" class="eliminar-btn" data-id="${producto.id}"><i class="far fa-trash-alt"></i></a>
            `;
            productosCarrito.appendChild(productoDiv)
        })

       
    }

    // Imprime Aviso de carrito vacio o el total 
    cantidadCarrito(productos){
        const contador = document.querySelector('.cart .count');
        const estadoCarrito = document.querySelector('#estadoCarrito');
        const vacioDiv = document.createElement('div');
        let urlFinalizarCompra;
        if(window.location.pathname === '/pages/tienda.html'){
            urlFinalizarCompra = 'finalizar-compra.html'
        }else{
            urlFinalizarCompra='pages/finalizar-compra.html'
        }
        contador.textContent = productos.length
        if(carrito.vacio(productos.length)){
            this.limpiarHTML(estadoCarrito)
            vacioDiv.innerHTML = `<span class="vacio">El carrito de compras está vacío.</span>`;
        }else{
            
            this.limpiarHTML(estadoCarrito)
            vacioDiv.innerHTML=`
                        <div class="cart__total" id="cartTotal">
                        <p class="total">Total: <span class="precio">$</span></p>
                        </div>
                        <div class="btn-finalizar-compra">
                            <button class="btn btn-primary"><a href="${urlFinalizarCompra}">Finalizar Compra</a></button>
                        </div>
             `;  
        }
        estadoCarrito.appendChild(vacioDiv)
    }

    acutalizarTotal(total){
        let totalCarrito = document.querySelector('.cart__total span')
        if(totalCarrito){
            totalCarrito.innerHTML = `$ ${total}`
        }
    }

    spinnerCarga(){
        return `
            <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        `
    }
    
}


export default UI;
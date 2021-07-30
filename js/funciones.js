import UI from './classes/UI.js';
import Producto from './classes/Producto.js';
import {modalCarrito} from './selectores.js';

let productosContenedor = [];

const ui = new UI();


// mostrar o ocultar carrito con modal
export function toggleCarrito(e){
    if(e.target.classList.contains('count') || e.target.classList.contains('fa-shopping-bag') || e.target.classList.contains('modal-cart')){
        modalCarrito.style.visibility='visible'
        modalCarrito.style.opacity='1'

        document.querySelector('.modal-cart').style.visibility="visible";
        document.querySelector('.modal-cart').style.opacity="1";

        modalCarrito.classList.toggle('active');
        document.body.style.overflowY='hidden'
        
        if(!modalCarrito.classList.contains('active')){
            document.querySelector('.modal-cart').style.opacity="0";
            document.body.style.overflowY='auto'
            setTimeout(() =>{
                modalCarrito.style.visibility='hidden'
                modalCarrito.style.opacity='0'
                document.querySelector('.modal-cart').style.visibility="hidden";
            },400)
        }
    }
}



// Pasar datos del productos seleccionado
export function agregarProducto(e){
    e.preventDefault();
    if(e.target.classList.contains('btn-agregar')){
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

// Crea un objeto y lo agrega a un array contenedor
function leerDatosProducto(producto){
    const nombre = producto.querySelector('.producto__titulo').textContent;
    const precio = producto.querySelector('.producto__precio').textContent.slice(1);

    //cortar URL imagen
    let imgURL = producto.querySelector('.producto__img img').src;
    let index = imgURL.indexOf('images/');
    const id = Number(producto.querySelector('.btn-agregar').getAttribute('data-id'));

    // Sumar la cantidad del objeto si ya existe en el carrito
    const existe = productosContenedor.some(producto => producto.id === id)
    if(existe){
        const productosActualizado = productosContenedor.map(producto => {
            if(producto.id === id){
                producto.cantidad +=1;
                return producto;
            }else{
                return producto;
            }
        })
        productosContenedor=[...productosActualizado]
    }else{
        productosContenedor.push(new Producto(nombre,precio,imgURL.slice(index),id))
    }
    
    // imprimir los productos en el carrito
    ui.imprimirCarrito(productosContenedor);
}

// borrar productos con  animacion de 1.5s
export function borrarProductoCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('eliminar-btn')){
        const idSeleccionado = Number(e.target.getAttribute('data-id'));
        productosContenedor = productosContenedor.filter(producto => producto.id !== idSeleccionado)
        const cantidad = e.target.parentElement.querySelector('.cart .cantidad')
        cantidad.innerHTML= ui.spinnerCarga();
        setTimeout(() =>{
            ui.imprimirCarrito(productosContenedor);
        },1500)
        
    }
}

export function agregarCantidad(e){
    e.preventDefault();
    const btn = e.target.parentElement.parentElement.parentElement.querySelector('.eliminar-btn')
    const cantidad = e.target.parentElement.querySelector('.cantidad')
    
    if(e.target.classList.contains('sumarCantidad')){
        const idSeleccionado = Number(btn.getAttribute('data-id'))
        const actualizarProducto = productosContenedor.find(producto => producto.id === idSeleccionado)
        if(actualizarProducto.cantidad > 0 ){
            e.target.disabled=true;
            cantidad.innerHTML= ui.spinnerCarga();
            setTimeout(() =>{
                actualizarProducto.cantidad +=1       
                ui.imprimirCarrito(productosContenedor);
                e.target.disabled = true;
            },1000)
        }
        
        
    }
}


export function restarCantidad(e){
    e.preventDefault();
    const btn = e.target.parentElement.parentElement.parentElement.querySelector('.eliminar-btn')
    const cantidad = e.target.parentElement.querySelector('.cantidad')

    if(e.target.classList.contains('restarCantidad')){
        const idSeleccionado = Number(btn.getAttribute('data-id'))
        const actualizarProducto = productosContenedor.find(producto => producto.id === idSeleccionado)
        if(actualizarProducto.cantidad > 1 ){
            e.target.disabled=true;
            cantidad.innerHTML= ui.spinnerCarga();
            setTimeout(() =>{
                actualizarProducto.cantidad -=1       
                ui.imprimirCarrito(productosContenedor);
                e.target.disabled = true;
            },1000)
        }
        
        
    }
}

// Cargar productos del localStorage
export function leerLocalStorage(){
    productosContenedor = JSON.parse(localStorage.getItem('carrito'));
    ui.cantidadCarrito(productosContenedor)
    if(productosContenedor.length > 0){
        ui.imprimirCarrito(productosContenedor);
    }
}



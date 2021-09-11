import UI from "./classes/UI.js";
import Producto from "./classes/Producto.js";
import ProductoCustom from "./classes/ProductoCustom.js";
import { colorContainer, colorDefault} from "./selectores.js";

let productos = [];
let productosContenedor = [];
let datosBusqueda={
  categoria:'',
  color:'',
  modelo:''
}

const ui = new UI();
let animacion = false;
const producto = new Producto();
const productoCustom = new ProductoCustom();


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


export function obtenerProductos(){
  const urlGET = '../data/productos.json'
    $.get(urlGET, function(datos, estado){
      if(estado === "success"){
        for(const producto of datos){
          const {nombre, precio, imgURL, id, color, categoria, modelo} = producto;
          productos.push(new Producto(nombre, precio, imgURL, id, color, categoria, modelo))
        }
        if($('#productosTop').length > 0){
          for(let i = 0; i < 4 ; i++){
            ui.productosUI(productos[i],'#productosTop .container__productos')
          }
        }else{
          for(const producto of productos){
            ui.productosUI(producto,'#listaProductos .container__productos')
          }
        }
      }
  })
}

export function ordenarProductos(){
  $("#ordenarProductos").change(e => {
    const productosOrdenados = Producto.ordenar(productos,e.target.value);
    $('.container__productos').fadeOut();
    $('#listaProductos .container__productos').empty();
    for(const producto of productosOrdenados){
      ui.productosUI(producto,'#listaProductos .container__productos')
    }
    $('.container__productos').fadeIn('slow');
    
  })
}


export function filtrarProductos(){
  $('#filtros').slideUp();
  $('#btnFiltro').click(function(){
    $('#filtros').slideToggle();
    $('#filtros input:radio').change(function(e){
      const contenedor = document.querySelector('#listaProductos .container__productos')
      ui.limpiarHTML(contenedor);
      datosBusqueda={
        categoria:$(".categorias input:radio:checked").val(),
        color:$(".color-filter input:radio:checked").val(),
        modelo:$(".modelos input:radio:checked").val()
      }

      const resultado = producto.filtrar(productos, datosBusqueda)
      for(const producto of resultado){
        ui.productosUI(producto,contenedor)
      }
      
    })
  })
}

/* -------- CARRITO -------- */
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


/* ======== PRODUCTO CUSTOM ============ */

export function changeColor(){
  for (let i = 0; i < colorContainer.length; i++){
    colorContainer[i].style.background = '#'+colorDefault[i];
  }
  colorContainer.forEach((color,index) =>{
    color.addEventListener('click',()=>{
      productoCustom.setColor(colorDefault[index])
    })
  })
}


$("#colorChoice").change(function(){
  let colorSeleccionado = $(this).val().slice(1)
  productoCustom.setColor(colorSeleccionado)
});


$('#mensajeFunda').on('input',function() {
  let texto = `${$(this).val()}`
  $('#textoFunda').text(texto);
})



$('#horizontal').on('input',function() {
  let left = $(this).val() + 'px'
  $('#textoFunda').css('left',left)
})
$('.rango #vertical').on('input',function() {
  let top = $(this).val() + 'px'
  $('#textoFunda').css('top',top)
})

$("#colorTexto").change(function(){
  let colorSeleccionado = $(this).val()
  $('#textoFunda').css('color',colorSeleccionado)
});
$("#textoSize").change(function(){

  $('#textoFunda').css('font-size',$(this).val()+'px')
});

$('#btn-check-design').click(function(){
  if($("#btn-check-design").prop("checked")){
    $('.shp34').css('opacity',1);
    $('.top-content span').text('$3500');
  }else{
    $('.shp34').css('opacity',0);
    $('.top-content span').text('$3000');
  }
})


function agregarCustom(){
  const producto = {
    nombre: $('.top-content h2').text() + ' CUSTOM',
    precio: $('.top-content span').text().slice(1),
    imgURL: "images/funda-iphone-verde.png",
    id: 999,
    settings:{
      shp0:$('.shp0').css('fill'),
      shp1:$('.shp1').css('fill'),
      shp2:$('.shp2').css('fill'),
      shp3:$('.shp3').css('stroke'),
      shp33:$('.shp33').css('stroke'),
      shp34:$('.shp34').css('stroke'),
      shp36:$('.shp36').css('fill'),
      stop:$('#grd22 stop').css('stop-color')
    }
  }
  const {nombre, precio, imgURL, id, settings} = producto
  productosContenedor.push(new ProductoCustom(nombre, precio, imgURL, id, settings))
  ui.imprimirCarrito(productosContenedor)
}
$('#buyCustom').click(agregarCustom)



var forms = document.querySelectorAll('.formulario-validacion')

Array.prototype.slice.call(forms)
  .forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        // return;
      }else{
        event.preventDefault();
        $('#btnFinalizarCompra').html(`Gracias por tu compra`)
        $('.modal').css({
          'opacity': 1,
          'display': 'block',
        })
        setTimeout(() => {
          $('.modal-body').html('Compra finalizada con exito!')
          setTimeout(() => {
            $('.modal').css({
              'opacity': 0,
              'display': 'none',
            })
          },3000)
        },3000)
      }
      form.classList.add('was-validated')
      
    
    }, false)
  })


/* ======== Finalizar Compra ============ */
export function imprirmirFinalizarCompra(){
  const finalizarCompra = document.querySelector('.productosFinales #contenedor__productos')
  let  total =0;
  if(finalizarCompra){
    productosContenedor.forEach(producto =>{
      ui.finalizarCompraUI(producto, finalizarCompra)
      total +=Number(producto.precio);
    })
    $('.productosFinales .total .precio').text(total)
  }
}
class Carrito{

    guardarLocalStorage(productos){
        window.localStorage.setItem('carrito',JSON.stringify(productos))
    }

    // Verificar si el carrito esta vacio o no
    vacio(cantidad){
        if(cantidad == 0){
            return true
        }else{
            return false
        }
    }

    calcularTotal(productos){
        let total=0;
        productos.forEach(producto => total += (Number(producto.precio) * producto.cantidad))
        return total;
    }
    
}


export default Carrito;
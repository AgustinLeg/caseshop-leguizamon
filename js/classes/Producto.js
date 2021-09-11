class Producto {
    constructor(nombre, precio,imgURL, id, color, categoria, modelo) {
        this.nombre = nombre;
        this.precio = precio;
        this.imgURL = imgURL;
        this.id = id;
        this.cantidad = 1;
        this.color = color;
        this.categoria = categoria;
        this.modelo = modelo;
        this.filtro = {}
    }

    static ordenar(productos,orden){

        let nombreA;
        let nombreB;
        // Ordenar alfabeticamente
        const productosOrdenados = productos.sort((a, b) => {
            switch (orden) {
                case 'alpha-ascending':
                    nombreA = b.nombre.toLowerCase();
                    nombreB = a.nombre.toLowerCase();
                    break;
                case 'alpha-desscending':
                    nombreA = a.nombre.toLowerCase();
                    nombreB = b.nombre.toLowerCase();
                    break;
                case 'precio-desscending':
                    nombreA = a.precio;
                    nombreB = b.precio;
                    break;
                case 'precio-ascending':
                    nombreA = b.precio;
                    nombreB = a.precio;
                    break;
            
                default:
                    nombreA = '';
                    nombreB = '';
                    break;
            }  
            if (nombreA > nombreB) {
                return -1;
            }
            if (nombreA < nombreA) {
                return 1;
            }
            return 0;
        });

        return productosOrdenados;
    }

    filtrar(productos, filtros){
        this.filtro = filtros;
        const resultado = productos.filter(producto => {
            const {categoria} = this.filtro
                if(categoria === 'todos'){
                    return producto
                }else if(categoria){
                    return producto.categoria === categoria;
                }
                return producto;
        
        }).filter(producto => {
            const {color} = this.filtro

                if(color  === 'todos'){
                    return producto;
                }else if(color){
                    return producto.color === color;
                }
                return producto;
        
        }).filter(producto => {
            const {modelo} = this.filtro
                if(modelo === 'todos'){
                    return producto;
                }else if(modelo){
                    return producto.modelo === modelo;
                }
                return producto;
            
        })
       return resultado;
    }
}

export default Producto;
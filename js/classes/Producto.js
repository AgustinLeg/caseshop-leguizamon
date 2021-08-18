class Producto {
    constructor(nombre, precio,imgURL, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.imgURL = imgURL;
        this.id = id;
        this.cantidad = 1;
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
}

export default Producto;
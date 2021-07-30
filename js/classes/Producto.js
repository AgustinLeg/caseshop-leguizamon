class Producto {
    constructor(nombre, precio,imgURL, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.imgURL = imgURL;
        this.id = id;
        this.cantidad = 1;
    }

    ordenar(productos){
        // Ordenar alfabeticamente
        productos.sort((a, b) => {
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

export default Producto;
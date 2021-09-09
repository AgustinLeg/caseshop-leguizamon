class ProductoCustom{
    constructor(nombre,precio,imgURL,id, settings){
        this.nombre = nombre;
        this.precio = precio;
        this.imgURL = imgURL;
        this.id = id;
        this.settings = settings;
        this.cantidad = 1;
    }
    LightenDarkenColor(col,amt) {
        var usePound = false;
        if ( col[0] == "#" ) {
            col = col.slice(1);
            usePound = true;
        }
      
        var num = parseInt(col,16);
      
        var r = (num >> 16) + amt;
      
        if ( r > 255 ) r = 255;
        else if  (r < 0) r = 0;
      
        var b = ((num >> 8) & 0x00FF) + amt;
      
        if ( b > 255 ) b = 255;
        else if  (b < 0) b = 0;
      
        var g = (num & 0x0000FF) + amt;
      
        if ( g > 255 ) g = 255;
        else if  ( g < 0 ) g = 0;
      
        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
    }
    setColor(colorSeleccionado){
        $('.shp0').css('fill',`#${this.LightenDarkenColor(colorSeleccionado,180)}`)
        $('.shp1').css('fill','#'+colorSeleccionado)
        $('.shp2').css('fill','#'+colorSeleccionado)
        $('.shp3').css('stroke','#'+colorSeleccionado)
        $('.shp33').css('stroke','#'+colorSeleccionado)
        $('.shp34').css('stroke',`#${this.LightenDarkenColor(colorSeleccionado,30)}`)
        $('.shp36').css('stroke',`#${this.LightenDarkenColor(colorSeleccionado,180)}`)
        $('#grd22 stop').css('stop-color',`#${this.LightenDarkenColor(colorSeleccionado,100)}`)
    }
}

export default ProductoCustom;
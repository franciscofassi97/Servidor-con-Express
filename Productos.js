const  Contenedor  = require('./Contenedor');

const prodcuts = new Contenedor('productos.txt');

const leerProductos = async () => {
    const data = await prodcuts.getAll();
    return data;
};

const leerProductoRandom = async () => {
    const productos = await prodcuts.getAll();
    const data = productos[Math.floor(Math.random() * productos.length)];
    return data;
};

module.exports = {leerProductos, leerProductoRandom}

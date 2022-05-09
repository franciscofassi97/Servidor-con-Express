const {leerProductos, leerProductoRandom} = require('./Productos');

const express = require('express');

const app = express();
const PORT = 8080;

app.get('/productos', (req, res, next)=>{
    //Devolver lista de productos.txt
    const ejecutar = async () => {
        const data = await leerProductos();
        res.send(data);
    };
    ejecutar();
});


app.get('/productoRandom', (req, res, next)=>{
    //Devolver un producto random
    const ejecutar = async () => {
        const data = await leerProductoRandom();
        res.json(data);
    };
    ejecutar();
    
});



app.listen(PORT,()=>{
    console.log(`servidor escuchando en el puerto ${PORT}`);
});
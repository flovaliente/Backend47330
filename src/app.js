//import path from 'path';
import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();

const productManager = new ProductManager('./products.json');
app.use(express.urlencoded({ extended: true }));

app.get('/products', async(req, res) =>{
    const products = await productManager.getProducts('./products.json');
    const { limit } = req.query;
    if(!limit)
        res.send(products);
    else
        res.send(products.slice(0, parseInt(limit)));
});

app.get('/products/:pid', async (req, res) =>{
    //const products = await productManager.getProducts('./products.json'); 
    const { pid } = req.params;
    const product = await productManager.getProductById(parseInt(pid));
    if(product){
        return res.json(product);
    }else{
        return res.status(404).send('Producto no encontrado.');
    }
});
app.listen(8080, () =>{
    console.log('Servidor escuchando en puerto 8080.');
});
import { Router } from 'express';
import ProductManager from '../daos/mongodb/ProductManager.class.js';

let productManager = new ProductManager()

const router = Router();

router.get('/', async (req, res) => {
  let products = await productManager.getProducts();

  res.render('home', {
    title: "Inicio",
    products: products.docs
  });
})

router.get('/realtimeproducts', async (req, res) => {
  res.render('realTimeProducts');
})

router.get('/chat', async (req, res) => {
  res.render('chat')
})

router.get('/products', async (req, res) => {
  let page = req.query.page

  let products = await productManager.getProducts(2, page, undefined);
  products.prevLink = products.hasPrevPage?`http://localhost:8080/products?page=${products.prevPage}`:'';
  products.nextLink = products.hasNextPage?`http://localhost:8080/products?page=${products.nextPage}`:'';
  
  res.render('products', {
    title: "Products",
    products: products
  })
})

export default router;
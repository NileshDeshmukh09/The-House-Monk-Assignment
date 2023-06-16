const express = require('express');
const router = express.Router();
const JWTAuth = require('../middlewares/JWTAuth')
const productController = require('../controllers/product.controller');

// Route for adding a new product
router.post('/products', JWTAuth.verifyToken , productController.addProduct);

// Route for retrieving a product by ID
router.get('/products/:id', productController.getProduct);

// Route for retrieving all products
router.get('/products', productController.getAllProducts);

// Route for deleting a product by ID
router.delete('/products/:id', JWTAuth.verifyToken , productController.deleteProduct);

// Route for update a product by ID
router.put('/products/:id', JWTAuth.verifyToken ,  productController.updateProduct);

module.exports = router;

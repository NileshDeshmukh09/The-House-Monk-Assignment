const express = require('express');
const router = express.Router();
const { JWTAuth } = require('../middlewares')
const { addToCart } = require('../controllers/cart.controller');

// POST /cart/add
router.post('/cart/add', [ JWTAuth.verifyToken ] , addToCart);

module.exports = router;

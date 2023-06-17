const express = require('express');
const router = express.Router();
const { JWTAuth } = require('../middlewares')
const { placeOrder , getOrder , getAllOrdersByUser } = require('../controllers/order.controller');

// POST /orders/:userID/place/:productID
router.post('/orders/:userID/place/:productID', [JWTAuth.verifyToken ], placeOrder );

// Define the route for retrieving an order by orderID
router.get('/users/:userID/orders/:orderID', [JWTAuth.verifyToken ], getOrder);

// Route to get all orders by a specific user
router.get('/users/:userID/orders', [JWTAuth.verifyToken ] , getAllOrdersByUser);


module.exports = router;

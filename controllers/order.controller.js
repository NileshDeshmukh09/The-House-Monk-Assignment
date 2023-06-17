const Order = require('../models/order.model');
const User = require('../models/user.model')
const Product = require('../models/product.model')

const placeOrder = async (req, res) => {

    // Extract userID and productID from request parameters
    const {  userID , productID } = req.params;

     // Extract product quantity from request body
    const {  product :{ quantity } } = req.body;

    const orderObj = {};

  try {

     /** User ID of reported must be present in x-access-token */
     const user = await User.findOne({
        userID : req.userID
    });

    if (!user) {
        return res.status(400).json({ success : false , message: 'User not found' });
    }

    // Check if the provided userID matches the userID of the authenticated user
    if( user.userID != userID){
      return res.status(401).json({ success : false , message : `UserID not Matched !`});
    }

     // Assign the user's userID to the order object
    orderObj.userID = user.userID;

    const existproduct = await Product.findOne({  _id : productID });

    if( !existproduct ){
        return res.status(400).json({ success : false , message : `Product Not Found !`});
    }

    if ( !quantity ) {
        return res.status(400).json({ success : false , message: 'Missing Quantity of Product' });
    }
    
      // Assign product details to the order object
    orderObj.product = {
        name : existproduct.name,
        quantity,
        price: existproduct.price
    };

    // Calculate the total price based on the quantity and price of the product
    orderObj.totalPrice = Math.ceil( quantity * existproduct.price) ;

    const newOrder =  new Order( orderObj );

    // Save the new order to the database
    const savedOrder = await newOrder.save();

     // Return success status and the saved order
    res.status(201).json({ success : true , savedOrder});
  } catch (error) {

    // Handle any errors that occur during the process
    console.log(error);
    res.status(500).json({ success : false , message: 'Internal server error' });
  }
};

const getOrder = async (req, res) => {
  try {
    // Extract userID and orderID from request parameters
    const { userID, orderID } = req.params;

    /** User ID of reported must be present in x-access-token */
    // Find the user based on the provided userID in the request's x-access-token
    const user = await User.findOne({ userID: req.userID });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ success : false , message: 'User not found' });
    }

    // Check if the provided userID matches the userID of the authenticated user
    if (user.userID !== userID) {
      return res.status(401).json({ success : false , message: 'UserID not Matched!' });
    }

    // Find the order based on the provided orderID
    const order = await Order.findOne({ _id: orderID, userID });

    // Check if the order exists
    if (!order) {
      return res.status(400).json({ success : false , message: 'Order not found' });
    }

    // Return the order information
    res.status(200).json({ success: true, order });
  } catch (error) {
    // Handle any errors that occur during the process
    console.log(error);
    res.status(500).json({ success : false ,  message: 'Internal server error' });
  }
};


const getAllOrdersByUser = async (req, res) => {
  try {
    // Extract the userID from the request parameters
    const { userID } = req.params;

    // Find the user based on the provided userID in the request's x-access-token
    const user = await User.findOne({ userID: req.userID });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the provided userID matches the userID of the authenticated user
    if (user.userID !== userID) {
      return res.status(401).json({ message: 'UserID not Matched!' });
    }

    // Find all orders placed by the user
    const orders = await Order.find({ userID });

    // Return the orders
    res.status(200).json({ success: true, orders });
  } catch (error) {
    // Handle any errors that occur during the process
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
  placeOrder,
  getOrder,
  getAllOrdersByUser
};

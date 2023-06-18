const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Product = require('../models/product.model')

const addToCart = async (req, res) => {

  const {  productID, quantity } = req.body;



  try {

    if( !productID ){
        return res.status(400).json({ success : false , message : `productID not provided !`});
    }

    // Find the user based on the provided userID in the request's x-access-token
    const user = await User.findOne({ userID: req.userID });

    console.log(`user: `, user )
    // Check if the user exists
    if (!user) {
      return res.status(400).json({ success : false , message: 'User not found' });
    } 
    
    const existProduct = await Product.find({ productID });
    
    if( !existProduct ){
      return res.status(400).json({ success : false , message: 'Product not Found' });

    }

    // Check if the user's cart already exists
    let existingCart = await Cart.findOne({ userID : user.userID ,  productID  });

    // If the cart doesn't exist, create a new one
    if ( existingCart) {
        return res.status(400).json({ success : false , message : ` ${existingCart.productID } already present in Cart `});
    }
    
    const addProductTocart = new Cart({
      userID : user.userID ,
      productID ,
      quantity 
    });

    
    
    // Save the updated cart
    const newProductToCart = await addProductTocart.save();
    user.addToCart.push( newProductToCart._id );

    res.status(200).json({ status : true ,message : `${newProductToCart.productID } , saved to card !`,  newProductToCart});
  } catch (error) {

    console.log( error );
    res.status(500).json({ status :false , message: 'Internal server error' });
  }
};

module.exports = {
  addToCart
};

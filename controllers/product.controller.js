const Product = require('../models/product.model');

// Controller function for adding a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    // Check if all required fields are provided
    if ( !name ) {
      return res.status(400).json({ status : false , message : 'Name is required' });
    }
    if ( !description ) {
      return res.status(400).json({ status : false , message : 'Description is required' });
    }
    if ( !category ) {
      return res.status(400).json({ status : false , message : 'Category is required' });
    }
    if ( !price ) {
      return res.status(400).json({ status : false , message : 'Price is required' });
    }

    // Create a new product object
    const product = new Product({
      name,
      description,
      category,
      price
    });

    // Save the product to the database
    await product.save();

    return res.status(201).json({ success : true , message: 'Product added successfully', product });
  } catch (error) {

    console.log( error );
    return res.status(500).json({ success : false , message: 'Failed to add product' });
  }
};

// Controller function for retrieving a product
const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the productId is provided
    if (!productId ) {
      return res.status(400).json({ success : false , message : 'Product ID is required' });
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ success : false , message :'Product not found' });
    }

    return res.status(200).json({ success : true , product });
  } catch (error) {
    console.log( error );
    return res.status(500).json({ success : false , message : 'Failed to retrieve product' });
  }
};

// Controller function for retrieving all products
const getAllProducts = async (req, res) => {
  try {
    // Find all products
    const products = await Product.find();

    return res.status(200).json({ 
        success : true , 
        products : products.length > 0 ? products : 'No Product Found',
     });
  } catch (error) {

    console.log( error );
    return res.status(500).json({ success : false , message :  'Failed to retrieve products' });
  }
};

// Controller function for deleting a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the productId is provided
    if ( !productId ) {
      return res.status(400).json({ success : false , message : 'Product ID is required' });
    }

    // Find the product by ID
    const product = await Product.findOne({ _id : productId});

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ success : false , message : 'Product not found' });
    }

    // Delete the product
    await product.deleteOne({ _id : productId });

    return res.status(200).json({ success : true , message: 'Product deleted successfully' });
  } catch (error) {

    console.log( error );
    return res.status(500).json({ success : false , message : 'Failed to delete product' });
  }
};

// Controller function for update a product
const updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, category , price } = req.body;
  
     
      // Check if the drone exists
      const product = await Product.findOne({_id : id});
  
      if (!product ) {
        return res.status(404).json({  status : false , message : 'Product not found' });
      }
  

  
      // Update the product fields
      product.name =  name != undefined ? name : product.name ;
      product.description = description != undefined ? description : product.description ;
      product.category = category != undefined ? category : product.category ;
      product.price =  price != undefined ? price : product.price ;
      product.createdAt = product.createdAt ;
      product.updatedAt = Date.now();
  
      const updatedProduct = await product.save();
  
      res.status(200).json({
        success : true , 
        message : `${updatedProduct.name} , updated Successfully ! `,
        updatedProduct
      });
  
    } catch (error) {

        console.log( error );
      res.status(500).json({ sucess : true , message : 'Internal server error' });
    }
  };
  

module.exports = {
    addProduct,
    getProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
};

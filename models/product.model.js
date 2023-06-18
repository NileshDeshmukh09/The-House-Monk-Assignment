const mongoose = require('mongoose');
/**
* Schema for the Product Model will be provided Here
*/

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique : true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },
  
  price: {
    type: Number,
    required: true
  },

  createdBy : { // Who created product - userID  of the creater
    type : String 
  }
 
});

/* These will automatically generates the created and updated fields */
productSchema.set('timestamps' , true);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

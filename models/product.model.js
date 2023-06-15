const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
 
});

/* These will automatically generates the created and updated fields */
productSchema.set('timestamps' , true);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

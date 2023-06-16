const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
  },

  products: [
    {
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],

  totalPrice: {
    type: Number,
  },
 
});

/* These will automatically generates the created and updated fields */
orderSchema.set('timestamps' , true);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

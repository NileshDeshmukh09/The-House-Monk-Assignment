const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userID: {
    type: String,
  },

  product : [
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

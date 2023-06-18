const mongoose = require('mongoose');

/**
* Schema for the Cart Model will be provided Here
*/

const cartSchema = new mongoose.Schema({
    userID: {
        type: "String",
    },

    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    quantity: {
        type: Number,
        default: 1
    }
    
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;

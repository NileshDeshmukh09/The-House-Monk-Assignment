
/**
* Schema for the user Model will be provided Here
*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    userID : {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    products : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product" /* Collection Name */
        /* One to Many Relationship between the Ticket's and the User */
        
    }

});

/* These will automatically generates the created and updated fields */
userSchema.set('timestamps' , true);



module.exports = mongoose.model("User", userSchema);



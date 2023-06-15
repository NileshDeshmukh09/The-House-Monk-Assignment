
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
    }

});

/* These will automatically generates the created and updated fields */
userSchema.set('timestamps' , true);



module.exports = mongoose.model("User", userSchema);



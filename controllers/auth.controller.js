const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

/** Registration Controller  for the User  */
exports.signup = async (req, res) => {

    // Extract user details from the request body
    const UserDetailsStoredInDB = {
        name: req.body.name,
        userID: req.body.userID,
        password: bcrypt.hashSync(req.body.password, 8),  // Encrypt the password using bcrypt
    }

    try {

        // Create a new user and store them in the database
        const createdUser = await User.create(UserDetailsStoredInDB);

        /**
        *  response
        */
        const ResponseOfNewUser = {
            name: createdUser.name,
            userID: createdUser.userID,
        }

          // Send a success response with the newly created user details
        res.status(201).send({
            success: true,
            message: `${createdUser.userID} , Added Successully !`,
            user: ResponseOfNewUser
        });
    } catch (err) {
        // Handle any errors that occurred during user creation
        console.log( err );

        res.status(500).send({
            message: "Internal Server Error ,when Insert User !"
        })
    }

}


const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.SECRET, {
        expiresIn: '2h'
    });
};

exports.signin = async (req, res) => {
    try {
        // Search for the user in the database based on the userID
        const user = await User.findOne({ userID: req.body.userID });

        // Check if the user exists
        if (!user) {
            return res.status(400).send({ 
                success: false, 
                message : "UserID Doesn't Exist!"
            });
        }

        // User exists, now check the validity of the password
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

        // If the password is invalid, send an error response
        if (!isPasswordValid) {
            return res.status(401).send({
                success: false,
                message : "Invalid Password"
            });
        }

        // Password is valid, proceed with successful login
        // Generate an access token using JWT
        const accessToken = generateAccessToken(user.userID);

        // Send the response with the user details and access token
        res.status(200).send({
            success: true,
            message: `${user.userID} logged in successfully!`,
            user: {
                name: user.name,
                userID: user.userID,
                accessToken: accessToken
            }
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            success: false,
            message : "Internal Server Error"
        });
    }
};


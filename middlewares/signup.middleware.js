/**
 * Custom middleware for validating the signup request body
 */
const User = require("../models/user.model");

const validateSignupInput = async (req, res, next) => {
  const { name, userID, password } = req.body;

  // Validate if 'name' exists
  if (!name) {
    return res.status(400).send({ success : false , message : "Name is not provided"});
  }

  // Validate if 'userID' exists
  if (!userID) {
    return res.status(400).send({success : false , message : "UserID is not provided"});
  }

  /**
   * Validate if the 'userID' already exists
   */
  const existingUser = await User.findOne({ userID: req.body.userID });
  if (existingUser) {
    return res.status(400).send({success : false , message : "UserID already exists"});
  }

  /** Validate if 'password' exists */
  if (!password) {
    return res.status(400).send({success : false , message : "Password is not provided"});
  }

  // If validation passes, proceed to the next middleware/controller
  next();
};

module.exports = validateSignupInput;

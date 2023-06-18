
/**
 *  The routes for the Home 
 *  Resource
 */

const express = require("express");
const authController = require("../controllers/auth.controller");
const  middleware  = require('../middlewares');
const router = express.Router();

 
 
 /** Signup -- POST */
router.post("/auth/signup", middleware.signupValidation , authController.signup );
 
 /** signin -- POST */
router.post("/auth/login" , authController.signin );

 /** get-user-by-userID -- GET */
router.get("/users/:id" , authController.getUserById );
 


module.exports = router
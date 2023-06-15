
/**
 *  The routes for the Home 
 *  Resource
 */

const express = require("express");
const authController = require("../controllers/auth.controller");
const  middleware  = require('../middlewares');
const router = express.Router();

 
 
 /** Signup -- GET */
router.post("/auth/signup", middleware.signupValidation , authController.signup );
 
 /** signin -- GET */
router.post("/auth/login" , authController.signin );
 


module.exports = router
const express = require('express');
const { registerUser, loginUser } = require('../Controller/user.controller');
const { registerValidation, loginValidation } = require('../Midlleware/userValidator');
const router=express.Router()

router.post("/register",registerValidation,registerUser)
router.post("/login",loginValidation,loginUser)

module.exports=router

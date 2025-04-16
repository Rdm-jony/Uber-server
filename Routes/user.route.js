const express = require('express');
const { registerUser, loginUser } = require('../Controller/user.controller');
const { registerValidation } = require('../Midlleware/userValidator');
const router=express.Router()

router.post("/register",registerValidation,registerUser)
router.post("/login",loginUser)

module.exports=router

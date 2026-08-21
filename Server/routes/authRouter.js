const express = require("express")
const router  = express.Router()
const {registerValidation,loginValidation} = require("../middlewares/AuthValidation")
const { login, register } = require("../controllers/authControllers")

router.post('/login',loginValidation,login)

router.post('/register',registerValidation,register)

module.exports = router
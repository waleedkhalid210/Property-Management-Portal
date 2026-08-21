const joi = require("joi")

const registerValidation = (req,res,next)=>{
    const schema = joi.object({
        firstName:joi.string().max(100).required(),
        lastName:joi.string().max(100).required(),
        email:joi.string().email().max(50).required(),
        password:joi.string().min(6).max(12).required()
    })
    const {error} = schema.validate(req.body)
    console.log(req.body)
    if(error){
        return res.status(400).json(
            {message:"Bad Request",error}
        )
    }
    next()
}

const loginValidation = (req,res,next)=>{
    const schema = joi.object({
        email:joi.string().email().max(50).required(),
        password:joi.string().min(6).max(12).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json(
            {message:"Bad Request",error}
        )
    }
    next()
}

module.exports = {
    registerValidation,
    loginValidation
}
const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    try {
        const {firstName,lastName,email,password}=req.body
        const user = await userModel.findOne({email})
        if(user){
            return res.status(409).json({
                message:"User already exist",
                success:false
            })
        }

        const userData = new userModel({firstName,lastName,email,password})
        userData.password = await bcrypt.hash(password,10)
        await userData.save() 
        res.status(201).json({
            message:"Register Successfully",
            success:true
        })
 
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }

}

const login = async(req,res)=>{
    try {
        const {email,password}=req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(403).json({
                message:"Auth failed email or password is wrong!",
                success:false
            })
        }

        const isPassEqual = await bcrypt.compare(password,user.password) 
        if(!isPassEqual){
            return res.status(403).json({
                message:"Auth failed email or password is wrong!",
                success:false
            })
        }

        const jwtToken = jwt.sign(
            {email:user.email, _id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"24h"}
        )

        res.status(200).json({
            message:"Login Successfully",
            firstname:user.firstName,
            jwtToken:jwtToken,
            success:true,
            userId:user._id
        })
 
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error",
            success:false
        })
    }

}

module.exports={
    register,
    login
}
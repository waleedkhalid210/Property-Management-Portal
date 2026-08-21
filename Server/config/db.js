const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const DBconn = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB)
        console.log("Mongo db connected")
    } catch (error) {
        console.log("mongo not connected")
    }

}
module.exports = DBconn;




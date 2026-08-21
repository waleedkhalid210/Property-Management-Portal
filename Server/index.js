const express = require("express")
const path = require("path")
const app = express()
const DBconn = require("./config/db")
const bycrypt = require("bcrypt")
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT;
const bodyParser = require("body-parser");
const cors = require("cors")

const authRouter = require("./routes/authRouter")
const propertyRouter = require("./routes/propertyRouter")


DBconn();
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use('/',authRouter)
app.use('/api/property',propertyRouter)

app.get("/",(req,res)=>{
    res.send("hi")
})

app.listen(port,()=>{
    console.log("Server is runing at port:",port)
})

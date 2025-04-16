const express = require('express');
const cors = require('cors');
const connectDB = require("./db/db");
const app=express()
const port=process.env.PORT || 5000
var cookieParser = require('cookie-parser')

require('dotenv').config()
const userRoutes=require("./Routes/user.route")

connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/users",userRoutes)


app.get("/",async(req,res)=>{
    res.send("Uber server running.......")
})

app.listen(port,()=>{
    console.log(`uber server running on ${port}`)
})
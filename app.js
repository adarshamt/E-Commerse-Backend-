const express = require('express');
const app = express()

const port=3000;

const mongoose =require("mongoose")

const url= "mongodb://127.0.0.1:27017/Ecommerse"


app.use(express.json())

mongoose.connect(url)
 .then(()=>console.log("mongoose in connected"))
 .catch((e)=>console.log("error found",e))




// ******USER ROUTE****************
let userRoute=require("./src/Routes/user")
  app.use("/",userRoute)


// ************ADMIN ROUTE*********

let adminRoute=require("./src/Routes/admin")
app.use("/",adminRoute)












 app.listen(port,(req,res)=>{

    console.log(`serve listening on ${port}`)
 })
const express = require('express');
const app = express()
const cors= require('cors')
const morgan = require('morgan')
const port=4001;

const mongoose =require("mongoose")

// const url= "mongodb://127.0.0.1:27017/Ecommerse"
const url = "mongodb+srv://adarshamt:GG5CY2vRqo77lkv2@batafootware.zlk6gjp.mongodb.net/ecommerce"



require('dotenv').config();
app.use(morgan('dev'))
app.use(express.json())
app.use(cors()) 



mongoose.connect(url)
 .then(()=>console.log("mongoose in connected"))
 .catch((e)=>console.log("error found",e))




// ******USER ROUTE****************
let userRoute=require("./src/Routes/user")
  app.use("/",userRoute)


// ************ADMIN ROUTE*********

let adminRoute=require("./src/Routes/admin")
app.use("/",adminRoute)


// // *********PAYMENT ROUTE************
// let paymentRoute =require("./src/Routes/payment")
// app.use("/",paymentRoute)


// ************ CORS ************************



  // app.get("/getData",(req,res)=>{
  //   res.send('this is backend data')
  // })






 app.listen(port,(req,res)=>{

    console.log(`serve listening on ${port}`)
 })
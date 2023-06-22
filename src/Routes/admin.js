const express = require("express")

const route = express.Router()

const product = require("../Controller/productController")

const {adminLogin,findAllUsers,findOneUser,findAllProducts,findyProductByCategory,viewSpecificProduct,deleteProduct,updateProduct} =require("../Controller/adminController")//importing the function directly

const {adminAuthentication}= require("../Midleware/adminAuthorization")

route.post("/admin/login",adminLogin)
route.get("/admin/users",adminAuthentication,findAllUsers)
route.post("/admin/products",adminAuthentication,product.addProduct)
route.get("/admin/users/:id",adminAuthentication,findOneUser)
route.get("/admin/products",adminAuthentication,findAllProducts)
route.get("/admin/products/category/:category",adminAuthentication,findyProductByCategory)
route.get("/admin/products/:id",adminAuthentication,viewSpecificProduct)
route.delete("/admin/products/:id",adminAuthentication,deleteProduct)
route.put("/admin/products/:id",adminAuthentication,updateProduct)










module.exports=route


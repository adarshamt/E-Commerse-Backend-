const express = require("express")

const route = express.Router()

const product = require("../Controller/productController")

const {adminLogin,findAllUsers,findOneUser,findAllProducts,findyProductByCategory,viewSpecificProduct,deleteProduct,updateProduct} =require("../Controller/adminController")//importing the function directly


route.post("/admin/login",adminLogin)
route.get("/admin/users",findAllUsers)
route.post("/admin/products",product.addProduct)
route.get("/admin/users/:id",findOneUser)
route.get("/admin/products",findAllProducts)
route.get("/admin/products/category/:category",findyProductByCategory)
route.get("/admin/products/:id",viewSpecificProduct)
route.delete("/admin/products/:id",deleteProduct)
route.put("/admin/products/:id",updateProduct)










module.exports=route


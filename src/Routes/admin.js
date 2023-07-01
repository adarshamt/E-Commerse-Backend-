const express = require("express")

const route = express.Router()

const product = require("../Controller/productController")

const {adminLogin,findAllUsers,findOneUser,findAllProducts,findyProductByCategory,viewSpecificProduct,deleteProduct,updateProduct} =require("../Controller/adminController")//importing the function directly

const {adminAuthentication}= require("../Midleware/adminAuthorization")

const tryCatch =require("../Midleware/tryCatch")

route.post("/admin/login",adminLogin)
route.get("/admin/users",tryCatch(findAllUsers))
route.post("/admin/products",adminAuthentication,tryCatch(product.addProduct))
route.get("/admin/users/:id",adminAuthentication,tryCatch(findOneUser))
route.get("/admin/products",adminAuthentication,tryCatch(findAllProducts))
route.get("/admin/products/category/:category",adminAuthentication,tryCatch(findyProductByCategory))
route.get("/admin/products/:id",adminAuthentication,tryCatch(viewSpecificProduct))
route.delete("/admin/products/:id",adminAuthentication,tryCatch(deleteProduct))
route.put("/admin/products/:id",adminAuthentication,tryCatch(updateProduct))










module.exports=route


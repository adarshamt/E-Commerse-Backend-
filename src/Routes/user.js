const express = require("express")
const route= express.Router()

const {userRegistration,userLogin,viewProductByCategory,viewSpecificProduct,addPoroductCart,add_viewProductsToWishlist,payment,purchasedProducts}= require('../Controller/userController')
const {authorizeUser} = require("../Midleware/userAuthorization")
const product =require("../Controller/productController")

const tryCatch=require("../Midleware/tryCatch")

route.post('/users/registrartion',tryCatch(userRegistration))
route.post('/users/login',tryCatch(userLogin))

route.get("/users/products",authorizeUser,tryCatch(viewProductByCategory))
// route.get("/users/products",viewProductByCategory)
route.get("/users/products/:id",authorizeUser,tryCatch(viewSpecificProduct))
// route.get("/users/products/:id",viewSpecificProduct)
route.post("/users/products/:id/cart",authorizeUser,tryCatch(addPoroductCart))
route.get("/users/products/:id/cart",authorizeUser,tryCatch(addPoroductCart))
route.post("/users/products/:id/whishlists",authorizeUser,tryCatch(add_viewProductsToWishlist))

route.get("/users/products/cart/payment/:id",authorizeUser,tryCatch(payment))
route.get("/users/products/:id/purchased",authorizeUser,tryCatch(purchasedProducts))

















module.exports=route;
const express = require("express")
const route= express.Router()

const {userRegistration,userLogin,viewProductByCategory,viewSpecificProduct,addPoroductCart,add_viewProductsToWishlist}= require('../Controller/userController')
const {authorizeUser} = require("../Midlewares/userAuthorization")
const product =require("../Controller/productController")

route.post('/users/registrartion',userRegistration)
route.post('/users/login',userLogin)

route.get("/users/products",authorizeUser,viewProductByCategory)
// route.get("/users/products",viewProductByCategory)
route.get("/users/products/:id",authorizeUser,viewSpecificProduct)
// route.get("/users/products/:id",viewSpecificProduct)
route.post("/users/products/:id/cart",authorizeUser,addPoroductCart)
route.get("/users/products/:id/cart",authorizeUser,addPoroductCart)
route.post("/users/products/:id/whishlists",authorizeUser,add_viewProductsToWishlist)
route.get("/users/products/:id/whishlists",authorizeUser,add_viewProductsToWishlist)
















module.exports=route;
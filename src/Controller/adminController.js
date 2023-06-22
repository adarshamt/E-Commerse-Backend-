require("dotenv").config()

const user =require("../Model/userShema")

const products =require("../Model/productSchema")

const jwt = require("jsonwebtoken")

// *************ADMIN LOGIN*****************

const adminLogin = async (req,res)=>{

    const admin_username = process.env.adminUserName
    const admin_password = process.env.adminPassword
    console.log(admin_username,admin_password)

    const admin_req_username= req.body.username
    const admin_req_password=req.body.password
   console.log(admin_req_username,admin_req_password)

   if (admin_username!=admin_req_username || admin_password!=admin_req_password){
       
    res.send("wrong credentials")
    
    }
   
    const token = jwt.sign({username:admin_username},"admin")
    res.json({

        "status":"token created successfully",
        "token":token
    })
     res.send("admin login successfully")
}

    // *********FIND ALL USERS************

    const findAllUsers = async (req,res)=>{

        try{

            const usersList= await user.find()

            // console.log(usersList)
            res.json(usersList)

        }

        catch(err){

            res.send("error",err)
        }
    }

    // ***********FIND ONE USER*******
    const findOneUser = async(req,res)=>{
        const ipUser = req.params.id

        try{

            const checkUser =await user.findById(ipUser)

            res.send(checkUser)

        }

        catch(err){
            res.send("No user found")
        }
    }

    // **************FIND ALL PRODUCTS***************

    const findAllProducts =async (req,res)=>{
          
        try{

        const allProducts = await products.find()

        res.json(allProducts)
        }
        catch(err){
            res.send("error")
        }
    

    }
    // *********LIST PRODUCTS BY CATEGORY*********

    const findyProductByCategory = async (req,res)=>{
         
        const prdctbycategory= req.params.category
          
        try{

            

            const checkProduct = await products.find({category:prdctbycategory})
            res.json(checkProduct)
            

        }
        catch(err){
               res.send("error",err)

        }
    }

    // **************VIEW SPECIFIC PRODUCT*************

    const viewSpecificProduct = async (req,res)=>{

        try{
        // const productId = req.params.id
        // console.log(productId)

        console.log("hi");
            const specificProduct = await products.findById(req.params.id)

            if(!specificProduct){
                console.log("no product found")

            }
            res.json(specificProduct)
            

        }
        catch(err){
            res.status(500).json({ error: err.message });

        }
    }

    // ***********DELETE PRODUCT*************

const deleteProduct= async (req,res)=>{

    try{
        const productid = req.params.id
        const updatedProducts= await products.findByIdAndDelete(productid)
        res.json(updatedProducts)

    }
    catch(err){

        res.send("error",err)
    }
}

// **********UPDATE PRODUCT************

const updateProduct= async (req,res)=>{
    
    const product_id =req.params.id
    const body = req.body
    
    try{
    const updatedProduct= await products.findByIdAndUpdate(product_id,body,{new:true})
    res.json(updatedProduct)

    }
    catch(err){

        res.send("error",err)
    }

}



module.exports={adminLogin,findAllUsers,findOneUser,findAllProducts,findyProductByCategory,viewSpecificProduct,deleteProduct,updateProduct}
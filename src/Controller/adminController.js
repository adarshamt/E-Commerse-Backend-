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
       
    return res.send("wrong credentials")
    
    }
   
    const token = jwt.sign({username:admin_username},"admin")
    res.json({

        "status":"token created successfully",
        "token":token
    })
    //  res.send("admin login successfully")
}

    // *********FIND ALL USERS************

    const findAllUsers = async (req,res)=>{

        

            const usersList= await user.find()

            // console.log(usersList)
            res.json(usersList)

        }

      
    

    // ***********FIND ONE USER*******
    const findOneUser = async(req,res)=>{
        const ipUser = req.params.id

        
            const checkUser =await user.findById(ipUser)
            
            res.json({

                status:"success",
            //    message:"Product added to cart",
               data:{
                  checkUser
               }
           })
            // res.send(checkUser)

        }

       
    

    // **************FIND ALL PRODUCTS***************

    const findAllProducts =async (req,res)=>{
          
       

        const allProducts = await products.find()

        res.json(allProducts)
        
    
    

    }
    // *********LIST PRODUCTS BY CATEGORY*********

    const findyProductByCategory = async (req,res)=>{
         
        const prdctbycategory= req.params.category
          

            

            const checkProduct = await products.find({category:prdctbycategory})
            res.json(checkProduct)
            

        }
    

    // **************VIEW SPECIFIC PRODUCT*************

    const viewSpecificProduct = async (req,res)=>{

        
        // const productId = req.params.id
        // console.log(productId)

        console.log("hi");
            const specificProduct = await products.findById(req.params.id)

            if(!specificProduct){
                console.log("no product found")

            }
            res.json(specificProduct)
            

        }
   

    // ***********DELETE PRODUCT*************

const deleteProduct= async (req,res)=>{

        const productid = req.params.id
        const updatedProducts= await products.findByIdAndDelete(productid)
        res.json(updatedProducts)

    }
 

// **********UPDATE PRODUCT************

const updateProduct= async (req,res)=>{
    
    const product_id =req.params.id
    const body = req.body
    
    
    const updatedProduct= await products.findByIdAndUpdate(product_id,body,{new:true})
    res.json(updatedProduct)

    }
  


module.exports={adminLogin,findAllUsers,findOneUser,findAllProducts,findyProductByCategory,viewSpecificProduct,deleteProduct,updateProduct}
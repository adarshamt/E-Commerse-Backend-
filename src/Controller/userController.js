const user= require("../Model/userShema")

const products=require("../Model/productSchema")




const userRegistration= async (req,res)=>{


    try{
        const username =req.body.username
        const password = req.body.password
      
        const newUser=new user({username:username,password:password})
        await newUser.save()
      
        res.send("user registerd susscefully")

    }catch(err)
    {

        console.log("error",err)

        res.json({
            status:"failure",
            message:err,
        })

    }


}
// *****************USER LOGIN*************

const userLogin= async(req,res)=>{

    try{
        const USERNAME =req.body.username
        const PASSWORD = req.body.password

        const checkuser = await user.findOne({username:USERNAME,password:PASSWORD})
             if(!checkuser){
                 
                return   console.log("user not registerd")
        }
        res.send("Loged in successfully")
            
        
         
    }

catch(err){


    console.log("error",err)

}

}

// ************VIEW PRODUCTS BY CATEGORY********

const viewProductByCategory = async(req,res)=>{
    const ipCategory= req.body.category

    try {
        const viewProducts= await products.find({category:ipCategory})
        res.json(viewProducts)
    }

    catch(err){

        res.send("error",err)

    }
}
    // *************VIEW SPECIFIC PRODUCT**************

    const viewSpecificProduct =async (req,res)=>{

        const product_id= req.params.id
         
        try{

            const specificProduct = await products.findById(product_id)
            res.json(specificProduct)
        }

        catch(err){
            res.send("error",err)

        }
    
    
    }

    // ************ADD PRODUCTS TO CART AND VIEW***********

    const addPoroductCart = async (req,res)=>{

        const user_id= req.params.id
        const product_id = req.body.Product_id

        // console.log ("user id",user_id);
       if(req.method==="POST"){
        try {
        const checkUser = await user.findById(user_id)
        const checkProduct= await products.findById(product_id)


        // console.log(!checkProduct);
        if(!checkUser){


           return res.send("No user found")
        }

        if(!checkProduct){
            return res.send("No product found")
        }
  
        const findUser = await user.findById(user_id)
        const findProduct =await products.findById(product_id)

            findUser.cart.push(findProduct)
            await findUser.save()

            res.send("Product added to cart")

    }

    catch(err){

        res.send("error",err)
    }


    }
     if(req.method ==="GET"){
    const finduser = await user.findById(user_id)
    res.json(finduser.cart)
    }
}

// *************PRODUCTS ADD & SHOW IN WHISHLIST*************

const add_viewProductsToWishlist =async (req,res)=>{
    const product_id = req.body.productId
    const user_id = req.params.id
    console.log("user id",user_id);
    console.log("product id",product_id);

    
    if(req.method==="POST"){

        try{

            const checkUser = await user.findById(user_id)
            console.log(checkUser);
            const checkProduct = await products.findById(product_id)

            if(!checkUser){


                return res.send("No user found")
             }
     
             if(!checkProduct){
                 return res.send("No product found")
             }
       
             const findUser = await user.findById(user_id)
             const findProduct = await products.findById(product_id)
     
                 findUser.whishList.push(findProduct)
                 await findUser.save()
     
                 res.send("Product added to whishlist")
     
         }
         catch(err){

            res.send("error",err)
        }


        }

        if(req.method === "GET"){
            const finduser = await user.findById(user_id)
            res.json(finduser.whishList)
            }
    }





module.exports={userRegistration,userLogin,viewProductByCategory,viewSpecificProduct,addPoroductCart,add_viewProductsToWishlist}
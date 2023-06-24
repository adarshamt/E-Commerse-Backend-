const user= require("../Model/userShema")

const jwt = require("jsonwebtoken")

const products=require("../Model/productSchema")

const stripe = require("stripe")(process.env.Secret_key)

const bcrypt = require("bcrypt")




const userRegistration= async (req,res)=>{


   
        const username =req.body.username
        const password = req.body.password
      let hashPassword = await bcrypt.hash(password,10)

      // console.log("hased password",hashPassword);
        const newUser=new user({username:username,password:hashPassword})
        await newUser.save()

      
        res.send("user registerd susscefully")

  

    }



// *****************USER LOGIN*************

const userLogin= async(req,res)=>{

 
        const USERNAME =req.body.username
        const PASSWORD = req.body.password

        const checkuser = await user.findOne({username:USERNAME,password:PASSWORD})
             if(!checkuser){
                 
                return   console.log("user not registerd")
               }

        const token = jwt.sign({username:USERNAME},'adarsh')
        res.json({

            "status":"success",
            "messege":"token created successfully",
            "token":token
        })

        res.send("Loged in successfully")

          
    }


// ************VIEW PRODUCTS BY CATEGORY********

const viewProductByCategory = async(req,res)=>{
    const ipCategory= req.body.category

        const viewProducts= await products.find({category:ipCategory})
        res.json(viewProducts)
    }

    
    // *************VIEW SPECIFIC PRODUCT**************

    const viewSpecificProduct =async (req,res)=>{

        const product_id= req.params.id
         
      

            const specificProduct = await products.findById(product_id)
            res.json(specificProduct)
        }

    // ************ADD PRODUCTS TO CART AND VIEW***********

    const addPoroductCart = async (req,res)=>{

        const user_id= req.params.id
        const product_id = req.body.Product_id

        // console.log ("user id",user_id);
       if(req.method==="POST"){
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
      


        

        if(req.method === "GET"){
            const finduser = await user.findById(user_id)
            res.json(finduser.whishList)
            }
    }

//  ***************PAYMENTS SECTION***************
const payment = async (req, res) => {
    const userId = req.params.id;
    const User = await user.findById(userId).populate("cart");
  
    console.log("secret key",stripe.Secret_key)
    if (!User) {
      return res.json({
        status: "failure",
        message: "please login"
      });
    }
  
    if (User.cart.length === 0) {
      return res.json({
        message: "user cart is empty, please add some products"
      });
    }
  
    let totalSum = User.cart.reduce((sum, item) => {
      return sum + item.price;
    }, 0);

    console.log("total sum",totalSum);
  
    //method for integrate stripe api in express
    let metadata = "thank you for purchasing from us, see you soon";
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'Sample Product',
              description: 'This is a sample product',
              images: ['https://example.com/product-image.jpg'],
            },
            unit_amount: totalSum * 100, // amount in rupees
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://ruperhat.com/wp-content/uploads/2020/06/Paymentsuccessful21.png',
      cancel_url: 'https://media.licdn.com/dms/image/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=QVzBFLJpbDlQMX_H5iKXr7Jr1w6Pm60tOJb47rjpX6Q',
      metadata: {
        script: metadata,
      },
    })
  
    res.json({ url: session.url, orderId: session.id });
  
    user.order.push({
      products: User.cart.length,
      orderid: session.id,
      total: totalSum
    })
     
    user.cart= []
    await user.save();

    // console.log(User.orderdetails)
  }

  // *************PURCHASED PRODUCTS DETAILS************

  const purchasedProducts =async(req,res)=>{


     const user_id =req.params.id
     const checkUser = await user.findById(user_id)

     res.json(checkUser.order)

  }




module.exports={userRegistration,userLogin,viewProductByCategory,viewSpecificProduct,addPoroductCart,add_viewProductsToWishlist,payment,purchasedProducts}
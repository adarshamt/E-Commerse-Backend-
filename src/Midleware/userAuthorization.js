const jwt = require("jsonwebtoken")

const authorizeUser = (req,res,next)=>{
   
   let authorize = req.headers.authorization
   console.log("header token",authorize);

   if(authorize == undefined ){

       res.send(" Token authorization failed")
   }

   let ipToken = authorize.split(" ")[1]
   console.log(ipToken); 

   jwt.verify(ipToken,"adarsh",function(err,decode){

       if(err){
           res.status(500).send({error:'AUTHENTICATIPN FAILED'})
       }
       else{

           next()
       }
   })

}
module.exports={authorizeUser}
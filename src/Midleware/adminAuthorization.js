const jwt = require("jsonwebtoken")


const adminAuthentication = (req,res,next)=>{

    const ipToken = req.headers.authorization

    if(ipToken == undefined){
         
        return res.status(5000,"no token found")
    }

     let checkToken = ipToken.split(" ")[1]
    //  console.log(adarsh,"hello")
     jwt.verify(checkToken,"admin",function(err,decode){

        if(err){
            console.log("hello")

            res.send("authentication token failed")
        }
        else{
        
            next()
        }
    })
    
}

module.exports={adminAuthentication}
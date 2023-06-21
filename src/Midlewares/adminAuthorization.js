const jwt = require("jsonwebtoken")


const adminAuthentication = (req,res,next)=>{

    const ipToken = req.headers.athorization

    if(ipToken == undefined){

        res.status(5000,"no token found")
    }

     let checkToken = ipToken.split(" ")[1]

     jwt.verify(checkToken,adarsh,function(err,decode){

        if(err){

            res.send("authentication token failed")
        }
        else{
        
            next()
        }
    })
    
}

module.exports={adminAuthentication}
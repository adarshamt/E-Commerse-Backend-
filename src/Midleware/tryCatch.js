

const tryCatchfFunction = (method)=>{

    return async (req,res,next)=>{
    
   try
   { 
          await method(req,res,next)
   }

catch(err){
    res.status(500)
    res.json({

        status:" failure",
        err_message:err.messege
    })
    
}
}
}


module.exports=tryCatchfFunction
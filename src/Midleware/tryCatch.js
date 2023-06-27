

const tryCatchfFunction = (method)=>{

    return async (req,res,next)=>{
    
   try
   { 
          await method(req,res,next)
   }

catch(error){
    res.status(500)
    res.json({

        status:" failure",
        err_message:error.message
    })
    
}
}
}


module.exports=tryCatchfFunction
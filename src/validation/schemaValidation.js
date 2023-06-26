const joi = require("joi")


const userVal = joi.object({

    username : joi.string().alphanum().min(3).max(15).required(),
     email : joi.string().email(),
     password : joi.string().pattern(new RegExp('^[A-zA-Z0-9]{3,30}$')).required()



})





module.exports= {userVal}
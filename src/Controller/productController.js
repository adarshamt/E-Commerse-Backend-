const productSchema = require("../Model/productSchema")


// **********ADD PRODUCT**********
 
const addProduct =  async (req,res)=>{

    const updatedProducts = new productSchema(req.body)

    const item= await updatedProducts.save()
    res.json(item)


}


module.exports={addProduct}
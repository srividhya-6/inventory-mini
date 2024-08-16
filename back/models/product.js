const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/inventory").then(()=>{
    console.log("connected successfully")
})
const productSchema=mongoose.Schema(
    {
        name:String,
<<<<<<< HEAD
=======
        image:String,
        location:String,
>>>>>>> 99a7522762b65b042459f6c16db90c21fb00d188
        description:String,
        location:String,
        price:Number,
        quantity:Number,
        category:String,
        image:String
    }
)
module.exports=mongoose.model("product",productSchema)
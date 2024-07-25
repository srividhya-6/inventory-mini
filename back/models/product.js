const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/inventory").then(()=>{
    console.log("connected successfully")
})
const productSchema=mongoose.Schema(
    {
        name:String,
        description:String,
        location:String,
        price:Number,
        quantity:Number,
        category:String,
        image:String
    }
)
module.exports=mongoose.model("product",productSchema)
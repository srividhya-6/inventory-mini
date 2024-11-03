const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://srividhyadhinne:srividhya@inventorycluster.pmwtw.mongodb.net/?retryWrites=true&w=majority&appName=inventoryCluster").then(()=>{
    console.log("connected successfully")
})
const productSchema=mongoose.Schema(
    {
        name:String,
        image:String,
        location:String,
        description:String,
        location:String,
        price:Number,
        quantity:Number,
        category:String,
        image:String
    }
)
module.exports=mongoose.model("product",productSchema)
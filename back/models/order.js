const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://srividhyadhinne:srividhya@inventorycluster.pmwtw.mongodb.net/?retryWrites=true&w=majority&appName=inventoryCluster").then(()=>{
    console.log("connected successfully")
})
const itemsSchema=mongoose.Schema({
    productId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity:Number
})
const orderSchema=mongoose.Schema(
    {
        userId:
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"user"
            },
        items:[itemsSchema],
        totalPrice:Number,
        status:String,
        address:String,
        orderDate:String
    }
)

module.exports=mongoose.model("order",orderSchema)
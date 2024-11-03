const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://srividhyadhinne:srividhya@inventorycluster.pmwtw.mongodb.net/?retryWrites=true&w=majority&appName=inventoryCluster").then(()=>{
    console.log("connected successfully")
})

const userSchema=mongoose.Schema(
    {
        username:String,
        email:String,
        password:String,
        role:String,
        address:String,
        profile:String
    }
)

module.exports=mongoose.model("user",userSchema)


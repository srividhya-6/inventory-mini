const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/inventory").then(()=>{
    console.log("connected successfully")
})

const userSchema=mongoose.Schema(
    {
        username:String,
        email:String,
        password:String,
        role:String
    }
)

module.exports=mongoose.model("user",userSchema)
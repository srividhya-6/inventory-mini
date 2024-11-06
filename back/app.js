const express=require("express");
const cors=require("cors")
const app=express();
const mongoose=require("mongoose");
const productRoute=require("./routes/productRoute")
const orderRoute=require("./routes/orderRoute")
const {route:userRoute,verifyToken}=require("./routes/userRoute")


app.use(cors({
    origin:["https://deploy-mern-1whq.vercel.app"],
    methods:["POST","GET"],
    credentials:true
}));



app.use(userRoute);
app.use(orderRoute);
app.use(productRoute)

app.set(express.json())
app.set("view engine","ejs");
app.get("/",(req,res)=>{
    res.render("home.ejs")
})
app.listen(8082,(req,res)=>{
    console.log("listening to server")
})


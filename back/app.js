const express=require("express");
const cors=require("cors")
const app=express();



const mongoose=require("mongoose");
const productRoute=require("./routes/productRoute")
const orderRoute=require("./routes/orderRoute")
const {route:userRoute,verifyToken}=require("./routes/userRoute")
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
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


const express=require("express");
const route=express.Router();
const app=express()
const user=require("../models/user");
const jwt=require("jsonwebtoken")
route.use(express.json());
route.use(express.urlencoded({extended:true}));

// app.set("view engine","ejs");
// route.get("/login",(req,res)=>{
//     res.render("login.ejs");
// })
// route.get("/signup",(req,res)=>{
//     res.render("signup.ejs");
// })
route.post("/login",async (req,res)=>{
    const u=req.body;
    const p=await user.find({email:u.email,password:u.password})
    if(p.length!=0){
        res.send(p)
    }
    else{
    res.send("")
    }
})
route.post("/signup",async (req,res)=>{
    const u=req.body;
    const us=await user.create(u)
    res.send(us)
    // jwt.sign({u},"secret signup key",(err,token)=>{
    //     res.json({token})
    // })
})
// function verifyToken(req,res,next){
//     token=req.headers.authorization.split(" ")[1];
//     req.token=token;
//     next();
// }
module.exports={route}
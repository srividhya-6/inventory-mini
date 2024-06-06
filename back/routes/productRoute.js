const express=require("express");
const route=express.Router();
const product=require("../models/product");
const jwt=require("jsonwebtoken");
route.use(express.json());
route.use(express.urlencoded({extended:true}));
const {route:userRoute,verifyToken}=require("./userRoute")
route.use(userRoute);

route.get("/api/products",async (req,res)=>{
    let products=await product.find({});
    res.json(products)
})
route.get("/api/products/:id",async (req,res)=>{
    let o=await product.findById(req.params.id);
    res.send(o)
})
route.post("/api/products",async (req,res)=>{
    // jwt.verify(req.token,"secret admin key",async (err,data)=>{
    //     if(err){
    //         res.send("user is not valid")
    //     }
    //     else{
            await product.create(req.body)
            res.send("post your product")
    //     }
    // })
    
})
route.put("/api/products/:id",async (req,res)=>{
    // jwt.verify(req.token,"secret admin key",async (err,data)=>{
    //     if(err){
    //         res.send("user is not valid")
    //     }
        // else{
            let o=req.body;
            await product.findByIdAndUpdate(req.params.id,o)
            res.send("updated")
    //     }
    // })
    
})
route.delete("/api/products/:id",async (req,res)=>{
    // jwt.verify(req.token,"secret admin key",async (err,data)=>{
    //     if(err){
    //         res.send("user is not valid")
    //     }
        // else{
            await product.findByIdAndDelete(req.params.id)
            res.send("deleted")
    //     }
    // })
    
})
module.exports=route
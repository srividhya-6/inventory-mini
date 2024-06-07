const express=require("express");
const route=express.Router();
const jwt=require("jsonwebtoken");
const order=require("../models/order");
route.use(express.json());
route.use(express.urlencoded({extended:true}));
const {route:userRoute,verifyToken}=require("./userRoute")
route.use(userRoute);

route.get("/api/orders",async (req,res)=>{
    // jwt.verify(req.token,"secret login key",async (err,data)=>{
    //     if(err){
    //         jwt.verify(req.token,"secret signup key",async (err,data)=>{
    //             if(err){
    //                 res.send("user is not valid")
    //             }
    //             else{
    //                 res.send("you have no orders yet")
    //             }
    //         })
    //     }
    //     else{
            let orders=await order.find({});
            res.send(orders)
    //     }
    // })
    
    
})
route.get("/api/orders/:id",async (req,res)=>{
    
            let o=await order.find({userId:req.params.id});
            res.send(o[0])   
    
})
route.post("/api/orders/",async (req,res)=>{
    // jwt.verify(req.token,"secret login key",async (err,data)=>{
    //     if(err){
    //         jwt.verify(req.token,"secret signup key",async (err,data)=>{
    //             if(err){
    //                 res.send("user is not valid")
    //             }
    //             else{
    //                 await order.create(req.body)
    //                 res.send("placed an order")
    //             }
    //         })
    //     }
    //     else{
    //         await order.create(req.body)
    //         res.send("places an order")
    //     }
    // })
            await order.create(req.body)
            res.send("places an order")
    
   
})
route.put("/api/orders/:id",async (req,res)=>{
    let o=req.body;
    let r=await order.findByIdAndUpdate(req.params.id,o)
    res.send(r)
})
route.put("/api/orders/:id/status",async (req,res)=>{
    // jwt.verify(req.token,"secret login key",async (err,data)=>{
    //     if(err){
    //         res.send("user is not valid")
    //     }
    //     else{
            let o=req.body;
            await order.findByIdAndUpdate(req.params.id,o)
            res.send("updated")
    //     }
    // })
    
})
route.delete("/api/orders/:id",async (req,res)=>{
    jwt.verify(req.token,"secret login key",async (err,data)=>{
        if(err){
            res.send("user is not valid")
        }
        else{
            await order.findByIdAndDelete(req.params.id)
            res.send("deleted")
        }
    })
    
})
module.exports=route
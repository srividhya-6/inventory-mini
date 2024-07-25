const express=require("express");
const route=express.Router();
const app=express()
const user=require("../models/user");
const jwt=require("jsonwebtoken")
route.use(express.json());
route.use(express.urlencoded({extended:true}));

route.get("/user/:id",async(req,res)=>{
    let u=await user.findById(req.params.id)
    console.log(u)
    res.send(u);
})
route.put("/user/:id",async (req,res)=>{
    
            let o=req.body;
            await user.findByIdAndUpdate(req.params.id,o)
            res.json(await user.find({}))
   
})
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
    
    if((await user.find({email:u.email})).length!=0){
        res.send("")
    }
    else{
    const us=await user.create(u)
    res.send(us)
    }
   
})

module.exports={route}

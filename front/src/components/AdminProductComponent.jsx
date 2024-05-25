import { useState,useEffect } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';

import axios from 'axios'
import Button from '@mui/material/Button';
import { useNavigate, useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

export default function AdminProductComponent(){
  let oid="";
  const {id:uid}=useParams()
    const navigate=useNavigate()
    // let [add,setAdd]=useState(false)
    let [products,setProducts]=useState([]);
    useEffect(function updateProducts(){
        axios.get("http://localhost:8082/api/products").then(response=> {
            console.log(response.data);
            setProducts(response.data)})
    },[])
    function deleteProduct(id){
      let r=alert("Do you want to delete ?");
      if(!r){
        axios.delete(`http://localhost:8082/api/products/${id}`).then(res=>{
            console.log(res.data);
            setProducts(products.filter((p)=>p._id!=id))
        })
      }
    }
   
 
    
    return(
        <>
           <div style={{display:"flex",flexWrap:"wrap",justifyContent:"flex-start",alignContent:"flex-start"}}> 
          {products.map((p)=> (
              <Card sx={{ maxWidth: 345 }} style={{margin:20,textAlign:"left",width:500}}>
              <CardMedia
                sx={{ height: 140 }}
                image={p.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {p.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Description: {p.description}<br/>
                Price: {p.price}<br/>
                Quantity: {p.quantity}<br/>
                Category: {p.category}
                </Typography>
              </CardContent>
              <CardActions>
              <Button variant="contained" size="small" type='submit' onClick={()=>navigate(`/products/edit/${p._id}`)}>Edit</Button>
              <Button variant="contained" size="small" type='submit' onClick={()=>deleteProduct(p._id)}>Delete</Button>
              {/* {p.quantity>0 ? <Button variant="contained" size="small" type='submit' onClick={()=>addProduct(p._id)}>+</Button>:"nostock"} */}
              </CardActions>
              </Card>
          ))}
        </div>
    <form action="/product/new">
    <Button variant="contained" type='submit'>Add Product</Button>
    </form>
    {/* {add?<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Product Added Scuuessfully
</Alert>:""} */}
    <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
            <button onClick={()=>navigate(`/orders`)} className="btn btn-primary">orders</button>
        </div>
    </footer>
        </>
    )
}


import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "bootstrap/dist/css/bootstrap.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeComponent from "./HomeComponent";
import HeaderComponent from "./header";
import FooterComponent from "./footer";
export default function ProductComponent(){
    let c=document.cookie.split(";")
  let role=c[0].split("=")[1];
  
  let profile=c[2].split("=")[1];
   profile = decodeURIComponent(profile)
    const navigate=useNavigate()
    let { id } = useParams();
    let [product,setProduct]=useState({});
    useEffect(()=>{
        axios.get(`https://inventory-mini.vercel.app/api/products/${id}`).then(res=>
            {
               console.log(res.data);
               setProduct(res.data)
           })
    },[])
    const notify = () => {toast.success('product deleted successfully !!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        })};
      function deleteProduct(id){
        let r=confirm("Do you want to delete ?");
        if(r==true){
          axios.delete(`https://inventory-mini.vercel.app/api/products/${id}`).then(res=>{
              console.log(res.data);
              setTotal(total.filter((p)=>p._id!=id))
              setProduct(product.filter((p)=>p._id!=id))
              navigate(`/products`)
              notify()
          })
        }
      }
    return(
        <>
        <HeaderComponent/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Card sx={{ maxWidth: 400 }} style={{margin:50,width:700}}>
            <ToastContainer/>
          {product.image?<CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image={product.image}
          />:<CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image="image"
        />}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              <img src={product.image} alt={product.name} />
            </Typography> 
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Category : {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price : {product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Quantity : {product.quantity}
            </Typography>
          </CardContent>
          <CardActions>
            {role=="admin"?<Button type="submit" className="btn" size="small" onClick={()=>navigate(`/products/edit/${product._id}`)}>Edit</Button>:""}
            {role=="admin"?<Button type="submit" className="btn" size="small" onClick={()=>deleteProduct(product._id)}>Delete</Button>:""}
             
          </CardActions>
        </Card>
        </div>
        <FooterComponent/>
        </>
      );
}

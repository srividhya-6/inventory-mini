
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function NewProductComponent(){
    const navigate=useNavigate()
    let [product,setProduct]=useState({
        name:"",
        description:"",
        price:0,
        quantity:0,
        category:""
    
    });
    function updateProduct(e){
        e.preventDefault()
        let fname=e.target.name;
        let value=e.target.value;
        setProduct((product)=>{
            product[fname]=value;
            return {...product}
        })
    }
    function addProduct(e){
        e.preventDefault()
        axios.post("http://localhost:8082/api/products",product).then(response=>
         {
            console.log(response.data);
            // navigate("/products")

        })
    }
    return (
        <form>
           <TextField fullWidth name="name" label="Name" id="fullWidth" onChange={updateProduct} value={product.name}/><br /><br /><br />
           
           <TextField fullWidth label="Description" name="description" id="fullWidth" onChange={updateProduct} value={product.description}/><br /><br /><br />
           <TextField  label="Price" name="price" id="outlined-basic" onChange={updateProduct} value={product.price}/>&nbsp;&nbsp;&nbsp;
           <TextField  label="Quantity" name="quantity" id="outlined-basic" onChange={updateProduct} value={product.quantity}/>&nbsp;&nbsp;&nbsp;
           <TextField  label="Category" name="category" id="outlined-basic" onChange={updateProduct} value={product.category}/><br /><br /><br />
           <TextField fullWidth name="image" label="Image" id="fullWidth" onChange={updateProduct} value={product.image}/><br /><br /><br />
           <Button variant="contained" type='submit' onClick={addProduct}>Add Product</Button>
        </form>
    )
}
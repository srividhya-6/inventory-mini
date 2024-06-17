
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./newProduct.css"
import HeaderComponent from './header';
import FooterComponent from './footer';
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
            navigate("/products")

        })
    }
    return (
        <>
        <HeaderComponent></HeaderComponent>
        <div class="container">
        <h2 class="form-title">Add Product</h2>
        <form id="addProductForm" class="product-form">
          <div class="form-group">
            <label for="productName" class="form-label">Product Name:</label>
            <input type="text" id="productName" name="name" class="form-input" onChange={updateProduct} value={product.name} required/>
          </div>
          <div class="form-group">
            <label for="productDescription" class="form-label">Description:</label>
            <textarea id="productDescription" name="description" class="form-textarea" rows="3" onChange={updateProduct} value={product.description} required></textarea>
          </div>
          <div class="form-group">
            <label for="productPrice" class="form-label">Price:</label>
            <input type="number" id="productPrice" name="price" class="form-input" step="0.01" min="0" onChange={updateProduct} value={product.price}required/>
          </div>
          <div class="form-group">
            <label for="productQuantity" class="form-label">Quantity:</label>
            <input type="number" id="productQuantity" name="quantity" class="form-input" min="0" onChange={updateProduct} value={product.quantity} required/>
          </div>
          <div class="form-group">
            <label for="productCategory" class="form-label">Category:</label>
            <input type="text" id="productCategory" name="category" class="form-input" onChange={updateProduct} value={product.category} required/>
          </div>
          <div class="form-group">
            <button type="submit" class="form-button" onClick={addProduct}>Add Product</button>
          </div>
        </form>
       </div>
       <FooterComponent></FooterComponent>
       </>
    )
}
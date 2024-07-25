import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HeaderComponent from './header';
import Cookies from 'universal-cookie';
import FooterComponent from './footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cookies = new Cookies();
export default function EditProductComponent(){
    const navigate=useNavigate()
    let { id } = useParams();
    let [product,setProduct]=useState({});
    useEffect(()=>{
        axios.get(`http://localhost:8082/api/products/${id}`).then(res=>
            {
               console.log(res.data);
               setProduct(res.data)
           })
    },[])
    function updateProduct(e){
        e.preventDefault()
        let fname=e.target.name;
        let value=e.target.value;
        setProduct((product)=>{
            product[fname]=value;
            return {...product}
        })
    }
    const notify = () => {toast.warn('please fill all fields', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      })};
    function editProduct(e){
        e.preventDefault()
        if (!product.name || !product.description || !product.price || !product.quantity || !product.category) {
          notify();
          return;
      }
        axios.put(`http://localhost:8082/api/products/${id}`,product).then(response=>
         {
            
            console.log(response.data);
            navigate(`/products`)

        })
    }
    return (
        <>
        <HeaderComponent></HeaderComponent>
        <ToastContainer/>
        <div class="container">
        <h2 class="form-title">Add Product</h2>
        <form id="addProductForm" class="product-form">
          <div class="form-group">
            <label for="productName" class="form-label">Product Name:</label>
            <input type="text" id="productName" name="name" class="form-input" value={product.name} onChange={updateProduct} required/>
          </div>
          <div class="form-group">
            <label for="productDescription" class="form-label">Description:</label>
            <textarea id="productDescription" name="description" class="form-textarea" rows="3" value={product.description} onChange={updateProduct} required></textarea>
          </div>
          <div class="form-group">
            <label for="productPrice" class="form-label">Price:</label>
            <input type="number" id="productPrice" name="price" class="form-input" step="0.01" min="0" value={product.price} onChange={updateProduct} required/>
          </div>
          <div class="form-group">
            <label for="productQuantity" class="form-label">Quantity:</label>
            <input type="number" id="productQuantity" name="quantity" class="form-input" min="0" value={product.quantity} onChange={updateProduct} required/>
          </div>
          <div class="form-group">
            <label for="productlocation" class="form-label">location:</label>
            <select  value={product.location} id="productlocation" name="location" class="form-textarea" rows="3" onChange={updateProduct}  required>
              <option value="">select option</option>
              <option value="Zone-A/Row1" >Zone-A/Row1</option>
              <option value="Zone-A/Row2">Zone-A/Row2</option>
              <option value="Zone-B/Row1">Zone-B/Row1</option>
              <option value="Zone-B/Row2">Zone-B/Row2</option>
              <option value="Zone-C/Row1">Zone-C/Row1</option>
              <option value="Zone-C/Row2">Zone-C/Row2</option>
              <option value="Zone-D/Row1">Zone-D/Row1</option>
              <option value="Zone-D/Row2">Zone-D/Row2</option>
            </select>
          </div>
          <div class="form-group">
            <label for="productCategory" class="form-label">Category:</label>
            <input type="text" id="productCategory" name="category" class="form-input" value={product.category} onChange={updateProduct} required/>
          </div>
          <div class="form-group">
            <label for="productImage" class="form-label">Image URL:</label>
            <input type="text" id="productImage" name="image" class="form-input" onChange={updateProduct} value={product.image} required/>
          </div>
          <div class="form-group">
            <button type="submit" class="form-button" onClick={editProduct}>Edit Product</button>
          </div>
        </form>
       </div>
        <FooterComponent></FooterComponent>
       </>
    )
}
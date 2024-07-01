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
            <label for="productCategory" class="form-label">Category:</label>
            <input type="text" id="productCategory" name="category" class="form-input" value={product.category} onChange={updateProduct} required/>
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
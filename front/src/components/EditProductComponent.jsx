import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
    function editProduct(e){
        e.preventDefault()
        axios.put(`http://localhost:8082/api/products/${id}`,product).then(response=>
         {
            console.log(response.data);
            navigate(`/products`)

        })
    }
    return (
        <form>
            
            <br /><br /><br />
        <TextField fullWidth name="name" label="Name" id="fullWidth"value={product.name} onChange={updateProduct} /><br /><br /><br />
        <TextField fullWidth label="Description" name="description" id="fullWidth"value={product.description} onChange={updateProduct} /><br /><br /><br />
        
        <TextField  label="Price" name="price" id="outlined-basic" value={product.price} onChange={updateProduct}/>&nbsp;&nbsp;&nbsp;
        <TextField  label="Quantity" name="quantity" id="outlined-basic"value={product.quantity} onChange={updateProduct} />&nbsp;&nbsp;&nbsp;
        <TextField  label="Category" name="category" id="outlined-basic"value={product.category} onChange={updateProduct} /><br /><br /><br />
        <Button variant="contained" type='submit' onClick={editProduct}>Edit</Button>
     </form>
    )
}
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from "react";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import axios from 'axios';
import noproduct from "../assets/images/noproduct.jpg"
import HeaderComponent from './header';
import { useNavigate, useParams } from "react-router-dom";
import FooterComponent from './footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductComponent(){
  let oid="";
  const {id:uid}=useParams()
    const navigate=useNavigate()
    let [add,setAdd]=useState(false)
    let [products,setProducts]=useState([]);
    let [total,setTotal]=useState([]);
    let [search,setSearch]=useState("");
    useEffect(function updateProducts(){
        axios.get("http://localhost:8082/api/products").then(response=> {
            console.log(response.data);
            setProducts(response.data)
            setTotal(response.data)})
    },[])
    // function deleteProduct(id){
    //     axios.delete(`http://localhost:8082/api/products/${id}`).then(res=>{
    //         console.log(res.data);
    //         setProducts(products.filter((p)=>p._id!=id))
    //     })
    // }
   
    function updatesearch(e){
      setSearch(e.target.value)
     }
     function searchProduct(){
      setProducts(total.filter((p)=>p.name.toLowerCase().includes(search.toLowerCase())))
     }
    function addProduct(id){
      axios.get(`http://localhost:8082/api/products/${id}`).then(re=>{
        let product=re.data;
        axios.get(`http://localhost:8082/api/orders/${uid}`).then(res=>{
          let order=res.data;
          oid=order._id
<<<<<<< HEAD

=======
          console.log(order);
          
>>>>>>> 99a7522762b65b042459f6c16db90c21fb00d188
          let r=order.items.find(p=>p.productId==id)
          if(r){
            r.quantity=r.quantity+1;
          }
          else{
            order.items.push({productId:id,quantity:1})
          }
          order.totalPrice=order.totalPrice+product.price;
          order.status="place order"
          axios.put(`http://localhost:8082/api/orders/${oid}`,order).then(res=>{
            
            product.quantity=product.quantity-1
            axios.put(`http://localhost:8082/api/products/${id}`,product).then(res=>{
              setProducts(res.data)
              setTotal(res.data)
              notify()
            }
            ) 
          })
        })
      })
    }
    return(


      <>
        <HeaderComponent></HeaderComponent>
        <ToastContainer />
        <label for="search" > Search : </label>
       <input type="text" placeholder="search by name" id="search" name="search" style={{width:350,margin:10,borderRadius:3,borderBlockColor:"#BD96BD"}} value={search} onChange={updatesearch}/>  <button type='submit' style={{backgroundColor:"#BD96BD",border:"none",borderRadius:4,padding:3,width:30}}><SearchIcon onClick={searchProduct} fontSize="small" style={{color:"white"}}></SearchIcon></button>
       <div className='products'>
       {products.length!=0?products.map((p) => (
        
<<<<<<< HEAD
       {products.length!=0?<TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                      <TableRow className='tablehead'>
                          <StyledTableCell align="left">ProductId</StyledTableCell>
                          <StyledTableCell align="left">Name</StyledTableCell>
                          <StyledTableCell align="left">image</StyledTableCell>
                          <StyledTableCell align="left">Category</StyledTableCell>
                          <StyledTableCell align="left">Description</StyledTableCell>
                          <StyledTableCell align="left">Price</StyledTableCell>
                          <StyledTableCell align="left">Quantity</StyledTableCell>   
                          <StyledTableCell align="left">Add Cart</StyledTableCell>   
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {products.map((p) => (
                           <Tooltip title="Double click to view the Product" arrow>
                          <StyledTableRow onDoubleClick={()=>navigate(`/products/view/${p._id}`)}>
                              <StyledTableCell component="th" scope="row">
                                  {p._id}
                              </StyledTableCell>
                              <StyledTableCell align="left">{p.name}</StyledTableCell>   
                              <StyledTableCell align="left"><img src={p.image} width={80} alt={p.name}/></StyledTableCell> 
                              <StyledTableCell align="left">{p.category}</StyledTableCell>   
                              <StyledTableCell align="left">{p.description}</StyledTableCell>   
                              <StyledTableCell align="left">{p.price}</StyledTableCell>   
                              <StyledTableCell align="left">{p.quantity}</StyledTableCell>   
                              <StyledTableCell align="left">{p.quantity>0 ? <Button variant="contained" size="small" type='submit' onClick={()=>addProduct(p._id)} className='btn'>add cart</Button>:"nostock"}</StyledTableCell>   
                          </StyledTableRow>
                          </Tooltip>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>:<div><img src={noproduct} style={{position:"relative",left:500}}></img></div>}<br /><br />
          {add?<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Product Added Successfully
=======
        <Card className='product' sx={{ maxWidth: 345 }} >
        {p.image?<CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image={p.image}
          />:<CardMedia
          component="img"
          alt="green iguana"
          height="200"
          image="https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
        />}
        <CardContent>
         
          <Typography variant="body2" color="text.secondary">
          {p.description}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
          Category : {p.category}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
          Price : {p.price}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
          Quantity : {p.quantity}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">{p.quantity>0 ? <Button variant="contained" size="small" type='submit' onClick={()=>addProduct(p._id)} className='btn'>Add to cart</Button>:"nostock"}</Button>
          <Button size="small" onClick={()=>navigate(`/products/view/${p._id}`)}>Learn More</Button>
        </CardActions>
      </Card>)):<div><img src={noproduct} style={{position:"relative",left:500}}></img></div>}</div>
       
       {add?<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Product Added Scuuessfully
>>>>>>> 99a7522762b65b042459f6c16db90c21fb00d188
</Alert>:""}
       
       
       
       
       
       
       
       
      {/* //  <TableContainer component={Paper}>
      //         <Table sx={{ minWidth: 700 }} aria-label="customized table">
      //             <TableHead>
      //                 <TableRow className='tablehead'>
      //                     <StyledTableCell align="left">ProductId</StyledTableCell>
      //                     <StyledTableCell align="left">Name</StyledTableCell>
      //                     <StyledTableCell align="left">Category</StyledTableCell>
      //                     <StyledTableCell align="left">Description</StyledTableCell>
      //                     <StyledTableCell align="left">Price</StyledTableCell>
      //                     <StyledTableCell align="left">Quantity</StyledTableCell>   
      //                     <StyledTableCell align="left">Control</StyledTableCell>   
      //                 </TableRow>
      //             </TableHead>
      //             <TableBody>
      //                 {products.map((p) => (
      //                      <Tooltip title="Double click to view the Product" arrow>
      //                     <StyledTableRow onDoubleClick={()=>navigate(`/products/view/${p._id}`)}>
      //                         <StyledTableCell component="th" scope="row">
      //                             {p._id}
      //                         </StyledTableCell>
      //                         <StyledTableCell align="left">{p.name}</StyledTableCell>   
      //                         <StyledTableCell align="left">{p.category}</StyledTableCell>   
      //                         <StyledTableCell align="left">{p.description}</StyledTableCell>   
      //                         <StyledTableCell align="left">{p.price}</StyledTableCell>   
      //                         <StyledTableCell align="left">{p.quantity}</StyledTableCell>   
      //                         <StyledTableCell align="left">{p.quantity>0 ? <Button variant="contained" size="small" type='submit' onClick={()=>addProduct(p._id)} className='btn'>+</Button>:"nostock"}</StyledTableCell>   
      //                     </StyledTableRow>
      //                     </Tooltip>
      //                 ))}
      //             </TableBody>
      //         </Table>
      //     </TableContainer>:<div><img src={noproduct} style={{position:"relative",left:500}}></img></div>}<br /><br />
//           {add?<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
//   Product Added Scuuessfully
// </Alert>:""}
     */}
<FooterComponent></FooterComponent>
     


        </>
    )
}

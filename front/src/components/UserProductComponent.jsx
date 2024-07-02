


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
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const notify = () => {toast.success('product added successfully !!', {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  
  })};
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
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
      axios.get(`http://localhost:8082/api/products/${id}`).then(res=>{
        let product=res.data;
        axios.get(`http://localhost:8082/api/orders/${uid}`).then(res=>{
          let order=res.data;
          oid=order._id
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
        
       {products.length!=0?<TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                      <TableRow className='tablehead'>
                          <StyledTableCell align="left">ProductId</StyledTableCell>
                          <StyledTableCell align="left">Name</StyledTableCell>
                          <StyledTableCell align="left">Category</StyledTableCell>
                          <StyledTableCell align="left">Description</StyledTableCell>
                          <StyledTableCell align="left">Price</StyledTableCell>
                          <StyledTableCell align="left">Quantity</StyledTableCell>   
                          <StyledTableCell align="left">Control</StyledTableCell>   
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
                              <StyledTableCell align="left">{p.category}</StyledTableCell>   
                              <StyledTableCell align="left">{p.description}</StyledTableCell>   
                              <StyledTableCell align="left">{p.price}</StyledTableCell>   
                              <StyledTableCell align="left">{p.quantity}</StyledTableCell>   
                              <StyledTableCell align="left">{p.quantity>0 ? <Button variant="contained" size="small" type='submit' onClick={()=>addProduct(p._id)} className='btn'>+</Button>:"nostock"}</StyledTableCell>   
                          </StyledTableRow>
                          </Tooltip>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>:<div><img src={noproduct} style={{position:"relative",left:500}}></img></div>}<br /><br />
          {add?<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Product Added Scuuessfully
</Alert>:""}
    
<FooterComponent></FooterComponent>
     


        </>
    )
}

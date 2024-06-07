


import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import 'bootstrap/dist/css/bootstrap.min.css';

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
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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
    useEffect(function updateProducts(){
        axios.get("http://localhost:8082/api/products").then(response=> {
            console.log(response.data);
            setProducts(response.data)})
    },[])
    // function deleteProduct(id){
    //     axios.delete(`http://localhost:8082/api/products/${id}`).then(res=>{
    //         console.log(res.data);
    //         setProducts(products.filter((p)=>p._id!=id))
    //     })
    // }
   
 
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
            }
            ) 
          })
        })
      })
    }
    return(


      <>
        
      <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                      <TableRow>
                          <StyledTableCell align="left">ProductId</StyledTableCell>
                          <StyledTableCell align="left">Name</StyledTableCell>
                          <StyledTableCell align="left">Category</StyledTableCell>
                          <StyledTableCell align="left">Description</StyledTableCell>
                          <StyledTableCell align="left">Price</StyledTableCell>
                          <StyledTableCell align="right">Quantity</StyledTableCell>   
                          <StyledTableCell align="right">Control</StyledTableCell>   
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {products.map((p) => (
                           
                          <StyledTableRow>
                              <StyledTableCell component="th" scope="row">
                                  {p._id}
                              </StyledTableCell>
                              <StyledTableCell align="left">{p.name}</StyledTableCell>   
                              <StyledTableCell align="left">{p.category}</StyledTableCell>   
                              <StyledTableCell align="left">{p.description}</StyledTableCell>   
                              <StyledTableCell align="left">{p.price}</StyledTableCell>   
                              <StyledTableCell align="left">{p.quantity}</StyledTableCell>   
                              <StyledTableCell align="left">{p.quantity>0 ? <Button variant="contained" size="small" type='submit' onClick={()=>addProduct(p._id)}>+</Button>:"nostock"}</StyledTableCell>   
                          </StyledTableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer><br /><br />
          {add?<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  Product Added Scuuessfully
</Alert>:""}
    <footer className="footer mt-auto py-3 bg-light">
        <div className="container text-center">
            <button onClick={()=>navigate(`/orders/${uid}`)} className="btn btn-primary">orders</button>
        </div>
    </footer>

     


        </>
    )
}

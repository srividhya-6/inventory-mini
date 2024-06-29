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
import HeaderComponent from "./header";
import FooterComponent from "./footer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function OrdersComponent() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [product,setProducts]=useState([]);
    let {id}=useParams()
    useEffect(() => {
      axios.get("http://localhost:8082/api/products").then(response=> {
        console.log(response.data);
        setProducts(response.data)})
      
        axios.get(`http://localhost:8082/api/orders/${id}`)
            .then(response => {
                console.log(response.data.items);
                setOrders(response.data.items);
            })
            
    }, []);
    function addProduct(pid){
        axios.get(`http://localhost:8082/api/products/${pid}`).then(res=>{
          let product=res.data;
          
          axios.get(`http://localhost:8082/api/orders/${id}`).then(res=>{
            let order=res.data;
            let oid=order._id
            let r=order.items.find(p=>p.productId==pid)
            if(r){
              r.quantity=r.quantity+1;
            }
            else{
              order.items.push({productId:id,quantity:1})
            }
            order.totalPrice=order.totalPrice+product.price;
            order.status="place order"
            product.quantity=product.quantity-1
            axios.put(`http://localhost:8082/api/products/${pid}`,product).then(res=>{
                axios.put(`http://localhost:8082/api/orders/${oid}`,order).then(res=>{
                    console.log(res.data)
                    setOrders(res.data.items)
                    
              }
              ) 
            })
          })
        })
      }
    function subProduct(pid){
        axios.get(`http://localhost:8082/api/products/${pid}`).then(res=>{
            let product=res.data;
            axios.get(`http://localhost:8082/api/orders/${id}`).then(res=>{
              let order=res.data;
              let oid=order._id
              let r=order.items.find(p=>p.productId==pid)
              if(r){
                r.quantity=r.quantity-1;
              }
              else{
                order.items.push({productId:id,quantity:1})
              }
              order.totalPrice=order.totalPrice-product.price;
              order.status="place order"
              product.quantity=product.quantity+1
              axios.put(`http://localhost:8082/api/products/${pid}`,product).then(res=>{
                  axios.put(`http://localhost:8082/api/orders/${oid}`,order).then(res=>{
                      console.log(res.data)
                      setOrders(res.data.items)
                }
                ) 
              })
            })
          })
    }
    return (
        <div style={{textAlign:"center"}}>
        <HeaderComponent></HeaderComponent>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow className="tablehead">
                            <StyledTableCell align="left">ProductId</StyledTableCell>
                            <StyledTableCell align="left">Product Name</StyledTableCell>
                            <StyledTableCell align="right">Quantity</StyledTableCell>  
                            <StyledTableCell align="right">Price</StyledTableCell>  
                            <StyledTableCell align="right">Value</StyledTableCell>  

                            <StyledTableCell align="right">control</StyledTableCell>   
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                             (order.quantity!=0)?
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {order.productId}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {product.find((p)=>p._id==order.productId).name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{order.quantity}</StyledTableCell>   
                                <StyledTableCell align="right">{product.find((p)=>p._id==order.productId).price}</StyledTableCell>   
                                <StyledTableCell align="right">{product.find((p)=>p._id==order.productId).price*order.quantity}</StyledTableCell>   
                                <StyledTableCell align="right"><Button variant="contained" size="small" type='submit' onClick={()=>addProduct(order.productId)} className="btn">+</Button>&nbsp;&nbsp;<Button variant="contained" size="small" type='submit' onClick={()=>subProduct(order.productId)} className="btn">-</Button></StyledTableCell> 
                            </StyledTableRow>:""
                        ))}
                    </TableBody>
                </Table>
            </TableContainer><br /><br />
            <Button variant="contained" className="btn" style={{textAlign:"center"}}>Place Order</Button><br /><br />
            <FooterComponent></FooterComponent>
        </div>
    );
}

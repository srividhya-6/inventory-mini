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

export default function AllOrdersComponent() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [products,setProducts]=useState([]);
    
    useEffect(() => {
        axios.get("https://inventory-mini.vercel.app/api/products").then(response=> {
            console.log(response.data);
            setProducts(response.data)
          
        axios.get(`https://inventory-mini.vercel.app/api/orders`)
            .then(response => {
                console.log(response.data)
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            })
            });
    }, []);
    function acceptOrder(id){
        axios.get(`https://inventory-mini.vercel.app/api/getorder/${id}`).then(res=>{
            let order=res.data;
            order.status="accepted";
            axios.put(`https://inventory-mini.vercel.app/api/orders/${id}`,order).then(res=>{
                axios.get(`https://inventory-mini.vercel.app/api/orders`)
                .then(response => {
                console.log(response.data)
                setOrders(response.data);
            })
            })
        })
    }
    function deliverOrder(id){
        axios.get(`https://inventory-mini.vercel.app/api/getorder/${id}`).then(res=>{
            let order=res.data;
            order.status="delivered";
            axios.put(`https://inventory-mini.vercel.app/api/orders/${id}`,order).then(res=>{
                axios.get(`https://inventory-mini.vercel.app/api/orders`)
                .then(response => {
                console.log(response.data)
                setOrders(response.data);
            })
            })
        })
    }
    function cancelOrder(id){
        let r=confirm("Do you want to cancel this order ?");
        if(r){
        axios.get(`https://inventory-mini.vercel.app/api/getorder/${id}`).then(res=>{
            let order=res.data;
            order.status="canceled";
            axios.put(`https://inventory-mini.vercel.app/api/orders/${id}`,order).then(res=>{
                axios.get(`https://inventory-mini.vercel.app/api/orders`)
                .then(response => {
                console.log(response.data)
                setOrders(response.data);
            })
            })
        })
    }
    }
    return (
        <>
        <HeaderComponent></HeaderComponent>
        {orders.length!=0?<div>
            {orders.sort((a,b)=> new Date(b.orderDate) - new Date(a.orderDate)).map((o) => (
                (o.items.length)!=0&&o.status!="canceled"?
                    <div style={{borderBlockStyle:"solid",borderWidth:1.5,margin:20,padding:10,borderBlockColor:"black"}}>
                    <p>OrderId : {o._id}</p>
                    <p>UserId : {o.userId}</p>
                    <p>Delivery Address : {o.address}

                    </p>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow className="tablehead">
                        <StyledTableCell align="left">ProductId</StyledTableCell>
                        <StyledTableCell align="left">Product Name</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Value</StyledTableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                        {o.items.map((order)=>
                        ((order.quantity!=0 && products.find((p)=>p._id==order.productId))?<StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                {order.productId}
                            </StyledTableCell>
                            
                            <StyledTableCell component="th" scope="row">
                                    {(products.find((p)=>p._id==order.productId)).name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{order.quantity}</StyledTableCell>   
                                <StyledTableCell align="right">{products.find((p)=>p._id==order.productId).price}</StyledTableCell>   
                                <StyledTableCell align="right">{products.find((p)=>p._id==order.productId).price*order.quantity}</StyledTableCell>   
                        </StyledTableRow>:"")
                        
                    )}
                   
                </TableBody>
            </Table>
            
        </TableContainer>
        <p>Total Price : {o.totalPrice.toFixed(2)}</p>
        <p>Status : {o.status}</p>
        <p>Date : {o.orderDate}</p>
        <div style={{float:"right"}}>
            {o.status!="delivered"&&o.status!="accepted"?<Button variant="contained"  style={{textAlign:"center",margin:5,backgroundColor:"orange"}} onClick={()=>acceptOrder(o._id)}>Accept</Button>:""}&nbsp;&nbsp;
            {o.status!="delivered"?<Button variant="contained"  style={{textAlign:"center",margin:5,backgroundColor:"red"}} onClick={()=>cancelOrder(o._id)}>Calcel Order</Button>:""}&nbsp;&nbsp;
            {o.status!="canceled"&&o.status!="delivered"?<Button variant="contained"  style={{textAlign:"center",margin:5,backgroundColor:"green"}} onClick={()=>deliverOrder(o._id)}>Deliver</Button>:<h5 style={{color:"green"}}>Delivered</h5>}
            </div><br /><br />
        </div>:""
                
                
                
               ))}</div>:<h3 style={{height:500,textAlign:"center"}}>--No Orders Yet--</h3>}
           <FooterComponent></FooterComponent>
        </>
    );
}

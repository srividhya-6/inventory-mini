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
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import emptycart from "../assets/images/emptycart.jpg"
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import HeaderComponent from "./header";
import FooterComponent from "./footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function MyOrdersComponent() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [product,setProducts]=useState([]);
    let {id}=useParams()
    useEffect(() => {
      axios.get("https://inventory-mini.vercel.app/api/products").then(response=> {
        console.log(response.data);
        setProducts(response.data)
      
        axios.get(`https://inventory-mini.vercel.app/api/myorders/${id}`)
            .then(response => {
                console.log(response.data);
                setOrders(response.data);
            })
          })
            
    }, []);
    function cancelOrder(oid){
        let r=confirm("Do you want to cancel this order ?")
        if(r){
        const orderToDelete=orders.find((o)=>o._id==oid);
        orderToDelete.items.map((p)=>{
            axios.get(`https://inventory-mini.vercel.app/api/products/${p.productId}`).then(res=>{
                let pro=res.data;
                console.log(pro)
                pro.quantity=p.quantity+pro.quantity;
                axios.put(`https://inventory-mini.vercel.app/api/products/${p.productId}`,pro).then(res=>{

                })
            })
        })
        axios.delete(`https://inventory-mini.vercel.app/api/orders/${oid}`).then(res=>{
            axios.get(`https://inventory-mini.vercel.app/api/myorders/${id}`)
            .then(response => {
                console.log(response.data);
                setOrders(response.data);
            })
          
        })
    }
    }
    
    return (
      
        <div >
          
        <HeaderComponent></HeaderComponent>
       
        <ToastContainer/>
        {orders.length!=0?
        <div>
            {orders.sort((a,b)=> new Date(b.orderDate) - new Date(a.orderDate)).map((order)=>(
            <TableContainer component={Paper}>
                <p style={{fontSize:20}}>Order ID : {order._id}</p>
                
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
                        {order.items.map((o) => (
                             (o.quantity!=0 && product.find(p=>p._id==o.productId))?
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {o.productId}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {
                                    product.find(p=>p._id==o.productId).name
                                    }
                                </StyledTableCell>
                                <StyledTableCell align="right">{o.quantity}</StyledTableCell>   
                                <StyledTableCell align="right">{product.find((p)=>p._id==o.productId).price}</StyledTableCell>   
                                <StyledTableCell align="right">{product.find((p)=>p._id==o.productId).price*o.quantity}</StyledTableCell>   
                                </StyledTableRow>:""
                        ))}
                    </TableBody>
                </Table><br />
                <div style={{borderBlockStyle:"dashed",borderWidth:1.5,margin:3,padding:3,borderBlockColor:"black"}}>
                {order.status!="accepted" && order.status!="delivered" && order.status!="canceled"?<Button variant="contained" className="btn" style={{textAlign:"center",backgroundColor:"red",float:"right"}} onClick={()=>cancelOrder(order._id)}>Calcel Order</Button>:
                <div style={{float:"right"}}>
                   {order.status=="accepted"?<h4 style={{color:"orange"}}>Your order got accepted</h4>:
                   order.status=="delivered"?<h4 style={{color:"green"}}>Delivered successfully</h4>:
                   <h4 style={{color:"red"}}>sorry , your order got canceled</h4>}
                </div>}
            
                <p>Total Price : {order.totalPrice.toFixed(2)}</p>
                <p>Status : {order.status}</p>
                <p>Date of Order Placed : {order.orderDate}</p>
                <p>Delivery Address : {order.address}</p>
                <br></br>
                </div>
                <hr></hr>
                <br />
            </TableContainer>
            ))}
            
                        {/* <h3>Total Amount : {(orders.totalPrice).toFixed(2)}</h3> */}
            
            </div>:<h3 style={{height:500,textAlign:"center"}}>--No Orders Yet-- </h3>}
            <FooterComponent></FooterComponent>
        </div>
    );
}

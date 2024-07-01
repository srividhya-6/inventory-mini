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
      axios.get("http://localhost:8082/api/products").then(response=> {
        console.log(response.data);
        setProducts(response.data)
      
        axios.get(`http://localhost:8082/api/myorders/${id}`)
            .then(response => {
                console.log(response.data);
                setOrders(response.data);
            })
          })
            
    }, []);
    
    
    return (
      
        <div style={{textAlign:"center"}}>
          
        <HeaderComponent></HeaderComponent>
       
        <ToastContainer/>
        {orders.length!=0?
        <div>
            {orders.map((order)=>(
            <TableContainer component={Paper}>
                <h4>Order ID : {order._id}</h4>
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
                </Table>
            </TableContainer>
            ))}
            <br /><br />
                        {/* <h3>Total Amount : {(orders.totalPrice).toFixed(2)}</h3> */}
            
            </div>:<div><img src={emptycart} style={{position:"relative",left:500}}></img></div>}
            <FooterComponent></FooterComponent>
        </div>
    );
}
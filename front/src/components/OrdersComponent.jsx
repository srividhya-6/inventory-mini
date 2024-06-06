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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function OrdersComponent() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    let {id}=useParams()
    useEffect(() => {
        axios.get(`http://localhost:8082/api/orders/${id}`)
            .then(response => {
                console.log(response.data.items);
                setOrders(response.data.items);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);
    function addProduct(id){
       let o= orders.find((o)=>{
            o.productId==id
        })
        o.quantity=o.quantity+1
        axios.get(`http://localhost:8082/api/products/${id}`).then(res=>{
            let product=res.data;
            product.quantity=product.quantity-1
            axios.put(`http://localhost:8082/api/products/${id}`,product)
        })
        setOrders(o)
    }
    function subProduct(id){
       let o= orders.find((o)=>{
            o.productId==id
        })
        o.quantity=o.quantity-1
        axios.get(`http://localhost:8082/api/products/${id}`).then(res=>{
            let product=res.data;
            product.quantity=product.quantity+1
            axios.put(`http://localhost:8082/api/products/${id}`,product)
        })
        setOrders(o)
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">ProductId</StyledTableCell>
                            <StyledTableCell align="right">Quantity</StyledTableCell>   
                            <StyledTableCell align="right">control</StyledTableCell>   
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                             
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {order.productId}
                                </StyledTableCell>
                                <StyledTableCell align="right">{order.quantity}</StyledTableCell>   
                                <StyledTableCell align="right"><Button variant="contained" size="small" type='submit' onClick={()=>addProduct(order.productId)}>+</Button><Button variant="contained" size="small" type='submit' onClick={()=>subProduct(order.productId)}>-</Button></StyledTableCell>   
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer><br /><br />

            <Button variant="contained">Place Order</Button>
        </>
    );
}

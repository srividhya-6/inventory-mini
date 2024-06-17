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
    
    useEffect(() => {
        axios.get(`http://localhost:8082/api/orders`)
            .then(response => {
                
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    return (
        <>
        <HeaderComponent></HeaderComponent>
            {orders.map((o) => (
                (o.items.length)!=0?
                    <div>
                    <p>OrderId : {o._id}</p>
                    <p>UserId : {o.userId}

                    </p>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow className="tablehead">
                        <StyledTableCell align="left">ProductId</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                        
                        {o.items.map((order)=>
                        (order.quantity!=0?<StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                {order.productId}
                            </StyledTableCell>
                            <StyledTableCell align="right">{order.quantity}</StyledTableCell>
                          
                        </StyledTableRow>:"")
                        
                    )}
                   
                </TableBody>
            </Table>
        </TableContainer><br /><br />
        </div>:""
                
                
                
               ))}
           <FooterComponent></FooterComponent>
        </>
    );
}

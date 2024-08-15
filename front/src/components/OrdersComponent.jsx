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
import axios from 'axios';
import emptycart from "../assets/images/emptycart.jpg"
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

export default function OrdersComponent() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState({items:[],totalPrice:0});
    const [product,setProducts]=useState([]);
    let {id}=useParams()
    useEffect(() => {
      axios.get("http://localhost:8082/api/products").then(response=> {
        console.log(response.data);
        setProducts(response.data)
      
        axios.get(`http://localhost:8082/api/orders/${id}`)
            .then(response => {
                console.log(response.data);
                setOrders(response.data);
            })
          })
            
    }, []);
    const notify = () => {toast.success('Your order got placed !!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      })};
    function addProduct(pid){
        axios.get(`http://localhost:8082/api/products/${pid}`).then(res=>{
          let product=res.data;
          console.log(res.data);
          axios.get(`http://localhost:8082/api/orders/${id}`).then(res=>{
            let order=res.data;
            if(!order)
            {
              setOrders(product);
            }
            else{
              var oid=order._id
              var r=order.items.findIndex(p=>p.productId==pid)
              order.items[r].quantity=order.items[r].quantity+1
          }
            
            order.totalPrice=order.totalPrice+product.price;
           
            product.quantity=product.quantity-1
            
            axios.put(`http://localhost:8082/api/products/${pid}`,product).then(res=>{
                axios.put(`http://localhost:8082/api/orders/${oid}`,order).then(res=>{
                    
                    setOrders(order)
                    
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
              
                r.quantity=r.quantity-1;
                let r1=order.items.findIndex(p=>p.productId==pid)
                if(r.quantity==0){
                  order.items.splice(r1,1);
                }
              order.totalPrice=order.totalPrice-product.price;
              
              product.quantity=product.quantity+1
              axios.put(`http://localhost:8082/api/products/${pid}`,product).then(res=>{
                  axios.put(`http://localhost:8082/api/orders/${oid}`,order).then(res=>{
                      console.log(order.items)
                      setOrders(order)
                }
                ) 
              })
            })
          })
    }
    function placeOrder(){
      axios.get(`http://localhost:8082/api/orders/${id}`).then(res=>{
        let order=res.data;
        let oid=order._id
        order.status="order placed";
        product.quantity=product.quantity+1
            axios.put(`http://localhost:8082/api/orders/${oid}`,order).then(res=>{ 
                setOrders(order)
                notify();
                let newOrder={
                  userId:id,
                  items:[],
                  totalPrice:0,
                  status:"place order",
                  orderDate: new Date().toLocaleDateString(),
                  
              }
              axios.post("http://localhost:8082/api/orders",newOrder).then(res=>{
                  setOrders(res.data)
                 
              })
          }
          ) 
        })
    }
    return (
      
        <div style={{textAlign:"center"}}>
          
        <HeaderComponent></HeaderComponent>
       
        <ToastContainer/>
        {/* {orders.items.length!=0? */orders?
        <div>
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
                        {orders.items.map((order) => (
                             (order.quantity!=0 && product.find(p=>p._id==order.productId))?
                            <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {order.productId}
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    {
                                    product.find(p=>p._id==order.productId).name
                                    }
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
                        <h4>Total Amount : {(orders.totalPrice).toFixed(2)} INR</h4>
            <Button variant="contained" className="btn" style={{textAlign:"center"}} onClick={placeOrder}>Place Order</Button><br /><br />
            </div>
            :<div><img src={emptycart} style={{position:"relative"}}></img></div>}
            <FooterComponent></FooterComponent>
        </div>
    );
}
import { useState, useEffect } from "react";
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
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
import DeleteIcon from '@mui/icons-material/Delete';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import HeaderComponent from "./header";
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { colors } from "@mui/material";
import FooterComponent from "./footer";
import noproduct from "../assets/images/noproduct.jpg"
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.black,
    // color:"#BD96BD"
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

export default function AdminProductComponent(){
  let oid="";
  const {id:uid}=useParams()
    const navigate=useNavigate()
    let [add,setAdd]=useState(false)
    let [total,setTotal]=useState([])
    let [products,setProducts]=useState([]);
    let [search,setSearch]=useState("");
    useEffect(function updateProducts(){
        axios.get("https://inventory-mini.vercel.app/api/products").then(response=> {
            console.log(response.data);
            setProducts(response.data)
          setTotal(response.data)})
    },[])
    const notify = () => {toast.success('product deleted successfully !!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      
      })};
    function deleteProduct(id){
      let r=confirm("Do you want to delete ?");
      if(r==true){
        axios.delete(`https://inventory-mini.vercel.app/api/products/${id}`).then(res=>{
            console.log(res.data);
            setTotal(total.filter((p)=>p._id!=id))
            setProducts(products.filter((p)=>p._id!=id))
            notify()
        })
      }
    }
    function totalProducts(){
      setProducts(total)
    }
    function availableProducts(){
      let c=total.filter((p)=>p.quantity!=0)
      setProducts(c)
    }
    function outProducts(){
      let c=total.filter((p)=>p.quantity==0)
      setProducts(c)
    }
   function getAmount(){
    if(products.length!=0)
    {
      let res=0;
      for(let p of total){
        res+=(p.price*p.quantity)
      }
      return res;
      }
    else{
      return 0;
    }
   }
   function updatesearch(e){
    setSearch(e.target.value)
   }
   function searchProduct(){
    setProducts(total.filter((p)=>p.name.toLowerCase().includes(search.toLowerCase())))
   }
   function getOutStock(){
    let c=total.filter((p)=>p.quantity==0)
    return c.length
   }
   function getStock(){
    let c=total.filter((p)=>p.quantity!=0)
    return c.length
   }
   const styles = {
    container: {
        margin: 0,
        width: "100px",
    }
  };
    return(
        <>
        <HeaderComponent></HeaderComponent>
       <ToastContainer/>
       <div className="box">
        <div className="b1"><CategoryIcon></CategoryIcon><h4>Total Products</h4>
        {total.length}
        <Tooltip title="View Total Products" arrow>
        <a href="#"onClick={totalProducts} style={{float:"right",color:"black",textDecoration:"none"}}>show</a>
        </Tooltip>
        </div>
        <div className="b1"><MonetizationOnIcon></MonetizationOnIcon><h4>Total Amount</h4>
        <CurrencyRupeeRoundedIcon fontSize="small"></CurrencyRupeeRoundedIcon>
        {getAmount()}
        </div>
        <div className="b1"><CheckCircleIcon></CheckCircleIcon><h4>Available Stock</h4>
        {getStock()}
        <Tooltip title="View Available Products" arrow>
        <a href="#"onClick={availableProducts} style={{float:"right",color:"black",textDecoration:"none"}}>show</a>
        </Tooltip>
        </div>
        <div className="b1"><DangerousIcon></DangerousIcon><h4>Out Of Stock</h4>
        {getOutStock()}
        <Tooltip title="View Out of Stock Products" arrow>
        <a href="#"onClick={outProducts} style={{float:"right",color:"black",textDecoration:"none"}}>show</a>
        </Tooltip>
        </div>
       </div>
       <label for="search" > Search : </label>
       <input type="text" placeholder="search by name" id="search" name="search" style={{width:350,margin:10,borderRadius:3,borderBlockColor:"#BD96BD"}} value={search} onChange={updatesearch}/>
       <button style={{backgroundColor:"#BD96BD",border:"none",borderRadius:4,padding:3,width:30}}>  <SearchIcon onClick={searchProduct} fontSize="small" style={{color:"white"}}></SearchIcon></button>
        {products.length!=0?<TableContainer component={Paper} >
                <Table  aria-label="customized table">
                    <TableHead >
                        <TableRow className="tablehead">
                            <StyledTableCell align="left">ProductId</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left" >Image</StyledTableCell>
                            <StyledTableCell align="left" >location</StyledTableCell>
                            <StyledTableCell align="left">Category</StyledTableCell>
                            <StyledTableCell align="left">Description</StyledTableCell>
                            
      
                            <StyledTableCell align="left">Price</StyledTableCell>
                            <StyledTableCell align="left">Quantity</StyledTableCell>   
                            <StyledTableCell align="left">Controls</StyledTableCell>   
                        </TableRow>
                    </TableHead>
                    <TableBody>
                   
                        {products.map((p) => (
                             <Tooltip title="Double click to view the Product" arrow><StyledTableRow onDoubleClick={() => navigate(`/products/view/${p._id}`)}>
                            <StyledTableCell component="th" scope="row">
                              {p._id}
                            </StyledTableCell>
                            <StyledTableCell align="left">{p.name}</StyledTableCell>
                            <StyledTableCell align="left" ><img src={p.image} alt={p.name} width={100} /></StyledTableCell>
                            <StyledTableCell align="left" >{p.location}</StyledTableCell>
                            <StyledTableCell align="left">{p.category}</StyledTableCell>
                            <StyledTableCell align="left">{p.description}</StyledTableCell>
                            <StyledTableCell align="left">{p.price}</StyledTableCell>
                            <StyledTableCell align="left">{p.quantity}</StyledTableCell>
                            <StyledTableCell align="left">
                            <Tooltip title="Edit" onClick={() => navigate(`/products/edit/${p._id}`)}>
                                <IconButton>
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                              &nbsp;&nbsp;
                              <Tooltip title="Delete" onClick={() => deleteProduct(p._id)}>
                                <IconButton>
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>

                            </StyledTableCell>
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

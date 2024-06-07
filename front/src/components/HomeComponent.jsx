import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { red } from '@mui/material/colors';




export default function HomeComponent(){
    const color = red[100];
    return(
        <div  style={{ margin:0,height:"100vh",backgroundImage:"url(https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
            
                  <Link to="/login" ><Button style={{color:"white",float:"right"}}>Login</Button></Link>
                  <Link to="/signup"><Button style={{color:"white",float:"right"}}>signup</Button></Link>

                  <Typography variant="h2" component="h2" style={{color:"white",position:"absolute",top:150}}>
                    INVENTORY MANAGEMENT <br/>SYSTEM
                  </Typography>
    
            </div>
            // <>
            //     <Link to="/login">Login</Link>
            //       <Link to="/signup">signup</Link>
            // </>
          );
    
}
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
       
            <Box sx={{ flexGrow: 1 }} >
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick="/home">
                  Home
                  </Typography>
                  <Link to="/login"><Button style={{color:"white"}}>Login</Button></Link>
                  <Link to="/signup"><Button style={{color:"white"}}>signup</Button></Link>
                </Toolbar>
              </AppBar>
            </Box>
            // <>
            //     <Link to="/login">Login</Link>
            //       <Link to="/signup">signup</Link>
            // </>
          );
    
}
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

import background from "../assets/images/background.png"
const styles = {
  container: {
      margin: 0,
      height: "100vh",
      backgroundImage: `url(${background})`,
     backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
  }
};
export default function HomeComponent(){
    const color = red[100];
    return(
      <div style={styles.container}>
            <Link to="/login" ><Button style={{color:"white",float:"right",backgroundColor:"#886C88",margin:10}}>Login</Button></Link>
            <Link to="/signup"><Button style={{float:"right",margin:10,color:"#886C88",fontSize:15}}>signup</Button></Link>
      </div>
          );
    
}
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

// const LightTooltip = styled(({ className, ...props }) => (
//     <Tooltip {...props} classes={{ popper: className }} />
//   ))(({ theme }) => ({
//     [`& .${tooltipClasses.tooltip}`]: {
//       backgroundColor: theme.palette.common.white,
//       color: 'rgba(0, 0, 0, 0.87)',
//       boxShadow: theme.shadows[1],
//       fontSize: 11,
//     },
//   }));
  


function HeaderComponent() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  
  function logout(){
    document.cookie = 'role=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'; // Remove 'role' cookie
    document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';  
    document.cookie = 'profile=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';  
    navigate("/")
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  let navigate=useNavigate()
  let c=document.cookie.split(";")
  let role=c[0].split("=")[1];
  let id=c[1].split("=")[1];
  let profile=c[2].split("=")[1];
   profile = decodeURIComponent(profile)
   
  console.log(profile)
//   let id=document.cookie.
  return (
    <AppBar position="sticky" className='nav'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Inventory
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              
                <MenuItem  onClick={()=>navigate(`/products/${role}/${id}`)}>
                  <Typography textAlign="center">Products</Typography>
                </MenuItem>
                {role=="admin"?<MenuItem  onClick={()=>navigate("/product/new")}>
                  <Typography textAlign="center">Add Products</Typography>
                </MenuItem>:""}
                <MenuItem  onClick={()=>navigate(`/orders/${role}/${id}`)}>
                  <Typography textAlign="center">{role=="user"?"Cart":"Orders"}</Typography>
                </MenuItem>
                <MenuItem  onClick={()=>navigate("/product/pie")}>
                  <Typography textAlign="center">Analysis</Typography>
                </MenuItem>
                {role=="user"?<MenuItem  onClick={()=>navigate(`/myorders/${role}/${id}`)}>
                  <Typography textAlign="center">MyOrders</Typography>
                </MenuItem>:""}
                
            </Menu>
          </Box>
        
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'serif',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Inventory
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                
                onClick={()=>navigate(`/products/${role}/${id}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              ><Tooltip title="View All Products" arrow>
                Products
                </Tooltip>
              </Button>
              {role=="admin"?<Button
                
                onClick={()=>navigate("/product/new")}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Tooltip title="Add A New Product" arrow>
                Add Product
                </Tooltip>
              </Button>:""}
              <Button
                
                onClick={()=>navigate(`/orders/${role}/${id}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Tooltip title="View Orders" arrow>
                {role=="admin"?"Orders":"cart"}
                </Tooltip>
              </Button>
              {role=="user"?<Button
                
                onClick={()=>navigate(`/myorders/${role}/${id}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Tooltip title="View Orders" arrow>
                My Orders
                </Tooltip>
              </Button>:""}
              {role=="admin"?<Button
                
                onClick={()=>navigate("/product/pie")}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Tooltip title="Add A New Product" arrow>
                Analysis
                </Tooltip>
              </Button>:""}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                {profile?<Avatar  src={(profile)} />:<Avatar  src="" />}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={()=>navigate(`/account/${id}`)}>Account</Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={logout}>LogOut</Typography>
                </MenuItem>
              
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderComponent;

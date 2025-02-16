import React, { useState } from 'react';
import { AppBar, Toolbar, Menu, MenuItem, ListItemIcon, Typography, Box, Avatar, IconButton, Grid, Tooltip, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import logo from '../parthlogo.jpeg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuAnchorEl, setSubmenuAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmenuClick = (event) => {
    setSubmenuAnchorEl(event.currentTarget);
  };

  const handleSubmenuClose = () => {
    setSubmenuAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={isSmallScreen ? 6 : 3} container alignItems="center">
            <BusinessIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6" component="div">
              Vardhman
            </Typography>
          </Grid>
          {!isSmallScreen && (
            <Grid item xs={6} container justifyContent="center" alignItems="center">
              <img src={logo} alt="Logo" style={{ height: 40, marginRight: 8 }} />
              <Typography variant="h6" component="div">
                IPOTradesPro
              </Typography>
            </Grid>
          )}
          <Grid item xs={isSmallScreen ? 6 : 3} container justifyContent="flex-end" alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Pankaj">
                <Avatar alt="Pankaj" src="/static/images/avatar/1.jpg" sx={{ marginRight: 1 }} />
              </Tooltip>
              <IconButton
                color="inherit"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleNavigation("/")}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            Transaction Screen
          </MenuItem>
          <MenuItem onClick={() => handleNavigation("/customer-details")}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            Customer Details
          </MenuItem>
          <MenuItem onClick={() => handleNavigation("/ipo-details")}>
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            IPO Details
          </MenuItem>
          <MenuItem onClick={() => handleNavigation("/all-transactions")}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            All Transactions
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleNavigation("/ipo-transaction-pan-card-details")}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            Ipo Transaction Pan Card Details
          </MenuItem>
          <MenuItem onClick={() => handleNavigation("/ipo-transaction-allotment-details")}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            Ipo Transaction Allotment Details
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleSubmenuClick}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            Dashboard
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
          </MenuItem>
          <Menu
            anchorEl={submenuAnchorEl}
            open={Boolean(submenuAnchorEl)}
            onClose={handleSubmenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={() => handleNavigation("/dashboard")}>Overall Dashboard</MenuItem>
            <MenuItem onClick={() => handleNavigation("/ipo-status-dashboard")}>IPO Status Dashboard</MenuItem>
            <MenuItem onClick={() => handleNavigation("/ipo-detail-dashboard")}>IPO Detail Dashboard</MenuItem> {/* Add the new menu item */}
            <MenuItem onClick={() => handleNavigation("/client-profit-dashboard")}>Client Profit Dashboard</MenuItem>
            <MenuItem onClick={() => handleNavigation("/client-outstanding-dashboard")}>Client Outstanding Dashboard</MenuItem>
          </Menu>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
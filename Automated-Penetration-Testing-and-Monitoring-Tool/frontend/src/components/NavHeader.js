import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavHeaderElements';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
// import { ThemeProvider } from 'react-bootstrap';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { styled, Button, IconButton, Link } from '@material-ui/core';
import Home from '../Home';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red['A700'],
    },
    secondary: {
      main: green['A400'],
    },
  },
});

const HomeBadge = () => {
  return (
    <IconButton aria-label='home badge' href='/'>
      <img src='/dolphin-defender.png'/>
      <p>Dolphin Defender</p>
    </IconButton>
  )
}

const NavHeader = () => {
  return (
    <ThemeProvider theme={theme}>
      <Nav>
        <Bars />
        <HomeBadge />
        <NavMenu>
        <NavLink to ='/login' activeStyle>
            Login 
            </NavLink>
          <NavLink to='/home' activeStyle>
            Home
          </NavLink>
          <NavLink to='/scan'>
            Scan
          </NavLink>
        </NavMenu>
      </Nav>
    </ThemeProvider>
  );
};
  
export default NavHeader;
import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
// import styled from 'styled-components';
import { styled } from '@material-ui/styles';
import { Button } from '@material-ui/core';

export const Nav = styled('nav')({
  background: "#dc143c",
  height: "85px",
  display: "flex",
  justifyContent: "space-between",
  padding: "0.2rem calc((100vw - 1000px) / 2)",
  zIndex: "12",
  /* Third Nav */
  /* justify-content: flex-start; */
});

export const NavLink = styled(Link)({
  color: "#fffaf0",
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  padding: "0 1rem",
  height: "100%",
  fontSize: "1.5em",
  cursor: "pointer",
  "&.active": {
    color: "#000000"
  },
  "&:hover": {
    color: "#ffaaa0",
    textDecoration: "none",
  }
});
  
export const Bars = styled(FaBars)({
  display: "none",
  color: "#808080",
  "@media screen and (max-width: 768px)": {
    display: "block",
    position: "absolute",
    top: 0,
    right: 0,
    transform: "translate(-100%, 75%)",
    fontSize: "1.8rem",
    cursor: "pointer",
  }
});
  
export const NavMenu = styled('div')({
  display: "flex",
  alignItems: "center",
  marginRight: "-24px",
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  "@media screen and (max-width: 768px)": {
    display: "none",
  }
});
  
export const NavBtn = styled('nav')({
  display: "flex",
  alignItems: "center",
  marginRight: "24px",
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  "@media screen and (max-width: 768px)": {
    display: "none",
  }
});
  
export const NavBtnLink = styled(Button)({
  borderRadius: "4px",
  background: "#808080",
  padding: "10px 22px",
  color: "#000000",
  outline: "none",
  border: "none",
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
  textDecoration: "none",
  /* Second Nav */
  marginLeft: "24px",
  "&:hover": {
    transition: "all 0.2s ease-in-out",
    background: "#fff",
    color: "#808080",
  }
});
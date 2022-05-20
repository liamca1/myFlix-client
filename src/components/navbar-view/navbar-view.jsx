import React from "react";
import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Form, FormControl } from 'react-bootstrap';

import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import './navbar-view.scss';



export function NavbarView({user}) {

    onLoggedOut = () => {
      localStorage.clear();
      window.open('/', '_self');
    };

    const isAuth = () => {
      if(typeof window == "undefined") {
        return false;
      }
      if(localStorage.getItem("token")) {
        return localStorage.getItem("token");
      } else {
        return false;
      }
    };

    return (
        <Navbar id="navbar" fixed="top">
          <Container id="navbar-container">
          <Navbar.Brand id="navbar-brand" href="#">gathering</Navbar.Brand>
          <Nav id="nav" className="me-auto">
            <Nav.Link id="nav-link" href="#home">Account</Nav.Link>
            <Nav.Link id="nav-link" href="#features">Watchlist</Nav.Link>
            <Nav.Link id="nav-link" href="#pricing">Register</Nav.Link>
            <Nav.Link onClick={() => { this.onLoggedOut() }} id="nav-link" href="#logout">Logout</Nav.Link>
          </Nav>
          </Container>
        </Navbar>
    )
}
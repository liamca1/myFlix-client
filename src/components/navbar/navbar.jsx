import React, { Fragment } from 'react';
import { Navbar, Navlink, Container, Nav } from 'react-bootstrap';

export function Navbar({user}) {

  const isAuth = () => {
    let accessToken = localStorage.getItem('token');
    if (accessToken) {
      return accessToken;
    } else {
      return false;
    }
  };

  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  return (
    <Navbar expand="lg" className="mb-5">
      <Container>
        <Navbar>
            <Nav className="me-auto">
            {isAuth() &&
            <Fragment>
                <Navbar.Brand id="navbar-brand" href="/">Gathering</Navbar.Brand>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </Fragment>
            }
            {!isAuth() &&
            <Fragment>
              <Nav.Link href={'/login'}>Sign-in</Nav.Link>
              <Nav.Link href={'/register'}>Sign-up</Nav.Link>
            </Fragment>
            }
            </Nav>
        </Navbar>
      </Container>
    </Navbar>
  )
}
import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap";
import './Navi.css';

const Navi = () => {
  return (
    <Navbar className="Navbar">
        <Container className="Container">
          <Navbar.Brand className="Navlogo" href="./">
            PennyWise
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/Main">
                <img src="img/con0.png" alt="Link Icon" />
              </Nav.Link>
              <Nav.Link href="/dashboard">
                <img src="img/con3.png" alt="Link Icon" />
              </Nav.Link>
              <Nav.Link href="/Community">
                <img src="img/con1.png" alt="Link Icon" />
              </Nav.Link>
              <Nav.Link href="#about">
                <img src="img/con2.png" alt="Link Icon" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Navi

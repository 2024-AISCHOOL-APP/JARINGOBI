import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Formik } from 'formik';
import * as yup from 'yup';
import './SignupStyle.css';

const Signup = () => {
  return (
    <div>
      <Navbar className='Navbar'>
        <Container className='Container'>
          <Navbar.Brand className='Navlogo' href='/'>
            PennyWise
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav className='ml-auto'>
              <Nav.Link href='/Main'>
                <img src='img/con0.png' alt='Link Icon' />
              </Nav.Link>
              <Nav.Link href='#about'>
                <img src='img/con3.png' alt='Link Icon' />
              </Nav.Link>
              <Nav.Link href='/Community'>
                <img src='img/con1.png' alt='Link Icon' />
              </Nav.Link>
              <Nav.Link href='#about'>
                <img src='img/con2.png' alt='Link Icon' />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='form-container'></div>
    </div>
  );
};

export default Signup;

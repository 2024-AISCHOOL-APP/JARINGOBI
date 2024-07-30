import React, { memo } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navi.css';

const Navi = memo(({ userId, onLogout }) => {
  return (
    <Navbar className='Navbar'>
      <Container className='Container'>
        <Navbar.Brand className='Navlogo' href='./'>
          PennyWise
        </Navbar.Brand>
        {userId && <span className='logo-user'>@{userId}</span>}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='/Main'>가계부</Nav.Link>
            <Nav.Link href='/dashboard'>가계부 분석</Nav.Link>
            <Nav.Link href='/Community'>커뮤니티</Nav.Link>
            <Nav.Link as='button' onClick={onLogout}>
              로그아웃
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default Navi;
